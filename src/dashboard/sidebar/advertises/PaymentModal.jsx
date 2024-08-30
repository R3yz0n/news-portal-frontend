import { motion } from "framer-motion";
import React, { useState } from "react";
import { btnClick, fadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import { clearFields } from "../../../store/advertises/advertisesSlice";
import { payForAdvertise } from "../../../store/advertises/advertisesAction";
import toast from "react-hot-toast";

const PaymentModal = ({
  showModal,
  setShowModal,
  id,
  name,
  remainingAmount,
}) => {
  const dispatch = useDispatch();
  const [payingAmount, setPayingAmount] = useState({ amount: "", error: null });
  const { error } = useSelector((state) => state.advertises);
  const handlePayingChange = (e) => {
    if (e.target.value > remainingAmount) {
      setPayingAmount({
        ...payingAmount,
        error: "Paying amount should be less than remaining amount.",
      });
      return;
    }
    if (e.target.value < 0) {
      setPayingAmount({
        ...payingAmount,
        error: "Paying amount should be greater than 0.",
      });
      return;
    }

    setPayingAmount({ amount: e.target.value, error: null });
  };

  const handlePayment = async () => {
    if (payingAmount.error) {
      return;
    }
    if (payingAmount.amount === "") {
      setPayingAmount({
        ...payingAmount,
        error: "Paying amount should be entered.",
      });
      return;
    }
    try {
      await dispatch(
        payForAdvertise({ client_id: id, paid: payingAmount.amount }),
      ).unwrap();
      dispatch(clearFields());

      setShowModal(!showModal);
    } catch (err) {
      // toast.error("Payment failed.", { duration: 2500 });
    }
  };
  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center  justify-center bg-black bg-opacity-80">
      <div className="h-auto rounded-md bg-gray-100 px-10 pb-6 pt-12 md:w-1/3">
        <aside className="flex flex-col gap-3">
          <div className="flex gap-2 text-lg font-semibold">
            <h3>Client Name :-</h3>
            <p className="capitalize ">{name}</p>
          </div>
          <div className="flex gap-2 text-lg font-semibold">
            <h3>Dues Amount :-</h3>
            <p className="capitalize ">Rs. {remainingAmount}</p>
          </div>
          <div className="text-lg font-semibold">
            Rs.{" "}
            <input
              type="number"
              className="rounded-md border border-gray-400 px-3 py-1 text-base font-medium outline-none focus:border-red-500 focus:outline-none"
              onChange={handlePayingChange}
            />
          </div>
          <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
            {payingAmount.error && (
              <motion.div {...fadeInOut}>{payingAmount.error}</motion.div>
            )}
            {error && <motion.div {...fadeInOut}>{error}</motion.div>}
          </div>
        </aside>

        <div className=" mt-3 flex justify-end gap-4">
          <motion.button
            {...btnClick}
            className="rounded bg-green-500 px-5 py-0.5 text-white"
            onClick={() => handlePayment(id)}
          >
            Pay
          </motion.button>
          <motion.button
            {...btnClick}
            onClick={() => setShowModal(!showModal)}
            className="rounded bg-red-500 px-5 py-0.5 text-white"
          >
            Close
          </motion.button>
        </div>
      </div>
    </main>
  );
};

export default PaymentModal;
