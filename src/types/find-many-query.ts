export type FindManyQuery<T> = T extends {
  findMany: (_: { select: infer K }) => any;
}
  ? K
  : never;
