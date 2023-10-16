import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import History from './pages/History'
import Search from './pages/Search'



export const AIRoutes=[
  <Route path="/history-details" element={<History/>}/>,
  <Route path="/search" element={<Search/>}/>,
]






