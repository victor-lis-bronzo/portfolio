export type ActionState<T = any> = {
  success?: boolean;
  message?: string | null;
  errors?: Record<string, string[]>;
  data?: T;
};
