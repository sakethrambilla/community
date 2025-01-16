export type AdminPost = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  categoryId: string;
  categoryName: string;
  likes: number;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  comments: number;
};
