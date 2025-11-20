"use client";

import { useState, useEffect } from "react";
import { Search, Moon, Sun, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LanguageSwitcher from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-8 h-14">
        <div className="flex items-center gap-3 text-sm">
          <SidebarTrigger className="h-9 w-9 rounded-md border border-border/60" />
          <span className="h-5 w-px bg-border" />
          <span className="font-medium text-foreground">{t("title")}</span>
        </div>

        {/* Right section - Search, Controls, User */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-10 w-64 h-9 bg-muted/50"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              CTRL+K
            </kbd>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleTheme}
            aria-label={t("toggleTheme")}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <LanguageSwitcher />

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Grid3x3 className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8 bg-blue-600">
            <AvatarFallback className="bg-blue-600 text-white text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
