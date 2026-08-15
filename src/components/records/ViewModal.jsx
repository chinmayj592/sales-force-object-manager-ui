import Modal from '../common/Modal';
import Button from '../common/Button';
import { formatFieldValue, getRecordDisplayName } from '../../utils/helpers';

export default function ViewModal({ isOpen, onClose, record, fields, objectType, onEdit }) {
  if (!record) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${objectType}: ${getRecordDisplayName(record, objectType)}`} size="lg">
      <dl className="record-detail">
        {fields.map((field) => (
          <div key={field.key} className="record-detail__row">
            <dt className="record-detail__label">{field.label}</dt>
            <dd className="record-detail__value">
              {formatFieldValue(record[field.key], field.type)}
            </dd>
          </div>
        ))}
      </dl>
      <div className="form-actions">
        <Button variant="ghost" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={() => { onClose(); onEdit(record); }}>Edit Record</Button>
      </div>
    </Modal>
  );
}
