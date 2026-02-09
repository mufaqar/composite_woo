import RequestSample from "@/components/Blogs/RequestSample";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GET_POST_BY_SLUG } from "@/lib/queries/getPostBySlug";
import client from "@/lib/apollo-client";
import { Post } from "@/lib/gql-types";
import { notFound } from "next/navigation";
import Link from "next/link";
import formatDate from "@/lib/extra";
import { IoIosClose } from "react-icons/io";

interface PostPageProps {
  params: { slug: string };
  post: Post;
}

export default async function SingleBlogPage({ params }: PostPageProps) {
  const { data } = await client.query<{ post: Post | null }>({
    query: GET_POST_BY_SLUG,
    variables: { slug: params.slug },
  });
  const post = data?.post;
  if (!post) return notFound();

  const contentBlocks = post?.postInfo?.postContent ?? [];
  // console.log("Content contentBlocks:", contentBlocks);

  return (
    <main className="">
      <section className="py-16">
        <div className="max-w-[1130px] mx-auto md:px-0 px-4">
          <ul className="flex items-center justify-center gap-2 mb-8">
            <li className="text-sm font-normal text-description hover:text-secondary">
              {formatDate(post.date)}
            </li>
            <li>/</li>
            <li className="text-sm font-normal text-description hover:text-secondary">
              By: {post.author?.node?.name}
            </li>
          </ul>
          <h1 className="md:text-6xl text-[33px] leading-none font-semibold text-title text-center font-DM_Sans mb-8">
            {post.title}
          </h1>

          {post.featuredImage?.node?.mediaItemUrl && (
            <div className="">
              <Image
                src={post?.featuredImage?.node?.mediaItemUrl || ""}
                alt={post?.featuredImage?.node?.altText || post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          )}
        </div>
      </section>
      {contentBlocks.map((block, i) => {
        switch (block.__typename) {
          case "PostInfoPostContentFullContentLayout":
            return (
              <section className="pb-16" key={i}>
                <div className="max-w-[1130px] mx-auto md:px-0 px-4 border-b border-[#D2D2D2] post_content pb-5">
                  <div
                    className="md:text-xl text-sm font-normal text-description"
                    dangerouslySetInnerHTML={{
                      __html: block.fullContent || "",
                    }}
                  />
                </div>
              </section>
            );

          // 🧩 CASE 2: Get A Sample From Us Layout
          case "PostInfoPostContentGetASampleFromUsLayout":
            return (
              <RequestSample
                key={i}
                title={block.title ?? undefined}
                subtitle={block.subTitle ?? undefined}
                description={block.description ?? undefined}
              />
            );

          // 🧩 CASE 3: Content With Image Layout
          case "PostInfoPostContentContentWithImageLayout":
            return (
              <section className="py-16" key={i}>
                <div
                  className={`max-w-[1130px]  mx-auto md:px-0 px-4 ${block?.imagePosition === "Right"
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                    } flex flex-col gap-6`}
                >
                  <div
                    className="post_content md:w-3/5 w-full"
                    dangerouslySetInnerHTML={{ __html: block.content || "" }}
                  />

                  <div className="md:w-2/5 w-full post_content">
                    {block?.blockImage?.node?.mediaItemUrl && (
                      <Image
                        src={block.blockImage.node.mediaItemUrl}
                        alt={block.blockImage.node.altText || "Content image"}
                        width={493}
                        height={626}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </section>
            );
          // 🧩 CASE 4: Full Image
          case "PostInfoPostContentFullWidthImageLayout":
            return (
              <section className="py-16" key={i}>
                <div className="w-full">
                  {block?.fullImage?.node?.mediaItemUrl && (
                    <Image
                      src={block.fullImage.node.mediaItemUrl}
                      alt={block.fullImage.node.altText || "Content image"}
                      width={1024}
                      height={626}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </section>
            );
          case "PostInfoPostContentLineBoxLayout":
            return (
              <section key={i}>
                <div className="max-w-[1130px] mx-auto md:px-0 px-4">
                  {/* <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title font-DM_Sans mb-8">
                    Practicality: Fading & Heat
                  </h2>
                  <p className="md:text-xl text-sm font-normal text-description mb-6">
                    It is important to know that cladding colours behave differently
                    depending on the type of board you choose.
                  </p> */}
                  <div className={`grid grid-cols-1 gap-6 mb-6`}>
                    {block?.lineboxContent && (
                      <div className="line_box" dangerouslySetInnerHTML={{
                        __html: block.lineboxContent || "",
                      }}
                      />
                    )}

                  </div>
                </div>
              </section>
            );
          case "PostInfoPostContentBgBoxLayout":
            if (!block?.box?.length) return null;
            const layout = block.box[0]?.layout;
            return (
              <section key={i} className="py-16">
                <div className="max-w-[1130px] mx-auto md:px-0 px-4 space-y-6">
                  <div className="md:text-6xl text-[33px] leading-none font-semibold text-title font-DM_Sans mb-8"
                    dangerouslySetInnerHTML={{ __html: block.title }} />
                  <div className={`${layout === "Half" ? "md:grid-cols-2" : "grid-cols-1"} grid gap-6`}>
                    {block.box.map((item: any, i: number) => {
                      const type = Array.isArray(item.type) ? item.type[0] : item.type;
                      return (
                        <div key={i} className="BG_box">
                          {type === "Number" && <span>{i + 1}</span>}
                          {type === "Warning" && <span>⚠️</span>}
                          {type === "Mistake" && <span><IoIosClose /></span>}
                          <div
                            className="inner_item"
                            dangerouslySetInnerHTML={{
                              __html: item.content || "",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );

          // 🧩 DEFAULT fallback
          default:
            return null;
        }
      })}

      <section className="py-16">
        <div className="max-w-[1130px] mx-auto md:px-0 px-4 flex md:flex-row flex-col gap-8 justify-between">
          <ul className="flex items-center justify-start gap-2">
            <li className="">
              <Link
                href="#"
                className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300"
              >
                <FaTwitter />
              </Link>
            </li>
            <li className="">
              <Link
                href="#"
                className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300"
              >
                <FaLinkedinIn />
              </Link>
            </li>
            <li className="">
              <Link
                href="#"
                className="text-xl font-normal text-description hover:text-secondary w-[47px] h-[47px] rounded-full hover:bg-background flex items-center justify-center transition-all ease-in-out duration-300"
              >
                <FaInstagram />
              </Link>
            </li>
          </ul>
          <ul className="flex items-center justify-end gap-2">
            <li className="text-sm font-normal text-description hover:text-secondary">
              {formatDate(post.date)}
            </li>
            <li>/</li>
            <li className="text-sm font-normal text-description hover:text-secondary">
              By: {post.author?.node?.name}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
