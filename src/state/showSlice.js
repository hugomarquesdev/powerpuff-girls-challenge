import { createSlice } from '@reduxjs/toolkit'

export const showSlice = createSlice({
  name: 'episode',
  initialState: {
    show: {}, // ALL SHOW DATA
    number: 0, // SELECTED EPISODE NUMBER
    season: 0, // SELECTED EPISODE SEASON
  },
  reducers: {
    selectedNumberState: (state, action) => {
      state.number = action.payload
    },
    selectedSeasonState: (state, action) => {
        state.season = action.payload
    },
    showData: (state, action) => {
        state.show = action.payload
    }
  }
})

export const { selectedNumberState, selectedSeasonState, showData } = showSlice.actions

export default showSlice.reducer