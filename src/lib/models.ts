import type { Theme } from "./themes.ts";

export interface KbdProps {
  as?: string;
  size?: 'xs' | 'sm' | 'md';
}

export interface ColumnType {
  label: string;
  value: string;
  sortable?: boolean;
  sortMode?: number;
  isVisible?: boolean;
  type?: string;
}

export interface UserType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  position: string;
  status: string;
}

export interface FilterType {
  name: string;
  values: FilterValueType[];
}

export interface FilterValueType {
  name: string;
  val: boolean;
  caption?: string;
  icon?: object;
}

export interface Config {
  theme?: Theme['name'];
  radius: number;
}

export type Color =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet';