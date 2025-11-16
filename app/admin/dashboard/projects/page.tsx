'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useTechnologies } from '@/hooks/useTechnologies';

export default function ProjectsAdmin() {
  const { projects, loading, refetch } = useProjects();
  const { technologies } = useTechnologies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    image: '',
    github: '',
    link: '',
    status: 'COMPLETED',
    order: 0,
    technologyIds: [] as number[],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      const method = editingProject ? 'PATCH' : 'POST';

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
      console.error('Error saving project:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortDescription: '',
      image: '',
      github: '',
      link: '',
      status: 'COMPLETED',
      order: 0,
      technologyIds: [],
    });
    setEditingProject(null);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      shortDescription: project.shortDescription,
      image: project.image,
      github: project.github || '',
      link: project.link,
      status: project.status,
      order: project.order,
      technologyIds: project.technologies.map((t: any) => t.id),
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Projects Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Technologies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {project.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.shortDescription.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        project.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech: any) => (
                        <span
                          key={tech.id}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {tech.label}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Image URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Live URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="COMPLETED">Completed</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Technologies
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg dark:border-gray-600">
                    {technologies.map((tech) => (
                      <label
                        key={tech.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={formData.technologyIds.includes(tech.id)}
                          onChange={(e) => {
                            const ids = e.target.checked
                              ? [...formData.technologyIds, tech.id]
                              : formData.technologyIds.filter((id) => id !== tech.id);
                            setFormData({ ...formData, technologyIds: ids });
                          }}
                          className="rounded"
                        />
                        <span className="dark:text-gray-300">{tech.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingProject ? 'Update' : 'Create'}
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
