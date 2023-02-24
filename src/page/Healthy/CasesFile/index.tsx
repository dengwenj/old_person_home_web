/**
 * 健康档案
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CasesFileAddEdit from './CasesFileAddEdit';
import { getOldpersonByName } from '../../../services/user';
import { pageCases, deleteCases } from '../../../services/healthy';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function CasesFile() {
  const [isShowCasesFileAddEdit, setIsShowCasesFileAddEdit] = useState(false);
  const [openCasesFileAddEdit, setOpenCasesFileAddEdit] = useState(false);
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
      title: '病历',
      dataIndex: 'cases',
    },
    {
      title: '患病时间',
      dataIndex: 'fallIllTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag>
                {
                  record.fallIllTime
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '是否治疗',
      dataIndex: 'isTreat',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未治疗',
          status: 'Error'
        },
        1: {
          text: '已治疗',
          status: 'Success'
        }
      },
    },
    {
      title: '治疗药品',
      dataIndex: 'treatDrug',
      hideInSearch: true,
    },
    {
      title: '治疗医院',
      dataIndex: 'treatHospital',
      hideInSearch: true,
    },
    {
      title: '治疗费用(元)',
      dataIndex: 'drugPrice',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              record.drugPrice ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>￥</span>
                  <span style={{ color: '#ec5b56', fontSize: 16 }}>{record.drugPrice}</span>
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
    setRecord({ ...record });
    setIsShowCasesFileAddEdit(true);
    setOpenCasesFileAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCases(id);
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

          const res = await pageCases(params);
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
        isShowCasesFileAddEdit && (
          <CasesFileAddEdit
            openCasesFileAddEdit={openCasesFileAddEdit}
            setOpenCasesFileAddEdit={setOpenCasesFileAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}