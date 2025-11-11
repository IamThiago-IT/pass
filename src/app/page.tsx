import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
];

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Sub Navigation */}
      <div className="border-b bg-background">
        <div className="px-8">
          <nav className="flex h-11 items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <PanelsTopLeft className="h-4 w-4" />
              <span className="h-4 w-px bg-border" />
              <span className="font-medium text-foreground">Transfer</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="px-8 py-6">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar..."
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" />
                Modo
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" />
                Status
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="outline" className="w-full sm:w-auto">
              Atualizar
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mb-6 px-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead className="min-w-[200px]">Título</TableHead>
                <TableHead className="min-w-[120px]">Modo</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Criado em</TableHead>
                <TableHead className="min-w-[140px]">Última Alteração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.id}</TableCell>
                  <TableCell className="font-medium">{transfer.title}</TableCell>
                  <TableCell>{transfer.mode}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
                      {transfer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transfer.createdAt}</TableCell>
                  <TableCell>{transfer.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">0 de 30 linha(s) selecionadas.</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground text-sm">5 / página</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <span className="text-muted-foreground text-sm">Página 1 de 6</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
