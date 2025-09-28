'use client';

import { Avatar, Button } from 'antd';
import type React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../App.css';

interface CardItem {
  id: number | string;
  title: string;
  description?: string;
  cover?: string;
}

interface Card {
  items: CardItem[];
  loading?: boolean;
  onEdit?: (item: CardItem) => void;
  onDelete?: (item: CardItem) => void;
  maxHeight?: number;
}

export const Card: React.FC<Card> = ({
  items,
  onEdit,
  onDelete,
  maxHeight = 600,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 16,
          maxHeight,
          overflowY: 'auto',
          marginBottom: 16,
        }}
      >
        {items.map((item) => (
          <div key={item.id} className="user-card">
            <div className="user-card__body">
              {item.cover && (
                <Avatar
                  src={item.cover}
                  size={80}
                  style={{ marginBottom: 8 }}
                />
              )}
              <h3 className="user-card__title">{item.title}</h3>
              {item.description && (
                <p className="user-card__desc">{item.description}</p>
              )}
            </div>
            <div className="user-card__overlay" aria-hidden="true" />
            <div
              className="user-card__actions"
              role="group"
              aria-label="Card actions"
            >
              {onEdit && (
                <Button
                  shape="circle"
                  size="large"
                  className="user-card__btn user-card__btn--edit"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(item)}
                />
              )}
              {onDelete && (
                <Button
                  shape="circle"
                  size="large"
                  className="user-card__btn user-card__btn--delete"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(item)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
