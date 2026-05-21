'use client';

import { useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import ButtonCustom from '@/components/ui/ButtonCustom';
import TableCustom from '@/components/ui/TableCustom';
import ProductFormModal from '@/features/product/components/ProductFormModal';
import { useProductAdmin } from '@/features/product/hooks/useProductAdmin';
import { useCategories } from '@/features/category/hooks/useCategories';
import { formatPrice } from '@/utils/formatPrice';
import type { Product, CreateProductRequest, UpdateProductRequest } from '@/features/product/types/product.type';

export default function AdminProductsPage() {
  const { products, isLoading, createProduct, updateProduct, deleteProduct, isCreating, isUpdating } =
    useProductAdmin();
  const { categories } = useCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p: Product) => { setEditing(p); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (data: CreateProductRequest) => {
    if (editing) {
      updateProduct(
        { id: editing.id, data: data as UpdateProductRequest },
        { onSuccess: closeModal },
      );
    } else {
      createProduct(data, { onSuccess: closeModal });
    }
  };

  const columns: TableColumnsType<Product> = [
    { title: '#', key: 'idx', width: 50, render: (_, __, i) => i + 1 },
    {
      title: 'Ảnh',
      dataIndex: 'imageUrl',
      key: 'image',
      width: 72,
      render: (url: string, r) => (
        <img src={url || '/default-product.jpg'} alt={r.name} className="w-12 h-12 object-cover rounded" />
      ),
    },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: 'Danh mục', dataIndex: 'categoryName', key: 'cat', width: 130 },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (v: number) => <span className="text-red-600 font-semibold">{formatPrice(v)}</span>,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 90,
      render: (v: number) => (
        <span className={v === 0 ? 'text-red-500 font-medium' : 'text-green-600 font-medium'}>{v}</span>
      ),
    },
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
            onClick={() => deleteProduct(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} sản phẩm</p>
        </div>
        <ButtonCustom type="primary" icon={<PlusOutlined />} onClick={openCreate}
          className="bg-green-700! border-green-700!">
          Thêm sản phẩm
        </ButtonCustom>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <TableCustom<Product>
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng ${t} sản phẩm` }}
          locale={{ emptyText: 'Chưa có sản phẩm nào' }}
          scroll={{ x: 700 }}
        />
      </div>

      <ProductFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        product={editing}
        categories={categories}
        loading={editing ? isUpdating : isCreating}
      />
    </div>
  );
}
