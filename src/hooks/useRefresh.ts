import { useEffect, useRef, useState } from "react";

export function useRefresh(delay = 1200) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerRefresh = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsRefreshing(true);
    timeoutRef.current = setTimeout(() => {
      setIsRefreshing(false);
      timeoutRef.current = null;
    }, delay);
  };

  return {
    isRefreshing,
    triggerRefresh,
  };
}
