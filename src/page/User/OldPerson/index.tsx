import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import OldPersonAddEdit from './OldPersonAddEdit';
import { deleteOldPerson, pageOldPerson } from '../../../services/user';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function OldPerson() {
  const [isShowOldPersonAddEdit, setIsShowOldPersonAddEdit] = useState(false);
  const [openOldPersonAddEdit, setOpenOldPersonAddEdit] = useState(false);
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
      }
    },
    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
      hideInSearch: true
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {
                  record.birthDate
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
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
      title: '配偶',
      dataIndex: 'isSpouse',
      valueType: 'select',
      render(_, record) {
        const { isSpouse } = record;
        return (
          <Tag color={isSpouse === 1 ? 'green' : isSpouse === 2 ? 'default' : 'red'}>
            {
              isSpouse === 1 ? '在世' : isSpouse === 2 ? '已故' : '未婚'
            }
          </Tag>
        )
      },
      async request() {
        return [
          {
            value: 1,
            label: '在世'
          },
          {
            value: 2,
            label: '已故'
          },
          {
            value: 3,
            label: '未婚'
          },
        ]
      }
    },
    {
      title: '住址',
      dataIndex: 'address',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: '家属姓名',
      dataIndex: 'familyMember',
    },
    {
      title: '关系',
      dataIndex: 'relation',
      hideInSearch: true
    },
    {
      title: '家属电话',
      dataIndex: 'familyMemberPhone',
      copyable: true,
      hideInSearch: true
    },
    {
      title: '家属工作',
      dataIndex: 'familyMemberJob',
      hideInSearch: true
    },
    {
      title: '家属住址',
      dataIndex: 'familyMemberAddress',
      hideInSearch: true,
      ellipsis: true
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
                {moment(Number(record.createTime)).format('YYYY-MM-DD')}
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {moment(Number(record.createTime)).format('YYYY-MM-DD')}
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
      fixed: 'right',
      render(_, record) {
        return (
          <Space>
            <Button
              type='link'
              onClick={() => handleAddEdit(true, record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type='link' danger>
                删除
              </Button>
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
    setIsShowOldPersonAddEdit(true);
    setOpenOldPersonAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteOldPerson(id);
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
          const res = await pageOldPerson(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        scroll={{
          x: 2000
        }}
        search={{
          defaultCollapsed: false
        }}
        rowKey="id"
        headerTitle="人员管理"
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
        isShowOldPersonAddEdit && (
          <OldPersonAddEdit
            openOldPersonAddEdit={openOldPersonAddEdit}
            setOpenOldPersonAddEdit={setOpenOldPersonAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
