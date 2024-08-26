import PageTitle from "@/components/PageTitle";
import React from "react";
import Main from "../about/Main";

export default function MobileAbout() {
  return (
    <div>
      <PageTitle title="About" subtitle="Get to know me" />
      <Main />
    </div>
  );
}
