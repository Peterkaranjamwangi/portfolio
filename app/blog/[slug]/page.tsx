import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";

export default function BlogDetails() {
  return (
    <InnerLayout>
      <PageTitle
        title="Blog"
        subtitle=" The Future of React: What's Coming in 2024"
      />
      <div className="flex flex-wrap -mx-4">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex items-center text-gray-400 text-sm mb-6">
            <span>By Peter Mwangi</span>
            <span className="mx-2">|</span>
            <span>July 20, 2024</span>
            <span className="mx-2">|</span>
            <span>5 min read</span>
          </div>
          <div className="w-full h-[60vh] relative overflow-hidden rounded-lg mb-6">
            <Image
              src="/bootstrap.png"
              alt="blog image"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              React has been at the forefront of frontend development for years,
              and 2024 is shaping up to be another landmark year for the
              library. In this article, we&apos;ll explore the upcoming features
              and changes that are set to revolutionize how we build user
              interfaces.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-3">
              1. Server Components: A Game Changer
            </h2>
            <p className="mb-4">
              One of the most anticipated features is the full integration of
              Server Components. This paradigm shift allows developers to write
              components that can be rendered on the server, significantly
              improving initial load times and SEO capabilities.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-3">
              2. Improved Concurrent Mode
            </h2>
            <p className="mb-4">
              Concurrent Mode, which has been in experimental phases, is
              expected to be fully realized in 2024. This feature will enable
              React applications to be more responsive by allowing rendering
              work to be interrupted and resumed.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="#"
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <h4 className="font-semibold mb-2">
                  10 React Performance Tips You Need to Know
                </h4>
                <p className="text-sm text-gray-400">
                  Optimize your React apps with these expert tips
                </p>
              </a>
              <a
                href="#"
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <h4 className="font-semibold mb-2">
                  Building Accessible React Applications
                </h4>
                <p className="text-sm text-gray-400">
                  Learn how to make your React apps more inclusive
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
