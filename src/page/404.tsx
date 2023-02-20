import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom';

export default function NotFount() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，没有该页面"
      extra={<Button type="primary" onClick={() => { navigate('/'); }}>回到「养老社区」首页</Button>}
    />
  )
}
