import React, { useState, useEffect } from 'react';
import LeadsService, { LeadData, LeadSummary } from '../services/leadsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Download, Users, TrendingUp, DollarSign, Award, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [summary, setSummary] = useState<LeadSummary | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allLeads = LeadsService.getAllLeads();
    const leadsSummary = LeadsService.getLeadsSummary();
    setLeads(allLeads);
    setSummary(leadsSummary);
  };

  const handleExportCSV = () => {
    const csvContent = LeadsService.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_cltcomgrana_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const getStatusBadge = (status: LeadData['status']) => {
    const variants = {
      captured: 'default',
      converted: 'success',
      abandoned: 'destructive'
    } as const;

    const labels = {
      captured: 'Capturado',
      converted: 'Convertido',
      abandoned: 'Abandonado'
    };

    return (
      <Badge variant={variants[status] as any}>
        {labels[status]}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const handleLogout = () => {
    logout();
  };

  if (!summary) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header com botão de logout */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Leads</h1>
            <p className="text-gray-600 mt-1">Acompanhe e gerencie seus leads capturados</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
              variant="default"
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <span className="text-sm text-gray-700">
              Logado como: <strong className="text-gray-900">{user?.email}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{summary.totalLeads}</div>
              <p className="text-xs text-gray-600">
                A: {summary.leadsByProject.A} | B: {summary.leadsByProject.B}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{summary.conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-gray-600">
                Leads convertidos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalRevenue)}</div>
              <p className="text-xs text-gray-600">
                Valor convertido
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Melhor Variação</CardTitle>
              <Award className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {Object.entries(summary.leadsByVariation).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
              </div>
              <p className="text-xs text-gray-600">
                Mais leads capturados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Leads */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Leads Capturados</CardTitle>
            <CardDescription className="text-gray-600">
              Lista completa de todos os leads capturados pelos popups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-700 font-semibold">Data/Hora</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Nome</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Telefone</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Projeto</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Variação</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Página</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Popup</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Preço</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-700">{formatDate(lead.timestamp)}</TableCell>
                      <TableCell className="font-medium text-gray-900">{lead.name}</TableCell>
                      <TableCell className="text-sm text-gray-700">{lead.email}</TableCell>
                      <TableCell className="text-sm text-gray-700">{lead.phone}</TableCell>
                      <TableCell>
                        <Badge variant={lead.project === 'A' ? 'default' : 'secondary'} className="text-white">
                          {lead.project}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">{lead.variation}</TableCell>
                      <TableCell className="text-sm text-gray-700">{lead.pageName}</TableCell>
                      <TableCell className="text-sm text-gray-700 capitalize">{lead.popupType}</TableCell>
                      <TableCell className="text-sm text-gray-700 font-medium">{lead.cashPrice}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                          className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Detalhes do Lead */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Detalhes do Lead</h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedLead(null)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Fechar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Informações Pessoais</h3>
                  <p className="text-gray-700"><strong className="text-gray-900">Nome:</strong> {selectedLead.name}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Email:</strong> {selectedLead.email}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Telefone:</strong> {selectedLead.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Informações da Página</h3>
                  <p className="text-gray-700"><strong className="text-gray-900">Projeto:</strong> {selectedLead.project}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Variação:</strong> {selectedLead.variation}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Página:</strong> {selectedLead.pageName}</p>
                  <p className="text-gray-700 break-all"><strong className="text-gray-900">URL:</strong> {selectedLead.pageUrl}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Informações de Preço</h3>
                  <p className="text-gray-700"><strong className="text-gray-900">Preço Original:</strong> {selectedLead.originalPrice}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Preço Parcelado:</strong> {selectedLead.installmentPrice}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Parcelas:</strong> {selectedLead.installmentCount}x</p>
                  <p className="text-gray-700"><strong className="text-gray-900">À Vista:</strong> {selectedLead.cashPrice}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Desconto:</strong> {selectedLead.discountPercentage}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Informações do Popup</h3>
                  <p className="text-gray-700"><strong className="text-gray-900">Tipo:</strong> {selectedLead.popupType}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Trigger:</strong> {selectedLead.popupTrigger}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Status:</strong> {selectedLead.status}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Data:</strong> {formatDate(selectedLead.timestamp)}</p>
                </div>

                {(selectedLead.utmSource || selectedLead.utmMedium || selectedLead.utmCampaign) && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2 text-gray-900">Informações UTM</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedLead.utmSource && <p className="text-gray-700"><strong className="text-gray-900">Source:</strong> {selectedLead.utmSource}</p>}
                      {selectedLead.utmMedium && <p className="text-gray-700"><strong className="text-gray-900">Medium:</strong> {selectedLead.utmMedium}</p>}
                      {selectedLead.utmCampaign && <p className="text-gray-700"><strong className="text-gray-900">Campaign:</strong> {selectedLead.utmCampaign}</p>}
                      {selectedLead.utmContent && <p className="text-gray-700"><strong className="text-gray-900">Content:</strong> {selectedLead.utmContent}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDashboard;