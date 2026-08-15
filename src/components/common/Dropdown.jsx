export default function Dropdown({ id, label, value, onChange, options, placeholder, disabled }) {
  return (
    <div className="dropdown">
      {label && <label className="dropdown__label" htmlFor={id}>{label}</label>}
      <select
        id={id}
        className="dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={label || placeholder}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
