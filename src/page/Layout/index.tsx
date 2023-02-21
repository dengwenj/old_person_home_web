// import { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
// import { PageContainer, ProLayout } from '@ant-design/pro-components';
// import { Avatar, Dropdown } from 'antd';

// import route from './route';

// import logo from '../../access/imgs/logo.png'

// export default () => {
//   const navigate = useNavigate();
//   const [path, setPath] = useState('/user/oldperson');

//   return (
//     <div
//       id="test-pro-layout"
//       style={{
//         height: '100vh',
//       }}
//     >
//       <ProLayout
//         menuProps={{
//           items: [{ key: '/home', title: '工作' }],
//           onClick(info) {
//             setPath(info.key)
//             navigate(info.key)
//           }
//         }}
//         location={{
//           pathname: path
//         }}
//         layout='mix'
//         title="养老院系统设计"
//         logo={logo}
//         headerContentRender={() => {
//           return (
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <Dropdown
//                 menu={{
//                   items: [
//                     {
//                       key: 'logout',
//                       icon: <LogoutOutlined />,
//                       label: '退出登录',
//                     },
//                   ],
//                 }}
//               >
//                 <div style={{ cursor: 'pointer' }}>
//                   <Avatar
//                     src='https://joesch.moe/api/v1/random'
//                     size='default'
//                     icon={<UserOutlined />}
//                   />
//                   <span style={{ marginLeft: 10 }}>admin</span>
//                 </div>
//               </Dropdown>
//             </div>
//           )
//         }}
//         menuFooterRender={(props) => {
//           return (
//             <div
//               style={{
//                 textAlign: 'center',
//                 paddingBlockStart: 12,
//               }}
//             >
//               <div>© 2023 养老社区设计</div>
//             </div>
//           );
//         }}
//       >
//         <PageContainer>
//           <Outlet />
//         </PageContainer>
//       </ProLayout>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import logo from '../../access/imgs/logo.png'
import './index.css'

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '/home',
    icon: <UserOutlined />,
    label: '工作台',
  },
  {
    key: '/user',
    icon: <VideoCameraOutlined />,
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
]
const pathLabel: { path: string, label: string }[] = [
  {
    path: '/home',
    label: '工作台'
  },
  {
    path: '/user',
    label: '用户管理'
  },
  {
    path: '/user/oldperson',
    label: '人员管理'
  }
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyPath, setKeyPath] = useState<string[]>([location.pathname]);


  return (
    <Layout>
      <Sider
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}
        collapsible
        collapsed={collapsed}
        width={208}
        trigger={null}
      >
        <div
          className='trigger'
          onClick={() => {
            setCollapsed(!collapsed)
          }}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>

        <div style={{
          position: 'absolute',
          padding: 15,
          display: 'flex',
          alignItems: 'center',
        }}>
          <img src={logo} width={40} />
          {
            !collapsed && <h1 style={{ marginLeft: 10, fontSize: 16, }}>养老院系统设计</h1>
          }
        </div>
        <div
          style={{
            position: 'absolute',
            top: 63,
            height: 1,
            width: '100%',
            borderBottom: '1px solid #f5f5f5'
          }}
        />
        <Menu
          style={{ paddingTop: 65, height: 500 }}
          theme='light'
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          items={items}
          onClick={(info) => {
            setKeyPath(info.keyPath);
            navigate(info.key);
          }}
          onSelect={(a) => {
            console.log(a);

          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 23px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Breadcrumb>
              {
                keyPath.map((item) => {
                  const res = pathLabel.find((itex) => item === itex.path);

                  return (
                    <Breadcrumb.Item key={item}>{res?.label}</Breadcrumb.Item>
                  )
                })
              }
            </Breadcrumb>

            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                  },
                ],
              }}
            >
              <div style={{ cursor: 'pointer' }}>
                <Avatar
                  src='https://joesch.moe/api/v1/random'
                  size='default'
                  icon={<UserOutlined />}
                />
                <span style={{ marginLeft: 10 }}>admin</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023 养老院系统设计</Footer>
      </Layout>
    </Layout>
  );
};

export default App;