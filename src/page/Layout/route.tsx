import {
  UserOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  CoffeeOutlined,
  HomeOutlined,
  ApiOutlined,
  SolutionOutlined
} from '@ant-design/icons';

export default [
  {
    key: '/home',
    icon: <SmileOutlined />,
    label: '工作台',
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '用户管理',
    children: [
      {
        key: '/user/admin',
        label: '账号管理'
      },
      {
        key: '/user/oldperson',
        label: '人员管理'
      }
    ]
  },
  {
    key: '/healthy',
    icon: <FieldTimeOutlined />,
    label: '健康管理',
    children: [
      {
        key: '/healthy/file',
        label: '健康档案'
      },
      {
        key: '/healthy/cases',
        label: '病历档案'
      }
    ]
  },
  {
    key: '/life',
    icon: <CoffeeOutlined />,
    label: '生活管理',
    children: [
      {
        key: '/life/workrest',
        label: '作息计划'
      },
      {
        key: '/life/goout',
        label: '外出报备'
      }
    ]
  },
  {
    key: '/checkin',
    icon: <HomeOutlined />,
    label: '入住管理',
    children: [
      {
        key: '/checkin/register',
        label: '入住登记'
      },
      {
        key: '/checkin/bedroom',
        label: '寝室管理'
      }
    ]
  },
  {
    key: '/safety',
    icon: <ApiOutlined />,
    label: '安全管理',
    children: [
      {
        key: '/safety/accident',
        label: '事故记录'
      },
      {
        key: '/safety/visitors',
        label: '访客记录'
      }
    ]
  },
  {
    key: '/careworker',
    icon: <SolutionOutlined />,
    label: '护工管理',
  },
]
export const pathLabel: { path: string, label: string }[] = [
  {
    path: '/home',
    label: '工作台'
  },
  {
    path: '/user',
    label: '用户管理'
  },
  {
    path: '/user/admin',
    label: '账号管理'
  },
  {
    path: '/user/oldperson',
    label: '人员管理'
  },
  {
    path: '/healthy',
    label: '健康管理'
  },
  {
    path: '/healthy/file',
    label: '健康档案'
  },
  {
    path: '/healthy/cases',
    label: '病历档案'
  },
  {
    path: '/life',
    label: '生活管理'
  },
  {
    path: '/life/workrest',
    label: '作息计划'
  },
  {
    path: '/life/goout',
    label: '外出报备'
  },
  {
    path: '/checkin',
    label: '入住管理'
  },
  {
    path: '/checkin/register',
    label: '入住登记'
  },
  {
    path: '/checkin/bedroom',
    label: '寝室管理'
  },
  {
    path: '/safety',
    label: '安全管理'
  },
  {
    path: '/safety/accident',
    label: '事故管理'
  },
  {
    path: '/safety/visitors',
    label: '访客管理'
  },
  {
    path: '/careworker',
    label: '护工管理'
  },
];
