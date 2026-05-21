'use client';

import { useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import ButtonCustom from '@/components/ui/ButtonCustom';
import TableCustom from '@/components/ui/TableCustom';
import CategoryFormModal from '@/features/category/components/CategoryFormModal';
import { useCategories } from '@/features/category/hooks/useCategories';
import { useCategoryAdmin } from '@/features/category/hooks/useCategoryAdmin';
import type { Category, CreateCategoryRequest } from '@/features/category/types/category.type';

export default function AdminCategoriesPage() {
  const { categories, isLoading } = useCategories();
  const { createCategory, updateCategory, deleteCategory, isCreating, isUpdating } =
    useCategoryAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (data: CreateCategoryRequest) => {
    if (editing) {
      updateCategory({ id: editing.id, data }, { onSuccess: closeModal });
    } else {
      createCategory(data, { onSuccess: closeModal });
    }
  };

  const columns: TableColumnsType<Category> = [
    { title: '#', key: 'idx', width: 60, render: (_, __, i) => i + 1 },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name', width: 200 },
    { title: 'Mô tả', dataIndex: 'description', key: 'desc', ellipsis: true,
      render: (v: string) => v || <span className="text-gray-400">—</span> },
    {
      title: 'Hành động',
      key: 'actions',
      width: 110,
      render: (_, record) => (
        <div className="flex gap-2">
          <ButtonCustom size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <ButtonCustom
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCategory(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
          <p className="text-gray-400 text-sm mt-0.5">{categories.length} danh mục</p>
        </div>
        <ButtonCustom type="primary" icon={<PlusOutlined />} onClick={openCreate}
          className="bg-green-700! border-green-700!">
          Thêm danh mục
        </ButtonCustom>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <TableCustom<Category>
          columns={columns}
          dataSource={categories}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} danh mục` }}
          locale={{ emptyText: 'Chưa có danh mục nào' }}
        />
      </div>

      <CategoryFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        category={editing}
        loading={editing ? isUpdating : isCreating}
      />
    </div>
  );
}
