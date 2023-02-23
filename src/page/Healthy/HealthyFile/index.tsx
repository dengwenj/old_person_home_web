/**
 * 健康档案
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import HealthyFileAddEdit from './HealthyFileAddEdit';
import { pageHealthy, deleteHealthy } from '../../../services/healthy';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function HealthyFile() {
  const [isShowHealthyFileAddEdit, setIsShowHealthyFileAddEdit] = useState(false);
  const [openHealthyFileAddEdit, setOpenHealthyFileAddEdit] = useState(false);
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
      width: 100,
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
      title: '体检时间',
      dataIndex: 'PETime',
      hideInSearch: true,
    },
    {
      title: '身高(CM)',
      dataIndex: 'height',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} CM
          </>
        )
      }
    },
    {
      title: '体重(KG)',
      dataIndex: 'weight',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} KG
          </>
        )
      }
    },
    {
      title: '血型',
      width: 80,
      dataIndex: 'bloodType',
      async request() {
        return [
          {
            value: 'A',
            label: 'A'
          },
          {
            value: 'B',
            label: 'B'
          },
          {
            value: 'O',
            label: 'O'
          },
          {
            value: 'AB',
            label: 'AB'
          },
        ]
      },
      render(_, record) {
        const map: Record<string, any> = {
          A: 'blue',
          B: 'purple',
          O: 'gold',
          AB: 'green'
        }
        return (
          <>
            <Tag color={map[record.bloodType.toUpperCase()]}>{record.bloodType}</Tag>
          </>
        )
      }
    },
    {
      title: '心率(60~100次/分)',
      dataIndex: 'heartRate',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} 次/分
          </>
        )
      }
    },
    {
      title: '血氧(95%-100%)',
      dataIndex: 'bloodOxygen',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} %
          </>
        )
      }
    },
    {
      title: '血压(90-140mmHg)',
      dataIndex: 'bloodPressure',
      hideInSearch: true,
      render(text) {
        return (
          <>
            {text} mmHg
          </>
        )
      }
    },
    {
      title: '是否过敏',
      dataIndex: 'isAllergy',
      valueEnum: {
        0: {
          text: '过敏',
          status: 'Error'
        },
        1: {
          text: '不过敏',
          status: 'Success'
        }
      }
    },
    {
      title: '是否吸烟',
      dataIndex: 'isSmoke',
      valueEnum: {
        0: {
          text: '不吸烟',
          status: 'Success'
        },
        1: {
          text: '吸烟',
          status: 'Error'
        }
      }
    },
    {
      title: '健康情况',
      dataIndex: 'healthyDes',
      hideInSearch: true,
      width: 240,
      render(_, record) {
        return (
          <>
            {
              record.healthyDes.split(',').map((item: string) => (
                <span key={item}>
                  <Tag color='blue'>{item}</Tag>
                </span>
              ))
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
    setIsShowHealthyFileAddEdit(true);
    setOpenHealthyFileAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteHealthy(id);
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
          const res = await pageHealthy(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        scroll={{
          x: 2200
        }}
        search={{
          // defaultCollapsed: false
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
        isShowHealthyFileAddEdit && (
          <HealthyFileAddEdit
            openHealthyFileAddEdit={openHealthyFileAddEdit}
            setOpenHealthyFileAddEdit={setOpenHealthyFileAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
