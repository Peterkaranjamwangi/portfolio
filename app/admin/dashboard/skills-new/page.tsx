'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useSkills } from '@/hooks/useSkills';
import { skillSchema, type SkillFormData } from '@/lib/validations/schemas';

export default function SkillsAdmin() {
  const { skills, loading, refetch } = useSkills();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      label: '',
      type: 'TECHNICAL',
      icon: '',
      order: 0,
    },
  });

  const onSubmit = async (data: SkillFormData) => {
    setSubmitting(true);

    try {
      const url = editingSkill
        ? `/api/skills/${editingSkill.id}`
        : '/api/skills';
      const method = editingSkill ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from backend
        if (result.details) {
          alert(`Validation errors:\n${result.details.map((d: any) => `- ${d.field}: ${d.message}`).join('\n')}`);
        } else {
          alert(`Error: ${result.error || 'Failed to save skill'}`);
        }
        return;
      }

      refetch();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('An error occurred while saving the skill');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      refetch();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const resetForm = () => {
    reset({
      label: '',
      type: 'TECHNICAL',
      icon: '',
      order: 0,
    });
    setEditingSkill(null);
  };

  const openEditModal = (skill: any) => {
    setEditingSkill(skill);
    setValue('label', skill.label);
    setValue('type', skill.type);
    setValue('icon', skill.icon || '');
    setValue('order', skill.order);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Separate skills by type
  const technicalSkills = skills.filter((s) => s.type === 'TECHNICAL');
  const softSkills = skills.filter((s) => s.type === 'SOFT');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Skills Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Using React Hook Form with Zod validation
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Technical Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Technical Skills ({technicalSkills.length})
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Skill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {technicalSkills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {skill.label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {skill.icon || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.order}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(skill)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                          aria-label={`Edit ${skill.label}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          aria-label={`Delete ${skill.label}`}
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

          {/* Soft Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Soft Skills ({softSkills.length})
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Skill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {softSkills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {skill.label}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {skill.icon || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.order}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(skill)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                          aria-label={`Edit ${skill.label}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          aria-label={`Delete ${skill.label}`}
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
        </div>
      )}

      {/* Modal with React Hook Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setIsModalOpen(false);
            resetForm();
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="p-6">
              <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Skill Name */}
                <div>
                  <label htmlFor="label" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Skill Name *
                  </label>
                  <input
                    id="label"
                    type="text"
                    {...register('label')}
                    className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.label ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.label && (
                    <p className="text-red-500 text-xs mt-1">{errors.label.message}</p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Type *
                  </label>
                  <select
                    id="type"
                    {...register('type')}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="TECHNICAL">Technical</option>
                    <option value="SOFT">Soft Skill</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                  )}
                </div>

                {/* Icon Name */}
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Icon Name
                  </label>
                  <input
                    id="icon"
                    type="text"
                    {...register('icon')}
                    placeholder="e.g., FaReact, Code"
                    className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.icon ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.icon && (
                    <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Lucide React or React Icons name
                  </p>
                </div>

                {/* Display Order */}
                <div>
                  <label htmlFor="order" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Display Order
                  </label>
                  <input
                    id="order"
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.order ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.order && (
                    <p className="text-red-500 text-xs mt-1">{errors.order.message}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      editingSkill ? 'Update' : 'Create'
                    )}
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
