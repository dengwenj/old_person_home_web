import { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { PageLoading } from '@ant-design/pro-components';

import RoutesConf from './router';
import './App.css';
import history from './utils/history';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <Router history={history}>
        <Suspense fallback={<PageLoading />}>
          {/* 映射路由 是写的组件 这里也相当于占个位，然后匹配到路径就在这里展示。 一级路由*/}
          <RoutesConf />
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;
