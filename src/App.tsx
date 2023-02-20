import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesConf from './router';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <Router>
        <RoutesConf />
      </Router>
    </ConfigProvider>
  );
};

export default App;
