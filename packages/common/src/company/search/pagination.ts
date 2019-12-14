interface SearchPagination {
  skip: number;
  limit: number;
}
export const searchPaginationDefault: SearchPagination = {
  skip: 0,
  limit: 5,
};
