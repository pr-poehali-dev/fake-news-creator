import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export type ThemeOption = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

type ThemeSwitcherProps = {
  onThemeChange: (theme: ThemeOption) => void;
}

export const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
  const [currentTheme, setCurrentTheme] = useState<string>("Фиолетовый");

  const themes: ThemeOption[] = [
    {
      name: "Фиолетовый",
      primaryColor: "#9b87f5",
      secondaryColor: "#6E59A5"
    },
    {
      name: "Синий",
      primaryColor: "#0EA5E9",
      secondaryColor: "#0C4A6E"
    },
    {
      name: "Зеленый",
      primaryColor: "#10B981",
      secondaryColor: "#065F46"
    },
    {
      name: "Красный",
      primaryColor: "#EF4444",
      secondaryColor: "#991B1B"
    }
  ];

  const handleThemeChange = (theme: ThemeOption) => {
    setCurrentTheme(theme.name);
    onThemeChange(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Тема: {currentTheme}</span>
          <span className="inline md:hidden">Тема</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            className="gap-2 cursor-pointer"
          >
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: theme.primaryColor }}
            />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
