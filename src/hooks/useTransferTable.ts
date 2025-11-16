import { useEffect, useMemo, useState } from "react";

export type Transfer = {
  id: number;
  title: string;
  mode: string;
  status: string;
  createdAt: string;
  lastUpdate: string;
};

export type SortField = "id" | "title" | "mode" | "status" | "createdAt" | "lastUpdate";
export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

const transfers: Transfer[] = [
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

export function useTransferTable() {
  const [sort, setSort] = useState<SortState>({ field: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());

  const toggleModeFilter = (mode: string) => {
    setSelectedModes((prev) => {
      const next = new Set(prev);
      if (next.has(mode)) {
        next.delete(mode);
      } else {
        next.add(mode);
      }
      return next;
    });
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const toggleSort = (field: SortField) => {
    setSort((current) => {
      if (current.field === field) {
        if (current.direction === "asc") {
          return { field, direction: "desc" };
        }
        return { field: null, direction: null };
      }
      return { field, direction: "asc" };
    });
  };

  const modeOptions = useMemo(() => {
    const options = new Map<string, number>();
    transfers.forEach((transfer) => {
      options.set(transfer.mode, (options.get(transfer.mode) || 0) + 1);
    });
    return Array.from(options.entries());
  }, []);

  const statusOptions = useMemo(() => {
    const options = new Map<string, number>();
    transfers.forEach((transfer) => {
      options.set(transfer.status, (options.get(transfer.status) || 0) + 1);
    });
    return Array.from(options.entries());
  }, []);

  const sortedTransfers = useMemo(() => {
    let items = [...transfers];

    if (searchQuery.trim()) {
      const normalized = searchQuery.toLowerCase();
      items = items.filter((transfer) => {
        return (
          transfer.title.toLowerCase().includes(normalized) ||
          transfer.mode.toLowerCase().includes(normalized) ||
          transfer.status.toLowerCase().includes(normalized) ||
          transfer.id.toString().includes(normalized)
        );
      });
    }

    if (selectedModes.size > 0) {
      items = items.filter((transfer) => selectedModes.has(transfer.mode));
    }

    if (selectedStatuses.size > 0) {
      items = items.filter((transfer) => selectedStatuses.has(transfer.status));
    }

    if (sort.field && sort.direction) {
      items.sort((a, b) => {
        const aValue = a[sort.field as keyof Transfer];
        const bValue = b[sort.field as keyof Transfer];

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

    return items;
  }, [searchQuery, selectedModes, selectedStatuses, sort]);

  return {
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
  };
}
