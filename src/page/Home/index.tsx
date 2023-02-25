import { useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { Avatar, Badge, Descriptions, Divider, Tag } from 'antd';

import { getAllCheckIn } from '../../services/checkIn';
import { getPeopleByAge } from '../../services/user';
import cs from '../../access/imgs/cs.png';

export default function Home() {
  const [checkInData, setCheckInData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  // 加入天数
  const joinInDay = Math.trunc(((
    Date.now() - JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.createTime
  ) / 1000) / (60 * 60 * 24))
  const role = JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.role

  useEffect(() => {
    getAllCheckIn().then((res) => {
      setCheckInData(res.data)
    })
    getPeopleByAge().then((res) => {
      setAgeData(res.data)
    })
  }, [])

  const config = {
    data: checkInData,
    xField: 'month',
    yField: 'peopleNum',
    label: {
      // 可手动配置 label 数据标签位置
      // position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: '月份',
      },
      peopleNum: {
        alias: '入住人员',
      },
    },
  };

  const config2 = {
    data: ageData,
    appendPadding: 10,
    angleField: 'allPeople',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'outer',
      labelHeight: 28,
      content: `{name}\n{value}人`,
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
      <Descriptions
        title={
          <>
            <Avatar size={40} src={cs} />
            <span style={{ marginLeft: 10 }}>
              {JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.username}
            </span>
          </>
        }
      >
        <Descriptions.Item label="身份">
          {role === 1
            ? <Badge status='error' text={'超级管理员'}></Badge>
            : <Badge color='yellow' text={'普通员工'} />
          }
        </Descriptions.Item>
        <Descriptions.Item label="今日任务">
          {
            role === 1
              ? '「视察工作分析数据」'
              : <div>添加处理<Tag color='error' style={{ margin: '0 2px' }}>{100}</Tag>个入住人员</div>
          }

        </Descriptions.Item>
        <Descriptions.Item label="加入系统">
          今天是您加入系统的第<Tag style={{ margin: '0 2px' }} color='cyan'>{joinInDay}</Tag>天
        </Descriptions.Item>
        <Descriptions.Item label="座右铭">「海纳百川，有容乃大」</Descriptions.Item>
        <Descriptions.Item label="爱好">
          {
            ['阅读📚', '滑雪🏂🏻', '摄影📷'].map((item) => {
              return (
                <span key={item}>
                  <Tag color='blue'>{item}</Tag>
                </span>
              )
            })
          }
        </Descriptions.Item>
        <Descriptions.Item label="住址">
          中国 🇨🇳 重庆市合阳大道
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left" ><span style={{ fontSize: 18 }}>如下分析</span></Divider>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <div
            style={{
              marginBottom: 10,
              color: '#262626',
              fontSize: 16
            }}>每月入住人员</div>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div style={{ width: '50%' }}>
          <div
            style={{
              margin: '0 0 20px 50px',
              color: '#262626',
              fontSize: 16
            }}
          >
            老人年龄范围人数
          </div>
          <div>
            <Pie {...config2} />
          </div>
        </div>
      </div>
    </>
  )
}
