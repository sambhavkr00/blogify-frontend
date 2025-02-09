interface Category {
  _id?: string;
  name: string;
}

interface Author {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  author: Author;
  comments?: string[];
  categories?: Category[];
  tags?: string[];
  media?: string[];
  viewers?: string[];
  viewCount?: number;
  isPublished: boolean;
  publishedDate?: Date;
  modifiedAt?: Date;
}
