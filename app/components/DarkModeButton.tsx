import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

export default function DarkModeButton({ setIsDark, isDark }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-6 text-radix-black hover:bg-radix-yellow-dark-8 hover:text-background dark:hover:bg-radix-yellow-4 dark:hover:text-radix-black rounded-full"
      onClick={() => {
        console.log('Toggle dark mode');
        setIsDark((darkMode) => !darkMode);
      }}
    >
      {isDark ? <Sun size="24" strokeWidth="1"></Sun> : <Moon size="24" strokeWidth="1"></Moon>}
    </Button>
  );
}
