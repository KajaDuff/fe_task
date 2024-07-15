import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import App from './App';
import { AttributesPage } from './pages/Attributes/AttributesPage';
import { AttributeDetailPage } from './pages/AttributeDetail/AttributeDetailPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/attributes" element={<AttributesPage />} />
      <Route path="/attributes/:id" element={<AttributeDetailPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
