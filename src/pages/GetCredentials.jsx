import React, { useState } from 'react'

function GetCredentials({ api }) {
  const [did, setDid] = useState('')
  const [result, setResult] = useState(null)


  const submit = async (e) => {
    e && e.preventDefault()
    setResult(null)
    try {
      const data = await api.request({ url: '/get-academic-credentials', method: 'POST', data: { ownerDid: did } })
      setResult(data)
    } catch (err) {
      // handled by hook
    }
  }


  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Get Academic Credentials</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Owner DID" value={did} onChange={(e) => setDid(e.target.value)} className="block w-full p-2 rounded border-gray-200" required />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded">Fetch</button>
        </div>
      </form>


      {api.loading && <p className="mt-3">Working...</p>}
      {api.error && <p className="mt-3 text-red-600">{JSON.stringify(api.error)}</p>}
      {result && <pre className="mt-3 p-3 bg-gray-100 rounded overflow-auto max-h-72">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

export default GetCredentials;