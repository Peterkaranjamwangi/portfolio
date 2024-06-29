import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import Projects from "./Projects";

export default function ProjectsPage() {
  return (
    <InnerLayout>
      <PageTitle title="Projects" subtitle="Check out my Work" />
      {/* <Projects />   */}
    </InnerLayout>
  );
}
