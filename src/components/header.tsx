import { Search, Moon, Grid3x3, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left section intentionally left empty to match design */}
        <div className="flex items-center gap-6" />

        {/* Right section - Search, Controls, User */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar..."
              className="pl-10 w-64 h-9 bg-muted/50"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              CTRL+K
            </kbd>
          </div>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Moon className="h-4 w-4" />
          </Button>

          <Button variant="ghost" className="h-9 px-3 gap-1 text-sm">
            <Globe className="h-4 w-4" />
            Português
            <ChevronDown className="h-4 w-4" />
          </Button>

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
