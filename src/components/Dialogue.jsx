import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { persistor } from '../redux/store'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
  const { open, handleClose } = props
  const navigate = useNavigate()
  //   const [open, setOpen] = React.useState(false)

  //   const handleClickOpen = () => {
  //     setOpen(true)
  //   }

  //   const handleClose = () => {
  //     setOpen(false)
  //   }

  // useEffect(() => {
  //   console.log(isLoggedIn)
  // }, [isLoggedIn])

  return (
    <div>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Confirm Logout'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              persistor.purge()
              navigate('/login')
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
