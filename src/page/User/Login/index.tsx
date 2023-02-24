import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Tabs, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { login } from '../../../services';
import logo from '../../../access/imgs/old_person.png';
import loginbgc from '../../../access/imgs/loginbgc.jpg';
import './index.css';

export default () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'white', height: 'calc(100vh)' }}>
      <LoginFormPage
        backgroundImageUrl={loginbgc}
        logo={logo}
        title="社区养老院"
        subTitle="社区养老院系统是合阳大道最具影响力的设计系统"
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: '#fff',
            borderRadius: 8,
            backgroundColor: '#00b96b',
          },
          title: '社区养老院设计规范',
          subTitle: '社区养老院设计规范',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: '#fff',
                color: '#00b96b',
                width: 120,
              }}
            >
              社区养老
            </Button>
          ),
        }}
        onFinish={async (params) => {
          try {
            const res = await login(params as { username: string, password: string });
            localStorage.setItem('old_person_home_token', res.token);
            localStorage.setItem('o_p_h_user_info', JSON.stringify(res.data));
            message.success(res.msg);
            navigate('/home');
          } catch (error) {
            // console.log(error);
          }
        }}
      >
        <Tabs
          centered
          activeKey={'account'}
          items={[{ key: 'account', label: '账号密码登录' }]}
        />
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
      </LoginFormPage>
    </div>
  );
};
