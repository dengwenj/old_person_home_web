/**
 * 访客记录
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import VisitorsAddEdit from './VisitorsAddEdit';
import { getOldpersonByName } from '../../../services/user';
import { pageVisitors, deleteVisitors } from '../../../services/safety';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function Visitors() {
  const [isShowVisitorsAddEdit, setIsShowVisitorsAddEdit] = useState(false);
  const [openVisitorsAddEdit, setOpenVisitorsAddEdit] = useState(false);
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
      title: '访客姓名',
      dataIndex: 'visitorsName',
    },
    {
      title: '访客电话',
      dataIndex: 'visitorsPhone',
      copyable: true,
      hideInSearch: true
    },
    {
      title: '访客事件',
      dataIndex: 'visitorsEvent',
      hideInSearch: true
    },
    {
      title: '访问时间',
      dataIndex: 'accessTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {
                  record.accessTime
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '与老人关系',
      dataIndex: 'relation',
      hideInSearch: true
    },
    {
      title: '老人姓名',
      dataIndex: 'oldPersonName',
      width: 100,
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
      width: 100,
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
    setIsShowVisitorsAddEdit(true);
    setOpenVisitorsAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteVisitors(id);
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

          const res = await pageVisitors(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        rowKey="id"
        headerTitle="访客记录"
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
        isShowVisitorsAddEdit && (
          <VisitorsAddEdit
            openVisitorsAddEdit={openVisitorsAddEdit}
            setOpenVisitorsAddEdit={setOpenVisitorsAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
