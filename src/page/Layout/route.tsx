import { CrownFilled, SmileFilled } from '@ant-design/icons';

export default {
  path: '/',
  routes: [
    {
      path: '/home',
      name: '工作台',
      icon: <SmileFilled />,
    },
    {
      path: '/user',
      name: '用户管理',
      icon: <CrownFilled />,
      routes: [
        {
          path: '/user/oldperson',
          name: '管理员',
        },
      ],
    },
  ],
};