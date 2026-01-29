import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type ModalType = 'n1' | 'templates' | 'archive' | 'employee' | 'assign' | 'calendar' | 'reports' | null;

interface ModalsContainerProps {
  openModal: ModalType;
  setOpenModal: (modal: ModalType) => void;
  n1Step: number;
  setN1Step: (step: number) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  templates: Array<{ category: string; items: string[] }>;
}

const ModalsContainer = ({ openModal, setOpenModal, n1Step, setN1Step, date, setDate, templates }: ModalsContainerProps) => {
  return (
    <>
      <Dialog open={openModal === 'n1'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Создать акт о несчастном случае (Н-1)</DialogTitle>
            <DialogDescription>Пошаговое создание акта с автоматическими подсказками</DialogDescription>
          </DialogHeader>
          <div className="flex gap-6 mt-4">
            <div className="w-48 shrink-0">
              <div className="space-y-2">
                {['Основные данные', 'Пострадавший', 'Обстоятельства', 'Причины', 'Мероприятия'].map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      n1Step === idx + 1 ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/60'
                    }`}
                    onClick={() => setN1Step(idx + 1)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        n1Step === idx + 1 ? 'bg-white text-primary' : 'bg-background'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ScrollArea className="flex-1 h-[500px] pr-4">
              {n1Step === 1 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                    <Icon name="Info" className="text-blue-600 shrink-0" size={20} />
                    <p className="text-sm text-blue-900">Время указывается по местному. Для филиалов заполняется обособленное подразделение.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Дата происшествия</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label>Время происшествия</Label>
                      <Input type="time" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Организация</Label>
                    <Input placeholder="ООО «Промышленная безопасность»" className="mt-1" />
                  </div>
                  <div>
                    <Label>Место происшествия</Label>
                    <Input placeholder="Цех №5, участок сборки" className="mt-1" />
                  </div>
                </div>
              )}
              {n1Step === 2 && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg flex gap-3">
                    <Icon name="Sparkles" className="text-green-600 shrink-0" size={20} />
                    <p className="text-sm text-green-900">При вводе ФИО система подтягивает данные из раздела «Сотрудники»</p>
                  </div>
                  <div>
                    <Label>ФИО пострадавшего</Label>
                    <Input placeholder="Начните вводить имя..." className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Должность</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите должность" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welder">Сварщик 4 разряда</SelectItem>
                          <SelectItem value="mechanic">Слесарь-механик</SelectItem>
                          <SelectItem value="electrician">Электромонтер</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Стаж работы (лет)</Label>
                      <Input type="number" placeholder="5" className="mt-1" />
                    </div>
                  </div>
                </div>
              )}
              {n1Step === 3 && (
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg flex gap-3">
                    <Icon name="Lightbulb" className="text-purple-600 shrink-0" size={20} />
                    <p className="text-sm text-purple-900">Собирайте описание из готовых фраз или введите свой текст</p>
                  </div>
                  <div>
                    <Label>Описание обстоятельств</Label>
                    <Textarea 
                      className="mt-1 min-h-32" 
                      placeholder="Опишите, что произошло..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">поскользнулся на лестнице</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">получил ожог при контакте с...</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">был травмирован падающим предметом</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">получил удар электротоком</Badge>
                  </div>
                </div>
              )}
              {n1Step === 4 && (
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg flex gap-3">
                    <Icon name="AlertCircle" className="text-orange-600 shrink-0" size={20} />
                    <p className="text-sm text-orange-900">На основе обстоятельств система предлагает наиболее вероятные причины</p>
                  </div>
                  <div>
                    <Label>Причины несчастного случая</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите причину из классификатора" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Нарушение технологического процесса</SelectItem>
                        <SelectItem value="2">Неудовлетворительное содержание рабочих мест</SelectItem>
                        <SelectItem value="3">Несовершенство технологического процесса</SelectItem>
                        <SelectItem value="4">Нарушение требований безопасности</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Виновные лица</Label>
                    <Input placeholder="Укажите ответственных лиц" className="mt-1" />
                  </div>
                </div>
              )}
              {n1Step === 5 && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg flex gap-3">
                    <Icon name="CheckCircle2" className="text-indigo-600 shrink-0" size={20} />
                    <p className="text-sm text-indigo-900">На основе выбранных мер будет сгенерирован черновик приказа</p>
                  </div>
                  <Label>Мероприятия по устранению причин</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m1" />
                      <label htmlFor="m1" className="text-sm font-medium">Провести внеплановый инструктаж</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m2" />
                      <label htmlFor="m2" className="text-sm font-medium">Издать приказ о наказании виновных</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m3" />
                      <label htmlFor="m3" className="text-sm font-medium">Провести дополнительную проверку оборудования</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m4" />
                      <label htmlFor="m4" className="text-sm font-medium">Обновить инструкции по охране труда</label>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button variant="outline" disabled={n1Step === 1} onClick={() => setN1Step(n1Step - 1)}>
                  <Icon name="ChevronLeft" className="mr-2" size={16} />
                  Назад
                </Button>
                {n1Step < 5 ? (
                  <Button onClick={() => setN1Step(n1Step + 1)}>
                    Далее
                    <Icon name="ChevronRight" className="ml-2" size={16} />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline">Сохранить черновик</Button>
                    <Button>Создать акт</Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'templates'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Библиотека шаблонов</DialogTitle>
            <DialogDescription>15 готовых шаблонов документов с привязкой к НПА</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] mt-4">
            <div className="space-y-6">
              {templates.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Folder" className="text-primary" size={20} />
                    {category.category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {category.items.map((item, itemIdx) => (
                      <Card key={itemIdx} className="cursor-pointer hover:border-primary transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-start justify-between">
                            <span>{item}</span>
                            <Icon name="Download" className="text-muted-foreground" size={16} />
                          </CardTitle>
                          <CardDescription className="text-xs">
                            <span className="text-blue-600">На основе: Приказ Минтруда №...</span>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                  {idx < templates.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'archive'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Все документы</DialogTitle>
            <DialogDescription>Облачное хранилище с мощным поиском и фильтрацией</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input placeholder="Поиск по номеру, ФИО, ключевым словам..." className="w-full" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Тип документа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="n1">Акты Н-1</SelectItem>
                  <SelectItem value="order">Приказы</SelectItem>
                  <SelectItem value="instruction">Инструкции</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Период" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">За месяц</SelectItem>
                  <SelectItem value="quarter">За квартал</SelectItem>
                  <SelectItem value="year">За год</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
              <Icon name="Lock" className="text-blue-600" size={20} />
              <p className="text-sm text-blue-900">Все документы шифруются и хранятся на серверах в РФ согласно 152-ФЗ</p>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {[
                  { name: 'Акт Н-1 №12 от 15.01.2025', type: 'Н-1', status: 'Утвержден' },
                  { name: 'Приказ о создании комиссии №45', type: 'Приказ', status: 'Черновик' },
                  { name: 'Инструкция по охране труда', type: 'Инструкция', status: 'Утвержден' },
                  { name: 'Протокол проверки знаний №8', type: 'Протокол', status: 'Утвержден' },
                  { name: 'Направление на медосмотр', type: 'Уведомление', status: 'Утвержден' },
                ].map((doc, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-all cursor-pointer">
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Icon name="FileText" size={20} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{doc.name}</CardTitle>
                            <CardDescription className="text-xs">{doc.type}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={doc.status === 'Утвержден' ? 'default' : 'secondary'}>
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'employee'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Новый сотрудник</DialogTitle>
            <DialogDescription>Система автоматически подберет необходимые инструктажи</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Основное</h3>
              <div>
                <Label>ФИО</Label>
                <Input placeholder="Иванов Иван Иванович" className="mt-1" />
              </div>
              <div>
                <Label>Дата приема</Label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <Label>Должность</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welder">Сварщик 4 разряда</SelectItem>
                    <SelectItem value="mechanic">Слесарь-механик</SelectItem>
                    <SelectItem value="electrician">Электромонтер</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Подразделение</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите подразделение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop1">Цех №1</SelectItem>
                    <SelectItem value="shop2">Цех №2</SelectItem>
                    <SelectItem value="warehouse">Склад</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Автоматически назначено</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <div>
                  <Label className="text-green-900">Необходимые инструктажи</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-600" size={16} />
                      <span className="text-sm">Вводный инструктаж</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-600" size={16} />
                      <span className="text-sm">Первичный на рабочем месте</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-600" size={16} />
                      <span className="text-sm">По пожарной безопасности</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="text-blue-900">График медосмотров</Label>
                <p className="text-sm text-blue-800 mt-2">Предварительный медосмотр до начала работы</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <Label className="text-purple-900">Норма выдачи СИЗ</Label>
                <p className="text-sm text-purple-800 mt-2">Согласно Приказу №766н для сварщиков</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setOpenModal(null)}>Отмена</Button>
            <Button>Сохранить и перейти к обучению</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'assign'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Назначить обучение группе сотрудников</DialogTitle>
            <DialogDescription>Выберите способ отбора сотрудников для назначения программы</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="filters" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">По списку</TabsTrigger>
              <TabsTrigger value="filters">По фильтрам</TabsTrigger>
              <TabsTrigger value="position">По должности</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4 mt-4">
              <div>
                <Label>Загрузить Excel-файл или вставить ФИО</Label>
                <Textarea className="mt-2 min-h-32" placeholder="Иванов И.И.&#10;Петров П.П.&#10;Сидоров С.С." />
              </div>
              <Button variant="outline" className="w-full">
                <Icon name="Upload" className="mr-2" size={16} />
                Загрузить из Excel
              </Button>
            </TabsContent>
            <TabsContent value="filters" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Должность</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Все должности" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все должности</SelectItem>
                      <SelectItem value="welder">Все сварщики</SelectItem>
                      <SelectItem value="mechanic">Все слесари</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Подразделение</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Все подразделения" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все подразделения</SelectItem>
                      <SelectItem value="shop5">Цех №5</SelectItem>
                      <SelectItem value="shop7">Цех №7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Истечение удостоверения</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month1">Через 1 месяц</SelectItem>
                    <SelectItem value="month2">Через 2 месяца</SelectItem>
                    <SelectItem value="month3">Через 3 месяца</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Найдено сотрудников: 17</p>
              </div>
            </TabsContent>
            <TabsContent value="position" className="space-y-4 mt-4">
              <div>
                <Label>Выберите должность</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welder">Сварщик 3 разряда (12 чел.)</SelectItem>
                    <SelectItem value="mechanic">Слесарь-механик (8 чел.)</SelectItem>
                    <SelectItem value="electrician">Электромонтер (5 чел.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div>
              <Label>Программа обучения</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите программу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Пожарно-технический минимум</SelectItem>
                  <SelectItem value="first-aid">Оказание первой помощи</SelectItem>
                  <SelectItem value="electricity">Электробезопасность 2 группа</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Срок прохождения</Label>
              <Input type="date" className="mt-1" />
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-yellow-900">Будет назначено: 17 сотрудникам</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setOpenModal(null)}>Отмена</Button>
            <Button>Назначить и отправить уведомления</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'calendar'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">График обучения и аттестаций</DialogTitle>
            <DialogDescription>Интерактивный календарь с цветовой индикацией событий</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-[1fr_300px] gap-6 mt-4">
            <div>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">События выбранного дня</h3>
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertCircle" className="text-red-500 shrink-0" size={16} />
                      <div>
                        <CardTitle className="text-sm">Истекает обучение</CardTitle>
                        <CardDescription className="text-xs">Петров И.С. — Электробезопасность</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-2">
                      <Icon name="CheckCircle2" className="text-green-500 shrink-0" size={16} />
                      <div>
                        <CardTitle className="text-sm">Завершено обучение</CardTitle>
                        <CardDescription className="text-xs">Сидоров С.С. — ПТМ</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-2">
                      <Icon name="Calendar" className="text-blue-500 shrink-0" size={16} />
                      <div>
                        <CardTitle className="text-sm">Запланирован инструктаж</CardTitle>
                        <CardDescription className="text-xs">Вводный для новой смены (8 чел.)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </ScrollArea>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Истекающие сроки</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Завершенные</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Запланированные</span>
              </div>
            </div>
            <Button variant="outline">
              <Icon name="Download" className="mr-2" size={16} />
              Экспорт в Outlook
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'reports'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Генератор отчетов</DialogTitle>
            <DialogDescription>Создайте отчет с нужными параметрами и визуализацией</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-[300px_1fr] gap-6 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Тип отчета</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="training">По обучению</SelectItem>
                    <SelectItem value="incidents">По травматизму</SelectItem>
                    <SelectItem value="violations">По нарушениям</SelectItem>
                    <SelectItem value="rostrud">Для Роструда/ФСС</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-semibold">Период</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Месяц</SelectItem>
                    <SelectItem value="quarter">Квартал</SelectItem>
                    <SelectItem value="year">Год</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold">Подразделение</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Все" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все подразделения</SelectItem>
                    <SelectItem value="shop1">Цех №1</SelectItem>
                    <SelectItem value="shop2">Цех №2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-semibold">Визуализация</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="table" defaultChecked />
                    <label htmlFor="table" className="text-sm">Таблица</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="chart" defaultChecked />
                    <label htmlFor="chart" className="text-sm">Диаграммы</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="kpi" />
                    <label htmlFor="kpi" className="text-sm">KPI для руководства</label>
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[500px] border rounded-lg p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Отчет по обучению персонала</h3>
                  <p className="text-sm text-muted-foreground">За 4 квартал 2024 года</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="text-xs">Обучено всего</CardDescription>
                      <CardTitle className="text-3xl text-green-600">127</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="text-xs">В процессе</CardDescription>
                      <CardTitle className="text-3xl text-blue-600">34</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="text-xs">Просрочено</CardDescription>
                      <CardTitle className="text-3xl text-red-600">8</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <div className="bg-muted p-6 rounded-lg text-center">
                  <Icon name="BarChart3" className="mx-auto text-muted-foreground mb-2" size={48} />
                  <p className="text-sm text-muted-foreground">Здесь будет диаграмма динамики обучения</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">ТОП-3 программы по популярности</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Пожарно-технический минимум</span>
                      <Badge>45 чел.</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Оказание первой помощи</span>
                      <Badge>38 чел.</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Электробезопасность</span>
                      <Badge>28 чел.</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">
              <Icon name="Download" className="mr-2" size={16} />
              Скачать PDF
            </Button>
            <Button variant="outline">
              <Icon name="FileSpreadsheet" className="mr-2" size={16} />
              Экспорт в Excel
            </Button>
            <Button>Сформировать отчет</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalsContainer;
