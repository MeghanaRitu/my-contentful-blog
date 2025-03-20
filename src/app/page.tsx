import { getBlogPosts } from "@/lib/contentfulGraphQL";
import BlogList from "@/components/BlogList";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: PageProps) {
  const locale = searchParams?.lang?.toString() || "en-US";
  const posts = await getBlogPosts(locale);

  if (!posts.length) return <p>No blog posts available.</p>;

  return <BlogList posts={posts} />;
}
