import RequestSample from "@/components/Blogs/RequestSample";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GET_POST_BY_SLUG } from "@/lib/queries/getPostBySlug";
import client from "@/lib/apollo-client";
import { Post } from "@/lib/gql-types";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PostPageProps {
  params: { slug: string };
  post: Post
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
        <div className="max-w-[1130px] mx-auto md:px-0 px-4">
          <ul className="flex items-center justify-center gap-2 mb-8">
            <li className="text-sm font-normal text-description hover:text-secondary">
              July 2, 2020
            </li>
            <li>/</li>
            <li className="text-sm font-normal text-description hover:text-secondary">
              By: Henry A
            </li>
          </ul>
          <h1 className="md:text-6xl text-[33px] leading-none font-semibold text-title text-center font-DM_Sans mb-8">{post.title}</h1>

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
      {/* post excerpt */}
      <section className="pb-16">
        <div className="max-w-[1130px] mx-auto md:px-0 px-4 border-t border-[#D2D2D2]">
          <div
            className="md:text-xl text-sm font-normal text-description mt-9 "
            dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
          />
        </div>
      </section>
      {/* Upper Content */}
      {upperContent?.data && (
        <section className="py-16">
          <div className="max-w-[1130px] mx-auto md:px-0 px-4 flex md:flex-row flex-col gap-6">
            <div className="post_content md:w-3/5 w-full"
              dangerouslySetInnerHTML={{ __html: upperContent.data }}
            />
            {upperContent.dataImage?.node?.mediaItemUrl && (
              <div className="md:w-2/5 w-full">
                <Image
                  src={upperContent.dataImage.node.mediaItemUrl}
                  alt="Upper content image"
                  width={493}
                  height={626}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lower Content */}
      {lowerContent?.data && (
        <section className="py-16">
          <div className="max-w-[1130px] mx-auto md:px-0 px-4">
            <div
              className="post_content"
              dangerouslySetInnerHTML={{ __html: lowerContent.data }}
            />
          </div>
        </section>
      )}
      <RequestSample />
      {/* post Content */}
      {post.content && (
        <section className="py-16">
          <div className="max-w-[1130px] mx-auto md:px-0 px-4">
            <div
              className="post_content"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </section>
      )}
      <section className="py-16">
        <div className="max-w-[1130px] mx-auto md:px-0 px-4 flex md:flex-row flex-col gap-8 justify-between">
          <ul className="flex items-center justify-start gap-2">
            <li className="">
              <Link href="#" className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300">
                <FaTwitter />
              </Link>
            </li>
            <li className="">
              <Link href="#" className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300">
                <FaLinkedinIn />
              </Link>
            </li>
            <li className="">
              <Link href="#" className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300">
                <FaInstagram />
              </Link>
            </li>
          </ul>
          <ul className="flex items-center justify-end gap-2">
            <li className="text-sm font-normal text-description hover:text-secondary">
              July 2, 2020
            </li>
            <li>/</li>
            <li className="text-sm font-normal text-description hover:text-secondary">
              By: Henry A
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
