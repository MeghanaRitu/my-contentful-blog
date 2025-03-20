"use client"; // This makes it a client component

import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { PostType } from "@/types";

export default function BlogList({ posts }: { posts: PostType[] }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <h1>Contentful Blog Posts</h1>

      {/* Show the first blog post */}
      <BlogPost post={posts[0]} />

      {/* "View More Blogs" button */}
      {!showAll && posts.length > 1 && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            marginTop: "10px",
            padding: "8px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View More Blogs
        </button>
      )}

      {/* Show remaining blog posts when button is clicked */}
      {showAll &&
        posts.slice(1).map((post, index) => <BlogPost key={index} post={post} />)}
    </div>
  );
}

function BlogPost({ post }: { post: PostType }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
      <h2>{post.title}</h2>
      <div>{documentToReactComponents(post.richText.json)}</div>
      <p>
        <strong>Date & Time:</strong> {new Date(post.dateAndTime).toLocaleString()}
      </p>

      {post.imageCollection && post.imageCollection.items && post.imageCollection.items.length > 0 && (
      post.imageCollection.items.map((img, index) => (
      <Image 
            key={index} 
            src={`${img.url}?w=800&h=600&fit=fill&fm=webp`}
            alt={`Image ${index + 1}`}
            width={800}
            height={600}
            priority={index === 0}
            style={{ borderRadius: "8px" }}
      />
      ))
      )}

      <p>
        <strong>Author:</strong> {post.author}
      </p>
    </div>
  );
}
