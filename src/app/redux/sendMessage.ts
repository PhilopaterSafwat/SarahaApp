import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "../(components)/SendMessage/[id]/page";

const initialState = {
    data: {},
    isLoding: false,
    error: {}
}
export const senMessage = createAsyncThunk("MessageSlice/senMessage", async (values: sendMessage, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("https://whisperapi-production.up.railway.app/message/", values, {
            headers: {
                "accept-language": "en"

            }
        })

        return data.data
    } catch (error:any) {
        return rejectWithValue(error.response?.data || { message: "حدث خطأ غير متوقع" })
    }
})

const MessageSlice = createSlice({
    name: 'Sendmessage',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(senMessage.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoding = false
        });
        bulider.addCase(senMessage.pending, (state) => {
            state.isLoding = true
        });
    },
    reducers: {

    }
})
export const MessageReducer = MessageSlice.reducer