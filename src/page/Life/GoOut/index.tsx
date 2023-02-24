/**
 * 外出报备
 */
/**
 * 健康档案
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import GoOutAddEdit from './GoOutAddEdit';
import { getOldpersonByName } from '../../../services/user';
import { pageGoOut, deleteGoOut } from '../../../services/lift';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function GoOut() {
  const [isShowGoOutAddEdit, setIsShowGoOutAddEdit] = useState(false);
  const [openGoOutAddEdit, setOpenGoOutAddEdit] = useState(false);
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
      title: '姓名',
      dataIndex: 'oldPersonName',
      width: 100,
      fixed: 'left',
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
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
      hideInSearch: true
    },
    {
      title: '家属电话',
      dataIndex: 'familyMemberPhone',
      copyable: true,
      hideInSearch: true
    },
    {
      title: '外出事件',
      dataIndex: 'goOutEvent',
    },
    {
      title: '外出时间',
      dataIndex: 'goOutTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {
                  record.goOutTime
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '外出地址',
      dataIndex: 'goOutAddress',
      ellipsis: true,
      hideInSearch: true
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
    setIsShowGoOutAddEdit(true);
    setOpenGoOutAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteGoOut(id);
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

          const res = await pageGoOut(params);
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
        headerTitle="外出报备"
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
        isShowGoOutAddEdit && (
          <GoOutAddEdit
            openGoOutAddEdit={openGoOutAddEdit}
            setOpenGoOutAddEdit={setOpenGoOutAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
