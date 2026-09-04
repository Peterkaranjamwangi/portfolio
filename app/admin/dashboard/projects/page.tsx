'use client';
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Loader2, ExternalLink, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useTechnologies } from '@/hooks/useTechnologies';
import { ImageUpload } from '@/components/admin/image-upload';
import { projectsService } from '@/services';
import { PROJECT_PLATFORMS } from '@/lib/validations/schemas';

export default function ProjectsAdmin() {
  const { projects, loading, refetch } = useProjects();
  const { technologies } = useTechnologies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    image: '',
    images: [] as string[],
    platforms: [] as string[],
    github: '',
    link: '',
    status: 'COMPLETED',
    order: 0,
    technologyIds: [] as number[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSaveError(null);

    try {
      if (editingProject) {
        await projectsService.update(editingProject.id, formData);
      } else {
        await projectsService.create(formData);
      }

      refetch();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      // The save used to fail silently on a non-2xx: the modal simply stayed
      // open with no explanation. The service throws, so the reason is here.
      setSaveError(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsService.remove(id);
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
      images: [],
      platforms: [],
      github: '',
      link: '',
      status: 'COMPLETED',
      order: 0,
      technologyIds: [],
    });
    setEditingProject(null);
    setSaveError(null);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      shortDescription: project.shortDescription,
      image: project.image,
      images: project.images ?? [],
      platforms: project.platforms ?? [],
      github: project.github || '',
      link: project.link,
      status: project.status,
      order: project.order,
      technologyIds: project.technologies.map((t: any) => t.id),
    });
    setSaveError(null);
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

                <ImageUpload
                  label="Cover image *"
                  value={formData.image || null}
                  folder="projects"
                  onChange={(next) =>
                    setFormData({ ...formData, image: next?.url ?? '' })
                  }
                />

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Screenshots
                  </label>
                  <div className="flex flex-wrap gap-3 mb-2">
                    {formData.images.map((url) => (
                      <div key={url} className="relative">
                        <img
                          src={url}
                          alt=""
                          className="w-20 h-20 rounded object-cover border dark:border-gray-600"
                        />
                        <button
                          type="button"
                          aria-label="Remove screenshot"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              images: formData.images.filter((u) => u !== url),
                            })
                          }
                          className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <ImageUpload
                    label="Add a screenshot"
                    value={null}
                    folder="projects"
                    onChange={(next) => {
                      if (!next) return;
                      setFormData((current) => ({
                        ...current,
                        images: [...current.images, next.url],
                      }));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Platforms
                  </label>
                  <div className="flex flex-wrap gap-3 p-2 border rounded-lg dark:border-gray-600">
                    {PROJECT_PLATFORMS.map((platform) => (
                      <label key={platform} className="flex items-center gap-2 text-sm capitalize">
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform)}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              platforms: e.target.checked
                                ? [...formData.platforms, platform]
                                : formData.platforms.filter((p) => p !== platform),
                            })
                          }
                          className="rounded"
                        />
                        <span className="dark:text-gray-300">{platform}</span>
                      </label>
                    ))}
                  </div>
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

                {saveError && (
                  <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {saveError}
                  </p>
                )}

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
