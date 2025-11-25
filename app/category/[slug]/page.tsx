import Banner from "@/components/Banner";
import BlogGrid from "@/components/Blogs/BlogGrid";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import { getPostByCateSlug } from "@/lib/api/getHomeData";
import client from "@/lib/apollo-client";
import { CategoriesConnection } from "@/lib/gql-types";
import { Query_Post_Categories } from "@/lib/queries/getPosts";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ await the params before using it

  const posts = await getPostByCateSlug(slug);

   // 🏷️ Fetch categories
  const { data: catData } = await client.query<{
    categories: CategoriesConnection;
  }>({
    query: Query_Post_Categories,
    variables: { first: 10 },
  });

 const categories = catData?.categories;


  if (!posts.length) {
    return (
      <div className="p-10 text-center text-gray-600">
        No posts found in this category.
      </div>
    );
  }

  return (
    <main>
      <Banner
        title={`Category: ${slug.replace(/-/g, " ")}`}
        img="/images/blog.png"
        desc="Explore articles from this category."
      />
      <FeaturedIcons />
      
      <BlogGrid posts={posts} cat={categories} />
    </main>
  );
}
