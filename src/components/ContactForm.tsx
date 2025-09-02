import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe entrará em contato em até 24 horas.",
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Fale Conosco</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Pronto para Economizar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entre em contato com nosso time de vendas para uma proposta personalizada
              e descubra como a Onfly pode transformar a gestão de viagens da sua empresa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nome completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@empresa.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium">Empresa *</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nome da empresa"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Conte-nos sobre suas necessidades de viagens corporativas..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:shadow-button transition-all duration-300"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Solicitar Contato
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Vendas Diretas</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Fale diretamente com nosso time comercial para uma proposta personalizada.
                    </p>
                    <a 
                      href="tel:+551130303030" 
                      className="text-primary font-medium hover:underline"
                    >
                      (11) 3030-3030
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-success/5 border-success/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email Comercial</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Envie sua dúvida ou solicite uma demonstração por email.
                    </p>
                    <a 
                      href="mailto:vendas@onfly.com.br" 
                      className="text-success font-medium hover:underline"
                    >
                      vendas@onfly.com.br
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted-foreground flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Resposta Rápida</h3>
                    <p className="text-muted-foreground text-sm">
                      Nosso time comercial responde em até 2 horas durante horário comercial 
                      e garante uma proposta personalizada em até 24 horas.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;