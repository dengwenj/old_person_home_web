import { useEffect } from 'react';
import { lazy } from 'react';
import { useRoutes, Navigate, useNavigate } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../page/Home'));
const Login = lazy(() => import('../page/User/Login'));
const NotFount = lazy(() => import('../page/404'));

const route: RouteObject[] = [
  {
    path: '/user/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/',
    element: <Navigate to={'/home'} />
  },
  {
    path: '*', // 找不到
    element: <NotFount />
  }
];

export default function RoutesConf() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('old_person_home_token');
    if (!token) {
      navigate('/user/login');
    }
  }, [])
  return useRoutes(route);
};
