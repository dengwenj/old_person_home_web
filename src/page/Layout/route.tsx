import {
  UserOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  CoffeeOutlined,
  HomeOutlined,
  ApiOutlined,
  SolutionOutlined
} from '@ant-design/icons';

export default {
  path: '/',
  children: [
    {
      path: '/home',
      icon: <SmileOutlined />,
      name: '工作台',
    },
    {
      path: '/user',
      icon: <UserOutlined />,
      name: '用户管理',
      children: [
        {
          path: '/user/admin',
          name: '账号管理'
        },
        {
          path: '/user/oldperson',
          name: '人员管理'
        }
      ]
    },
    {
      path: '/healthy',
      icon: <FieldTimeOutlined />,
      name: '健康管理',
      children: [
        {
          path: '/healthy/file',
          name: '健康档案'
        },
        {
          path: '/healthy/cases',
          name: '病历档案'
        }
      ]
    },
    {
      path: '/life',
      icon: <CoffeeOutlined />,
      name: '生活管理',
      children: [
        {
          path: '/life/workrest',
          name: '作息计划'
        },
        {
          path: '/life/goout',
          name: '外出报备'
        }
      ]
    },
    {
      path: '/checkin',
      icon: <HomeOutlined />,
      name: '入住管理',
      children: [
        {
          path: '/checkin/register',
          name: '入住登记'
        },
        {
          path: '/checkin/bedroom',
          name: '寝室管理'
        }
      ]
    },
    {
      path: '/safety',
      icon: <ApiOutlined />,
      name: '安全管理',
      children: [
        {
          path: '/safety/accident',
          name: '事故记录'
        },
        {
          path: '/safety/visitors',
          name: '访客记录'
        }
      ]
    },
    {
      path: '/careworker',
      icon: <SolutionOutlined />,
      name: '护工管理',
    },
  ]
}