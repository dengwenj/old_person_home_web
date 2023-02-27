import { useState } from 'react';
import { Alert, Dropdown, message, Modal, Popconfirm, Tag } from 'antd';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import {
  UserOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  CoffeeOutlined,
  HomeOutlined,
  ApiOutlined,
  SolutionOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import logo from '../../access/imgs/logo.png';
import cs from '../../access/imgs/cs.png';
import { apiPost } from '../../services';

export default () => {
  const location = useLocation;
  const [pathname, setPathname] = useState(location().pathname);
  const navigate = useNavigate();
  const [isShowReset, setIsShowReset] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const role = JSON.parse(localStorage.getItem('o_p_h_user_info') || '')?.role
  const obj = role === 1 ? {
    path: '/user/admin',
    name: '账号管理'
  } : {}

  const time = Date.now();
  const date = new Date(time);
  const year = date.getFullYear();

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
        route={{
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
                obj,
                {
                  path: '/user/oldperson',
                  name: '人员管理'
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
        }}
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
                    {
                      key: 'newPassword',
                      icon: <ExclamationCircleOutlined />,
                      label: '重置密码',
                      onClick() {
                        setIsShowReset(true);
                        setOpenReset(true);
                      }
                    }
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
              <div>© {year} 社区养老院设计</div>
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

      {/* 重置密码 */}
      {
        isShowReset && (
          <Modal
            title="重置密码"
            open={openReset}
            onCancel={() => setOpenReset(false)}
            onOk={async () => {
              const res = await apiPost('/user/reset', {});
              setOpenReset(false);
              navigate('/user/login');
              localStorage.removeItem('old_person_home_token');
              localStorage.removeItem('o_p_h_user_info');
              message.success(res.msg + '请重新登录');
            }}
          >
            <Alert message="重置的密码为：000000" type="info" showIcon />
          </Modal>
        )
      }
    </div>
  );
};