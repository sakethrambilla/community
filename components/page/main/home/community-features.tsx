import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CommunityFeatures() {
  return (
    <div className="min-h-screen w-full items-center justify-start flex flex-col gap-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <h3>Features</h3>
        <h1 className="text-6xl text-center font-semibold w-2/3 font-nippo">
          Everything You Need to Thrive in Software Development
        </h1>
        <p>Dive into features crafted to help you learn, connect, and excel.</p>
      </div>

      {/* Features */}
      <div className="flex items-start  justify-center gap-8 w-full px-24">
        {/* 1st Column */}
        <div className="flex flex-col items-start justify-center w-1/2 gap-4">
          {/* feature 1 */}
          <div className="border-2 rounded-lg w-full  h-3/5 flex flex-col itemst-start justify-start gap-2">
            <div className="flex flex-col items-start justify-start gap-4 py-8 px-14">
              <h4 className="text-sm">
                Learn, Build, and Excel at Your Own Pace.
              </h4>
              <h3 className="text-3xl">
                Comprehensive Courses for Every Skill Level
              </h3>
              <p>
                Access self-paced courses for all skill levels, from programming
                basics to advanced topics, guiding you every step of the way.
              </p>

              <Link href="/courses" className="text-sm flex items-center gap-2">
                Start Learning Now <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
            <Image
              src={"/images/placeholder.png"}
              alt="feature1"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between h-2/5 gap-4">
            {/* Feature 2 */}
            <div className="flex flex-col border rounded-lg p-8 gap-6 w-1/2">
              <Image
                src={"/images/placeholder-logo.png"}
                alt="feature2"
                width={100}
                height={100}
                className="w-8 h-8 "
              />
              <div className="flex flex-col items-start justify-start gap-2">
                <h3 className="text-2xl">
                  Never Miss a Beat with Our Monthly Newsletter
                </h3>
                <p>
                  Get exclusive content, event updates, and industry news
                  straight to your inbox.
                </p>
              </div>

              <Link
                href="/newsletter"
                className="text-sm flex items-center gap-2"
              >
                Subscribe Now <ChevronRight className="w-6 h-6" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col border rounded-lg p-8 gap-6 w-1/2">
              <Image
                src={"/images/placeholder-logo.png"}
                alt="feature2"
                width={100}
                height={100}
                className="w-8 h-8 "
              />
              <div className="flex flex-col items-start justify-start gap-2">
                <h3 className="text-2xl">
                  Test Your Skills with Exclusive Contests
                </h3>
                <p>
                  Join thrilling coding challenges designed to push your limits.
                  Compete with peers, earn rewards for your skills.
                </p>
              </div>

              <Link
                href="/contests"
                className="text-sm flex items-center gap-2"
              >
                Join the next contest <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        {/* 2nd Column */}
        <div className="flex flex-col items-start justify-start w-1/2 gap-4">
          {/* feature 4 */}

          <div className="border-2 rounded-lg w-full  h-3/5 flex  itemst-start justify-start">
            <Image
              src={"/images/placeholder.png"}
              alt="feature1"
              width={100}
              height={100}
              className="w-1/2  object-cover"
            />
            <div className="flex flex-col w-1/2 items-start justify-start gap-4 px-4 py-8">
              <h4 className="text-sm">The Tools You Need to Succeed.</h4>
              <h3 className="text-2xl">
                Explore Tutorials, Guides, and Code Repositories
              </h3>
              <p>
                Unlock expert tutorials, guides, and repositories to boost your
                coding skills and stay ahead in tech.
              </p>

              <Link href="/courses" className="text-sm flex items-center gap-2">
                Browse Resources <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
          {/* feature 5 */}
          <div className="border-2 rounded-lg w-full  h-3/5 flex flex-col itemst-start justify-start gap-2">
            <div className="flex flex-col items-start justify-start gap-4 py-8 px-14">
              <h4 className="text-sm">Grow Together, Achieve Together.</h4>
              <h3 className="text-3xl">
                Engage in Inspiring Community Gatherings
              </h3>
              <p>
                Join remote meetups to share interview tips, exchange ideas, and
                connect with a supportive developer community.
              </p>

              <Link href="/courses" className="text-sm flex items-center gap-2">
                Join the Next Meetup <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
            <Image
              src={"/images/placeholder.png"}
              alt="feature1"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
