import { configureStore } from '@reduxjs/toolkit'
import showSlice from './showSlice'

export default configureStore({
  reducer: {
    episode: showSlice
  }
})