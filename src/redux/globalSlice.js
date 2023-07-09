import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: { isLoggedIn: false },
}

export const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.user.isLoggedIn = true
    },
    loggedOut: (state) => {
      state.user.isLoggedIn = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { loggedIn, loggedOut } = globalSlice.actions

export default globalSlice.reducer
