import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import jsPDF from 'jspdf'
import { BsDownload } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import DownloadReportPage from '../../pages/downloadReport/DownloadReportPage'
import BiopathLogo from '../../utils/images/BiopathLogo.jpeg'

export default function SimpleBackdrop(props) {
  const { open, handleClose, data } = props
  // console.log(props)

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.html(document.querySelector('#report'), {
      callback: function (doc) {
        // Save the PDF
        doc.save('document-html.pdf')
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 675, //window width in CSS pixels
    })
  }

  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 99,
          backdropFilter: 'blur(5px)',
        }}
        open={open}
      >
        <div
          className='cancelBackdropBtn'
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: '14px',
            height: '40px',
            color: 'white',
            cursor: 'pointer',
            background: 'rgb(138, 17, 17)',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'top',
          }}
          onClick={handleClose}
        >
          Cancel
          <MdCancel style={{ marginLeft: '5px', fontSize: 'large' }} />
        </div>
        <div
          onClick={generatePDF}
          style={{
            position: 'absolute',
            top: 20,
            right: 120,
            height: '40px',
            fontSize: '14px',
            color: 'white',
            cursor: 'pointer',
            background: 'black',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Download
          <span>
            <BsDownload style={{ marginLeft: '5px', fontSize: 'large' }} />
          </span>
        </div>
        <DownloadReportPage data={data} generatePDF={generatePDF} />
      </Backdrop>
    </div>
  )
}
