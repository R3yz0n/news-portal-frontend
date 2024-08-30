import React, { useEffect, useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { fetchClientList } from "../../../store/client/clientAction";
import TransactionSummary from "./TransactionSummary";
import { fetchTransactionsByClientId } from "../../../store/transaction/transactionAction";
import ClientTransactionsTable from "./ClientTransactionsTable";
import ClientAdvertises from "./ClientAdvertises";
import { fetchAllAdvertisesOfClient } from "../../../store/advertises/advertisesAction";
import NoTransactionsFound from "./NoTransactionsFound";
import {
  clearFields,
  clearTransactionData,
} from "../../../store/transaction/transactionSlice";
import PaymentModal from "./PaymentModal";
import { useLocation } from "react-router-dom";

const Transactions = () => {
  const dispatch = useDispatch();
  const [selectedClient, setSelectedClient] = useState("");
  const { clientList } = useSelector((state) => state.client);
  const { transactions } = useSelector((state) => state.transaction);
  const { advertisesByClient, loading } = useSelector(
    (state) => state.advertises,
  );
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(clearFields());
    dispatch(fetchClientList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearTransactionData());
  }, [pathname, dispatch]);

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption.value);
  };

  const handleFilter = () => {
    setError("");

    if (dateRange.start_date > dateRange.end_date) {
      setError("End date must be equal to or later than the start date.");
      return;
    }

    if (selectedClient) {
      dispatch(fetchTransactionsByClientId({ selectedClient, dateRange }));

      dispatch(fetchAllAdvertisesOfClient(selectedClient));
    } else {
      // dispatch(fetchAllTransactions(dateRange));
    }
  };

  const getClientName = (clientId) => {
    const client = clientList.find((client) => client.id === clientId);
    return client ? client.name : "";
  };

  const clientOptions = [
    ...clientList.map((client) => ({
      value: client.id,
      label: `${client.name} (${client.phone_no})`,
    })),
  ];

  return (
    <>
      <div className="   mt-8 ">
        <div className="mb-3 flex w-full justify-between">
          <h2 className="  ml-1 flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-gray-800">
            <TbReportMoney className="text-4xl" />
            Transactions
          </h2>

          <button
            className="btn-blue mr-1 px-4 py-2 text-xs font-bold"
            onClick={() => setShowModal(!showModal)}
          >
            Add Transaction
          </button>
        </div>
        <div className=" scroll-smooth">
          <div className=" my-4 flex flex-col justify-around lg:flex-row lg:items-center">
            <div className="mb-4 flex items-center gap-x-4 lg:mb-0">
              <label
                htmlFor=""
                className="text-sm font-semibold uppercase text-gray-700"
              >
                Client:
              </label>
              <Select
                className="w-full lg:w-64"
                options={clientOptions}
                onChange={handleClientChange}
                placeholder="Select a client"
              />
            </div>
            <div className="flex flex-col gap-x-4 text-right">
              <div className="mb-4 flex items-center gap-x-4 lg:mb-0">
                <label
                  htmlFor=""
                  className="text-sm font-semibold uppercase text-gray-700"
                >
                  From Date :
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  max={new Date().toISOString().split("T")[0]}
                  value={dateRange.start_date}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start_date: e.target.value })
                  }
                  className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />

                <label
                  htmlFor=""
                  className="text-sm font-semibold uppercase text-gray-700"
                >
                  To
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  max={new Date().toISOString().split("T")[0]}
                  min={dateRange.start_date}
                  value={dateRange.end_date}
                  onChange={(e) => {
                    const selectedEndDate = e.target.value;
                    setDateRange({ ...dateRange, end_date: selectedEndDate });
                    if (
                      dateRange.start_date &&
                      selectedEndDate &&
                      dateRange.start_date > selectedEndDate
                    ) {
                      setError(
                        "End date must be equal to or later than the start date.",
                      );
                    } else {
                      setError("");
                    }
                  }}
                  className={`rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${
                    error ? "border-red-500" : ""
                  }`}
                />
              </div>
              {error && (
                <div className="mb-5 mt-0  text-center text-sm text-red-500 lg:mb-0 lg:mt-2 lg:text-right">
                  <p>{error}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleFilter}
              className="focus:shadow-outline-blue btn-blue mr-1 rounded-md px-4 py-2 text-xs font-bold text-white focus:outline-none active:bg-blue-800"
            >
              Filter
            </button>
          </div>

          {/* <AdvertiseSummayForClient advertisesByClient={advertisesByClient} /> */}

          {transactions?.transactionData?.length > 0 ? (
            <div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ClientTransactionsTable />
                <ClientAdvertises />
              </div>
              <TransactionSummary
                selectedClient={getClientName(selectedClient)}
                totalTransactions={transactions?.transactionData?.length}
                totalAmount={advertisesByClient?.total_amount}
                totalAmountPaid={
                  advertisesByClient?.total_amount -
                  advertisesByClient?.payable_amount
                }
                totalRemainingAmount={advertisesByClient?.payable_amount}
              />
            </div>
          ) : (
            <div className="flex w-full items-center justify-center p-8 text-center text-lg text-red-700">
              <NoTransactionsFound />
            </div>
          )}
        </div>
        {showModal && (
          <PaymentModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleFilter={handleFilter}
          />
        )}
      </div>
    </>
  );
};

export default Transactions;
