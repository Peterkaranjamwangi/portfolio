import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import { SERVICES } from "@/constants/consants";

export default function ServicesPage() {
  return (
    <InnerLayout>
      <PageTitle title="Services" subtitle="What I can do for you" />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            key={index}
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          >
            {<service.icon size={30} />}

            <h2 className="mt-4 text-xl font-bold text-white">
              {service.name}
            </h2>

            <p className="mt-1 text-sm text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </InnerLayout>
  );
}
