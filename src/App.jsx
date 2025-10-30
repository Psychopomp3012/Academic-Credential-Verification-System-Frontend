import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import InitializeIssuer from './pages/InitializeIssuer'
import CreateUserDid from './pages/CreateUserDid'
import IssueCredential from './pages/IssueCredential'
import GetCredentials from './pages/GetCredentials'


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'


function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const request = async (opts) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios({ baseURL: API_BASE, ...opts })
      setLoading(false)
      return res.data
    } catch (err) {
      setLoading(false)
      setError(err.response?.data || err.message)
      throw err
    }
  }


  return { loading, error, request }
}

function Header() {
  return (
    <header className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold">Academic Credentials — Issuer UI</h1>
      </div>
      <nav className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        <Link to="/" className="hover:underline w-40 py-2 font-bold text-lg bg-black rounded-lg text-center">Initialize</Link>
        <Link to="/create-user" className="hover:underline w-40 py-2 font-bold text-lg bg-black rounded-lg text-center">Create DID</Link>
        <Link to="/issue" className="hover:underline w-40 py-2 font-bold text-lg bg-black rounded-lg text-center">Issue Credential</Link>
        <Link to="/view" className="hover:underline w-40 py-2 font-bold text-lg bg-black rounded-lg text-center">Get Credentials</Link>
      </nav>
    </header>
  )
}


function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">{children}</div>
  )
}

export default function App() {
  const api = useApi()

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-5xl mx-auto p-6 space-y-6">
          <Routes>
            <Route path="/" element={<Card><InitializeIssuer api={api} /></Card>} />
            <Route path="/create-user" element={<Card><CreateUserDid api={api} /></Card>} />
            <Route path="/issue" element={<Card><IssueCredential api={api} /></Card>} />
            <Route path="/view" element={<Card><GetCredentials api={api} /></Card>} />
          </Routes>

        </main>
      </div>
    </Router>
  )
}
