import React, { useState, useEffect } from 'react';
import LeadsService, { LeadData, LeadSummary } from '../services/leadsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Download, Eye, Users, TrendingUp, DollarSign, Award, LogOut } from 'lucide-react';
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
            className="flex items-center gap-2"
            variant="default"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <span className="text-sm text-gray-600">
            Logado como: <strong>{user?.email}</strong>
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              A: {summary.leadsByProject.A} | B: {summary.leadsByProject.B}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Leads convertidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Valor convertido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Variação</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(summary.leadsByVariation).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Mais leads capturados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Capturados</CardTitle>
          <CardDescription>
            Lista completa de todos os leads capturados pelos popups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Data/Hora</th>
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Telefone</th>
                  <th className="text-left p-2">Projeto</th>
                  <th className="text-left p-2">Variação</th>
                  <th className="text-left p-2">Página</th>
                  <th className="text-left p-2">Popup</th>
                  <th className="text-left p-2">Preço</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-sm">{formatDate(lead.timestamp)}</td>
                    <td className="p-2 font-medium">{lead.name}</td>
                    <td className="p-2 text-sm">{lead.email}</td>
                    <td className="p-2 text-sm">{lead.phone}</td>
                    <td className="p-2">
                      <Badge variant={lead.project === 'A' ? 'default' : 'secondary'}>
                        {lead.project}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm">{lead.variation}</td>
                    <td className="p-2 text-sm">{lead.pageName}</td>
                    <td className="p-2 text-sm capitalize">{lead.popupType}</td>
                    <td className="p-2 text-sm">{lead.cashPrice}</td>
                    <td className="p-2">{getStatusBadge(lead.status)}</td>
                    <td className="p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                      >
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalhes do Lead</h2>
              <Button variant="outline" onClick={() => setSelectedLead(null)}>
                Fechar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                <p><strong>Nome:</strong> {selectedLead.name}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Telefone:</strong> {selectedLead.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Informações da Página</h3>
                <p><strong>Projeto:</strong> {selectedLead.project}</p>
                <p><strong>Variação:</strong> {selectedLead.variation}</p>
                <p><strong>Página:</strong> {selectedLead.pageName}</p>
                <p><strong>URL:</strong> {selectedLead.pageUrl}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Informações de Preço</h3>
                <p><strong>Preço Original:</strong> {selectedLead.originalPrice}</p>
                <p><strong>Preço Parcelado:</strong> {selectedLead.installmentPrice}</p>
                <p><strong>Parcelas:</strong> {selectedLead.installmentCount}x</p>
                <p><strong>À Vista:</strong> {selectedLead.cashPrice}</p>
                <p><strong>Desconto:</strong> {selectedLead.discountPercentage}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Informações do Popup</h3>
                <p><strong>Tipo:</strong> {selectedLead.popupType}</p>
                <p><strong>Trigger:</strong> {selectedLead.popupTrigger}</p>
                <p><strong>Status:</strong> {selectedLead.status}</p>
                <p><strong>Data:</strong> {formatDate(selectedLead.timestamp)}</p>
              </div>
              
              {(selectedLead.utmSource || selectedLead.utmMedium || selectedLead.utmCampaign) && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-2">Informações UTM</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedLead.utmSource && <p><strong>Source:</strong> {selectedLead.utmSource}</p>}
                    {selectedLead.utmMedium && <p><strong>Medium:</strong> {selectedLead.utmMedium}</p>}
                    {selectedLead.utmCampaign && <p><strong>Campaign:</strong> {selectedLead.utmCampaign}</p>}
                    {selectedLead.utmContent && <p><strong>Content:</strong> {selectedLead.utmContent}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsDashboard;