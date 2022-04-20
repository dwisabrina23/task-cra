import { createSlice } from "@reduxjs/toolkit";
export const songSlice = createSlice({
    name: "song",
    initialState: {
        selected: [],
    },
    reducers: {
        removeSong : (state, action) => {
            console.log("remove song... ", action.payload);
            state.selected = [
                ...state.selected.filter(song => {
                    return song !== action.payload
                })
            ]
        },
        addSong: (state, action) =>{
            console.log("add song... ", action.payload);
            state.selected = [...state.selected, action.payload]
        },
    }
})

export const { addSong, removeSong} = songSlice.actions;

export default songSlice.reducer;