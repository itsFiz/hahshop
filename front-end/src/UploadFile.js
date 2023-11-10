import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useAuth } from '../src/AuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'

const UploadFile = () => {
  const [file, setFile] = useState(null)
  let [msg, setMsg] = useState('')
  let { token } = useAuth()

  const handleFileChange = (e) => {
    setMsg('')
    setFile(e.target.files[0])
  }

  const handleFileUpload = (event) => {
    event.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      let headers = { Authorization: 'Bearer ' + token }
      fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
        headers: headers,
      })
        .then((body) => {
          console.log(body.status)
          return body.json()
        })
        .then((json) => {
          console.log(json)
          setMsg(json.body)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <form onSubmit={handleFileUpload}>
      {msg && <p className="alert alert-success">{msg}</p>}
      <TextField type="file" onChange={handleFileChange} />
      {/* <button type="submit">Submit</button> */}
      <Button type="submit" variant="outlined" startIcon={<DeleteIcon />}>
        Upload
      </Button>
    </form>
  )
}

export default UploadFile
