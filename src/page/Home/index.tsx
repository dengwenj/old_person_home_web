import { useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/plots';

import { getAllCheckIn } from '../../services/checkIn';
import { getPeopleByAge } from '../../services/user';

export default function Home() {
  const [checkInData, setCheckInData] = useState([]);
  const [ageData, setAgeData] = useState([]);

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
