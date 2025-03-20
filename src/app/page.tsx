// HomePage is a SERVER COMPONENT (fetches data)
import { getBlogPosts } from "@/lib/contentfulGraphQL";
import BlogList from "@/components/BlogList"; // Import the new client component

export default async function HomePage({ searchParams }) {
  const locale = searchParams?.lang || "en-US";
  const posts = await getBlogPosts(locale);

  if (!posts.length) return <p>No blog posts available.</p>;

  return <BlogList posts={posts} />;
}
