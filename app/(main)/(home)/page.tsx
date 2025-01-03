import Header from "@/components/page/main/home/header";
import CommunityFeatures from "@/components/page/main/home/community-features";
import CommunityUpdates from "@/components/page/main/home/community-updates";
import Testimonials from "@/components/page/main/home/testimonials";
import Cta from "@/components/page/main/home/cta";
import CommunityGuide from "@/components/page/main/home/community-guide";
export default function Home() {
  return (
    <main>
      <Header />
      <CommunityFeatures />
      <CommunityUpdates />
      <Testimonials />
      <Cta />
      <CommunityGuide />
    </main>
  );
}
