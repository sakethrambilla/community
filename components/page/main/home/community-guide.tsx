import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const guide = [
  {
    title: "Step-by-Step: How to Get Involved and Contribute Effectively",
    description:
      "Join our community to collaborate, share resources, and enhance your skills.",
    image: "/images/placeholder.png",
    label: "Join the Community",
    link: "/",
  },
  {
    title: "Engage with Others: Connect, Collaborate, and Grow Together",
    description:
      "Participate in discussions and share your insights with fellow members.",
    image: "/images/placeholder.png",
    label: "Discuss with others",
    link: "/",
  },
  {
    title:
      "Access Resources: Tools and Guides to Enhance Your Development Journey",
    description:
      "Explore our library of resources to support your learning and projects.",
    image: "/images/placeholder.png",
    label: "Explore Resources",
    link: "/",
  },
];
export default function CommunityGuide() {
  return (
    <section className="w-full flex-col gap-24 h-full min-h-screen flex items-center justify-center px-8 lg:px-24">
      <div className="flex flex-col w-full items-start justify-start gap-4">
        <h4>Community Guide</h4>
        <h1 className="text-4xl md:text-6xl  font-semibold font-nippo">
          Unlock Your Potential: A Guide to Engaging with Our Community
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-12">
        {guide.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start gap-2 lg:gap-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={390}
              height={300}
              className="rounded-lg object-cover h-full w-full"
            />
            <h3 className="text-lg">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
            <Link href={item.link} className="w-full flex items-center  gap-2">
              {item.label}
              <ChevronRight />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
