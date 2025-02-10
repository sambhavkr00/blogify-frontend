export interface Category {
  _id?: string;
  name: string;
}

export interface Tag {
  _id?: string;
  name: string;
}

export interface Author {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export interface Comment {
  _id?: string;
  user: Author;
  post: BlogPost;
  isApproved?: boolean;
  content: string;
  isHidden?: boolean;
  createdAt?: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  author: Author;
  comments?: Comment[];
  categories?: Category[];
  tags?: Tag[];
  media?: string[];
  viewers?: string[];
  viewCount?: number;
  isPublished: boolean;
  publishedDate?: Date;
  modifiedAt?: Date;
}
