/**
 * 寝室管理
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import BedRoomAddEdit from './BedRoomAddEdit';
import { pageBedRoom, deleteBedRoom } from '../../../services/checkIn';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function BedRoom() {
  const [isShowBedRoomAddEdit, setIsShowBedRoomAddEdit] = useState(false);
  const [openBedRoomAddEdit, setOpenBedRoomAddEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState<Record<string, any>>({});

  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '寝室号',
      dataIndex: 'bedroomNum',
      render(text) {
        return (
          <>
            <Tag color='blue'>{text}</Tag>
          </>
        )
      }
    },
    {
      title: '是否已满',
      dataIndex: 'isFull',
      valueEnum: {
        0: {
          text: '未满',
          status: 'Processing'
        },
        1: {
          text: '已满',
          status: 'Warning'
        }
      }
    },
    {
      title: '寝室规定人数',
      dataIndex: 'disPersonNum',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} 人
          </>
        )
      }
    },
    {
      title: '已住人数',
      dataIndex: 'lived',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} 人
          </>
        )
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              record.price ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>￥</span>
                  <span style={{ color: '#ec5b56' }}>{record.price}</span>
                </div>
              ) : '-'
            }
          </>
        )
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 150,
      fixed: 'right',
      render(_, record) {
        return (
          <Space>
            <a onClick={() => handleAddEdit(true, record)}>
              编辑
            </a>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>

          </Space>
        )
      }
    }
  ];

  const reloadPage = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  /**
   * 处理函数
   */
  const handleAddEdit = (isEdit: boolean, record: Record<string, any>) => {
    setIsEdit(isEdit);
    setRecord(record);
    setIsShowBedRoomAddEdit(true);
    setOpenBedRoomAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteBedRoom(id);
      message.success(res.msg);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          params.oldPersonId = params.oldPersonName;

          const res = await pageBedRoom(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        search={{
          // defaultCollapsed: false
        }}
        rowKey="id"
        headerTitle="寝室管理"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => handleAddEdit(false, {})}
          >
            新建
          </Button>
        ]}
      />

      {/* 新增编辑 */}
      {
        isShowBedRoomAddEdit && (
          <BedRoomAddEdit
            openBedRoomAddEdit={openBedRoomAddEdit}
            setOpenBedRoomAddEdit={setOpenBedRoomAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
