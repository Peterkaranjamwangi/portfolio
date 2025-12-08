'use client';
import React, { useEffect, useState } from 'react';
import { Briefcase, Code, Wrench, Cpu, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  projects: number;
  skills: number;
  services: number;
  technologies: number;
  posts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    services: 0,
    technologies: 0,
    posts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, skills, services, technologies, posts] = await Promise.all([
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/skills').then((r) => r.json()),
        fetch('/api/services').then((r) => r.json()),
        fetch('/api/technologies').then((r) => r.json()),
        fetch('/api/posts').then((r) => r.json()),
      ]);

      setStats({
        projects: projects.count || 0,
        skills: skills.count || 0,
        services: services.count || 0,
        technologies: technologies.count || 0,
        posts: posts.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Projects',
      value: stats.projects,
      icon: Briefcase,
      color: 'bg-blue-500',
      href: '/admin/dashboard/projects',
    },
    {
      label: 'Skills',
      value: stats.skills,
      icon: Code,
      color: 'bg-green-500',
      href: '/admin/dashboard/skills',
    },
    {
      label: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'bg-purple-500',
      href: '/admin/dashboard/services',
    },
    {
      label: 'Technologies',
      value: stats.technologies,
      icon: Cpu,
      color: 'bg-orange-500',
      href: '/admin/dashboard/technologies',
    },
    {
      label: 'Blog Posts',
      value: stats.posts,
      icon: BookOpen,
      color: 'bg-pink-500',
      href: '/admin/dashboard/blog',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your admin panel. Manage your portfolio content here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.a
              key={card.label}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {card.label}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : card.value}
              </p>
            </motion.a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/projects"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <Briefcase className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Add Project
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new portfolio project
            </p>
          </a>
          <a
            href="/admin/dashboard/blog"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-500 transition-colors"
          >
            <BookOpen className="w-6 h-6 text-pink-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Write Post
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new blog post
            </p>
          </a>
          <a
            href="/dashboard"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              View Site
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visit your portfolio
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
