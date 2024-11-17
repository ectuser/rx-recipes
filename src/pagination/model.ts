export const PAGINATION_LIMIT = 6;

export function getPaginationSkip(page: number, limit: number) {
  return page * limit;
}

export function getIsFirstPage(page: number) {
  return page === 0;
}

export function getIsLastPage(page: number, total: number, limit: number) {
  const totalPages = Math.ceil(total / limit) - 1;

  return page === totalPages;
}
