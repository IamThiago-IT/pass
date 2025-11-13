"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
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
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ArrowUpDown,
  RefreshCcw,
  PanelsTopLeft,
} from "lucide-react";

type SortField = "id" | "title" | "mode" | "status" | "createdAt" | "lastUpdate";
type SortDirection = "asc" | "desc" | null;

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortState>({ field: null, direction: null });
  const [sortedTransfers, setSortedTransfers] = useState(transfers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let sorted = [...transfers];

    // Aplica filtro de busca
    if (searchQuery.trim()) {
      sorted = sorted.filter((transfer) => {
        const query = searchQuery.toLowerCase();
        return (
          transfer.title.toLowerCase().includes(query) ||
          transfer.mode.toLowerCase().includes(query) ||
          transfer.status.toLowerCase().includes(query) ||
          transfer.id.toString().includes(query)
        );
      });
    }

    // Aplica filtro de modo
    if (selectedModes.size > 0) {
      sorted = sorted.filter((transfer) => selectedModes.has(transfer.mode));
    }

    // Aplica filtro de status
    if (selectedStatuses.size > 0) {
      sorted = sorted.filter((transfer) => selectedStatuses.has(transfer.status));
    }

    // Aplica ordenação
    if (sort.field && sort.direction) {
      sorted.sort((a, b) => {
        const aValue = a[sort.field as keyof typeof a];
        const bValue = b[sort.field as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return sort.direction === "asc" ? comparison : -comparison;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    setSortedTransfers(sorted);
  }, [sort, searchQuery, selectedModes, selectedStatuses]);

  const toggleSort = (field: SortField) => {
    if (sort.field === field) {
      if (sort.direction === "asc") {
        setSort({ field, direction: "desc" });
      } else {
        setSort({ field: null, direction: null });
      }
    } else {
      setSort({ field, direction: "asc" });
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === sortedTransfers.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedTransfers.map((t) => t.id)));
    }
  };

  const toggleSelectRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-3.5 w-3.5" />;
    }
    return sort.direction === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  const getModeOptions = () => {
    const modes = new Map<string, number>();
    transfers.forEach((transfer) => {
      modes.set(transfer.mode, (modes.get(transfer.mode) || 0) + 1);
    });
    return Array.from(modes.entries());
  };

  const getStatusOptions = () => {
    const statuses = new Map<string, number>();
    transfers.forEach((transfer) => {
      statuses.set(transfer.status, (statuses.get(transfer.status) || 0) + 1);
    });
    return Array.from(statuses.entries());
  };

  const toggleModeFilter = (mode: string) => {
    const newModes = new Set(selectedModes);
    if (newModes.has(mode)) {
      newModes.delete(mode);
    } else {
      newModes.add(mode);
    }
    setSelectedModes(newModes);
  };

  const toggleStatusFilter = (status: string) => {
    const newStatuses = new Set(selectedStatuses);
    if (newStatuses.has(status)) {
      newStatuses.delete(status);
    } else {
      newStatuses.add(status);
    }
    setSelectedStatuses(newStatuses);
  };

  const handleRefresh = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    setIsRefreshing(true);

    refreshTimeoutRef.current = setTimeout(() => {
      setIsRefreshing(false);
      refreshTimeoutRef.current = null;
    }, 1200);
  };

  const handleAddSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDialogOpen(false);
  };

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
                size="icon-lg"
                className="rounded-lg border-border/60 bg-muted/30"
                aria-label="Alternar visualizações"
              >
                <PanelsTopLeft className="h-5 w-5" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="h-10 w-64 rounded-lg border border-border/60 bg-background/40 pl-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-lg border-border/60 bg-muted/30 text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    Modo
                    <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <div className="space-y-2 p-3">
                    {getModeOptions().map(([mode, count]) => (
                      <label key={mode} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedModes.has(mode)}
                          onChange={() => toggleModeFilter(mode)}
                          className="h-4 w-4 rounded border-border/60 bg-transparent accent-emerald-500"
                        />
                        <span className="text-sm flex-1">{mode}</span>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </label>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-lg border-border/60 bg-muted/30 text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    Status
                    <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <div className="space-y-2 p-3">
                    {getStatusOptions().map(([status, count]) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.has(status)}
                          onChange={() => toggleStatusFilter(status)}
                          className="h-4 w-4 rounded border-border/60 bg-transparent accent-emerald-500"
                        />
                        <span className="text-sm flex-1">{status}</span>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </label>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-border/60 bg-muted/30 text-sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCcw
                  className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                  aria-hidden="true"
                />
                {isRefreshing ? "Atualizando" : "Atualizar"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-lg border-border/60 bg-muted/30 text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Exportar
                    <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Exportar CSV</DropdownMenuItem>
                  <DropdownMenuItem>Exportar Excel</DropdownMenuItem>
                  <DropdownMenuItem>Exportar PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="rounded-lg px-4 text-sm">
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar transferência</DialogTitle>
                    <DialogDescription>
                      Preencha os dados básicos para cadastrar uma nova transferência.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleAddSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-title">Título</Label>
                      <Input
                        id="transfer-title"
                        placeholder="Ex.: Transfer Privativo do Paulo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-mode">Modo</Label>
                      <Input id="transfer-mode" placeholder="Compartilhado" />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                      checked={
                        sortedTransfers.length > 0 &&
                        selectedRows.size === sortedTransfers.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("id")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      ID
                      {getSortIcon("id")}
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("title")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Título
                      {getSortIcon("title")}
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("mode")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Modo
                      {getSortIcon("mode")}
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("status")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Status
                      {getSortIcon("status")}
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("createdAt")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Criado em
                      {getSortIcon("createdAt")}
                    </span>
                  </TableHead>
                  <TableHead className="text-muted-foreground cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("lastUpdate")}>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                      Última alteração
                      {getSortIcon("lastUpdate")}
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="border-border/60">
                    <TableCell className="w-10">
                      <input
                        type="checkbox"
                        aria-label={`Selecionar transferência ${transfer.id}`}
                        className="h-4 w-4 rounded border-border/60 bg-transparent accent-emerald-500"
                        checked={selectedRows.has(transfer.id)}
                        onChange={() => toggleSelectRow(transfer.id)}
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
              {selectedRows.size} de {sortedTransfers.length} linha(s) selecionadas.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-border/60 bg-muted/30 px-3 text-sm"
              >
                10 / página
                <ChevronDown className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-lg border-border/60 bg-muted/30 text-xs font-semibold"
                >
                  K
                </Button>
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-lg border-border/60 bg-muted/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-lg border-border/60 bg-muted/30"
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
