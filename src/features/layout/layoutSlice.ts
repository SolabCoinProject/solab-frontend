import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    adminSidebarItemOptions,
    appHeaderOptions,
    LayoutState,
} from './types';

const initialState: LayoutState = {
    app: {
        activeHeaderItem: appHeaderOptions.home,
        ref: '',
    },
    admin: {
        isSidebarOpen: false,
        activeSidebarItem: adminSidebarItemOptions.dashboard,
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
        toggleAdminSidebar: (state) => {
            state.admin.isSidebarOpen = !state.admin.isSidebarOpen;
        },
        updateActiveSidebarItem: (
            state,
            action: PayloadAction<adminSidebarItemOptions>
        ) => {
            state.admin.activeSidebarItem = action.payload;
        },
    },
});

export const {
    updateActiveHeaderItem,
    toggleAdminSidebar,
    updateActiveSidebarItem,
} = layoutSlice.actions;

export default layoutSlice.reducer;
