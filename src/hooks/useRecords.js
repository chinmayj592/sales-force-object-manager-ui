import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRecords, createRecord, updateRecord, deleteRecord } from '../services/recordService';
import { PAGE_SIZE } from '../utils/constants';
import { extractErrorMessage } from '../utils/helpers';

export function useRecords(objectType) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const pageRef = useRef(1);

  const loadInitial = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    pageRef.current = 1;

    try {
      const result = await fetchRecords(objectType, 1, PAGE_SIZE);
      setRecords(result.records);
      setHasMore(result.hasMore);
      setTotal(result.total);
      pageRef.current = 2;
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [objectType]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const result = await fetchRecords(
          objectType,
          pageRef.current,
          PAGE_SIZE
      );

      setRecords((prev) => [...prev, ...result.records]);
      setHasMore(result.hasMore);
      setTotal(result.total);
      pageRef.current += 1;
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoadingMore(false);
    }
  }, [objectType, isLoadingMore, hasMore]);

  useEffect(() => {
    setRecords([]);
    setHasMore(true);
    loadInitial();
  }, [objectType, loadInitial]);

  const addRecord = useCallback(
      async (data) => {
        const newRecord = await createRecord(objectType, data);
        setRecords((prev) => [newRecord, ...prev]);
        setTotal((t) => t + 1);
        return newRecord;
      },
      [objectType]
  );

  const editRecord = useCallback(
      async (id, data) => {
        const updated = await updateRecord(objectType, id, data);

        setRecords((prev) =>
            prev.map((r) => (r.Id === id ? updated : r))
        );

        return updated;
      },
      [objectType]
  );

  const removeRecord = useCallback(
      async (id) => {
        await deleteRecord(objectType, id);

        setRecords((prev) =>
            prev.filter((r) => r.Id !== id)
        );

        setTotal((t) => t - 1);
      },
      [objectType]
  );

  return {
    records,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    total,
    loadMore,
    addRecord,
    editRecord,
    removeRecord,
    refresh: loadInitial,
  };
}