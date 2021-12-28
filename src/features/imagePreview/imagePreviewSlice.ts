import { IImagePreviewState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IImagePreviewState = {
    url: '',
    isOpen: false,
};

export const imagePreviewSlice = createSlice({
    name: 'imagePreview',
    initialState,
    reducers: {
        openImagePreview: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
            state.isOpen = true;
        },
        closeImagePreview: (state) => {
            state.isOpen = false;
            state.url = '';
        },
    },
});

export const imagePreviewActions = imagePreviewSlice.actions;

export default imagePreviewSlice.reducer;
