import React, { useState } from 'react'

function IssueCredential({ api }) {
  const [form, setForm] = useState({
    studentName: '',
    degree: '',
    major: '',
    gpa: '',
    graduationYear: '',
    institutionName: '',
    studentEmail: '',
    ownerDid: ''
  })
  const [result, setResult] = useState(null)


  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))


  const submit = async (e) => {
    e.preventDefault()
    setResult(null)
    try {
      // expected backend shape — adjust keys to match your server
      const payload = {
        ownerDid: form.ownerDid,
        credentialSubject: {
          studentName: form.studentName,
          degree: form.degree,
          major: form.major,
          gpa: form.gpa,
          graduationYear: form.graduationYear,
          institutionName: form.institutionName,
          studentEmail: form.studentEmail
        }
      }
      const data = await api.request({ url: '/issue-academic-credential', method: 'POST', data: payload })
      setResult(data)
    } catch (err) {
      // handled by hook
    }
  }


  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Issue Academic Credential</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Owner DID (recipient)" value={form.ownerDid} onChange={onChange('ownerDid')} className="block w-full p-2 rounded border-gray-200" required />
        <input placeholder="Student Name" value={form.studentName} onChange={onChange('studentName')} className="block w-full p-2 rounded border-gray-200" required />
        <input placeholder="Degree (e.g. Bachelor of Science)" value={form.degree} onChange={onChange('degree')} className="block w-full p-2 rounded border-gray-200" required />
        <input placeholder="Major / Field" value={form.major} onChange={onChange('major')} className="block w-full p-2 rounded border-gray-200" />
        <input placeholder="GPA" value={form.gpa} onChange={onChange('gpa')} className="block w-full p-2 rounded border-gray-200" />
        <input placeholder="Graduation Year" value={form.graduationYear} onChange={onChange('graduationYear')} className="block w-full p-2 rounded border-gray-200" />
        <input placeholder="Institution Name" value={form.institutionName} onChange={onChange('institutionName')} className="block w-full p-2 rounded border-gray-200" />
        <input placeholder="Student Email" value={form.studentEmail} onChange={onChange('studentEmail')} className="block w-full p-2 rounded border-gray-200" />


        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Issue Credential</button>
        </div>
      </form>


      {api.loading && <p className="mt-3">Working...</p>}
      {api.error && <p className="mt-3 text-red-600">{JSON.stringify(api.error)}</p>}
      {result && <pre className="mt-3 p-3 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

export default IssueCredential;