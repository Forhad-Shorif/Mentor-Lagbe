import Features from "@/components/SheareHome/Features";
import OurSuccessStats from "@/components/SheareHome/OurSuccess";
import HeroBanner from "@/components/SheareHome/Banner";
import FeaturedTeachersMarquee from "@/components/SheareHome/FeaturedTeachersMarquee";
import { getFeaturedTeachers } from "@/lib/featuredTeachers";

export default async function Home() {
  // Server theke teacher list ana hoy — browser theke backend call jay na.
  const teachers = await getFeaturedTeachers(15);

  return (
    <div className="flex flex-1 flex-col">
      <HeroBanner />
      <OurSuccessStats />
      <Features />
      <FeaturedTeachersMarquee teachers={teachers} />
    </div>
  );
}
