import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">Платформа для охраны труда</Badge>
      <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
        Цифровизация охраны труда<br />в одной платформе
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        Комплексное решение для специалистов по ОТ: от актуальной базы НПА до автоматизации документооборота. 
        Сократите время на рутину на 70% и минимизируйте риски.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
          <Icon name="Rocket" className="mr-2" size={20} />
          Попробовать демо
        </Button>
        <Button size="lg" variant="outline" className="text-lg px-8">
          Подробнее о возможностях
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
