import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RfqContext = createContext();
const RFQ_STORAGE_KEY = 'primecare_rfq_items_v1';
const MAX_COMPARE = 3;

const loadSavedItems = () => {
  try {
    const raw = window.localStorage.getItem(RFQ_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const RfqProvider = ({ children }) => {
  const [rfqItems, setRfqItems] = useState(loadSavedItems);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(rfqItems));
    } catch {
      // Ignore storage write errors
    }
  }, [rfqItems]);

  const value = useMemo(() => {
    const isInRfq = (id) => rfqItems.some((item) => item.id === id);

    const toggleRfq = (item) => {
      setRfqItems((prev) => {
        if (prev.some((x) => x.id === item.id)) {
          return prev.filter((x) => x.id !== item.id);
        }
        return [...prev, item];
      });
    };

    const addRfq = (item) => {
      setRfqItems((prev) => (prev.some((x) => x.id === item.id) ? prev : [...prev, item]));
    };

    const removeRfq = (id) => {
      setRfqItems((prev) => prev.filter((x) => x.id !== id));
    };

    const clearRfq = () => setRfqItems([]);

    const isCompared = (id) => compareIds.includes(id);

    const toggleCompare = (id) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((x) => x !== id);
        }
        if (prev.length >= MAX_COMPARE) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      });
    };

    const clearCompare = () => {
      setCompareIds([]);
      setCompareOpen(false);
    };

    return {
      rfqItems,
      isInRfq,
      toggleRfq,
      addRfq,
      removeRfq,
      clearRfq,
      compareIds,
      isCompared,
      toggleCompare,
      clearCompare,
      compareOpen,
      setCompareOpen,
      maxCompare: MAX_COMPARE,
    };
  }, [rfqItems, compareIds, compareOpen]);

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRfq = () => useContext(RfqContext);

