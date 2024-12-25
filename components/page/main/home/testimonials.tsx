import Image from "next/image";
import React from "react";

export default function Testimonials() {
  return (
    <div className="w-full min-h-screen items-start flex gap-12 flex-col justify-center  px-24">
      <div className="flex flex-col w-full items-start justify-start gap-4">
        <h4>Testimonials</h4>
        <h1 className="text-6xl  font-semibold font-nippo">
          What Our Community Says
        </h1>
      </div>

      {/* Testimonials */}
      <div className="flex w-full items-center h-[60vh] justify-start gap-8 ">
        <Image
          src="/images/placeholder.png"
          alt="Testimonial"
          width={390}
          height={300}
          className="rounded-lg object-cover h-full w-1/2"
        />
        <div className="w-1/2 flex flex-col items-start justify-start gap-4">
          <p className="text-2xl font-semibold">⭐⭐⭐⭐⭐</p>
          <p className="text-xl">
            {`"Being part of this community has transformed my coding skills and
            expanded my professional network immensely! The support and
            resources available here are unparalleled."`}
          </p>

          <div className="flex flex-col ">
            <p className="text-lg">John Doe</p>
            <p className="text-sm">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
