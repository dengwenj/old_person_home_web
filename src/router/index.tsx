import { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../page/Home'))

const route: RouteObject[] = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/',
    element: <Navigate to={'/home'} />
  }
]

export default function RoutesConf() {
  return useRoutes(route)
}
