import React, { useEffect } from "react";
import AddWrapper from "../../common/AddWrapper";
import { useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";

import SubmitButton from "../../common/SubmitButton";
import { transactionSchema } from "../../../schema";
import { fetchAllClients } from "../../../store/client/clientAction";
import { clearFields } from "../../../store/transaction/transactionSlice";
import { addTransaction } from "../../../store/transaction/transactionAction";
import AddTransactionSummary from "./AddTransactionsSummary";
import toast from "react-hot-toast";
import { TbReportMoney } from "react-icons/tb";

const AddTransactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.client);
  const { error } = useSelector((state) => state.transaction);

  const handleBack = () => {
    navigate(-1);
  };

  const clientOptions = [
    ...clients.map((client) => ({
      value: client.id,
      label: `${client.name} (${client.phone_no})`,
    })),
  ];

  const initialValues = {
    client: "",
    paid: "",
  };

  const getClientName = (clientId) => {
    const client = clients.find((client) => client.id === clientId);
    return client ? client.name : "";
  };

  const getClientPayable = (clientId) => {
    const client = clients.find((client) => client.id === clientId);
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
        handleBack();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    dispatch(clearFields());
    dispatch(fetchAllClients());
  }, [dispatch]);

  return (
    <AddWrapper
      icon={<TbReportMoney className="text-4xl" />}
      title="Add Transaction"
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <div className="mt-4 flex flex-col gap-4">
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
          </div>

          <AddTransactionSummary
            selectedClient={getClientName(values.client)}
            totalTransactions={values.paid}
            totalAmountPayable={getClientPayable(values.client)}
          />
        </div>
        <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
          {error && <motion.div {...fadeInOut}>{error}</motion.div>}
        </div>
        <SubmitButton value="submit" handleSubmit={handleSubmit} />
      </form>
    </AddWrapper>
  );
};

export default AddTransactions;
