export interface FormState<T> {
  message?: string;
  success?: boolean;
  errors?: Partial<Record<T, string>>;
}
