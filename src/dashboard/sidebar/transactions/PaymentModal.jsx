import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { btnClick, fadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import { payForAdvertise } from "../../../store/advertises/advertisesAction";
import toast from "react-hot-toast";
import {
  fetchAllClients,
  fetchClientList,
} from "../../../store/client/clientAction";
import AddWrapper from "../../common/AddWrapper";
import { RiFileInfoFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput";
import { useFormik } from "formik";
import Select from "react-select";
import SubmitButton from "../../common/SubmitButton";
import { transactionSchema } from "../../../schema";
import { clearFields } from "../../../store/transaction/transactionSlice";
import { addTransaction } from "../../../store/transaction/transactionAction";
import AddTransactionSummary from "./AddTransactionsSummary";

const PaymentModal = ({ showModal, setShowModal, handleFilter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientList } = useSelector((state) => state.client);
  const { error } = useSelector((state) => state.transaction);

  const clientOptions = [
    ...clientList.map((client) => ({
      value: client.id,
      label: `${client.name} (${client.phone_no})`,
    })),
  ];

  const initialValues = {
    client: "",
    paid: "",
  };

  const getClientName = (clientId) => {
    const client = clientList.find((client) => client.id === clientId);
    return client ? client.name : "";
  };

  const getClientPayable = (clientId) => {
    const client = clientList.find((client) => client.id === clientId);
    return client ? client.total - client.paid_amount : "";
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: transactionSchema,
    onSubmit: async (values, action) => {
      values.client = +values.client;

      const { client, paid } = values;
      const formData = {
        client_id: client,
        paid,
      };

      try {
        if (paid > getClientPayable(client)) {
          toast.error(`Paid amount can't be greater than total amount payable`);
          return;
        }

        await dispatch(addTransaction(formData)).unwrap();
        dispatch(clearFields());
        toast.success(`Transaction added successfully`);
        setShowModal(!showModal);
        handleFilter();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    dispatch(clearFields());
    dispatch(fetchClientList());
  }, [dispatch]);
  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center  justify-center bg-black bg-opacity-80">
      <div className="h-auto rounded-md bg-gray-100 px-10 pb-6 pt-12 lg:w-1/3">
        <aside className="flex flex-col gap-3">
          <div className="flex flex-col  text-lg ">
            <motion.aside className="  flex flex-col gap-1 py-1" {...fadeInOut}>
              <label
                htmlFor=""
                className="  text-sm font-semibold uppercase text-gray-700"
              >
                Select a Client
              </label>
              <Select
                className="w-full rounded-md"
                options={clientOptions}
                onChange={(selectedOption) =>
                  setValues({ ...values, client: selectedOption.value })
                }
                onBlur={handleBlur}
                placeholder="Clients name with phone no."
              />
              <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
                {errors.client && touched.client && (
                  <motion.div {...fadeInOut}>{errors.client}</motion.div>
                )}
              </div>
            </motion.aside>
            <FormInput
              title="Enter paid amount"
              type="number"
              value={values.paid}
              onChange={handleChange}
              onBlur={handleBlur}
              name="paid"
              errors={errors.paid}
              touched={touched.paid}
            />
            <AddTransactionSummary
              selectedClient={getClientName(values.client)}
              totalTransactions={values.paid}
              totalAmountPayable={getClientPayable(values.client)}
            />
          </div>
        </aside>

        <div className=" mt-5 flex justify-end gap-4">
          <motion.button
            {...btnClick}
            className="rounded bg-green-500 px-5 py-0.5 text-white"
            onClick={() => handleSubmit()}
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
