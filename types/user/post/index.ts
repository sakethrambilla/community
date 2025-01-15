export type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  pinned: boolean;
  comments: number;
  createdAt: string;
  category: string;
  categoryId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    profession: string;
    linkedin?: string;
  };
};
