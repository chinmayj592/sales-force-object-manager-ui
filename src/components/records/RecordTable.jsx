import RecordRow from './RecordRow';
import Spinner from '../common/Spinner';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function EmptyState({ objectType }) {
  return (
    <div className="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
      </svg>
      <p>No {objectType} records found.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button className="btn btn--ghost btn--sm" onClick={onRetry}>Try again</button>
      )}
    </div>
  );
}

export default function RecordTable({
  records,
  columnFields,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  total,
  objectType,
  onLoadMore,
  onView,
  onEdit,
  onDelete,
}) {
  const sentinelRef = useIntersectionObserver(() => {
    if (hasMore && !isLoadingMore && !isLoading) onLoadMore();
  });

  if (isLoading) {
    return (
      <div className="table-loading">
        <Spinner size="lg" label={`Loading ${objectType} records…`} />
        <p>Loading records…</p>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onLoadMore} />;
  }

  if (!records.length) {
    return <EmptyState objectType={objectType} />;
  }

  return (
    <div className="record-table-wrapper">
      <div className="record-table-meta">
        <span className="record-count">
          Showing {records.length} of {total} records
        </span>
      </div>
      <div className="table-scroll">
        <table className="record-table">
          <thead>
            <tr>
              {columnFields.map((field) => (
                <th key={field.key} className="record-table__th">{field.label}</th>
              ))}
              <th className="record-table__th record-table__th--actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <RecordRow
                key={record.id}
                record={record}
                columnFields={columnFields}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />

      {isLoadingMore && (
        <div className="load-more-indicator">
          <Spinner size="sm" label="Loading more records…" />
          <span>Loading more…</span>
        </div>
      )}

      {!hasMore && records.length > 0 && (
        <p className="end-of-list">All {total} records loaded.</p>
      )}
    </div>
  );
}
