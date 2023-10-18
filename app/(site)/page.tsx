import AvailableServices from "@/components/AvailableServices";
import LatestNews from "@/components/LatestNews";
import UpcomingServices from "@/components/UpcomingServices";
import Events from "@/components/events/Events";
import ClientReview from "@/components/reviews/ClientReview";
import Survey from "@/components/survey/Survey";
import OurTeam from "@/components/team/OurTeam";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <AvailableServices />
      <UpcomingServices />
      <Events />
      <Survey />
      <ClientReview />
      <LatestNews />
      <OurTeam />
    </div>
  );
}
