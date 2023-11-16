import {
  Box,
  useTheme,
  Button,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios'
import { tokens } from '../../../theme'
import { mockDataCategory } from '../../data/mockData'
import Header from '../../components/Header'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'react-toastify/dist/ReactToastify.css'

function CategoryForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const admin_jwtToken = sessionStorage.getItem('admin-jwtToken')

  let navigate = useNavigate()

  const saveCategory = (e) => {
    let data = { name, description }

    fetch('http://localhost:8080/api/category/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + admin_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })

            setTimeout(() => {
              //   navigate("/category");
              window.location.reload(true)
            }, 2000) // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setTimeout(() => {
              window.location.reload(true)
            }, 2000) // Redirect after 3 seconds
          } else {
            toast.error('It Seems Server is down!!!', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setTimeout(() => {
              window.location.reload(true)
            }, 2000) // Redirect after 3 seconds
          }
        })
      })
      .catch((error) => {
        console.error(error)
        toast.error('It seems server is down', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          window.location.reload(true)
        }, 1000) // Redirect after 3 seconds
      })
    e.preventDefault()
  }

  // Example toast message
  // toast.success('Category added successfully!', {
  //     position: 'top-center',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  const handleFormSubmit = (values) => {
    console.log(values)
  }

  const isNonMobile = useMediaQuery('(min-width:600px)')

  const formik = useFormik({
    initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  })

  return (
    <Box>
      <div className="card-body text-color mt-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <b>Category Title</b>
            </label>
            <TextField
              fullWidth
              id="title"
              variant="outlined"
              style={{ backgroundColor: 'white' }}
              placeholder="Enter category.."
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
            />
          </div>

          <Box mt={2} />

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <b>Category Description</b>
            </label>
            <TextField
              fullWidth
              id="description"
              variant="outlined"
              style={{ backgroundColor: 'white' }}
              placeholder="Enter description.."
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              value={description}
            />
          </div>

          {/* Add more spacing if needed */}
          <Box mt={2} />

          <div className="d-flex aligns-items-center justify-content-center mb-2">
            <Button
              type="submit"
              onClick={saveCategory}
              variant="contained"
              color="secondary"
            >
              Add Category
            </Button>
          </div>

          <ToastContainer />
        </form>
      </div>
    </Box>
  )
}

const checkoutSchema = yup.object().shape({
  category: yup.string().required('required'),
  description: yup.string().required('required'),
})
const initialValues = {
  category: '',
  description: '',
}

export default CategoryForm
