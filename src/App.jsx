import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import AddTrade from './pages/AddTrade'
import Analytics from './pages/Analytics'
import Login from './pages/Login'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {

  const [session, setSession] = useState(null)

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: listener
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  return (

    <BrowserRouter>

      <Routes>

        {!session ? (

          <Route
            path="*"
            element={<Login />}
          />

        ) : (

          <>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/add-trade"
              element={<AddTrade />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="*"
              element={<Navigate to="/" />}
            />

          </>

        )}

      </Routes>

    </BrowserRouter>
  )
}