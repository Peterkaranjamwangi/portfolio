// ResumeSection.tsx

import React from 'react';

interface ResumeSectionProps {
  title: string;
  data: {
    title: string;
    date: string;
    company?: string;
    institution?: string;
    description?: string;
    responsibilities?: string[];
    address?: string;
    phone?: string;
    email?: string;
  }[];
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, data }) => {
  return (
    <div className="w-full lg:w-1/2 px-4 mb-8">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      {data.map((item, index) => (
        <div className="mb-6" key={index}>
          <h4 className="text-xl font-bold">{item.title}</h4>
          {item.date && <h5 className="text-lg font-semibold text-gray-600">{item.date}</h5>}
          {item.company && <p className="italic">{item.company}</p>}
          {item.institution && <p className="italic">{item.institution}</p>}
          {item.description && <p>{item.description}</p>}
          {item.address && (
            <ul className="list-disc list-inside">
              <li>{item.address}</li>
              <li>{item.phone}</li>
              <li>{item.email}</li>
            </ul>
          )}
          {item.responsibilities && (
            <ul className="list-disc list-inside mt-2">
              {item.responsibilities.map((responsibility, idx) => (
                <li key={idx}>{responsibility}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumeSection;
