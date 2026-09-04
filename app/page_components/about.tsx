import PageTitle from "@/components/PageTitle";
import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import { resumeData } from "@/constants/constants";

/**
 * The About block on the mobile home page.
 *
 * It used to import a `Main` component from `app/about/`, which went away when
 * the dashboard routes moved to the root — leaving the home page unbuildable.
 * The summary is short enough to render from `constants.ts` directly, and
 * "read more" hands off to the full About page rather than duplicating it.
 */
export default function MobileAbout() {
  const { name, description, address, email, phone } = resumeData.summary;

  const contacts = [
    { icon: MapPin, label: address, href: null },
    { icon: Mail, label: email, href: `mailto:${email}` },
    { icon: Phone, label: phone, href: `tel:${phone}` },
  ];

  return (
    <div className="px-4">
      <PageTitle title="About" subtitle="Get to know me" />

      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-200">{description}</p>

        <ul className="space-y-2">
          {contacts.map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-3 text-xs text-gray-300">
              <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {href ? (
                <a href={href} className="transition-colors hover:text-white">
                  {label}
                </a>
              ) : (
                <span>{label}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            href="/about"
            className="block border border-gray-50 px-5 py-2 text-center text-xs font-bold uppercase text-white transition-all duration-300 hover:bg-primary hover:text-white"
          >
            More about {name.split(" ")[0]}
          </Link>
        </div>
      </div>
    </div>
  );
}
