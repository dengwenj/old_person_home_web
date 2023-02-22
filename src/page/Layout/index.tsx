import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Breadcrumb, Layout, Menu, message } from 'antd';

import items, { pathLabel } from './route';
import logo from '../../access/imgs/logo.png';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyPath, setKeyPath] = useState<string[]>([location.pathname, `/${location.pathname.split('/')[1]}`]);


  return (
    <Layout style={{ height: '100%' }}>
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
          style={{ paddingTop: 65, height: '100%' }}
          theme='light'
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}
          items={items}
          onClick={(info) => {
            setKeyPath(info.keyPath);
            navigate(info.key);
            const label = pathLabel.find((item) => item.path === info.key)?.label;
            document.title = `${label || ''} - 养老院系统`;
          }}
        />
        <Footer
          style={{
            textAlign: 'center',
            position: 'absolute',
            padding: '20px 0',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
          }}>©2023 养老院系统设计</Footer>
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
                keyPath.reverse().map((item) => {
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
                    onClick() {
                      navigate('/user/login');
                      localStorage.removeItem('old_person_home_token');
                      localStorage.removeItem('o_p_h_user_info');
                      message.info('登出成功');
                    }
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
                <span style={{ marginLeft: 10 }}>
                  {
                    JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.username
                  }
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{}}>
          <div style={{ padding: 24, minHeight: 360, }}>
            <Outlet />
          </div>
        </Content>
      </Layout >
    </Layout >
  );
};

export default MyLayout;
