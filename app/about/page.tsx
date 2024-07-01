import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import Main from "./Main";
import Skills from "./Skills";
import Interests from "./Interests";
import Stack from "./Stack";

export default function AboutPage() {
  return (
    <InnerLayout>
      <PageTitle title="About" subtitle="Get to know me" />
      {/* <Overview /> */}
      <Main />
      <Skills />
      <Interests />
      {/* <Gallery /> */}
      <Stack />
    </InnerLayout>
  );
}
