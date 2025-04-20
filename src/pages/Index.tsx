
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsGenerator } from "@/components/NewsGenerator";
import { CalendarIcon } from "lucide-react";

const Index = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dateSubmitted, setDateSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-news-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">ХроноНовости</h1>
          <p className="text-sm">Новости из любого времени</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 max-w-4xl">
        <div className="mb-8 bg-news-accent p-6 rounded-lg shadow-sm animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Укажите дату для просмотра новостей
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
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
            
            <Button 
              type="submit" 
              className="w-full bg-news-primary hover:bg-news-secondary"
            >
              Показать новости
            </Button>
          </form>
        </div>
        
        {dateSubmitted && (
          <NewsGenerator date={dateSubmitted} />
        )}
      </main>
    </div>
  );
};

export default Index;
