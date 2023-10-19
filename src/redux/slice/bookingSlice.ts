import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';

const bookingFromLocalStorage = localStorage.getItem("booking");
const parsedBooking = bookingFromLocalStorage ? JSON.parse(bookingFromLocalStorage) : null;

const initialState = {
    booking: parsedBooking !== null ? parsedBooking : [],
};

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload);
            const itemIndex = state.booking.findIndex(
                (item: any) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                message.error({
                    key: "booking",
                    content: "Already added",
                });
            } else {
                state.booking.push(action.payload);
                message.success({
                    key: "booking",
                    content: `Added to cart`,
                });
                localStorage.setItem("booking", JSON.stringify(state.booking));
            }
        },
        removeFromCart: (state, action) => {
            const nextCart = state.booking.filter(
                (cartItem: any) => cartItem.id !== action.payload.id
            );
            state.booking = nextCart;
            localStorage.setItem("booking", JSON.stringify(state.booking))
            message.success({
                key: "booking",
                content: `Package Removed`,
            });
        },
        clearCart: (state, action) => {
            state.booking = [];
            message.success({
                key: "booking",
                content: `Cart Cleared`,
            });
            localStorage.setItem("booking", JSON.stringify(state.booking));
        },
    },
})


export const {
    addToCart,
    clearCart,
    removeFromCart
} = bookingSlice.actions

export default bookingSlice.reducer