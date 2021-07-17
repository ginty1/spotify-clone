import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    //curent state of the imag
    cameraImage: null,
  },
  reducers: {
    //setCamera & resertCamera fuction
    setCameraImge: (state, action) => {
      state.cameraImage = action.payload;
    },
    resertCameraImge: (state) => {
      state.cameraImage = null;
    },
  },
});

export const { setCameraImge, resertCameraImge } = cameraSlice.actions;
export const selectcameraImage = (state) => state.camera.cameraImage;
export default cameraSlice.reducer;
