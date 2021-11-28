import { createSlice } from "@reduxjs/toolkit"

export const storeApp = createSlice({
    name: "app",
    initialState: {
        cntComm: 0,
        cntData: 0
    },
    reducers: {
        setComm: (state, action) => {
            state.cntComm = action.payload
            console.log(state.cntComm)
        },
        setData: (state, action) => {
            state.cntData = action.payload
            state.cntComm = 0
            console.log(state.cntData)
        }
    }
})

export const {
    setComm,
    setData
} = storeApp.actions

export default storeApp.reducer