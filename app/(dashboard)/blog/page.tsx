'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { BookOpen, Eye, Calendar, User, Filter } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('ALL');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = filter === 'ALL'
        ? '/api/posts'
        : `/api/posts?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'DRAFT':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ARCHIVED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <DashboardPage title="Blog" subtitle="Content Library">
      <div className="h-full flex flex-col px-4">
        {/* Filter buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilter(status as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm
                ${
                  filter === status
                    ? 'bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400'
                    : 'bg-black/40 border-2 border-gray-700 text-gray-400 hover:border-gray-600'
                }
              `}
            >
              <Filter size={16} />
              {status}
            </motion.button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-cyan-400 text-lg">Loading posts...</div>
          </div>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="mx-auto mb-4 text-gray-600" size={48} />
              <p className="text-gray-400">No posts found</p>
              <p className="text-sm text-gray-500 mt-2">
                Run the seed script to populate the database
              </p>
            </div>
          </div>
        )}

        {/* Posts grid */}
        {!loading && posts.length > 0 && (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all group"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                        {post.title}
                      </h3>
                      {post.subtitle && (
                        <p className="text-sm text-gray-400">{post.subtitle}</p>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(
                        post.status
                      )}`}
                    >
                      {post.status}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-cyan-400" />
                      {post.author.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-cyan-400" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Categories */}
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span
                          key={category.id}
                          className="px-2 py-1 text-xs bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 text-sm rounded transition-all"
                    >
                      <Eye size={14} />
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardPage>
  );
}
