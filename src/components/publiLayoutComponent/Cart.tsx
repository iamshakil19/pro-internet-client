"use client";

import AddBooking from "@/components/Booking/AddBooking";
import PIModal from "@/components/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, removeFromCart } from "@/redux/slice/bookingSlice";
import numberWithComma from "@/utils/numberWithComa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CartComponent = () => {
  const router = useRouter();
  const { booking } = useAppSelector((state) => state.bookings);
  const dispatch = useAppDispatch();
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const handleRemoveFormCart = (cartProduct: any) => {
    dispatch(removeFromCart(cartProduct));
  };

  const handleClearCart = () => {
    dispatch(clearCart({}));
  };

  const handleBooking = () => {};

  return (
    <div className="mt-10 poppins container mx-auto p-5">
      <h2 className="text-3xl font-bold font-serif text-center mb-5">Cart</h2>
      <p className="text-center hover:underline underline-offset-2 hover:text-blue-500 transition-all duration-200 ease-in-out">
        <Link href="/package" className="">
          Continue Booking
        </Link>
      </p>

      {booking?.length > 0 && (
        <>
          <section className=" mt-5 hidden lg:block">
            <table className="w-full text-left">
              <thead className="border-b border-gray-300 pb-5">
                <tr>
                  <th className="uppercase font-semibold">Name</th>
                  <th className="uppercase font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {booking?.map((cartBooking: any) => (
                  <tr
                    key={cartBooking.id}
                    className="border-b border-gray-300 p-5 relative"
                  >
                    <td>
                      <div className="flex gap-5 items-center py-3">
                        <div>
                          <p
                            onClick={() =>
                              router.push(`/package-details/${cartBooking.id}`)
                            }
                            className="text-base md:text-lg font-medium mb-2 max-w-sm cursor-pointer"
                          >
                            {cartBooking.name}
                          </p>
                          <button
                            onClick={() => handleRemoveFormCart(cartBooking)}
                            className="text-sm mt-1 font-medium text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-medium">
                        ৳{" "}
                        {cartBooking.price
                          ? numberWithComma(cartBooking.price)
                          : ""}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="lg:hidden">
            {booking?.map((cartBooking: any) => (
              <div
                key={cartBooking._id}
                className="border-b border-gray-300 pb-2 mt-5"
              >
                <p
                  onClick={() =>
                    router.push(`/package-details/${cartBooking._id}`)
                  }
                  className="text-base md:text-lg font-medium mb-2 max-w-sm whitespace-nowrap overflow-hidden cursor-pointer"
                >
                  {cartBooking.name}
                </p>
                <div className="flex justify-between items-center gap-5">
                  <div>
                    <p className="text-sm">
                      Price : ৳{" "}
                      {cartBooking.price
                        ? numberWithComma(cartBooking.price)
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="md:flex justify-between items-center gap-5 py-3 mt-3">
            <div className="mb-5 md:mb-0">
              <button
                onClick={handleClearCart}
                className="border border-black font-medium text-sm py-2 px-4 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
              >
                Clear Cart
              </button>
            </div>
            <div className="max-w-xs w-full">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="bg-blue-500 w-full py-2 text-white font-semibold text-lg mt-4 rounded-md "
              >
                Book
              </button>
            </div>
          </section>
        </>
      )}

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={bookingModalOpen}
        closeModal={() => setBookingModalOpen(false)}
        title="Add Booking"
      >
        <AddBooking setBookingModalOpen={setBookingModalOpen} />
      </PIModal>
    </div>
  );
};

export default CartComponent;

