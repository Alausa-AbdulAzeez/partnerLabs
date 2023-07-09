import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import './reportsDatagrid.scss'
import SimpleBackdrop from '../backdrop/Backdrop'
import { publicRequest } from '../../functions/requestMethods'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const ReportsDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
  const [open, setOpen] = React.useState(false)

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({})

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA and REPORTS )
  const [candidateSubmittedResults, setCandidateSubmittedResults] = useState([])

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA REPORTS )
  const [
    loadingCandedateSubmittedResults,
    setLoadingCandedateSubmittedResults,
  ] = useState(false)
  const [candedateSubmittedResultsError, setCandedateSubmittedResultsError] =
    useState(false)
  const [
    candedateSubmittedResultsErrorMsg,
    setCandedateSubmittedResultsErrorMsg,
  ] = useState('')

  // SELECTED CANDIDATE RESULTS
  let [candidateResults, setCandidateResults] = useState([])
  let [selectedCandidateResults, setSelectedCandidateResults] = useState([])

  // COLUMNS
  const defaultColumns = [
    {
      field: 'candidateName',
      headerName: 'Candidate Name',
      width: 350,
      editable: false,
    },
    { field: 'clientName', headerName: 'Client Name', width: 300 },
    // {
    //   field: 'testcategory',
    //   headerName: 'Test Category',
    //   width: 250,
    //   editable: false,
    // },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (param) => {
        console.log(param?.row?.tests?.[0]?.candidateId)
        const rowId = param?.row?.tests?.[0]?.candidateId
        return (
          <>
            <Link to={`/labReport/${rowId}`} target='_blank'>
              <div className='notAuthorized'>View Report</div>
            </Link>
          </>
        )
      },
    },
  ]

  // RESULT COLUMN
  const resultColumn = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'testName',
      headerName: 'Test name',
      width: 150,
    },
    {
      field: 'result',
      headerName: 'Result',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {loggedInUserRole === 'Report' && (
              <div
                className={
                  params?.row?.status === 'PENDING'
                    ? 'pendingResult'
                    : 'approvedResult'
                }
              >
                {params?.row?.status}
              </div>
            )}
          </>
        )
      },
    },
  ]

  const handleClose = () => {
    setOpen(false)
  }

  let rows = props?.tableData
  let columns = defaultColumns
  let title = 'Candidates'
  let leftBtnText = 'View Report'

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row)
    if (e.target.textContent !== 'Authorize') {
      if (position !== '0') {
        setPosition('0')
      }
    }
  }
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // END OF HANDLE ROW CLICK

  // HANDLE LEFT AND RIGHT BUTTON CLICK
  const handleBtnClick = (e) => {
    switch (e.target.textContent) {
      case 'View Report':
        // setOpen(true)
        Navigate({ to: '/labReport' })

        console.log(e.target.textContent)

        break

      default:
        break
    }
  }

  // END OF HANDLE LEFT AND RIGHT BUTTON CLICK

  // USEEFFECT TO UPDATE SELECTED CANDIDATE INFO
  useEffect(() => {
    console.log(selectedCandidate.tests?.[0].candidateId)
    if (selectedCandidate.tests?.[0].candidateId) {
      const getCandidatetResults = async () => {
        console.log(selectedCandidate)
        setLoadingCandedateSubmittedResults(true)
        setCandedateSubmittedResultsError(false)
        try {
          await publicRequest
            .get(
              `Result/candidate/${selectedCandidate.tests?.[0].candidateId}`,
              {
                headers: {
                  Accept: '*',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((res) => {
              setLoadingCandedateSubmittedResults(false)
              console.log(res)
              setLoadingCandedateSubmittedResults(false)
              setCandidateSubmittedResults(res?.data?.data)
            })
        } catch (error) {
          console.log(error)
          setLoadingCandedateSubmittedResults(false)
          setCandedateSubmittedResultsError(true)
          setCandidateSubmittedResults([])
          setCandedateSubmittedResultsErrorMsg(
            error?.response?.data?.title ||
              error?.response?.data?.description ||
              error?.message ||
              'Something went wrong, please try again'
          )
        }
      }

      getCandidatetResults()
    }
  }, [selectedCandidate])

  return (
    <div className='datagridWraper'>
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <div className='slide' style={{ right: position }}>
        <div className='slideTop'>
          <div className='cancelconWrapper' onClick={handleHideSlide}>
            <MdCancel className='cancelIcon' />
          </div>
          <div className='initials'>AA</div>
          <div className='slideFullname'>Alausa Abdulazeez</div>
        </div>
        <div className='companyName h3'>
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className='phoneNo h3'>
          <h3>Candidate Phone Number</h3>
          <p>+23456789010</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>Number of Tests</h3>
          <p>3</p>
        </div>
        {loggedInUserRole === 'Report' && (
          <div className='reportResultsWrapper'>
            <div className='qualityAssuranceAccordionWrapper'>
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls='panel2a-content'
                  id='panel2a-header'
                >
                  <Typography>Candidate Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Age -{selectedCandidate?.age} years</Typography>
                  <Typography>Gender - {selectedCandidate?.gender}</Typography>
                  <Typography>BMI - {selectedCandidate?.bmi}</Typography>
                  <Typography>
                    Height - {selectedCandidate?.height}cm
                  </Typography>
                  <Typography>
                    Weight - {selectedCandidate?.weight}kg
                  </Typography>
                  <Typography>
                    bloodPressure - {selectedCandidate?.bloodPressure}mm/Hg
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            {loadingCandedateSubmittedResults ||
            candedateSubmittedResultsError ? (
              loadingCandedateSubmittedResults ? (
                <div className=''>Loading...</div>
              ) : (
                candedateSubmittedResultsErrorMsg
              )
            ) : candidateSubmittedResults?.length === 0 ? (
              'No test for selected candidate'
            ) : (
              <Box sx={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={candidateSubmittedResults || []}
                  columns={resultColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row?.resultId}
                  onRowSelectionModelChange={(result) => {
                    return setSelectedCandidateResults(result)
                  }}
                />
              </Box>
            )}
          </div>
        )}

        {
          <div className='bottomButtons'>
            <Link
              to={`/labReport/${
                selectedCandidate && selectedCandidate.tests?.[0].candidateId
              }`}
              target='_blank'
            >
              <div className='authorize sendDetails'>{leftBtnText}</div>
            </Link>
          </div>
        }
      </div>
      <div className='boxWrapper'>
        <Box sx={{ height: 350 }}>
          <h3>{title}</h3>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            // checkboxSelection
            // disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(row, e) => handleRowClick(row, e)}
            getRowId={(row) =>
              row[0]?.clientId
                ? row[0]?.candidateId
                : row?.candidateName + row?.clientName
            }
            pagination
          />
        </Box>
      </div>
    </div>
  )
}

export default ReportsDatagrid
