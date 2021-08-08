export type GraphQLQuery = {
  queryName: string;
  query: string;
  variables?: Record<string, unknown>;
};
