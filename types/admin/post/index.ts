export type AdminPost = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  categoryId: string;
  likes: number;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};
