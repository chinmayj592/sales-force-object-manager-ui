import { useObjectContext } from '../../context/ObjectContext';
import Dropdown from '../common/Dropdown';

export default function ObjectDropdown() {
  const { selectedObject, setSelectedObject, objectOptions } = useObjectContext();

  return (
    <Dropdown
      id="object-selector"
      label="Salesforce Object"
      value={selectedObject}
      onChange={setSelectedObject}
      options={objectOptions}
    />
  );
}
