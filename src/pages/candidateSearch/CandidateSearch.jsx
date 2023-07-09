import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Topber from '../../components/topbar/Topber'
import './candidateSearch.scss'
import CandidateSearchDatagrid from '../../components/candidateSearchDatagrid/CandidateSearchDatagrid'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import ErrorComponent from '../../components/error/Error'
import Loading from '../../components/loading/Loading'
import { RxReload } from 'react-icons/rx'

const CandidateSearch = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role
  const userName = currentUser?.data?.profile?.fullName

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  // END OF LOADING AND ERROR DATA

  // TABLE DATA
  const [tableData, setTableData] = useState([])

  // CLIENTS DATA
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(null)

  // CANDIDATE'S PHONE NUMBER
  const [phoneNumber, setPhoneNumber] = useState('')

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    try {
      setLoading(true)
      const res = await publicRequest.get('/Candidate', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setTableData(res.data?.data?.reverse())
        setLoading(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage(error)

      console.log(error)
    }
  }
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES
  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  const getAllClients = async () => {
    try {
      const res = await publicRequest.get('Client/Client-list', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.data) {
        setClients(res.data.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTION FOR SETTING CLIENT ID
  const handlescheduleCandidateInfo = (e, dataName, data) => {
    setClientId(data?.clientId)
  }
  //END OF FUNCTION FOR SETTING CLIENT ID

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates()
  }, [])

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads

  // FUNCTION TO HANDLE PHONE NUMBER CHANGE
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target?.value)
  }
  // END OF FUNCTION TO HANDLE PHONE NUMBER CHANGE

  // FUNCTION TO HANDLE CANDIDATE SEARCH
  const handleCandidateSearch = async () => {
    toastId.current = toast('Please wait...', {
      autoClose: 3000,
      isLoading: true,
    })
    try {
      const res = await publicRequest.get(
        `Candidate/SearchByPhoneNumber?Clientid=${clientId}&phone=${phoneNumber?.trim()}`,
        {
          headers: {
            Accept: '*',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res?.data?.data?.length === 0) {
        throw new Error('Candidate not found')
      } else {
        toast.update(toastId.current, {
          render: 'Candidate found!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setTableData(res?.data?.data)
      }
    } catch (error) {
      console.log(error.message)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 3000,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
    }
  }
  // END FUNCTION TO HANDLE CANDIDATE SEARCH

  return (
    <>
      <ToastContainer />
      <div className='candidateSearchWrapper'>
        <Sidebar loggedInUserRole={loggedInUserRole} />
        <div className='candidateSearchRight'>
          <Topber userName={userName} />
          <div className='candidateSearchMainWrapper'>
            <div className='candidateSearchMainTop'>
              <h3 className='candidateSearchMainTopTitle'>Search</h3>
              <div className='candidateSearchMainTopForm'>
                {/* <FormControl className='companySelect'>
      <InputLabel id='demo-simple-select-label'>
        Company name
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        //   value={age}
        label='Company name'
        //   onChange={handleChange}
      >
        <MenuItem value={10}>Unity Bank</MenuItem>
        <MenuItem value={20}>Chicken Republic</MenuItem>
      </Select>
    </FormControl>
    <TextField
      id='outlined-search'
      label='Candidate name'
      type='search'
      className='candidateName'
    /> */}
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={clients}
                  getOptionLabel={(option) =>
                    `${option.clientName} ${option.email}`
                  }
                  onChange={(e, option) =>
                    handlescheduleCandidateInfo(e, 'clientid', option)
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Client Name' />
                  )}
                />
                <TextField
                  id='outlined-search'
                  label="Candidate's PhoneNo"
                  type='search'
                  className='candidateName'
                  onChange={(e) => handlePhoneNumberChange(e)}
                />

                <div
                  className='candidateSearchBtn'
                  onClick={handleCandidateSearch}
                >
                  Search
                </div>
                <button className='reloadBtn' onClick={getAllCandidates}>
                  Show All
                  <span>
                    <RxReload className='reloadIcon' />
                  </span>
                </button>
              </div>
            </div>
            <div className='candidateSearchMainBottom'>
              {/* <Loading /> */}
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <CandidateSearchDatagrid
                  userDetails={currentUser}
                  tableData={tableData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CandidateSearch
