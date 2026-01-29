import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Shield" className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-secondary">OT-Гипервизор</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-sm font-medium hover:text-primary transition-colors">Модули</a>
          <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">Демо</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Тарифы</a>
        </nav>
        <Button className="bg-primary hover:bg-primary/90">Войти</Button>
      </div>
    </header>
  );
};

export default Header;
