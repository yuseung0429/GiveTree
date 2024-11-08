export interface FormState<T> {
  message?: string;
  errors?: Partial<Record<T, string>>;
}
