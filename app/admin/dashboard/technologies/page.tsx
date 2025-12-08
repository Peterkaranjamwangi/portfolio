'use client';
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { useTechnologies } from '@/hooks/useTechnologies';

export default function TechnologiesAdmin() {
  const { technologies, loading, refetch } = useTechnologies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<any>(null);
  const [formData, setFormData] = useState({
    label: '',
    value: 0,
    icon: '',
    href: '',
    category: 'GENERAL',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingTech
        ? `/api/technologies/${editingTech.id}`
        : '/api/technologies';
      const method = editingTech ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        refetch();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving technology:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this technology?')) return;

    try {
      await fetch(`/api/technologies/${id}`, { method: 'DELETE' });
      refetch();
    } catch (error) {
      console.error('Error deleting technology:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      label: '',
      value: 0,
      icon: '',
      href: '',
      category: 'GENERAL',
    });
    setEditingTech(null);
  };

  const openEditModal = (tech: any) => {
    setEditingTech(tech);
    setFormData({
      label: tech.label,
      value: tech.value,
      icon: tech.icon || '',
      href: tech.href || '',
      category: tech.category,
    });
    setIsModalOpen(true);
  };

  // Group technologies by category
  const techsByCategory = {
    FRONTEND: technologies.filter((t) => t.category === 'FRONTEND'),
    BACKEND: technologies.filter((t) => t.category === 'BACKEND'),
    DATABASE: technologies.filter((t) => t.category === 'DATABASE'),
    DEVOPS: technologies.filter((t) => t.category === 'DEVOPS'),
    GENERAL: technologies.filter((t) => t.category === 'GENERAL'),
  };

  const categories = [
    { key: 'FRONTEND', label: 'Frontend', color: 'bg-blue-500' },
    { key: 'BACKEND', label: 'Backend', color: 'bg-green-500' },
    { key: 'DATABASE', label: 'Database', color: 'bg-purple-500' },
    { key: 'DEVOPS', label: 'DevOps', color: 'bg-orange-500' },
    { key: 'GENERAL', label: 'General', color: 'bg-gray-500' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Technologies Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Technology
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => {
            const techs = techsByCategory[category.key as keyof typeof techsByCategory];
            if (techs.length === 0) return null;

            return (
              <div key={category.key} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.label} ({techs.length})
                  </h2>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Technology
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Proficiency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Icon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Link
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {techs.map((tech) => (
                      <tr key={tech.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {tech.label}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`${category.color} h-2 rounded-full`}
                                style={{ width: `${tech.value}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {tech.value}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {tech.icon || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {tech.href ? (
                            <a
                              href={tech.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink size={14} />
                              Link
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(tech)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(tech.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingTech ? 'Edit Technology' : 'Add Technology'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Technology Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="GENERAL">General</option>
                    <option value="FRONTEND">Frontend</option>
                    <option value="BACKEND">Backend</option>
                    <option value="DATABASE">Database</option>
                    <option value="DEVOPS">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Proficiency (0-100) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="e.g., SiReact, Database"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Lucide React or React Icons name
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Documentation URL
                  </label>
                  <input
                    type="url"
                    value={formData.href}
                    onChange={(e) =>
                      setFormData({ ...formData, href: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingTech ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
