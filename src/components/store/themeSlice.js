import { createSlice } from "@reduxjs/toolkit";


const initialTheme ={isDark: false};

const ThemeSlice = createSlice({
 name: 'theme',
 initialState: initialTheme,
 reducers:{
    toggleTheme(state){
      state.isDark = !state.isDark;  
     
    }
 }   
})

export const themeActions =ThemeSlice.actions;
export default ThemeSlice.reducer