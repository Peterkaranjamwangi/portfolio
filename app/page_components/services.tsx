import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import { SERVICES } from "@/constants/constants";

export default function MobileServices() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <PageTitle title="Services" subtitle="What I can do for you" />

      {SERVICES.map((service, index) => (
        <div
          key={index}
          className="block rounded-xl border border-gray-800 p-4 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        >
          <service.icon size={30} className="text-primary" />

          <h2 className="mt-4 text-xl font-bold text-white">{service.name}</h2>

          <p className="mt-1 text-sm text-gray-300">
            {service.description.length > 150 ? (
              <>
                {service.description.substring(0, 150)}...
                <a href="/services" className="text-primary hover:underline">
                  View More
                </a>
              </>
            ) : (
              service.description
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
