import { Comment } from './blogpost.model';

interface CommentResponse {
  message: string;
  comment: Comment;
}

export { CommentResponse };
