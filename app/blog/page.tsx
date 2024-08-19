import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  return (
    <InnerLayout>
      <PageTitle title="Blog" subtitle="Check out my articles" />
      <div className="flex items-center justify-center h-[40vh]">
        <div className="text-3xl font-bold">Coming soon !!</div>
      </div>
      {/* <div className="flex flex-wrap -mx-4">
        <div className="container px-5 py-2 mx-auto">
          <div className="my-3 divide-y-2 divide-green-600">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
        <Pagination className="text-white">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </InnerLayout>
  );
}
