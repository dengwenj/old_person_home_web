import { useEffect } from 'react';
import { useRoutes, Navigate, useNavigate } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

import Layout from '../page/Layout';
import Home from '../page/Home';
import Login from '../page/User/Login';
import NotFount from '../page/404';
import OldPerson from '../page/User/OldPerson';
import User from '../page/User';
import Admin from '../page/User/Admin';
import Healthy from '../page/Healthy';
import HealthyFile from '../page/Healthy/HealthyFile';
import CasesFile from '../page/Healthy/CasesFile';
import Lift from '../page/Life';
import Workrest from '../page/Life/Workrest';
import GoOut from '../page/Life/GoOut';
import Checkin from '../page/CheckIn';
import CheckinReg from '../page/CheckIn/CheckinReg';
import BedRoom from '../page/CheckIn/BedRoom';
import Safety from '../page/Safety';
import Accident from '../page/Safety/Accident';
import Visitors from '../page/Safety/Visitors';
import Careworker from '../page/Careworker';

// const Layout = lazy(() => import('../page/Layout'));
// const Home = lazy(() => import('../page/Home/index'));
// const Login = lazy(() => import('../page/User/Login'));
// const NotFount = lazy(() => import('../page/404'));
// const OldPerson = lazy(() => import('../page/User/OldPerson'));
// const User = lazy(() => import('../page/User/index'));
// // const Admin = lazy(() => import('../page/User/Admin'));
// const Healthy = lazy(() => import('../page/Healthy'));
// const HealthyFile = lazy(() => import('../page/Healthy/HealthyFile'));
// const CasesFile = lazy(() => import('../page/Healthy/CasesFile'));
// const Lift = lazy(() => import('../page/Life'));
// const Workrest = lazy(() => import('../page/Life/Workrest'));
// const GoOut = lazy(() => import('../page/Life/GoOut'));
// const Checkin = lazy(() => import('../page/CheckIn'));
// const CheckinReg = lazy(() => import('../page/CheckIn/CheckinReg'));
// const BedRoom = lazy(() => import('../page/CheckIn/BedRoom'));
// const Safety = lazy(() => import('../page/Safety'));
// const Accident = lazy(() => import('../page/Safety/Accident'));
// const Visitors = lazy(() => import('../page/Safety/Visitors'));
// const Careworker = lazy(() => import('../page/Careworker'));

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
