import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

// For crating new blog post
const post = async (params: IBlog): Promise<IBlog> => {
  const blog = await Blog.create(params);
  return blog;
};

// For getting all blog posts

const getAll = async (): Promise<IBlog[]> => {
  const blog = await Blog.find();
  return blog;
};

export const BlogService = { post, getAll };
