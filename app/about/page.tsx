import React from "react";
import InnerLayout from "@/components/InnerLayout";
import Gallery from "@/components/about/Gallery";
import Overview from "@/components/about/Overview";
import Skills from "@/components/about/Skills";
import ToolsTechnologies from "@/components/about/ToolsTechnologies";
import PageTitle from "@/components/PageTitle";

export default function AboutPage() {
  return (
    <InnerLayout>
      <PageTitle title="About" subtitle="Get to know me" />
      {/* <Overview /> */}
      <Skills />
      <Gallery />
      {/* <ToolsTechnologies /> */}
    </InnerLayout>
  );
}
