import React, { useState } from 'react'

function InitializeIssuer({ api }) {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)


  const handleInit = async () => {
    setResult(null)
    setError(null)
    try {
      const data = await api.request({ url: '/initialize', method: 'POST' })
      setResult(data)
    } catch (err) {
      setError(api.error || 'Request failed')
    }
  }


  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Initialize Issuer DID</h2>
      <p className="text-sm text-gray-600 mb-4">Run this once to initialize the issuer on the backend.</p>
      <button onClick={handleInit} className="px-4 py-2 bg-indigo-600 text-white rounded hover:opacity-90">Initialize</button>


      {api.loading && <p className="mt-3">Working...</p>}
      {result && <pre className="mt-3 p-3 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>}
      {error && <p className="mt-3 text-red-600">{JSON.stringify(error)}</p>}
    </div>
  )
}

export default InitializeIssuer;