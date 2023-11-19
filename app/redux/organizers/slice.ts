import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Organizer, OrganizersStateType } from "./types";

const initialState : OrganizersStateType = {
    organizers: [],
    getOrganizers: {
        loading: 'idle',
        error: null,
    },
}

export const organizersSlice = createSlice({
    name: 'organizers',
    initialState,
    reducers: {
        getOrganizersAction: (state: OrganizersStateType) => {
            state.getOrganizers.loading = 'loading';
            state.getOrganizers.error = null;
        },
        getOrganizersSuccessAction: (state: OrganizersStateType, action: PayloadAction<Organizer[]>) => {
            state.getOrganizers.loading = 'succeeded';
            state.organizers = action.payload;
        },
        getOrganizersFailedAction: (state: OrganizersStateType, action) => {
            state.getOrganizers.loading = 'failed';
            state.getOrganizers.error = action.payload;
        },
    }
})

export const {
    getOrganizersAction,
    getOrganizersSuccessAction,
    getOrganizersFailedAction,
} = organizersSlice.actions;

export default organizersSlice.reducer;