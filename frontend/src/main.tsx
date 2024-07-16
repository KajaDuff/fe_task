import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import App from './App';
import { AttributesPage } from './pages/Attributes/AttributesPage';
import { AttributeDetailPage } from './pages/AttributeDetail/AttributeDetailPage';
import { ErrorPage } from './pages/Error/ErrorPage';
import { RoutesEnum } from './constants/routes';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesEnum.Home} element={<App />}>
      <Route index element={<HomePage />} />
      <Route path={RoutesEnum.Error} element={<ErrorPage />} />
      <Route path={RoutesEnum.Atribbutes} element={<AttributesPage />} />
      <Route path={RoutesEnum.AttributeDetail} element={<AttributeDetailPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
