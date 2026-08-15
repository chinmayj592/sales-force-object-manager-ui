import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { buildEmptyRecord } from '../../utils/helpers';

export default function RecordForm({ isOpen, onClose, onSubmit, fields, initialData, objectType, mode }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || buildEmptyRecord(fields));
      setErrors({});
    }
  }, [isOpen, initialData, fields]);

  function validate() {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.key]?.toString().trim()) {
        newErrors[field.key] = `${field.label} is required.`;
      }
    });
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setErrors({ _form: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const title = mode === 'create' ? `New ${objectType}` : `Edit ${objectType}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} noValidate>
        {errors._form && (
          <div className="form-error-banner" role="alert">{errors._form}</div>
        )}
        <div className="form-grid">
          {fields.map((field) => (
            <div key={field.key} className="form-field">
              <label className="form-field__label" htmlFor={`field-${field.key}`}>
                {field.label}
                {field.required && <span className="form-field__required" aria-hidden="true"> *</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  id={`field-${field.key}`}
                  className={`form-field__input ${errors[field.key] ? 'form-field__input--error' : ''}`}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={`field-${field.key}`}
                  type={field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : field.type === 'email' ? 'email' : 'text'}
                  className={`form-field__input ${errors[field.key] ? 'form-field__input--error' : ''}`}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.label}
                  readOnly={field.key === 'CaseNumber'}
                />
              )}
              {errors[field.key] && (
                <span className="form-field__error" role="alert">{errors[field.key]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <><Spinner size="sm" /><span>Saving…</span></> : mode === 'create' ? 'Create Record' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
