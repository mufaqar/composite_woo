import Banner from "@/components/Banner";
import BlogGrid from "@/components/Blogs/BlogGrid";
import FeaturedIcons from "@/components/HomePage/FeaturedIcons";
import { getPostByCateSlug } from "@/lib/api/getHomeData";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ await the params before using it

  const posts = await getPostByCateSlug(slug);

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
      <BlogGrid posts={posts} />
    </main>
  );
}
