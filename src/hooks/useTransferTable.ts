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

const transferFixtures: Transfer[] = [
  {
    id: 17,
    title: "Transfer Privativo do Paulo",
    mode: "Compartilhado",
    status: "Liberado",
    createdAt: "08/11/2025",
    lastUpdate: "08/11/2025",
  },
  {
    id: 21,
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
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const [transfers, setTransfers] = useState<Transfer[]>(transferFixtures);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

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
  }, [transfers]);

  const statusOptions = useMemo(() => {
    const options = new Map<string, number>();
    transfers.forEach((transfer) => {
      options.set(transfer.status, (options.get(transfer.status) || 0) + 1);
    });
    return Array.from(options.entries());
  }, [transfers]);

  const sortedTransfers = useMemo(() => {
    let items = [...transfers];

    if (searchQuery.trim()) {
      const normalized = searchQuery.toLowerCase();
      items = items.filter((transfer) =>
        transfer.title.toLowerCase().includes(normalized) ||
        transfer.mode.toLowerCase().includes(normalized) ||
        transfer.status.toLowerCase().includes(normalized)
      );
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
  }, [transfers, searchQuery, selectedModes, selectedStatuses, sort]);

  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchTransfers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBaseUrl}/transfers`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Falha ao carregar transferências: ${response.statusText}`);
        }

        const data: Transfer[] = await response.json();

        if (isActive) {
          setTransfers(data);
        }
      } catch (err) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        const message = err instanceof Error
          ? err.message
          : "Erro desconhecido ao carregar transferências.";
        setError(message);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchTransfers();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [apiBaseUrl, refreshKey]);

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
    isLoading,
    error,
    refreshData,
  };
}
