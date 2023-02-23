import { useRef, useState, useCallback } from 'react';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import { deleteAdmin, pageAdmin } from '../../../services/user';
import AdminAddEdit from './AdminAddEdit';

import type { ProColumns, ActionType } from '@ant-design/pro-components';

export default function Admin() {
  const [isShowAdminAddEdit, setIsShowAdminAddEdit] = useState(false);
  const [openAdminAddEdit, setOpenAdminAddEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState<Record<string, any>>({});

  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        1: {
          text: '超级管理员',
          status: 'Success'
        },
        2: {
          text: '员工',
          status: 'Warning',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {moment(Number(record.createTime)).format('YYYY-MM-DD HH:mm:ss')}
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 150,
      render(_, record) {
        return (
          <Space>
            <a
              onClick={() => handleAddEdit(true, record)}
            >
              编辑
            </a>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a>
                删除
              </a>
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
    setIsShowAdminAddEdit(true);
    setOpenAdminAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteAdmin(id);
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
          const res = await pageAdmin(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        rowKey="id"
        headerTitle="账号管理"
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
        isShowAdminAddEdit && (
          <AdminAddEdit
            openAdminAddEdit={openAdminAddEdit}
            setOpenAdminAddEdit={setOpenAdminAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
