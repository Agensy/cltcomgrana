<?php
// Meta Conversions API endpoint para hospedagem compartilhada (HostGator)
// Recebe JSON via POST e encaminha para o Graph API

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');

// Carrega configurações do servidor (PIXEL_ID, ACCESS_TOKEN, TEST_EVENT_CODE)
$configPath = __DIR__ . '/server-config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'error' => 'server_config_missing',
    'message' => 'Arquivo server-config.php não encontrado. Configure via GitHub Secrets no workflow.'
  ]);
  exit;
}
require_once $configPath;

if (!defined('META_PIXEL_ID') || !META_PIXEL_ID || !defined('META_ACCESS_TOKEN') || !META_ACCESS_TOKEN) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'error' => 'server_config_invalid',
    'message' => 'META_PIXEL_ID ou META_ACCESS_TOKEN não configurados.'
  ]);
  exit;
}

// Utilitários
function sha256_hex($s) {
  return hash('sha256', trim(strtolower($s)));
}

function normalize_phone($s) {
  return preg_replace('/\D+/', '', $s);
}

// Lê o corpo JSON
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'invalid_json']);
  exit;
}

$event_name = isset($input['event_name']) ? $input['event_name'] : 'Purchase';
$event_id = isset($input['event_id']) ? $input['event_id'] : null;
$currency = isset($input['currency']) ? $input['currency'] : 'BRL';
$value = isset($input['value']) ? floatval($input['value']) : 0.0;
$action_source = isset($input['action_source']) ? $input['action_source'] : 'website';
$event_source_url = isset($input['event_source_url']) ? $input['event_source_url'] : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null);
$fbp = isset($input['fbp']) ? $input['fbp'] : null;
$fbc = isset($input['fbc']) ? $input['fbc'] : null;

$user_data = isset($input['user_data']) && is_array($input['user_data']) ? $input['user_data'] : [];
$user_data['client_user_agent'] = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : ($user_data['client_user_agent'] ?? null);

// Se vierem campos brutos, faz hash no servidor
if (isset($input['email']) && !isset($user_data['em'])) {
  $user_data['em'] = [ sha256_hex($input['email']) ];
} elseif (isset($user_data['em']) && is_string($user_data['em'])) {
  $user_data['em'] = [ $user_data['em'] ];
}

if (isset($input['phone']) && !isset($user_data['ph'])) {
  $user_data['ph'] = [ sha256_hex(normalize_phone($input['phone'])) ];
} elseif (isset($user_data['ph']) && is_string($user_data['ph'])) {
  $user_data['ph'] = [ $user_data['ph'] ];
}

if ($fbp) { $user_data['fbp'] = $fbp; }
if ($fbc) { $user_data['fbc'] = $fbc; }

$custom_data = [
  'currency' => $currency,
  'value' => $value,
];
if (isset($input['contents'])) { $custom_data['contents'] = $input['contents']; }
if (isset($input['order_id'])) { $custom_data['order_id'] = $input['order_id']; }

$event = [
  'event_name' => $event_name,
  'event_time' => time(),
  'event_id' => $event_id,
  'action_source' => $action_source,
  'event_source_url' => $event_source_url,
  'user_data' => $user_data,
  'custom_data' => $custom_data,
];

$data = [ 'data' => [ $event ] ];
if (defined('META_TEST_EVENT_CODE') && META_TEST_EVENT_CODE) {
  $data['test_event_code'] = META_TEST_EVENT_CODE;
}

$url = 'https://graph.facebook.com/v20.0/' . META_PIXEL_ID . '/events?access_token=' . urlencode(META_ACCESS_TOKEN);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => $curl_error]);
  exit;
}

echo json_encode([
  'ok' => $http_code >= 200 && $http_code < 300,
  'status' => $http_code,
  'response' => json_decode($response, true)
]);