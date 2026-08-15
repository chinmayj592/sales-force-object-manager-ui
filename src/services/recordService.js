import { api } from './api';
import { PAGE_SIZE } from '../utils/constants';

// Maps Salesforce object API names to backend route segments
const ROUTE_MAP = {
  Account: 'accounts',
  Opportunity: 'opportunities',
  Lead: 'leads',
  Contact: 'contacts',
  Case: 'cases',
};

function getRoute(objectType) {
  const route = ROUTE_MAP[objectType];
  if (!route) throw new Error(`Unsupported object type: ${objectType}`);
  return route;
}

export async function fetchRecords(objectType, page = 1, pageSize = PAGE_SIZE) {
  // Backend uses 0-based page index
  return api.get(`/api/${getRoute(objectType)}?page=${page - 1}&size=${pageSize}`);
}

export async function createRecord(objectType, data) {
  return api.post(`/api/${getRoute(objectType)}`, data);
}

export async function updateRecord(objectType, id, data) {
  return api.put(`/api/${getRoute(objectType)}/${id}`, data);
}

export async function deleteRecord(objectType, id) {
  return api.delete(`/api/${getRoute(objectType)}/${id}`);
}

export async function fetchRecordById(objectType, id) {
  return api.get(`/api/${getRoute(objectType)}/${id}`);
}
