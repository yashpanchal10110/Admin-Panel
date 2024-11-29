import Fuse from 'fuse.js';

export function createCustomerSearchIndex(customers) {
  return new Fuse(customers, {
    keys: [
      'id',
      'name',
      'email',
      'address',
      'serviceType',
      'phone'
    ],
    threshold: 0.3,
    ignoreLocation: true,
    shouldSort: true,
  });
}

export function searchCustomers(searchIndex, searchTerm) {
  if (!searchTerm) return searchIndex._docs;
  return searchIndex.search(searchTerm).map(result => result.item);
}