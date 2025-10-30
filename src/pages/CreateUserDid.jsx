import React, { useState } from "react"

function CreateUserDid({ api }) {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)


  const submit = async (e) => {
    e.preventDefault()
    setResult(null)
    try {
      const data = await api.request({ url: '/create-user-did', method: 'POST', data: { email } })
      setResult(data)
    } catch (err) {
      // handled by hook
    }
  }


  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Create User DID</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Student Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded border-gray-200 shadow-sm p-2" placeholder="student@example.edu" required />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Create DID</button>
        </div>
      </form>


      {api.loading && <p className="mt-3">Working...</p>}
      {result && <pre className="mt-3 p-3 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
export default CreateUserDid;