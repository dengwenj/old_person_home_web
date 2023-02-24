/**
 * 入住登记
 */
import { useCallback, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CheckinRegAddEdit from './CheckinRegAddEdit';
import { getOldpersonByName } from '../../../services/user';
import { pageLife, deleteLife, getBedroomByNum } from '../../../services/checkIn';

import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default function CheckinReg() {
  const [isShowCheckinRegAddEdit, setIsShowCheckinRegAddEdit] = useState(false);
  const [openCheckinRegAddEdit, setOpenCheckinRegAddEdit] = useState(false);
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
      title: '入住时间',
      dataIndex: 'checkInTime',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              <Tag color='blue'>
                {
                  record.checkInTime
                }
              </Tag>
            }
          </>
        )
      }
    },
    {
      title: '寝室号',
      dataIndex: 'bedroomNum',
      render(text) {
        return (
          <>
            <Tag color='blue'>
              {text}
            </Tag>
          </>
        )
      },
      valueType: 'select',
      debounceTime: 300,
      async request({ keyWords }) {
        console.log(keyWords);

        if (!keyWords) return [];
        const res = await getBedroomByNum({ bedroomNum: keyWords, isLive: 2 });
        return res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.bedroomNum
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
      title: '寝室价格',
      dataIndex: 'price',
      hideInSearch: true,
      render(_, record) {
        return (
          <>
            {
              record.price ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>￥</span>
                  <span style={{ color: '#ec5b56', fontSize: 16 }}>{record.price}</span>
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
    setIsShowCheckinRegAddEdit(true);
    setOpenCheckinRegAddEdit(true);
  }

  // 删除
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteLife(id);
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
          params.bedroomId = params.bedroomNum;

          const res = await pageLife(params);
          return {
            data: res.data,
            total: res.total,
            success: true
          }
        }}
        search={{
          defaultCollapsed: false
        }}
        rowKey="id"
        headerTitle="入住登记"
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
        isShowCheckinRegAddEdit && (
          <CheckinRegAddEdit
            openCheckinRegAddEdit={openCheckinRegAddEdit}
            setOpenCheckinRegAddEdit={setOpenCheckinRegAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  )
}
