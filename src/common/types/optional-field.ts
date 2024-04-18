export type OptionalField<T> = Required<{
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
}>;
