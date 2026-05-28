import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {

    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    navigate('/')
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
      >

        <h1 className="text-4xl font-bold text-white mb-2">
          Ravi Dashboard
        </h1>

        <p className="text-zinc-400 mb-8">
          Sign in to continue
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800 text-white p-4 rounded-2xl outline-none border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white p-4 rounded-2xl outline-none border border-zinc-700"
          />

        </div>

        <button
          className="w-full mt-6 bg-emerald-500 text-black font-bold py-4 rounded-2xl"
        >
          Login
        </button>

      </form>

    </div>
  )
}