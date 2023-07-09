import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './viewClients.scss'
import ViewClientsDatagrid from '../../components/viewClientsDatagrid/ViewClientsDatagrid'
import Loading from '../../components/loading/Loading'
import ErrorComponent from '../../components/error/Error'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../functions/requestMethods'

const ViewClients = () => {
  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role
  const userName = currentUser?.data?.profile?.fullName

  // TABLE DATA
  const [tableData, setTableData] = useState([])
  const [searchedTableData, setSearchedTableData] = useState([])

  // LOADING AND ERROR DATA
  const [loadingClients, setLoadingClients] = useState(false)
  const [errorLoadingClients, setErrorLoadingClients] = useState(false)
  const [errorLoadingClientsMessage, setLoadingClientsErrorMessage] =
    useState(null)
  // END OF LOADING AND ERROR DATA

  // FUNCTION TO GET AND SET PENDING CANDIDATES
  const getAllClients = async () => {
    try {
      setLoadingClients(true)
      const res = await publicRequest.get('Client/Client-list', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        console.log(res.data)
        setTableData(res.data?.data === '' ? [] : res.data?.data)
        setSearchedTableData(res.data?.data === '' ? [] : res.data?.data)
        setLoadingClients(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoadingClients(false)
      setErrorLoadingClients(true)
      setLoadingClientsErrorMessage(error)

      console.log(error)
    }
  }
  // END OF FUNCTION TO GET AND SET PENDING CANDIDATES

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredPendingCandidatesArray
    filteredPendingCandidatesArray = tableData.filter((tableDatum) =>
      tableDatum?.clientName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    )
    setSearchedTableData(filteredPendingCandidatesArray)
    // console.log(filteredPendingCandidatesArray)
  }
  // END OF SEARCH FUNCTIONALITY

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className='viewClientsWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='viewClientsRight'>
        <Topber userName={userName} />
        <div className='viewClientsMainWrapper'>
          <div className='viewClientsMainTop'>
            <h3 className='viewClientsMainTopTitle'>Search</h3>
            <div className='viewClientsMainTopForm'>
              <TextField
                id='outlined-search'
                label='Candidate name'
                type='search'
                className='candidateName'
                onChange={(e) => handleSearchParamsChange(e)}
              />
            </div>
          </div>
          <div className='viewClientsMainBottom'>
            {loadingClients || errorLoadingClients ? (
              loadingClients ? (
                <Loading />
              ) : (
                <ErrorComponent
                  errorMessage={
                    errorLoadingClientsMessage && errorLoadingClientsMessage
                  }
                />
              )
            ) : (
              <ViewClientsDatagrid
                userDetails={currentUser}
                tableData={searchedTableData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewClients
