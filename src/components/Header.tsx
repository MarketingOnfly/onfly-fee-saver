import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Zap, Shield, TrendingUp, Phone } from 'lucide-react';

const Header = () => {
  const scrollToCalculator = () => {
    const calculator = document.getElementById('calculator');
    calculator?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contact = document.getElementById('contact');
    contact?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16" />
      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Compare e Economize</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Compare Custos:
              <br />
              <span className="text-white/90">Concorrentes vs</span>{' '}
              <span className="bg-white text-primary px-2 py-1 rounded-lg">Onfly</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Economize com fees transparentes e sem surpresas. 
              Descubra quanto sua empresa pode economizar com nossa calculadora interativa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={scrollToCalculator}
                className="text-lg px-8 py-6 shadow-button"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Economia
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToContact}
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                Falar com Vendas
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-white/90">Fees Transparentes</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-white/90">Economia Comprovada</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-white/90">Sem Surpresas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;