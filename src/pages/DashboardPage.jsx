import { useState, useCallback, useEffect } from 'react';
import ObjectDropdown from '../components/objectSelector/ObjectDropdown';
import RecordTable from '../components/records/RecordTable';
import RecordForm from '../components/records/RecordForm';
import ViewModal from '../components/records/ViewModal';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useObjectContext } from '../context/ObjectContext';
import { useRecords } from '../hooks/useRecords';
import { getRecordDisplayName } from '../utils/helpers';

export default function DashboardPage() {
  const { selectedObject, fields, columnFields } = useObjectContext();
  const { records, isLoading, isLoadingMore, error, hasMore, total, loadMore, addRecord, editRecord, removeRecord } = useRecords(selectedObject);

  const [viewRecord, setViewRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Close all modals when the user switches to a different object
  useEffect(() => {
    setViewRecord(null);
    setEditingRecord(null);
    setIsCreating(false);
    setDeleteTarget(null);
    setDeleteError(null);
  }, [selectedObject]);

  const handleCreate = useCallback(async (data) => {
    await addRecord(data);
  }, [addRecord]);

  const handleEdit = useCallback(async (data) => {
    await editRecord(editingRecord.id, data);
  }, [editRecord, editingRecord]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await removeRecord(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete record.');
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, removeRecord]);

  return (
    <div className="dashboard">
      <div className="dashboard__toolbar">
        <ObjectDropdown />
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          + New {selectedObject}
        </Button>
      </div>

      <RecordTable
        records={records}
        columnFields={columnFields}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={hasMore}
        total={total}
        objectType={selectedObject}
        onLoadMore={loadMore}
        onView={setViewRecord}
        onEdit={setEditingRecord}
        onDelete={setDeleteTarget}
      />

      <ViewModal
        isOpen={!!viewRecord}
        onClose={() => setViewRecord(null)}
        record={viewRecord}
        fields={fields}
        objectType={selectedObject}
        onEdit={(record) => setEditingRecord(record)}
      />

      <RecordForm
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSubmit={handleCreate}
        fields={fields}
        objectType={selectedObject}
        mode="create"
      />

      <RecordForm
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSubmit={handleEdit}
        fields={fields}
        initialData={editingRecord}
        objectType={selectedObject}
        mode="edit"
      />

      {/* Delete confirmation */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => { setDeleteTarget(null); setDeleteError(null); }}
        title="Confirm Delete"
        size="sm"
      >
        <p className="confirm-text">
          Are you sure you want to delete{' '}
          <strong>{deleteTarget ? getRecordDisplayName(deleteTarget, selectedObject) : ''}</strong>?
          This action cannot be undone.
        </p>
        {deleteError && <p className="form-error-banner" role="alert">{deleteError}</p>}
        <div className="form-actions">
          <Button variant="ghost" onClick={() => { setDeleteTarget(null); setDeleteError(null); }} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting…' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
