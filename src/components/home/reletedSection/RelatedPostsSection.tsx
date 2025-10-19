import React from "react";
import { RelatedPostCard } from "./RelatedPostCard";

export default function RelatedPostsSection() {
  const posts = [
    {
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      title: "Discover Projects That Make a Difference",
      description:
        "The 2022 FIFA World Cup is in full swing, with brands across the country organising events, timing is crucial, take advantage of initial interest by listing your event early. However , be mindful of when you do list.",
      author: "Ryan Moose",
      date: "29th Nov 2022",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
      title: "Discover Projects That Make a Difference",
      description:
        "The 2022 FIFA World Cup is in full swing, with brands across the country organising events, timing is crucial, take advantage of initial interest by listing your event early. However , be mindful of when you do list.",
      author: "Ryan Moose",
      date: "29th Nov 2022",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
      title: "Discover Projects That Make a Difference",
      description:
        "The 2022 FIFA World Cup is in full swing, with brands across the country organising events, timing is crucial, take advantage of initial interest by listing your event early. However , be mindful of when you do list.",
      author: "Ryan Moose",
      date: "29th Nov 2022",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      title: "Discover Projects That Make a Difference",
      description:
        "The 2022 FIFA World Cup is in full swing, with brands across the country organising events, timing is crucial, take advantage of initial interest by listing your event early. However , be mindful of when you do list.",
      author: "Ryan Moose",
      date: "29th Nov 2022",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-[60px] font-bold text-[#000000] mb-12">
          You might also like
        </h2>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <RelatedPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
