import HomeClient from "./home/HomeClient";

export const metadata = {
  title: "ApniSec | Cybersecurity Solutions for Modern Businesses",
  description:
    "ApniSec helps organizations manage Cloud Security, Red Team Assessments, and VAPT issues through a secure and scalable platform.",
};

export default function HomePage() {
  return <HomeClient />;
}
