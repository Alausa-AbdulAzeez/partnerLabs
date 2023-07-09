import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import './viewClientsDatagrid.scss'

const ViewClientsDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')

  // SELECTED CLIENT AFTER ROW CLICK
  const [selectedClient, setSelecedClient] = useState({})

  // TABLE DATA
  let rows = props?.tableData
  let title

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role

  // LOGGED IN USER
  const userName = props.userDetails?.data?.profile?.fullName

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedClient(row?.row)
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

  const columns = [
    { field: 'clientName', headerName: 'Company Name', width: 350 },
    {
      field: 'email',
      headerName: 'Company Email',
      width: 250,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Company Phone No.',
      width: 350,
      editable: false,
    },
  ]

  // USEEFFECT TO UPDATE SELECTED CLIENT
  useEffect(() => {}, [selectedClient])

  return (
    <div className='viewClientsDatagridWraper'>
      <div className='viewClientsSlide' style={{ right: position }}>
        <div className='viewClientsSlideTop'>
          <div
            className='viewClientsCancelconWrapper'
            onClick={handleHideSlide}
          >
            <MdCancel className='viewClientsCancelIcon' />
          </div>
          <div className='viewClientsInitials'>
            {selectedClient?.clientName &&
              selectedClient?.clientName[0]?.toUpperCase()}
          </div>
          <div className='viewClientsSlideFullname'>
            {selectedClient?.clientName?.toUpperCase()}
          </div>
        </div>
        <div className='viewClientsCompanyName h3'>
          <h3>Company Name</h3>
          <p>{selectedClient?.clientName}</p>
        </div>

        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Number</h3>
          <p>{selectedClient?.phoneNumber}</p>
        </div>
        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Person</h3>
          <p>{selectedClient?.contactPerson}</p>
        </div>
        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Person Email</h3>
          <p>{selectedClient?.contactPersonEmail}</p>
        </div>
        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Person Phone</h3>
          <p>{selectedClient?.contactPersonPhone}</p>
        </div>

        {/* <div className='accordionWrapper'>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Candidates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='John Afolabi' />
                <ListItemText primary='Pre Employment' />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='Dayo Banjo' />
                <ListItemText primary={`Food Handlers'`} />
                <ListItemText primary={`Pre Employment`} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='John Afolabi' />
                <ListItemText primary={`Food Handlers'`} />
                <ListItemText primary={`Pre Employment`} />
              </ListItemButton>
            </AccordionDetails>
          </Accordion>
          <br />
        </div> */}

        {/* <div className='viewClientsDate'>
          January-<small>24</small>-<small>2024</small>
        </div> */}
      </div>
      <h3>{title}</h3>
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={(row, e) => handleRowClick(row, e)}
          getRowId={(row) => row?.clientId}
          pagination
        />
      </Box>
    </div>
  )
}

export default ViewClientsDatagrid
