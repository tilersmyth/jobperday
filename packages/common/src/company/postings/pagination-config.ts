export interface PaginationConfig {
  skip: number;
  limit: number;
}

export const postingPaginationConfig: PaginationConfig = {
  skip: 0,
  limit: 10,
};
