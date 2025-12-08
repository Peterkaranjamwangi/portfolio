'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { Loader2 } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import * as ReactIcons from 'react-icons/bi';

// Helper to get icon component
const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;
  const Icon = (ReactIcons as any)[iconName];
  return Icon || null;
};

export default function ServicesPage() {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <DashboardPage title="Services" subtitle="What I Offer">
        <div className="h-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </DashboardPage>
    );
  }

  if (error) {
    return (
      <DashboardPage title="Services" subtitle="What I Offer">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-2">Error loading services</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage title="Services" subtitle="What I Offer">
      <div className="h-full overflow-y-auto custom-scrollbar px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all h-fit"
              >
                {/* Icon */}
                {IconComponent && (
                  <div className="mb-4 p-3 bg-cyan-500/10 rounded-lg w-fit group-hover:bg-cyan-500/20 transition-all">
                    <IconComponent className="text-cyan-400" size={32} />
                  </div>
                )}

                {/* Service name */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative line */}
                <div className="mt-4 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent rounded" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardPage>
  );
}
