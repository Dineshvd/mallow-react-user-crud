// import React from 'react';
// import { Card, Button } from 'antd';

// interface CardItem {
//   id: string | number;
//   title: string;
//   description?: string;
//   cover?: string;
//   actions?: React.ReactNode[];
// }

// interface CardGridProps {
//   items: CardItem[];
//   current?: number;
//   total?: number;
//   pageSize?: number;
//   onPageChange?: (page: number) => void;
//   gridHeight?: string;
//   onEdit?: (item: CardItem) => void;
//   onDelete?: (item: CardItem) => void;
// }

// export const CardGrid: React.FC<CardGridProps> = ({
//   items,
//   current = 1,
//   total = 0,
//   pageSize = 6,
//   onPageChange,
//   gridHeight = '70vh',
//   onEdit,
//   onDelete,
// }) => {
//   const startIndex = (current - 1) * pageSize;
//   const paginatedItems = items.slice(startIndex, startIndex + pageSize);

//   return (
//     <div style={{ maxHeight: gridHeight, overflowY: 'auto' }}>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//           gap: 16,
//           marginBottom: 16,
//         }}
//       >
//         {paginatedItems.map((item) => (
//           <Card
//             key={item.id}
//             cover={
//               item.cover ? (
//                 <img
//                   alt={item.title}
//                   src={item.cover}
//                   style={{ objectFit: 'cover', height: 150 }}
//                 />
//               ) : undefined
//             }
//             actions={
//               [
//                 onEdit ? (
//                   <Button key="edit" onClick={() => onEdit(item)}>
//                     Edit
//                   </Button>
//                 ) : null,
//                 onDelete ? (
//                   <Button key="delete" danger onClick={() => onDelete(item)}>
//                     Delete
//                   </Button>
//                 ) : null,
//                 ...(item.actions || []),
//               ].filter(Boolean) as React.ReactNode[]
//             }
//           >
//             <Card.Meta title={item.title} description={item.description} />
//           </Card>
//         ))}
//       </div>

//       {onPageChange && total > pageSize && (
//         <div style={{ textAlign: 'right' }}>
//           <Button
//             disabled={current === 1}
//             onClick={() => onPageChange(current - 1)}
//             style={{ marginRight: 8 }}
//           >
//             Prev
//           </Button>
//           <Button
//             disabled={current >= Math.ceil(total / pageSize)}
//             onClick={() => onPageChange(current + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };
