import { useEffect, lazy } from 'react';
import { useRoutes, Navigate, useNavigate } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

const Layout = lazy(() => import('../page/Layout'));
const Home = lazy(() => import('../page/Home/index'));
const Login = lazy(() => import('../page/User/Login'));
const NotFount = lazy(() => import('../page/404'));
const OldPerson = lazy(() => import('../page/User/OldPerson'));
const User = lazy(() => import('../page/User/index'));
const Admin = lazy(() => import('../page/User/Admin'));
const Healthy = lazy(() => import('../page/Healthy'));
const HealthyFile = lazy(() => import('../page/Healthy/HealthyFile'));
const CasesFile = lazy(() => import('../page/Healthy/CasesFile'));
const Lift = lazy(() => import('../page/Life'));
const Workrest = lazy(() => import('../page/Life/Workrest'));
const GoOut = lazy(() => import('../page/Life/GoOut'));
const Checkin = lazy(() => import('../page/CheckIn'));
const CheckinReg = lazy(() => import('../page/CheckIn/CheckinReg'));
const BedRoom = lazy(() => import('../page/CheckIn/BedRoom'));
const Safety = lazy(() => import('../page/Safety'));
const Accident = lazy(() => import('../page/Safety/Accident'));
const Visitors = lazy(() => import('../page/Safety/Visitors'));
const Careworker = lazy(() => import('../page/Careworker'));

const route: RouteObject[] = [
  {
    path: '/user/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/user',
        element: <User />,
        children: [
          {
            path: 'admin',
            element: <Admin />
          },
          {
            path: 'oldperson',
            element: <OldPerson />
          }
        ]
      },
      {
        path: '/healthy',
        element: <Healthy />,
        children: [
          {
            path: '/healthy/file',
            element: <HealthyFile />,
          },
          {
            path: '/healthy/cases',
            element: <CasesFile />,
          }
        ]
      },
      {
        path: '/life',
        element: <Lift />,
        children: [
          {
            path: '/life/workrest',
            element: <Workrest />,
          },
          {
            path: '/life/goout',
            element: <GoOut />,
          }
        ]
      },
      {
        path: '/checkin',
        element: <Checkin />,
        children: [
          {
            path: '/checkin/register',
            element: <CheckinReg />,
          },
          {
            path: '/checkin/bedroom',
            element: <BedRoom />,
          }
        ]
      },
      {
        path: '/safety',
        element: <Safety />,
        children: [
          {
            path: '/safety/accident',
            element: <Accident />,
          },
          {
            path: '/safety/visitors',
            element: <Visitors />,
          }
        ]
      },
      {
        path: '/careworker',
        element: <Careworker />,
      },
    ]
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
