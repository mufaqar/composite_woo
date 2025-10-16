import RequestSample from "@/components/Blogs/RequestSample";
import Image from "next/image";
import React from "react";
//mport { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GET_POST_BY_SLUG } from "@/lib/queries/getPostBySlug";
import client from "@/lib/apollo-client";
import { Post } from "@/lib/gql-types";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: { slug: string };
  post : Post
}

export default async function SingleBlogPage({ params }: PostPageProps) {
 const { data } = await client.query<{ post: Post | null }>({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
  });
  const post = data?.post;
  if (!post) return notFound();

  // ✅ Safely access nested optional fields
  const upperContent = post.postInfo?.upperContent;
  const lowerContent = post.postInfo?.lowerContent;

  return (
    <main>
      <section className="py-16">
        <div className="max-w-[1144px] mx-auto md:px-0 px-4">
          <ul className="flex items-center justify-center gap-2 mb-8">
            <li className="text-sm font-normal text-description hover:text-secondary">
              July 2, 2020
            </li>
            <li>/</li>
            <li className="text-sm font-normal text-description hover:text-secondary">
              By: Henry A
            </li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-8">
              <Image
                src={post?.featuredImage?.node?.sourceUrl}
                alt={post?.featuredImage?.node?.altText || post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          )}
        </div>
      </section>
     {/* Upper Content */}
      {upperContent?.data && (
        <section className="max-w-[1144px] mx-auto mb-10 px-4">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: upperContent.data }}
          />
          {upperContent.dataImage?.node?.mediaItemUrl && (
            <div className="mt-6">
              <Image
                src={upperContent.dataImage.node.mediaItemUrl}
                alt="Upper content image"
                width={1200}
                height={600}
                className="rounded-xl"
              />
            </div>
          )}
        </section>
      )}

      {/* Lower Content */}
      {lowerContent?.data && (
        <section className="max-w-[1144px] mx-auto mb-10 px-4">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: lowerContent.data }}
          />
        </section>
      )}
        <RequestSample />

      <section className="container mx-auto px-4">
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </section>
      <section className="container mx-auto px-4">
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </section>

    
     
    </main>
    
  );
}
