import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, TrendingDown, Users, Briefcase, DollarSign } from 'lucide-react';

interface CalculatorInputs {
  gmv: number;
  colaboradores: number;
  mensalidadeConcorrente: number;
  feeAdicional: number;
  useDefaults: boolean;
}

interface Results {
  custoConcorrente: number;
  custoOnfly: number;
  economia: number;
  showSpecialistMessage: boolean;
}

const CostCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    gmv: 0,
    colaboradores: 0,
    mensalidadeConcorrente: 0,
    feeAdicional: 0,
    useDefaults: false
  });

  const [results, setResults] = useState<Results>({
    custoConcorrente: 0,
    custoOnfly: 0,
    economia: 0,
    showSpecialistMessage: false
  });

  const calculateResults = () => {
    const { gmv, colaboradores, mensalidadeConcorrente, feeAdicional, useDefaults } = inputs;

    // Verificar se há mais de 1500 colaboradores
    if (colaboradores > 1500) {
      setResults({ 
        custoConcorrente: 0, 
        custoOnfly: 0, 
        economia: 0, 
        showSpecialistMessage: true 
      });
      return;
    }

    // Calcular número de viajantes (40% dos colaboradores)
    const viajantes = Math.round(colaboradores * 0.4);

    // Cálculo Onfly - Fee escalonado baseado no número de colaboradores
    let taxaOnfly = 0.0098; // 0.98%
    if (colaboradores <= 50) {
      taxaOnfly = 0.0098; // 0.98%
    } else if (colaboradores <= 700) {
      taxaOnfly = 0.0107; // 1.07%
    } else if (colaboradores <= 1500) {
      taxaOnfly = 0.0117; // 1.17%
    }

    const custoOnfly = gmv * taxaOnfly;

    // Cálculo Concorrente
    let custoConcorrente = 0;
    if (useDefaults) {
      // Usar valores padrão
      const feeGMV = gmv * 0.02;
      const feeNecessidades = colaboradores * 3 * 10; // 3 necessidades por colaborador, 10 reais cada
      const mensalidadePadrao = colaboradores * 29.90;
      custoConcorrente = feeGMV + feeNecessidades + mensalidadePadrao;
    } else {
      const feeGMV = gmv * 0.02;
      const feeNecessidades = viajantes * 3 * feeAdicional; // 3 necessidades médias por viajante
      custoConcorrente = mensalidadeConcorrente + feeGMV + feeNecessidades;
    }

    // Limitar valor dos concorrentes a no máximo 3.5x o valor da Onfly
    const maxCustoConcorrente = custoOnfly * 3.5;
    if (custoConcorrente > maxCustoConcorrente) {
      custoConcorrente = maxCustoConcorrente;
    }

    const economia = custoConcorrente - custoOnfly;

    setResults({ custoConcorrente, custoOnfly, economia, showSpecialistMessage: false });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Calculator className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Calculadora de Comparação</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Compare os Custos</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Veja quanto você pode economizar com a Onfly comparado aos concorrentes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Concorrentes */}
        <Card className="p-6 border-competitor/20 bg-competitor-light/50">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-competitor flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-competitor-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-competitor">Concorrentes</h3>
                <p className="text-sm text-muted-foreground">Fees variáveis + mensalidade</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="gmv-competitor" className="text-sm font-medium">GMV Transacionado (R$)</Label>
                <Input
                  id="gmv-competitor"
                  type="number"
                  value={inputs.gmv || ''}
                  onChange={(e) => handleInputChange('gmv', Number(e.target.value))}
                  placeholder="Ex: 100000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="colaboradores" className="text-sm font-medium">Nº Colaboradores</Label>
                <Input
                  id="colaboradores"
                  type="number"
                  value={inputs.colaboradores || ''}
                  onChange={(e) => handleInputChange('colaboradores', Number(e.target.value))}
                  placeholder="Ex: 50"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-defaults"
                  checked={inputs.useDefaults}
                  onCheckedChange={(checked) => handleInputChange('useDefaults', checked as boolean)}
                />
                <Label htmlFor="use-defaults" className="text-sm">
                  Não sei os valores - usar estimativas médias
                </Label>
              </div>

              {!inputs.useDefaults && (
                <div className="space-y-4 p-4 bg-background/50 rounded-lg">
                  <div>
                    <Label htmlFor="mensalidade" className="text-sm font-medium">Mensalidade por usuário (R$)</Label>
                    <Input
                      id="mensalidade"
                      type="number"
                      value={inputs.mensalidadeConcorrente || ''}
                      onChange={(e) => handleInputChange('mensalidadeConcorrente', Number(e.target.value))}
                      placeholder="Ex: 30"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fee-adicional" className="text-sm font-medium">Fee por Necessidade (R$)</Label>
                    <Input
                      id="fee-adicional"
                      type="number"
                      step="0.5"
                      value={inputs.feeAdicional || ''}
                      onChange={(e) => handleInputChange('feeAdicional', Number(e.target.value))}
                      placeholder="Ex: 15"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {inputs.useDefaults && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Usando estimativas médias baseadas em concorrentes comuns
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Onfly */}
        <Card className="p-6 border-primary/20 bg-primary/5">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Onfly</h3>
                <p className="text-sm text-muted-foreground">Fee escalonado transparente</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">GMV Transacionado (R$)</Label>
                <Input
                  type="number"
                  value={inputs.gmv || ''}
                  onChange={(e) => handleInputChange('gmv', Number(e.target.value))}
                  placeholder="Ex: 100000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Nº Colaboradores</Label>
                <Input
                  type="number"
                  value={inputs.colaboradores || ''}
                  onChange={(e) => handleInputChange('colaboradores', Number(e.target.value))}
                  placeholder="Ex: 50"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Fee Adicional</Label>
                <Input
                  type="text"
                  value="R$ 0,00"
                  disabled
                  className="mt-1 bg-success-light text-success font-medium"
                />
                <p className="text-xs text-success mt-1">✓ Sem fees adicionais por necessidades</p>
              </div>

            </div>
          </div>
        </Card>
      </div>

      {/* Results */}
      {results.showSpecialistMessage ? (
        <Card className="p-8 bg-gradient-subtle">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Consulte um Vendedor Especialista</h3>
            <div className="p-6 bg-primary/10 rounded-lg">
              <p className="text-lg text-primary font-medium mb-2">
                🎯 Empresas com mais de 1.500 colaboradores
              </p>
              <p className="text-muted-foreground">
                Para organizações do seu porte, oferecemos soluções personalizadas e condições especiais. 
                Entre em contato com nosso time especializado para uma proposta sob medida.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8 bg-gradient-subtle">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Resultado da Comparação</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-competitor-light rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-competitor" />
                  <span className="text-sm font-medium text-competitor">Concorrentes</span>
                </div>
                <p className="text-2xl font-bold text-competitor">{formatCurrency(results.custoConcorrente)}</p>
                <p className="text-xs text-muted-foreground mt-1">Custo mensal total</p>
              </div>

              <div className="p-6 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Onfly</span>
                </div>
                <p className="text-2xl font-bold text-primary">{formatCurrency(results.custoOnfly)}</p>
                <p className="text-xs text-muted-foreground mt-1">Custo mensal total</p>
              </div>

              <div className="p-6 bg-success-light rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-success">Economia</span>
                </div>
                <p className={`text-2xl font-bold ${results.economia > 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(results.economia)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Economia mensal</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Importante:</strong> Estimativas de referência com base em dados proprietários da Onfly. 
                Para um cálculo preciso e personalizado, entre em contato com nosso time de vendas.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CostCalculator;