import React from 'react';
import Header from '@/components/Header';
import CostCalculator from '@/components/CostCalculator';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section id="calculator" className="py-16">
          <CostCalculator />
        </section>
        
        <ContactForm />
      </main>
      
      <footer className="bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Onfly. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;