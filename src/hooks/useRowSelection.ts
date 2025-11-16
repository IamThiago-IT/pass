import { useEffect, useState } from "react";

export function useRowSelection(allIds: number[]) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSelectedRows((prev) => {
      const next = new Set<number>();
      allIds.forEach((id) => {
        if (prev.has(id)) {
          next.add(id);
        }
      });
      return next;
    });
  }, [allIds]);

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedRows((prev) => {
      if (prev.size === allIds.length && allIds.length > 0) {
        return new Set();
      }
      return new Set(allIds);
    });
  };

  const selectedCount = selectedRows.size;

  return {
    selectedRows,
    toggleSelectRow,
    toggleSelectAll,
    selectedCount,
  };
}
