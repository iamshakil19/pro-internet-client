import { baseApi } from "./api/baseApi";
import bookingReducer from './slice/bookingSlice'
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  bookings: bookingReducer
};
