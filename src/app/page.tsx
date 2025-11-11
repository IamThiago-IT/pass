import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpDown,
  RefreshCcw,
  PanelsTopLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Transfer",
};

const transfers = [
  {
    id: 17,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 20,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 22,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 23,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 24,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 25,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 26,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 33,
    title: "Transfer Privativo do Paulo",
    mode: "Privativo",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 67,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "09/11/2025",
    lastUpdate: "09/11/2025",
  },
  {
    id: 68,
    title: "Transfer Privativo do Jose",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "09/11/2025",
    lastUpdate: "09/11/2025",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <div className="px-8 py-6">
        <div className="rounded-2xl border border-border/60 bg-muted/20 shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-border/60 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg border-border/60 bg-muted/30"
              >
                <PanelsTopLeft className="h-5 w-5" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="h-10 w-64 rounded-lg border border-border/60 bg-background/40 pl-10 text-sm"
                />
                <kbd className="pointer-events-none absolute right-3 top-1/2 inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border border-border/60 bg-muted/40 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">CTRL+K</kbd>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-border/60 bg-muted/30 px-4 text-sm"
              >
                <Filter className="h-4 w-4" />
                Modo
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-border/60 bg-muted/30 px-4 text-sm"
              >
                <Filter className="h-4 w-4" />
                Status
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-border/60 bg-muted/30 px-4 text-sm"
              >
                <RefreshCcw className="h-4 w-4" />
                Atualizar
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-border/60 bg-muted/30 px-4 text-sm"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg border-border/60 bg-muted/30"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button className="flex items-center gap-2 rounded-lg px-4 text-sm">
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="px-2 pb-2">
            <Table className="min-w-full">
              <TableHeader className="bg-transparent">
                <TableRow className="border-border/60">
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      aria-label="Selecionar todas as linhas"
                      className="h-4 w-4 rounded border-border/60 bg-transparent accent-emerald-500"
                    />
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      ID
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Título
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Modo
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Status
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Criado em
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Última alteração
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id} className="border-border/60">
                    <TableCell className="w-10">
                      <input
                        type="checkbox"
                        aria-label={`Selecionar transferência ${transfer.id}`}
                        className="h-4 w-4 rounded border-border/60 bg-transparent accent-emerald-500"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-sm text-foreground/90">
                      {transfer.id}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-foreground">
                      {transfer.title}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transfer.mode}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm text-foreground">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                        {transfer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transfer.createdAt}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transfer.lastUpdate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-border/60 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              0 de {transfers.length} linha(s) selecionadas.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-border/60 bg-muted/30 px-3 text-sm"
              >
                10 / página
                <ChevronDown className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-border/60 bg-muted/30 text-xs font-semibold"
                >
                  K
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-border/60 bg-muted/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-border/60 bg-muted/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <span className="text-sm text-muted-foreground">Página 1 de 4</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
