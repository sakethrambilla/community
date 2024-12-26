import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const updates = [
  {
    subtitle: "Courses",
    title: "Mastering JavaScript: A Comprehensive Guide ",
    description:
      "Explore advanced techniques and best practices in JavaScript programming. ",
    link: "/image",
    image: "/images/placeholder.png",
  },
  {
    subtitle: "Tutorials",
    title: "Blog title heading will go here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. ",
    link: "/image",
    image: "/images/placeholder.png",
  },
  {
    subtitle: "Articles",
    title: "The Future of Software Development ",
    description:
      "Insights into emerging trends and technologies shaping the industry.",
    link: "/image",
    image: "/images/placeholder.png",
  },
  {
    subtitle: "Projects",
    title: "Blog title heading will go here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. ",
    link: "/image",
    image: "/images/placeholder.png",
  },
];

export default function CommunityUpdates() {
  return (
    <section className="w-full min-h-screen h-full py-40 items-start flex gap-12 flex-col justify-center  px-8 lg:px-24">
      <div className="flex flex-col w-full items-start justify-start gap-4">
        <h4>Stay Informed,Stay Ahead</h4>
        <h1 className=" text-4xl md:text-6xl  font-semibold font-nippo">
          Latest Community Updates
        </h1>
        <p className="lg:w-2/3">
          Stay up-to-date with the latest courses, projects, tutorials,
          articles, and community activities, all in one place!
        </p>
        <div className="w-full flex items-end justify-end">
          <Button>View All</Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full overflow-hidden">
        {updates.map((update, index) => (
          <div
            key={index}
            className="flex flex-col h-fit items-start justify-start gap-4"
          >
            <Image
              src={update.image}
              alt={update.title}
              width={390}
              height={300}
              className="rounded-lg object-cover h-full w-full"
            />
            <div className="flex flex-col items-start justify-start gap-2">
              <h4 className="text-sm">{update.subtitle}</h4>
              <h3 className="text-lg">{update.title}</h3>
              <p>{update.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
