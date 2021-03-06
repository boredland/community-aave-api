import { GraphQLClient } from "graphql-request";

const PAGE_SIZE = 1000;

type TimestampedPaginationProps = {
  query: string;
  variables: { [key: string]: any };
  first?: number;
  from?: number;
};

/**
 * returns all results for a given query, automatically iterating via timestamp
 * WARNING: this only works as long as we don't have more than 1000 datasets at any given timestamp as that's thegraph limit
 * @param graphClient
 * @param param1
 */
export async function timestampedPaginateAll<
  T extends { items: { [key: string]: any; lastUpdateTimestamp: number }[] }
>(
  graphClient: GraphQLClient,
  { query, variables, first = PAGE_SIZE, from = 0 }: TimestampedPaginationProps
): Promise<T["items"]> {
  let data: T;
  /**
   * We'll gracefully error here.
   * This allows us to write back the previously fetched results instead of throwing everything away.
   */
  try {
    data = await graphClient.request<T>(query, {
      ...variables,
      first,
      from,
    });
  } catch (e) {
    console.error("graph errored", e);
    return [];
  }
  if (data.items.length === PAGE_SIZE) {
    return [
      ...data.items,
      ...(await timestampedPaginateAll<T>(graphClient, {
        query,
        variables,
        first,
        from: data.items[data.items.length - 1].lastUpdateTimestamp,
      })),
    ];
  }
  return data.items;
}
