import { createContext, useContext, useState } from 'react';
import { OBJECTS, OBJECT_FIELDS, TABLE_COLUMNS } from '../utils/constants';

const ObjectContext = createContext(null);

export function ObjectProvider({ children }) {
  const [selectedObject, setSelectedObject] = useState(OBJECTS[0].value);

  const fields = OBJECT_FIELDS[selectedObject] || [];
  const columns = TABLE_COLUMNS[selectedObject] || [];
  const columnFields = fields.filter((f) => columns.includes(f.key));

  const value = {
    selectedObject,
    setSelectedObject,
    fields,
    columnFields,
    objectOptions: OBJECTS,
  };

  return <ObjectContext.Provider value={value}>{children}</ObjectContext.Provider>;
}

export function useObjectContext() {
  const ctx = useContext(ObjectContext);
  if (!ctx) throw new Error('useObjectContext must be used within ObjectProvider');
  return ctx;
}
