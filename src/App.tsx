import { ConfigProvider } from 'antd';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

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
        <RoutesConf />
      </Router>
    </ConfigProvider>
  );
};

export default App;
