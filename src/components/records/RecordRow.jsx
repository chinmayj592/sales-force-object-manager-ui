import { formatFieldValue } from '../../utils/helpers';
import Button from '../common/Button';

export default function RecordRow({ record, columnFields, onView, onEdit, onDelete }) {
  return (
    <tr className="record-row">
      {columnFields.map((field) => (
        <td key={field.key} className="record-row__cell">
          {formatFieldValue(record[field.key], field.type)}
        </td>
      ))}
      <td className="record-row__actions">
        <Button variant="ghost" size="sm" onClick={() => onView(record)}>View</Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>Edit</Button>
        <Button variant="danger-ghost" size="sm" onClick={() => onDelete(record)}>Delete</Button>
      </td>
    </tr>
  );
}
