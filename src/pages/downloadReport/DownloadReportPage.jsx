import React, { useEffect, useState } from 'react'
import BiopathLogo from '../../utils/images/IMG_6229.png'
import Signature from '../../utils/images/mainSignature-removebg-preview.png'
import './downloadReportPage.scss'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { publicRequest } from '../../functions/requestMethods'
import { useSelector } from 'react-redux'
import { BsDownload } from 'react-icons/bs'

const DownloadReportPage = () => {
  // CANDIDATE DETAILS
  const [candidateDetails, setCandidateDetails] = useState([])
  const [candidateResultDetails, setCandidateResultDetails] = useState([])

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA and REPORTS )
  let candidateSubmittedResults = []

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // GET PAGE PARAMS
  let params = useParams()

  candidateSubmittedResults = [
    { testName: 'malaria', result: '+ve', id: '1' },
    { testName: 'malaria', result: '+ve', id: '2' },
    { testName: 'malaria', result: '+ve', id: '3' },
    { testName: 'malaria', result: '+ve', id: '4' },
    { testName: 'malaria', result: '+ve', id: '5' },
    { testName: 'malaria', result: '+ve', id: '6' },
    { testName: 'malaria', result: '+ve', id: '7' },
    { testName: 'malaria', result: '+ve', id: '8' },
    { testName: 'malaria', result: '+ve', id: '9' },
    { testName: 'malaria', result: '+ve', id: '11' },
    { testName: 'malaria', result: '+ve', id: '21' },
    { testName: 'malaria', result: '+ve', id: '13' },
    { testName: 'malaria', result: '+ve', id: '41' },
    { testName: 'malaria', result: '+ve', id: '15' },
    { testName: 'malaria', result: '+ve', id: '61' },
    { testName: 'malaria', result: '+ve', id: '71' },
    { testName: 'malaria', result: '+ve', id: '81' },
    { testName: 'malaria', result: '+ve', id: '91' },
    { testName: 'malaria', result: '+ve', id: '921' },
  ]

  // RESULT COLUMN
  const resultColumn = [
    {
      field: 'testName',
      headerName: 'Test name',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'result',
      headerName: 'Result',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
  ]

  // USEEFFECT TO GET CANDIDATE DETAILS AND RESULT DETAILS AS PAGE LOADS
  useEffect(() => {
    const getCandidateDetails = async () => {
      try {
        await publicRequest
          .get(`Result/candidate/${params?.candidate}`, {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            setCandidateResultDetails(res?.data?.data)
          })
        await publicRequest
          .get(`Candidate/SearchByID?Candidateid=${params?.candidate}`, {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            console.log(res)
            setCandidateDetails(res?.data?.data)
          })
      } catch (error) {
        params?.candidate &&
          toast.error(
            error?.response?.data?.title ||
              error?.response?.data?.description ||
              error?.message ||
              'Something went wrong, please try again'
          )
        console.log(error)
      }
    }
    getCandidateDetails()
  }, [])

  return (
    <div className='downloadReportPageContainer'>
      <div onClick={() => window.print()} className='downloadBtn'>
        Download
        <span>
          <BsDownload style={{ marginLeft: '5px', fontSize: 'large' }} />
        </span>
      </div>
      <div className='doctorPage'>
        <div className='topLogo'>
          <img src={BiopathLogo} alt='Logo' />
        </div>
        <div className='doctorPageTopDetails'>
          <div className='doctorPageTopName doctorPageTopKey'>
            NAME: <span>{candidateDetails[0]?.candidateName}</span>
          </div>
          <div className='doctorPageTopAge doctorPageTopKey'>
            AGE: <span>{candidateDetails[0]?.age}</span>
          </div>
          <div className='doctorPageTopSex doctorPageTopKey'>
            SEX: <span>{candidateDetails[0]?.gender}</span>
          </div>
          <p>
            I wish to inform you that we have examined the above referenced
            individual referred from your office. We have made the following
            observations as documented below (done following a general physical
            examination and a mandatory laboratory investigation)
          </p>
        </div>
        <div className='parametersInvestigated'>
          <div className='parametersInvestigatedTitle'>
            PARAMETERS INVESTIGATED
          </div>

          <div className='doctorPageTopName doctorPageTopKey'>
            Body Mass Index ----- <span>{candidateDetails[0]?.bmi}</span>
          </div>
          <div className='doctorPageTopName doctorPageTopKey'>
            Blood Pressure -----{' '}
            <span>{candidateDetails[0]?.bloodPressure}mm/Hg</span>
          </div>
        </div>
        <div className='parametersInvestigated'>
          <div className='parametersInvestigatedTitle'>LABORATORY TESTS</div>
          <Box
            height={Math.round((candidateResultDetails.length + 1) * 55)}
            width={650}
          >
            <DataGrid
              style={{ textAlign: 'center' }}
              rows={candidateResultDetails || []}
              columns={resultColumn}
              // pageSize={100}
              // rowsPerPageOptions={[100]}
              getRowId={(row) => row?.resultId}
              hideFooter
            />
          </Box>
        </div>
        <div className='recommendation'>
          <div className='recommendationTitle'>RECOMMENDATION</div>
          <div className='recommendationBody'>
            <p>
              In the light of all the results obtained, the above-named person
              is hereby certified as medically fit.
            </p>
            <p>
              Kindly, find attached the result of Laboratory investigations.
            </p>
            <p>Thank you for choosing BioPath Laboratory </p>
            <img src={Signature} alt='Signature' />
            <div className='nameOfDoc'>Dr Tokunbo Adekoya</div>
            <div className='positionOfDoc'>Head, Medical Services</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadReportPage
