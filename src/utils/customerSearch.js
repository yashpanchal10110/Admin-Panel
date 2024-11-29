export const searchCustomers = (searchIndex, searchTerm) => {
  if (!searchTerm) return searchIndex;

  const lowerCasedTerm = searchTerm.toLowerCase();
  return searchIndex.filter((customer) =>
    ['id', 'name', 'email', 'address', 'phone', 'bookingStatus'].some((key) =>
      customer[key]?.toString().toLowerCase().includes(lowerCasedTerm)
    )
  );
};
