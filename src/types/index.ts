// Common utility types
export type Optional<T> = T | null | undefined;
export type NonEmptyArray<T> = [T, ...T[]];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// UI component prop types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
export type Theme = 'light' | 'dark';

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// Layout types
export type BreakPoint = 'mobile' | 'tablet' | 'desktop';
export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;

// Data fetching types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export interface ApiResponse<T> {
  data: T;
  status: LoadingState;
  error?: string;
}

// Form types
export type FormFieldType = 'text' | 'email' | 'password' | 'textarea' | 'select';
export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
}