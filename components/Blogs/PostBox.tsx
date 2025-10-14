import { Post } from "@/lib/gql-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";


interface PostBoxProps {
  data: Post;
}

const PostBox: React.FC<PostBoxProps> = ({ data }) => {
  const { title, slug, featuredImage, date, categories } = data;

  const featureImage = featuredImage?.node?.sourceUrl || "/images/placeholder.png";
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <article className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
      {/* Image */}
      <Link href={`/blog/${slug}`} className="block relative w-full aspect-[4/3]">
        <Image
          src={featureImage}
          alt={featuredImage?.node?.altText || title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Meta Info (Date + Categories) */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{formattedDate}</span>
          {categories?.edges?.length ? (
            <>
              <span className="text-gray-400">|</span>
              {categories.edges.map(({ node }) => (
                <Link
                  key={node.slug}
                  href={`/category/${node.slug}`}
                  className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition"
                >
                  {node.name}
                </Link>
              ))}
            </>
          ) : null}
        </div>

        {/* Title */}
        <Link
          href={`/blog/${slug}`}
          className="block text-lg md:text-xl font-semibold text-gray-900 mb-2 hover:text-secondary transition-colors leading-snug"
        >
          {title}
        </Link>

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-medium text-secondary hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default PostBox;
