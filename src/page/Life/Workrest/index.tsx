/**
 * 作息计划
 */
import { useCallback, useRef, useState } from 'react';
import { ActionType, ProList } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';

import WorkrestAddEdit from './WorkrestAddEdit';
import { pageWorkrest, deleteWorkrest } from '../../../services/lift';
import spring from '../../../access/imgs/spring.webp';
import summer from '../../../access/imgs/summer.jpg';
import autumn from '../../../access/imgs/autumn.jpg';
import winter from '../../../access/imgs/winter.jpeg';

const map: Record<string, any> = {
  1: '春季',
  2: '夏季',
  3: '秋季',
  4: '冬季'
}
const img: Record<string, any> = {
  1: spring,
  2: summer,
  3: autumn,
  4: winter
}

export default () => {
  const [isShowWorkrestAddEdit, setIsShowWorkrestAddEdit] = useState(false);
  const [openWorkrestAddEdit, setOpenWorkrestAddEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState<Record<string, any>>({});

  const actionRef = useRef<ActionType>();

  const reloadPage = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  /**
   * 处理函数
   */
  const handleAddEdit = (isEdit: boolean, record: Record<string, any>) => {
    setIsEdit(isEdit);
    setRecord(record);
    setIsShowWorkrestAddEdit(true);
    setOpenWorkrestAddEdit(true);
  }

  const handleDelete = async (record: Record<string, any>) => {
    try {
      const res = await deleteWorkrest(record.id);
      message.success(res.msg);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ProList
        rowKey="id"
        actionRef={actionRef}
        toolBarRender={() => {
          return [
            <Button type="primary" onClick={() => handleAddEdit(false, {})}>
              新建
            </Button>
          ];
        }}
        itemLayout="vertical"
        headerTitle="作息时间"
        request={async (params) => {
          const res = await pageWorkrest(params);
          return {
            data: res.data.map((item: any) => {
              return {
                ...item,
                title: map[item.season]
              }
            }),
            success: true
          }
        }}
        metas={{
          title: {},
          description: {
            render: (dom, record: any, idx) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tag>{record.slogan}</Tag>
                  <div style={{ marginRight: 50 }}>
                    <a style={{ marginRight: 20 }} onClick={() => handleAddEdit(true, record)}>编辑</a>
                    <Popconfirm
                      title="确定删除吗？"
                      onConfirm={() => handleDelete(record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a>删除</a>
                    </Popconfirm>
                  </div>
                </div>
              )
            },
          },
          extra: {
            render: (_: any, record: any) => {
              return (
                <div style={{ marginTop: 40, display: 'flex', alignItems: 'center' }}>
                  <img
                    width={300}
                    alt="logo"
                    src={img[record.season]}
                  />
                </div>

              )
            },
          },
          content: {
            render: (_, record) => {
              return (
                <div>
                  <div style={{ marginBottom: 5 }}>上午</div>
                  <div style={{ marginBottom: 4 }}>
                    <span>7-8点：<Tag>{record.sevenEight}</Tag></span>
                    <span>8-9点：<Tag>{record.eightNine}</Tag></span>
                    <span>9-10点：<Tag>{record.nineTen}</Tag></span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <span>10-11点：<Tag>{record.tenEleven}</Tag></span>
                    <span>11-12点：<Tag>{record.elevenTwelve}</Tag></span>
                  </div>
                  <div style={{ marginBottom: 5 }}>下午</div>
                  <div style={{ marginBottom: 4 }}>
                    <span>12-14点：<Tag>{record.twelveFourteen}</Tag></span>
                    <span>14-17点：<Tag>{record.fourteenSeventeen}</Tag></span>
                  </div>
                  <div>
                    <span>17-19点：<Tag>{record.seventeenNineteen}</Tag></span>
                    <span>19-21点：<Tag>{record.nineteenTwentyone}</Tag></span>
                    <span>21点后：<Tag>{record.twentyoneAfter}</Tag></span>
                  </div>
                </div>
              );
            },
          },
        }}
      />


      {/* 新增编辑 */}
      {
        isShowWorkrestAddEdit && (
          <WorkrestAddEdit
            openWorkrestAddEdit={openWorkrestAddEdit}
            setOpenWorkrestAddEdit={setOpenWorkrestAddEdit}
            isEdit={isEdit}
            record={record}
            reloadPage={reloadPage}
          />
        )
      }
    </>
  );
};
