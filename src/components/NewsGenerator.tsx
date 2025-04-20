
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock, Globe, ThumbsUp, BookOpen } from "lucide-react";

// Типы для новостей
type NewsItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  readTime: number;
};

// Функция для детерминированной генерации псевдослучайного числа на основе входной строки
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Функция для получения случайного элемента из массива на основе seed
function getRandomItem<T>(array: T[], seed: string): T {
  const randomIndex = Math.abs(hashCode(`${seed}-${array.length}`)) % array.length;
  return array[randomIndex];
}

export const NewsGenerator = ({ date }: { date: string }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Имитация загрузки данных
    setTimeout(() => {
      const generatedNews = generateNews(date);
      setNews(generatedNews);
      setLoading(false);
    }, 800);
  }, [date]);

  // Генерирует фейковые новости на основе даты
  const generateNews = (dateString: string): NewsItem[] => {
    const titles = [
      "Учёные разработали новую технологию очистки воздуха",
      "Открыт новый вид животных в амазонских джунглях",
      "Прорыв в квантовых вычислениях позволит решать сложнейшие задачи за секунды",
      "Запущен международный проект по колонизации Марса",
      "Найдено лекарство от неизлечимой ранее болезни",
      "Глобальное потепление остановлено благодаря новой технологии",
      "Искусственный интеллект написал симфонию, покорившую критиков",
      "Построен первый полностью экологичный город",
      "Изобретен вечный источник энергии",
      "Дипломаты достигли исторического соглашения о всеобщем разоружении"
    ];

    const descriptions = [
      "Международная группа исследователей представила результаты многолетней работы, которые могут изменить будущее человечества.",
      "Эксперты называют это открытие революционным и предсказывают серьезные изменения в данной области уже в ближайшие годы.",
      "Впервые в истории удалось достичь таких впечатляющих результатов, что вызвало широкий резонанс в научном сообществе.",
      "После десятилетий исследований и неудачных попыток, наконец, появился реальный прогресс в решении этой проблемы.",
      "Событие уже назвали историческим. Эксперты со всего мира обсуждают последствия этого достижения.",
      "Никто не ожидал такого результата, но многочисленные тесты подтвердили эффективность нового подхода.",
      "Это может стать началом новой эры в развитии человечества, утверждают ведущие специалисты.",
      "Инновационный подход позволил решить проблему, которая казалась неразрешимой многие годы.",
      "Масштабный проект, в котором участвовали ученые из разных стран, наконец-то дал ощутимые результаты.",
      "Технология, которая еще вчера казалась фантастикой, сегодня становится реальностью."
    ];

    const categories = ["Наука", "Технологии", "Общество", "Политика", "Экология", "Медицина", "Космос", "Культура"];
    const sources = ["Мировые новости", "Научный вестник", "ТехноОбзор", "Планета сегодня", "Хроники будущего"];

    // Генерируем от 3 до 7 новостей в зависимости от даты
    const newsCount = 3 + Math.abs(hashCode(dateString)) % 5;
    const generatedNews: NewsItem[] = [];

    for (let i = 0; i < newsCount; i++) {
      const seed = `${dateString}-${i}`;
      
      generatedNews.push({
        id: i,
        title: getRandomItem(titles, `${seed}-title`),
        description: getRandomItem(descriptions, `${seed}-desc`),
        category: getRandomItem(categories, `${seed}-category`),
        source: getRandomItem(sources, `${seed}-source`),
        readTime: 2 + Math.abs(hashCode(`${seed}-time`)) % 8
      });
    }

    return generatedNews;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Новости на {date}</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/2" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-news-primary" />
          Новости на {date}
        </h2>
        <p className="text-sm text-muted-foreground">Найдено {news.length} новостей</p>
      </div>
      
      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id} className="mb-4 hover:shadow-md transition-shadow duration-200 border-l-4 border-l-news-primary">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl hover:text-news-primary transition-colors">{item.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="bg-news-accent text-news-secondary text-xs px-2 py-1 rounded-full mr-2">{item.category}</span>
                    <span className="text-xs text-muted-foreground">{item.source}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{item.description}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{item.readTime} мин. чтения</span>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-news-primary transition-colors">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Полезно</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-news-primary transition-colors">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Читать полностью</span>
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
