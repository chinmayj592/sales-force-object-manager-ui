export const PAGE_SIZE = 20;

export const OBJECTS = [
  { label: 'Account', value: 'Account' },
  { label: 'Opportunity', value: 'Opportunity' },
  { label: 'Lead', value: 'Lead' },
  { label: 'Contact', value: 'Contact' },
  { label: 'Case', value: 'Case' },
];

// Each field: { key, label, type }
// type: 'text' | 'email' | 'phone' | 'url' | 'number' | 'date' | 'select'
export const OBJECT_FIELDS = {
  Account: [
    { key: 'Name', label: 'Name', type: 'text', required: true },
    { key: 'Industry', label: 'Industry', type: 'select', options: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other'] },
    { key: 'Phone', label: 'Phone', type: 'phone' },
    { key: 'Website', label: 'Website', type: 'url' },
    { key: 'Type', label: 'Type', type: 'select', options: ['Prospect', 'Customer', 'Partner', 'Competitor', 'Other'] },
    { key: 'BillingCity', label: 'Billing City', type: 'text' },
    { key: 'NumberOfEmployees', label: 'Employees', type: 'number' },
  ],
  Opportunity: [
    { key: 'Name', label: 'Name', type: 'text', required: true },
    { key: 'Amount', label: 'Amount ($)', type: 'number' },
    { key: 'StageName', label: 'Stage', type: 'select', options: ['Prospecting', 'Qualification', 'Needs Analysis', 'Value Proposition', 'Proposal/Price Quote', 'Negotiation/Review', 'Closed Won', 'Closed Lost'] },
    { key: 'CloseDate', label: 'Close Date', type: 'date', required: true },
    { key: 'Probability', label: 'Probability (%)', type: 'number' },
    { key: 'Type', label: 'Type', type: 'select', options: ['New Business', 'Existing Business', 'Renewal'] },
  ],
  Lead: [
    { key: 'FirstName', label: 'First Name', type: 'text' },
    { key: 'LastName', label: 'Last Name', type: 'text', required: true },
    { key: 'Company', label: 'Company', type: 'text', required: true },
    { key: 'Email', label: 'Email', type: 'email' },
    { key: 'Phone', label: 'Phone', type: 'phone' },
    { key: 'Status', label: 'Status', type: 'select', options: ['Open - Not Contacted', 'Working - Contacted', 'Closed - Converted', 'Closed - Not Converted'] },
    { key: 'LeadSource', label: 'Lead Source', type: 'select', options: ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'] },
  ],
  Contact: [
    { key: 'FirstName', label: 'First Name', type: 'text' },
    { key: 'LastName', label: 'Last Name', type: 'text', required: true },
    { key: 'Email', label: 'Email', type: 'email' },
    { key: 'Phone', label: 'Phone', type: 'phone' },
    { key: 'Title', label: 'Title', type: 'text' },
    { key: 'Department', label: 'Department', type: 'text' },
  ],
  Case: [
    { key: 'CaseNumber', label: 'Case Number', type: 'text' },
    { key: 'Subject', label: 'Subject', type: 'text', required: true },
    { key: 'Status', label: 'Status', type: 'select', options: ['New', 'Working', 'Escalated', 'Closed'] },
    { key: 'Priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'] },

    { key: 'Origin', label: 'Origin', type: 'select', options: ['Phone', 'Email', 'Web'] },
    { key: 'Description', label: 'Description', type: 'text' },
  ],
};

// Which fields to show as table columns (subset of OBJECT_FIELDS)
export const TABLE_COLUMNS = {
  Account: ['Name', 'Industry', 'Phone', 'Website', 'Type'],
  Opportunity: ['Name', 'Amount', 'StageName', 'CloseDate', 'Type'],
  Lead: ['FirstName', 'LastName', 'Company', 'Email', 'Status'],
  Contact: ['FirstName', 'LastName', 'Email', 'Phone', 'Title'],
  Case: ['CaseNumber', 'Subject', 'Status', 'Priority', 'Origin'],
};
