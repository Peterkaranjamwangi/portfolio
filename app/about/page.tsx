import React from "react";
import InnerLayout from "@/components/InnerLayout";
import Gallery from "@/components/about/Gallery";
import Overview from "@/components/about/Overview";
import PageTitle from "@/components/PageTitle";
import Main from "./Main";
import Skills from "./Skills";
import Interests from "./Interests";

export default function AboutPage() {
  return (
    <InnerLayout>
      <PageTitle title="About" subtitle="Get to know me" />
      {/* <Overview /> */}
      <Main />
      <Skills />
      <Interests />
      {/* <Gallery /> */}
      {/* <ToolsTechnologies /> */}
    </InnerLayout>
  );
}
