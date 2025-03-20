import { getBlogPosts } from "@/lib/contentfulGraphQL";
import BlogList from "@/components/BlogList";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const locale = searchParams?.lang?.toString() || "en-US";
  const posts = await getBlogPosts(locale);

  if (!posts.length) return <p>No blog posts available.</p>;

  return <BlogList posts={posts} />;
}


