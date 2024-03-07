import React, { useEffect, useState } from "react";
import { BarChart, Wallet, Newspaper, Paperclip } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setLedgerReport } from "../../redux/reducers/authReducer";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader/Loader";

export function Sidebar() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const ledgerReportData = useSelector((state) => state.auth.LedgerReport);

  // const ledgerextract = ledgerReportData?.data?.Data;

  const userMpinData = useSelector((state) => state.auth.userMpinData);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userData = useSelector((state) => state.auth.userData);
  const userheaderdata = userData?.Data;
  const CompanyID = userheaderdata?.CompanyID;
  const YearMasterID = userheaderdata?.YearMasterID;
  const PremiseID = userheaderdata?.PremiseID;
  const DepartmentID = userheaderdata?.DepartmentID;
  const UserID = userheaderdata?.UserID;
  const CompanyName = userheaderdata?.CompanyName;
  const CompanyGSTCST = userheaderdata?.CompanyGSTCST;
  const PremiseName = userheaderdata?.PremiseName;
  const CompanyContactNo = userheaderdata?.CompanyContactNo;
  const CompanyAddress1 = userheaderdata?.CompanyAddress1;
  const CompanyAddress2 = userheaderdata?.CompanyAddress2;

  const currentDate = new Date();
  const defaultFromDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const defaultToDate = new Date();

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [viewPdf, setViewPdf] = useState("");
  const [ReportID, setReportID] = useState("");
  const [ReportName, setReportName] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  const fetchLedgerReport = async () => {
    const LedgerReportAPI = `${ServerBaseUrl}api/CommonFas/LedgerReport`;
    const body = {
      SYSKey: 0,
      Access_Type: "",
      Access_Key: "",
      Access_From: "",
      CatalogueImageImportSyncDateTime: "",
    };

    const headers = {
      "Content-Type": "application/json",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
      client: SlugUrl,
      "x-api-key": mPin,
    };
    const response = await axios.post(LedgerReportAPI, body, { headers });
    try {
      const ledgerReportData = response?.data?.Data;
      dispatch(setLedgerReport(ledgerReportData));
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  // const handleLedgerReport = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await fetchLedgerReport();
  //   } catch (error) {
  //     console.error("Error in Ledger report data fetching:", error);
  //     toast.error("Error in fetching Ledger report data from API Server.");
  //   }
  // };

  //PDF API
  const fetchPDF = async () => {
    const PDFAPI = `${ServerBaseUrl}/api/CommonFas/LedgerReportPost`;
    const body = {
      FromDate: formatDate(fromDate),
      ToDate: formatDate(toDate),
      AmountGtEq: 0,
      CustomFilter: "",
      IntReportId: 0,
      ExcludeNoTransaction: 1,
      CompanyName: CompanyName,
      CompanyGSTCST: CompanyGSTCST,
      PremiseName: PremiseName,
      CompanyContactNo: CompanyContactNo,
      CompanyAddress1: CompanyAddress1,
      CompanyAddress2: CompanyAddress2,
      type: "pdf",
      ReportID: selectedOption.value,
      ReportName: selectedOption.label,
      SysKey: "1",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
    };

    const headers = {
      "Content-Type": "application/json",
      CompanyID: CompanyID,
      YearMasterID: YearMasterID,
      PremiseID: PremiseID,
      DepartmentID: DepartmentID,
      UserID: UserID,
      client: SlugUrl,
      "x-api-key": mPin,
    };
    const response = await axios.post(PDFAPI, body, { headers });
    try {
      const ledgerReportPDF = response?.data?.Data;
      const pdfurl = ledgerReportPDF?.ReportPath;
      setViewPdf(pdfurl);
      console.log(pdfurl);
      // dispatch(setLedgerReport(ledgerReportData));
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      // toast.error("Error in fetching Ledger report data from API Server.");
    }
  };

  const handleLedgerReportPDF = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetchPDF();
    } catch (error) {
      console.error("Error in Ledger report data fetching:", error);
      // toast.error("Error in fetching Ledger report data from API Server.");
    } finally {
      setLoading(false); // Set loading state to false whether request succeeds or fails
    }
  };

  useEffect(() => {
    fetchLedgerReport();
  }, []);

  const handleSelectChange = (selectedOption) => {
    // console.log("Selected value:", selectedOption.value);
    // console.log("Selected label:", selectedOption.label);
    setSelectedOption(selectedOption);
  };

  return (
    <>
      <div className="flex">
        <aside className="flex h-[90vh] w-64 flex-col overflow-y-auto bg-gray-100 px-5 py-8 max-[390px]:hidden">
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                  analytics
                </label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <BarChart className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Dashboard</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Wallet className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Configuration
                  </span>
                </a>
              </div>
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                  content
                </label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Sale Order</span>
                </a>

                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Paperclip className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Purchase Order
                  </span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Ledger Report
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </aside>
        {loading && <Loader />}
        {!loading && !viewPdf && (
          <div className="content flex flex-wrap ml-16 mt-10">
            <form method="POST">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900">
                    Ledger Report
                  </h2>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="from-date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        From Date
                      </label>
                      <div className="mt-2">
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          id="from-date"
                          dateFormat="dd-MM-yyyy"
                          name="from-date"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="to-date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        To Date
                      </label>
                      <div className="mt-2">
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                          id="to-date"
                          name="to-date"
                          dateFormat="dd-MM-yyyy"
                          minDate={fromDate}
                          maxDate={
                            new Date(
                              currentDate.getFullYear() + 1,
                              currentDate.getMonth(),
                              currentDate.getDate()
                            )
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="report-type"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Report Type
                      </label>
                      <div className="mt-2">
                        <Select
                          id="party"
                          name="party"
                          options={ledgerReportData?.Table.map((report) => ({
                            value: report.Rep_Rpt,
                            label: report.Rep_Name,
                          }))}
                          placeholder="Select Party"
                          isSearchable={true}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          onChange={handleSelectChange}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="party"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Party
                      </label>
                      <div className="mt-2">
                        <Select
                          id="party"
                          name="party"
                          options={ledgerReportData?.Table3.map((report) => ({
                            value: report.Account_ID,
                            label: report.Account_Name,
                          }))}
                          placeholder="Select Party"
                          isSearchable={true}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="account-group"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Account Group
                      </label>
                      <div className="mt-2">
                        <Select
                          id="party"
                          name="party"
                          options={ledgerReportData?.Table2.map((report) => ({
                            value: report.AccountGroup_id,
                            label: report.AccountGroup_Name,
                          }))}
                          placeholder="Select Party"
                          isSearchable={true}
                          className="block w-56 rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={handleLedgerReportPDF}
                  className="rounded-md bg-[#232981] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3e45a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}
        {viewPdf && (
          <div className="pdf-container border-2 z-50 absolute">
            <button
              className="flex items-center justify-end w-full pr-14"
              onClick={() => setViewPdf(null)}
            >
              Close
            </button>
            <iframe
              className="w-screen h-screen"
              src={viewPdf}
              title="Ledger Reports"
            >
              Presss me: <a href={viewPdf}>Download PDF</a>
            </iframe>
          </div>
        )}
      </div>
    </>
  );
}
