import PageTitle from "@/components/PageTitle";
import { interestsData } from "@/constants/consants";

export default function Interests() {
  return (
    <div className="mb-40">
      <PageTitle title="Interests" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interestsData.map((interest, index) => (
          <div
            key={index}
            className="bg-gray-300/40 p-8 shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-start h-16"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center gap-4">
              <interest.icon className="text-primary text-2xl" />
              <span className="text-white font-semibold text-sm text-nowrap">
                {interest.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
