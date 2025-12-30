import Banner from "@/components/Banner";
import ProjectGallery from "@/components/HomePage/ProjectGallery";
import { getHomeData, getInspirtionData } from "@/lib/api/getHomeData";

export default async function ProjectGalleryPage() {
  const [inpirtations, homeInfo] = await Promise.all([
    getInspirtionData(),
    getHomeData(),
  ]);

  return (
    <main>
      <Banner title="Project Gallery" img="/images/about-banner.png" desc="" />
      <ProjectGallery data={homeInfo?.dreamOutdoor} post={inpirtations} />
    </main>
  );
}
