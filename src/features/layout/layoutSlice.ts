import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum appHeaderOptions {
    home = 'home',
    stake = 'company',
    projects = 'projects',
}

export interface LayoutState {
    app: {
        activeHeaderItem: appHeaderOptions;
    };
}

const initialState: LayoutState = {
    app: {
        activeHeaderItem: appHeaderOptions.home,
    },
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        updateActiveHeaderItem: (
            state,
            action: PayloadAction<appHeaderOptions>
        ) => {
            state.app.activeHeaderItem = action.payload;
        },
    },
});

export const { updateActiveHeaderItem } = layoutSlice.actions;

export default layoutSlice.reducer;
