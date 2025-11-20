import { useEffect, useMemo, useState } from "react";
import { getTransfers } from "@/app/actions/transfers";

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

export function useTransferTable() {
  const [sort, setSort] = useState<SortState>({ field: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  
  const [transfers, setTransfers] = useState<Transfer[]>([]);
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
    let isActive = true;

    const fetchTransfers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getTransfers();

        if (isActive) {
          setTransfers(data);
        }
      } catch (err) {
        if (!isActive) {
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
    };
  }, [refreshKey]);

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
