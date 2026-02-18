import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-2.5 rounded-xl min-w-[44px] min-h-[44px]" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl hover:bg-secondary transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
            aria-label="Mavzuni o'zgartirish"
        >
            {theme === "dark" ? (
                <Sun size={20} className="text-muted-foreground hover:text-primary transition-colors" />
            ) : (
                <Moon size={20} className="text-muted-foreground hover:text-primary transition-colors" />
            )}
        </button>
    );
}
