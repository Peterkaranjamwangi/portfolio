import React from "react";
import InnerLayout from "@/components/InnerLayout";
import Connect from "@/components/Connect";
import PageTitle from "@/components/PageTitle";

export default function ContactsPage() {
  return (
    <InnerLayout>
      <PageTitle title="Contact" subtitle="Get in touch" />
      <Connect />
    </InnerLayout>
  );
}
