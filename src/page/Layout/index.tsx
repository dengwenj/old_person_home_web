import { useState } from 'react';
import { Dropdown, message, Tag } from 'antd';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet } from 'react-router-dom';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import route from './route';
import logo from '../../access/imgs/logo.png';
import cs from '../../access/imgs/cs.png';

export default () => {
  const location = useLocation;
  const [pathname, setPathname] = useState(location().pathname);
  const navigate = useNavigate();

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        siderWidth={208}
        layout="mix"
        headerContentRender={() => {
          return (
            <div style={{ marginLeft: 20 }}>
              <span style={{ color: '#575757' }}>「社区养老院系统是合阳大道最具影响力的设计系统」</span>
            </div>
          )
        }}
        route={route}
        menuProps={{
          onClick(info) {
            setPathname(info.key)
            navigate(info.key)
          }
        }}
        location={{
          pathname,
        }}
        avatarProps={{
          src: cs,
          title: `您好 ${JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.username}`,
          size: 'small',
          render: (props, dom) => {
            return (
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
                {dom}
              </Dropdown>
            );
          },
        }}
        title="社区养老院设计"
        logo={logo}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <Tag style={{ fontSize: 12, padding: '0 3px' }}>海纳百川，有容乃大</Tag>
          ];
        }}
        menuFooterRender={(props) => {
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              <div>© 2023 社区养老院设计</div>
            </div>
          );
        }}
      >
        <PageContainer
          header={{
            style: {
              backgroundColor: '#fff',
            }
          }}
        >
          <Outlet />
        </PageContainer>
      </ProLayout>
    </div>
  );
};