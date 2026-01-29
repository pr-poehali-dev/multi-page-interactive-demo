import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ModalsContainer from '@/components/ModalsContainer';
import Footer from '@/components/Footer';

type ModalType = 'n1' | 'templates' | 'archive' | 'employee' | 'assign' | 'calendar' | 'reports' | null;

const Index = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [n1Step, setN1Step] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const modules = [
    {
      icon: 'BookOpen',
      title: 'База НПА',
      description: 'Актуальные нормативно-правовые акты с подписками и уведомлениями',
      color: 'bg-blue-50 text-blue-600',
      modal: null as ModalType
    },
    {
      icon: 'GraduationCap',
      title: 'Обучение',
      description: 'Управление программами обучения, тестирование и контроль знаний',
      color: 'bg-green-50 text-green-600',
      modal: 'assign' as ModalType
    },
    {
      icon: 'FileText',
      title: 'Конструктор документов',
      description: 'Умные шаблоны с пошаговым руководством и облачным хранилищем',
      color: 'bg-purple-50 text-purple-600',
      modal: 'templates' as ModalType
    },
    {
      icon: 'BarChart3',
      title: 'Аналитика',
      description: 'Отчеты в режиме online: приказы, акты Н-1, направления на МО',
      color: 'bg-orange-50 text-orange-600',
      modal: 'reports' as ModalType
    }
  ];

  const templates = [
    { category: 'Приказы', items: ['О создании комиссии', 'О назначении ответственных', 'О проведении СОУТ'] },
    { category: 'Инструкции', items: ['Вводный инструктаж', 'По оказанию первой помощи'] },
    { category: 'Программы', items: ['Первичного инструктажа на рабочем месте'] },
    { category: 'Протоколы', items: ['Проверки знаний', 'Заседания комиссии по расследованию'] },
    { category: 'Уведомления', items: ['О нарушении', 'О направлении на медосмотр'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <HeroSection />

      <section id="modules" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Ключевые модули системы</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Все необходимые инструменты для эффективной работы специалиста по охране труда
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, idx) => (
            <Card 
              key={idx} 
              className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20"
              onClick={() => module.modal && setOpenModal(module.modal)}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl ${module.color} flex items-center justify-center mb-4`}>
                  <Icon name={module.icon} size={28} />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/5 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Интерактивное демо</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Попробуйте ключевые функции системы прямо сейчас
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('n1')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <Icon name="FileWarning" size={24} />
                </div>
                <CardTitle>Создать акт Н-1</CardTitle>
                <CardDescription>Пошаговый конструктор акта о несчастном случае</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('templates')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Icon name="Files" size={24} />
                </div>
                <CardTitle>Библиотека шаблонов</CardTitle>
                <CardDescription>15 готовых шаблонов документов</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('archive')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Icon name="Archive" size={24} />
                </div>
                <CardTitle>Облачный архив</CardTitle>
                <CardDescription>Хранилище с поиском и фильтрацией</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('employee')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-3">
                  <Icon name="UserPlus" size={24} />
                </div>
                <CardTitle>Добавить сотрудника</CardTitle>
                <CardDescription>Автоматический подбор инструктажей</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('assign')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center mb-3">
                  <Icon name="Users" size={24} />
                </div>
                <CardTitle>Массовое назначение</CardTitle>
                <CardDescription>Обучение для целых отделов</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setOpenModal('calendar')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Icon name="Calendar" size={24} />
                </div>
                <CardTitle>Календарь обучения</CardTitle>
                <CardDescription>График аттестаций и инструктажей</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <ModalsContainer 
        openModal={openModal}
        setOpenModal={setOpenModal}
        n1Step={n1Step}
        setN1Step={setN1Step}
        date={date}
        setDate={setDate}
        templates={templates}
      />

      <Footer />
    </div>
  );
};

export default Index;
