/**
 * 护工管理
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CareworkerAddEdit from './CareworkerAddEdit';
import { pageCareworker, deletCareworker } from '../../services/careworker';
import { getOldpersonByName } from '../../services/user';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function Careworker() {
  const [isShowCareworkerAddEdit, setIsShowCareworkerAddEdit] = useState(false);
  const [openCareworkerAddEdit, setOpenCareworkerAddEdit] = useState(false);
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
      title: '护工姓名',
      dataIndex: 'careWorkerName',
    },
    {
      title: '护工年龄',
      dataIndex: 'careWorkerAge',
      hideInSearch: true,
      render(text) {
        return (
          <>
            <Tag color={'blue'}>{text}岁</Tag>
          </>
        )
      }
    },
    {
      title: '工龄(年)',
      dataIndex: 'seniority',
      hideInSearch: true,
      render(text) {
        return (
          <>
            <Tag color={'purple'}>{text}年</Tag>
          </>
        )
      }
    },
    {
      title: '是否健康',
      dataIndex: 'isHealthy',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '健康',
          status: 'Success'
        },
        0: {
          text: '不建康',
          status: 'Error'
        }
      }
    },
    {
      title: '不健康病历',
      dataIndex: 'careWorkerCases',
      hideInSearch: true,
    },
    {
      title: '护工费用',
      dataIndex: 'carWorkerPrice',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              record.carWorkerPrice ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>￥</span>
                  <span style={{ color: '#ec5b56', fontSize: 16 }}>{record.carWorkerPrice}</span>
                </div>
              ) : '-'
            }
          </>
        )
      }
    },
    {
      title: '照顾老人姓名',
      dataIndex: 'oldPersonName',
      render(oldPersonName) {
        return (
          <Tag color='processing'>{oldPersonName}</Tag>
        )
      },
      valueType: 'select',
      debounceTime: 300,
      async request({ keyWords }) {
        if (!keyWords) return [];
        const res = await getOldpersonByName(keyWords);
        return res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.oldPersonName
          }
        })
      },
      fieldProps(form, config) {
        return {
          showSearch: true,
          placeholder: '请搜索选择'
        }
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '男',
          status: 'Success'
        },
        0: {
          text: '女',
          status: 'Warning',
        },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      hideInSearch: true,
      render(text) {
        return (
          <><Tag color='cyan'>{text}</Tag></>
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
    setRecord({ ...record });
    setIsShowCareworkerAddEdit(true);
    setOpenCareworkerAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deletCareworker(id);
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

          const res = await pageCareworker(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        search={{
          labelWidth: 100,
          defaultCollapsed: false
        }}
        rowKey="id"
        headerTitle="护工管理"
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
        isShowCareworkerAddEdit && (
          <CareworkerAddEdit
            openCareworkerAddEdit={openCareworkerAddEdit}
            setOpenCareworkerAddEdit={setOpenCareworkerAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
