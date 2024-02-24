import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

export default function DarkModeButton({ setIsDark, isDark }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-theme-gray-900 absolute top-2 right-2 hover:bg-theme-yellow-600 dark:hover:bg-theme-yellow-400 hover:text-theme-yellow-200 dark:hover:text-theme-yellow-900 rounded-full"
      onClick={() => {
        console.log('Toggle dark mode');
        setIsDark((darkMode) => !darkMode);
      }}
    >
      {isDark ? <Sun size="24" strokeWidth="1"></Sun> : <Moon size="24" strokeWidth="1"></Moon>}
    </Button>
  );
}
