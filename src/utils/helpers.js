export function formatFieldValue(value, type) {
  if (value === null || value === undefined || value === '') return '—';
  if (type === 'number' && !isNaN(value)) {
    return Number(value).toLocaleString();
  }
  if (type === 'date') {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
  return String(value);
}

export function getRecordDisplayName(record, objectType) {
  if (!record) return '';
  if (record.Name) return record.Name;
  if (record.FirstName || record.LastName) {
    return [record.FirstName, record.LastName].filter(Boolean).join(' ');
  }
  if (record.Subject) return record.Subject;
  return record.id || 'Record';
}

export function buildEmptyRecord(fields) {
  return fields.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});
}

export function extractErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.';
  if (typeof error === 'string') return error;
  return error.message || 'An unexpected error occurred.';
}
