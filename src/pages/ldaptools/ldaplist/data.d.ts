export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface CardListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

export interface DomainItemData {
  id: string;
  ip: string;
  alias: string;
  description: string;
  status: 'normal' | 'exception' | 'active' | 'success';
}
