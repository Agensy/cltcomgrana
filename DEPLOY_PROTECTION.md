# 🛡️ Regras de Proteção do Deploy

Este documento estabelece regras críticas para prevenir problemas no deploy da aplicação na HostGator.

## ⚠️ REGRAS CRÍTICAS - NÃO VIOLAR!

### 1. 🎯 Configuração do `server-dir`

**REGRA ABSOLUTA:** O `server-dir` DEVE sempre ser `/` (raiz)

```yaml
# ✅ CORRETO
server-dir: /

# ❌ NUNCA FAZER
server-dir: public_html/
server-dir: public_html
```

**Por quê?**
- HostGator já usa `/public_html/` como diretório público
- Alterar para `public_html/` cria `/public_html/public_html/`
- Isso torna o site **INACESSÍVEL** na URL principal

### 2. 📄 Arquivo `.htaccess`

**REGRA:** NUNCA excluir o `.htaccess` do deploy

```yaml
# ❌ NUNCA FAZER
exclude: |
  .htaccess
```

**Por quê?**
- Necessário para roteamento SPA (React Router)
- Sem ele, rotas como `/leads` retornam 404

### 3. 🧹 Limpeza Completa

**REGRA:** Usar `dangerous-clean-slate` apenas em emergências

```yaml
# ⚠️ CUIDADO - Só em casos extremos
dangerous-clean-slate: true
```

## 🔧 Ferramentas de Proteção Implementadas

### 1. Comentários de Aviso
- Comentários críticos no arquivo `main.yml`
- Avisos visuais sobre configurações perigosas

### 2. Script de Validação
```bash
# Executar antes de commits importantes
./scripts/validate-workflow.sh
```

### 3. Validação Automática no CI
- Passo automático no GitHub Actions
- Falha o build se configurações estiverem erradas

## 🚨 Histórico de Problemas

### Problema Ocorrido em 13/10/2025
- **Commit:** `abfa0cb` - "ci: deploy dist para public_html na HostGator"
- **Erro:** Alterou `server-dir: /` para `server-dir: public_html/`
- **Resultado:** Site inacessível por 24 horas
- **Solução:** Revertido no commit `59866fe`

## 📋 Checklist Antes de Alterar Deploy

Antes de modificar `.github/workflows/main.yml`:

- [ ] ✅ `server-dir` está como `/`?
- [ ] ✅ `.htaccess` não está sendo excluído?
- [ ] ✅ `dangerous-clean-slate` está `false` ou ausente?
- [ ] ✅ Executou `./scripts/validate-workflow.sh`?
- [ ] ✅ Testou em ambiente de staging primeiro?

## 🆘 Em Caso de Emergência

Se o site ficar inacessível após deploy:

1. **Verificar configurações:**
   ```bash
   ./scripts/validate-workflow.sh
   ```

2. **Reverter para configuração segura:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Configuração de emergência:**
   ```yaml
   server-dir: /
   local-dir: dist/
   # Sem exclusões do .htaccess
   ```

## 📞 Contatos de Emergência

- **Desenvolvedor Principal:** [Seu contato]
- **Administrador do Servidor:** [Contato HostGator]

---

**⚠️ LEMBRE-SE: Estas regras existem porque já causaram problemas reais. Não as ignore!**