import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './reports.scss'
import ErrorComponent from '../../components/error/Error'
import ReportsDatagrid from '../../components/reportsDatagrid/ReportsDatagrid'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../functions/requestMethods'
import Loading from '../../components/loading/Loading'

const Reports = () => {
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
  const [loadingResults, setLoadingResults] = useState(false)
  const [errorLoadingResults, setErrorLoadingResults] = useState(false)
  const [errorMessageLoadingResults, setErrorMessageLoadingResults] =
    useState(null)
  // END OF LOADING AND ERROR DATA

  // FUNCTION TO GET AND SET CANDIDATES' RESULTS
  const getAllResults = async () => {
    try {
      setLoadingResults(true)
      const res = await publicRequest.get('Result/client', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        console.log(res.data)
        setTableData(res.data?.data === '' ? [] : res.data?.data)
        setSearchedTableData(res.data?.data === '' ? [] : res.data?.data)
        setLoadingResults(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoadingResults(false)
      setErrorLoadingResults(true)
      setErrorMessageLoadingResults(error)

      console.log(error)
    }
  }
  // END OF FUNCTION TO GET AND SET CANDIDATES' RESULTS

  // SEARCH FUNCTIONALITY
  const handleSearchParamsChange = (e) => {
    let filteredPendingCandidatesArray
    filteredPendingCandidatesArray = tableData.filter((tableDatum) =>
      tableDatum?.candidateName
        ?.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    )
    setSearchedTableData(filteredPendingCandidatesArray)
    // console.log(filteredPendingCandidatesArray)
  }
  // END OF SEARCH FUNCTIONALITY

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllResults()
  }, [])

  return (
    <div className='reportsWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='reportsRight'>
        <Topber userName={userName} />
        <div className='reportsMainWrapper'>
          <div className='reportsMainTop'>
            <h3 className='reportsMainTopTitle'>Search</h3>
            <div className='reportsMainTopForm'>
              <TextField
                id='outlined-search'
                label='Candidate name'
                type='search'
                className='candidateName'
                onChange={(e) => handleSearchParamsChange(e)}
                size='small'
              />
            </div>
          </div>
          <div className='reportsMainBottom'>
            {loadingResults || errorLoadingResults ? (
              loadingResults ? (
                <Loading />
              ) : (
                <ErrorComponent
                  errorMessage={
                    errorMessageLoadingResults && errorMessageLoadingResults
                  }
                />
              )
            ) : (
              <ReportsDatagrid
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

export default Reports
