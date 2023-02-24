/**
 * 事故管理
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AccidentAddEdit from './AccidentAddEdit';
import { pageAccident, deleteAccident } from '../../../services/safety';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function Accident() {
  const [isShowAccidentAddEdit, setIsShowAccidentAddEdit] = useState(false);
  const [openAccidentAddEdit, setOpenAccidentAddEdit] = useState(false);
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
      title: '事故',
      dataIndex: 'accident',
      render(_, record) {
        return (
          <>
            {
              <Tag color='error'>
                {
                  record.accident
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '事故时间',
      dataIndex: 'accidentTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {
                  record.accidentTime
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '事故原因',
      dataIndex: 'reason',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '损失',
      dataIndex: 'loss',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              record.loss ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>￥</span>
                  <span style={{ color: '#ec5b56', fontSize: 16 }}>{record.loss}</span>
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
    setIsShowAccidentAddEdit(true);
    setOpenAccidentAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteAccident(id);
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

          const res = await pageAccident(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        rowKey="id"
        headerTitle="事故记录"
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
        isShowAccidentAddEdit && (
          <AccidentAddEdit
            openAccidentAddEdit={openAccidentAddEdit}
            setOpenAccidentAddEdit={setOpenAccidentAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}

