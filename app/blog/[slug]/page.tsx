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
          // 🧩 DEFAULT fallback
          default:
            return null;
        }
      })}
      <section>
        <div className="max-w-[1130px] mx-auto md:px-0 px-4 py-16 border-b border-[#D2D2D2]">
          <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title font-DM_Sans mb-8">
            Practicality: Fading & Heat
          </h2>
          <p className="md:text-xl text-sm font-normal text-description mb-6">
            It is important to know that cladding colours behave differently depending on the type of board you choose.
          </p>
          <div className={`grid grid-cols-1 gap-6`}>
            <div className="line_box">
              <h4 className="">The "Fading" Reality (Uncapped vs Capped)</h4>
              <ul className="">
                <li>
                  <strong>Uncapped Boards: </strong>These contain exposed wood fibres. Just like a new pair of jeans, they will weather. Expect the colour to lighten by ~30% in the first 6 months as the wood stabilises in the sun. If you pick a bright Oak, expect it to mellow to a softer, lighter Oak.
                </li>
                <li>
                  <strong>Capped Boards:</strong> These are wrapped in a UV-resistant plastic shield. They will hold their colour almost perfectly for decades. If you want the colour to stay identical to the sample, choose Capped.
                </li>
              </ul>
            </div>
            <div className="line_box">
              <h4 className="">The Heat Factor</h4>
              <p>Dark colours (Black/Anthracite) absorb more heat than light colours (Oak/Light Grey).</p>
              <ul className="">
                <li>
                  <strong>Expansion:</strong> While you don't walk on cladding (so hot feet aren't an issue!), the heat causes the boards to expand more.
                </li>
                <li>
                  <strong>Pro Tip:</strong> If you choose a dark colour for a south-facing wall, it is even more critical to leave the correct expansion gaps (see our Installation Guide) to prevent buckling.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-[1130px] mx-auto md:px-0 px-4">
          <h2 className="md:text-6xl text-[33px] leading-none font-semibold text-title font-DM_Sans mb-8">
            3 Pro-Tips for Choosing
          </h2>

          <div>
            <div className="BG_box">
              <span>1</span>
              <div className="inner_item">
                <h4 className="">The "Brick Match" Test:</h4>
                <p>Don't just look at the sample in your kitchen. Take it outside and hold it up against your house bricks. Some bricks work better with warm browns; others look better with cool greys.</p>
              </div>
            </div>
            <div className="BG_box">
              <span>2</span>
              <div className="inner_item">
                <h4 className=""> The "Daylight" Test:</h4>
                <p>Colours change in the sun. Put the sample in the shade (where it will look darker) and in direct sunlight (where the grain texture will pop). Make sure you like it in both.</p>
              </div>
            </div>
            <div className="BG_box">
              <span>3</span>
              <div className="inner_item">
                <h4 className="">Contrast vs. Blend:</h4>
                <p>Decide on your goal. Do you want the cladding to stand out (Contrast: e.g., Oak cladding on a white render house) or blend in (Blend: e.g., Anthracite cladding next to Anthracite doors)?</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* post excerpt */}
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
