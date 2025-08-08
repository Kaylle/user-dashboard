export interface KbdProps {
  as?: string
  size?: 'xs' | 'sm' | 'md'
}

export interface ColumnType {
  label: string,
  value: string,
  sortable?: boolean,
  isVisible?: boolean,
  type?: string
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