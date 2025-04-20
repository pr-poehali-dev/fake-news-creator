
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsGenerator } from "@/components/NewsGenerator";
import { CalendarIcon, Clock, BookOpen, GalleryHorizontalEnd } from "lucide-react";

const Index = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dateSubmitted, setDateSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация ввода
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError("Пожалуйста, введите корректные числовые значения для всех полей");
      return;
    }
    
    if (yearNum < 1 || yearNum > 9999) {
      setError("Год должен быть от 1 до 9999");
      return;
    }
    
    if (monthNum < 1 || monthNum > 12) {
      setError("Месяц должен быть от 1 до 12");
      return;
    }
    
    if (dayNum < 1 || dayNum > 31) {
      setError("День должен быть от 1 до 31");
      return;
    }
    
    // Дополнительная проверка на корректность даты (количество дней в месяце)
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
      setError(`В месяце ${monthNum} только ${daysInMonth} дней`);
      return;
    }
    
    setError(null);
    setDateSubmitted(`${day}.${month}.${yearNum}`);
  };

  const handleRandomDate = () => {
    // Генерация случайной даты
    const randomDay = Math.floor(Math.random() * 28) + 1; // Берем до 28, чтобы избежать проблем с февралем
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomYear = Math.floor(Math.random() * 9999) + 1;
    
    setDay(randomDay.toString());
    setMonth(randomMonth.toString());
    setYear(randomYear.toString());
  };

  // Предлагаем несколько интересных дат
  const suggestedDates = [
    { day: "12", month: "10", year: "1492", description: "Открытие Америки" },
    { day: "4", month: "7", year: "1776", description: "Декларация независимости США" },
    { day: "14", month: "7", year: "1789", description: "Взятие Бастилии" },
    { day: "12", month: "4", year: "1961", description: "Первый полет человека в космос" },
    { day: "20", month: "7", year: "1969", description: "Первые люди на Луне" },
    { day: "9", month: "11", year: "1989", description: "Падение Берлинской стены" },
    { day: "1", month: "1", year: "2100", description: "Начало 22 века" },
    { day: "15", month: "8", year: "4573", description: "Далекое будущее" }
  ];

  const selectSuggestedDate = (day: string, month: string, year: string) => {
    setDay(day);
    setMonth(month);
    setYear(year);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-news-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">ХроноНовости</h1>
          <div className="flex items-center space-x-2">
            <p className="text-sm hidden md:block">Новости из любого времени</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-news-secondary"
              onClick={() => setShowHint(!showHint)}
            >
              <Clock className="h-4 w-4 mr-1" />
              <span>О проекте</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 max-w-4xl">
        {showHint && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-lg animate-fade-in">
            <h3 className="font-bold mb-2 flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              О проекте "ХроноНовости"
            </h3>
            <p className="mb-2">
              Добро пожаловать в "ХроноНовости" – уникальный генератор новостей из любого времени! 
              Введите любую дату от древности до далекого будущего, и наша система создаст новости,
              соответствующие технологическому уровню выбранной эпохи.
            </p>
            <p>
              В древних временах вы увидите новости о простых изобретениях и открытиях, 
              а в далеком будущем – о межзвездных путешествиях и невероятных технологиях.
              Каждая дата генерирует уникальный набор новостей!
            </p>
          </div>
        )}
        
        <div className="mb-8 bg-news-accent p-6 rounded-lg shadow-sm animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Укажите дату для просмотра новостей
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="day" className="block text-sm font-medium mb-1">
                  День (1-31)
                </label>
                <Input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="ДД"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="month" className="block text-sm font-medium mb-1">
                  Месяц (1-12)
                </label>
                <Input
                  id="month"
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="ММ"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-1">
                  Год (до 9999)
                </label>
                <Input
                  id="year"
                  type="number"
                  min="1"
                  max="9999"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="ГГГГ"
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="text-destructive text-sm py-2">{error}</div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="submit" 
                className="bg-news-primary hover:bg-news-secondary flex-1"
              >
                Показать новости
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={handleRandomDate}
                className="flex-1"
              >
                Случайная дата
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <GalleryHorizontalEnd className="mr-1 h-4 w-4" />
              Интересные даты:
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestedDate(date.day, date.month, date.year)}
                  className="text-xs px-2 py-1 bg-white rounded border border-gray-200 hover:bg-gray-50 hover:border-news-primary transition-colors flex flex-col items-center"
                  title={date.description}
                >
                  <span>{date.day}.{date.month}.{date.year}</span>
                  <span className="text-gray-500 text-[10px]">{date.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {dateSubmitted && (
          <NewsGenerator date={dateSubmitted} />
        )}
      </main>
      
      <footer className="mt-10 bg-gray-100 py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          <p>ХроноНовости © {new Date().getFullYear()} — Новости из любой точки времени</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
