import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FiCode, 
  FiTrendingUp, 
  FiShield, 
  FiSearch, 
  FiMonitor, 
  FiGlobe 
} from 'react-icons/fi';
import { useLanguage } from '../Context/LanguageContext';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
    <CardHeader className="flex items-center space-x-4">
      <Icon className="text-4xl text-blue-500" />
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Servicespage = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // console.log('Services component mounted');
  }, []);

  const services = [
    { icon: FiCode, title: t.serviceWebDev, description: t.serviceWebDevDesc },
    { icon: FiTrendingUp, title: t.servicePerfOpt, description: t.servicePerfOptDesc },
    { icon: FiShield, title: t.serviceSecAudit, description: t.serviceSecAuditDesc },
    { icon: FiSearch, title: t.serviceSEO, description: t.serviceSEODesc },
    { icon: FiMonitor, title: t.serviceResponsive, description: t.serviceResponsiveDesc },
    { icon: FiGlobe, title: t.serviceGlobal, description: t.serviceGlobalDesc },
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{t.servicesTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.servicesSubtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            icon={service.icon} 
            title={service.title} 
            description={service.description} 
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">{t.servicesCtaTitle}</h2>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {t.servicesCtaBtn}
        </Button>
      </div>
    </div>
  );
};

export default Servicespage;