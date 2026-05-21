'use client';

import { Modal } from 'antd';
import type { ModalProps } from 'antd';

interface ModalCustomProps extends ModalProps {
  children?: React.ReactNode;
}

export default function ModalCustom({ children, ...props }: ModalCustomProps) {
  return <Modal {...props}>{children}</Modal>;
}

export function confirmDelete({
  title = 'Xác nhận xóa',
  content = 'Bạn có chắc chắn muốn xóa không?',
  onOk,
}: {
  title?: string;
  content?: string;
  onOk: () => void | Promise<void>;
}) {
  Modal.confirm({
    title,
    content,
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk,
  });
}
