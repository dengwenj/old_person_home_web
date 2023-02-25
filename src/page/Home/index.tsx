import { useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/plots';

import { getAllCheckIn } from '../../services/checkIn';

export default function Home() {
  const [checkInData, setCheckInData] = useState([]);

  useEffect(() => {
    getAllCheckIn().then((res) => {
      setCheckInData(res.data)
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

  const data = [
    {
      type: '60-65岁',
      value: 27,
    },
    {
      type: '66-70岁',
      value: 25,
    },
    {
      type: '71-75岁',
      value: 18,
    },
    {
      type: '76-80岁',
      value: 15,
    },
    {
      type: '81-85岁',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config2 = {
    appendPadding: 10,
    data,
    angleField: 'value',
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
            老人年龄范围
          </div>
          <div>
            <Pie {...config2} />
          </div>
        </div>
      </div>
    </>
  )
}
