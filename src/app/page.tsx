// HomePage is a SERVER COMPONENT (fetches data)
import { getBlogPosts } from "@/lib/contentfulGraphQL";
import BlogList from "@/components/BlogList";
import { PageProps } from "next"; 

export default async function HomePage({ searchParams }: PageProps) {
  const locale = searchParams?.lang?.toString() || "en-US";
  const posts = await getBlogPosts(locale);

  if (!posts.length) return <p>No blog posts available.</p>;

  return <BlogList posts={posts} />;
}
