"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Bot,
  X,
  BusFront,
  ArrowRight
} from "lucide-react";

import { useRefresh } from "@/hooks/useRefresh";
import { useRowSelection } from "@/hooks/useRowSelection";
import { useTransferTable, type SortField } from "@/hooks/useTransferTable";

const transportModes = ["Compartilhado", "Privado", "Executivo"];
const slotTypes = ["Turno", "Período", "Evento"];
const tariffTypes = ["Faixa Etária", "Valor Fixo", "Por Passageiro"];
const tagItems = ["Região dos Lagos", "Rio x Rio"];
const optionItems = ["Confirmação Imediata", "Utilização somente no dia"];

export default function Home() {
  const {
    sortedTransfers,
    searchQuery,
    setSearchQuery,
    selectedModes,
    selectedStatuses,
    toggleModeFilter,
    toggleStatusFilter,
    modeOptions,
    statusOptions,
    sort,
    toggleSort,
    refreshData,
  } = useTransferTable();

  const transferIds = useMemo(
    () => sortedTransfers.map((transfer) => transfer.id),
    [sortedTransfers]
  );

  const { selectedRows, toggleSelectAll, toggleSelectRow } = useRowSelection(transferIds);
  const { isRefreshing, triggerRefresh } = useRefresh();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                <Bot className="h-5 w-5" />
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
                    {modeOptions.map(([mode, count]) => (
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
                    {statusOptions.map(([status, count]) => (
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
                onClick={() => {
                  triggerRefresh();
                  refreshData();
                }}
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
                <DialogContent className="p-0 rounded-xl overflow-hidden max-w-2xl w-full">
                  <div className="flex items-center gap-4 p-6 border-b border-border/40 bg-muted/10">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm">
                      <BusFront className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg leading-none font-semibold tracking-tight">Novo Transfer</h2>
                      <p className="text-muted-foreground text-sm">
                        Preencha os detalhes do serviço abaixo.
                      </p>
                    </div>
                  </div>

                  <form id="transfer-form" className="space-y-6 p-6" onSubmit={handleAddSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="transfer-title" className="text-sm font-medium">Título do Transfer</Label>
                      <Input
                        id="transfer-title"
                        placeholder="Ex.: Transfer Regular - Aeroporto x Hotel"
                        defaultValue="Transfer Privativo do Paulo"
                        className="h-10"
                        required
                      />
                    </div>

                    <div className="grid items-start gap-6 sm:grid-cols-2">
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="transport-type" className="text-sm font-medium">Tipo de Transporte</Label>
                        <Select defaultValue="Compartilhado">
                          <SelectTrigger id="transport-type" className="w-full h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {transportModes.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2 w-full">
                        <Label htmlFor="slot-type" className="text-sm font-medium">Tipo de Slot</Label>
                        <Select defaultValue="Turno">
                          <SelectTrigger id="slot-type" className="w-full h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {slotTypes.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2 w-full">
                        <Label htmlFor="tariff-type" className="text-sm font-medium">Tipo de Tarifário</Label>
                        <Select defaultValue="Faixa Etária">
                          <SelectTrigger id="tariff-type" className="w-full h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {tariffTypes.map((tariff) => (
                              <SelectItem key={tariff} value={tariff}>
                                {tariff}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-sm font-medium">Idade de Crianças (Anos)</Label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Min</span>
                            <Input
                              id="child-age-min"
                              type="number"
                              defaultValue={0}
                              min={0}
                              className="pl-9 h-10"
                            />
                          </div>
                          <span className="text-muted-foreground">-</span>
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Máx</span>
                            <Input
                              id="child-age-max"
                              type="number"
                              defaultValue={12}
                              min={0}
                              className="pl-9 h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="gap-2 flex flex-col">
                      <Label className="text-sm font-medium">Tags Regionais</Label>
                      <div className="min-h-[48px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                        <div className="flex flex-wrap gap-2">
                          {tagItems.map((tag) => (
                            <div key={tag} className="inline-flex items-center gap-1 rounded-md border bg-muted/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted">
                              {tag}
                              <button
                                type="button"
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </div>
                          ))}
                          <button type="button" className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                            <Plus className="h-3 w-3" /> Adicionar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="gap-2 flex flex-col">
                      <Label className="text-sm font-medium">Opções Adicionais</Label>
                      <div className="min-h-[48px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                        <div className="flex flex-wrap gap-2">
                          {optionItems.map((option) => (
                            <div key={option} className="inline-flex items-center gap-1 rounded-md border bg-muted/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted">
                              {option}
                              <button
                                type="button"
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </div>
                          ))}
                           <button type="button" className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                            <Plus className="h-3 w-3" /> Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end px-6 py-4 bg-muted/10 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="h-10"
                    >
                      Cancelar
                    </Button>
                    <Button
                      form="transfer-form"
                      type="submit"
                      className="gap-2 h-10 px-6"
                    >
                      Salvar Transfer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
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
