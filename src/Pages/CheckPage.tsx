import React, { FormEvent, useState } from "react";
import { chequeInquiry, ChequeInquiryResponse } from "../Api/chequeInquiry";
import ChequeDetails from "../Components/ChequeDetails";
import "./LoginPage/LoginPage.css";

const CheckPage = (props: any) => {
  const [sayadId, setSayadId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [checkDetails, setCheckDetails] =
    useState<ChequeInquiryResponse | null>(null);

  const sayadiChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/\D/g, "");
    setSayadId(result);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(sayadId.length == 16)) {
      setError("شماره چک صیادی باید ۱۶ رقمی باشد ! ");
      return;
    }
    setLoading(true);
    chequeInquiry(sayadId)
      .then((data) => {
        const result = data as ChequeInquiryResponse;
        setCheckDetails(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  return (
    <div className="login">
      <div className="card" style={{ minWidth: "35%" }}>
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <p className="text-dark">شماره چک صیادی را وارد نمایید : </p>
            <input
              className="form-control"
              type="text"
              placeholder="شماره چک"
              value={sayadId}
              maxLength={16}
              onChange={sayadiChangeHandler}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning text-white w-100 mt-4"
            >
              {loading && (
                <div className="d-flex align-items-center justify-content-center">
                  <div
                    className="spinner-border text-white"
                    role="status"
                  ></div>
                  <p className="mb-0  mx-2">لطفا صبر کنید </p>
                </div>
              )}
              {!loading && (
                <div className="d-flex align-items-center justify-content-center">
                  <p className="mb-0  mx-2">استعلام</p>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="text-center my-3">
        <p> {error}</p>
      </div>
      {checkDetails && (
        <div className="card mb-5" style={{ minWidth: "35%" }}>
          <div className="card-body">
            <p className="fs-5 text-dark fw-bold "> وضعیت : </p>
            <div className="text-center">
              {checkDetails.isSucceed && (
                <img
                  src={require("../Assets/images/check.png")}
                  className="img-fluid"
                />
              )}
              {!checkDetails.isSucceed && (
                <img
                  src={require("../Assets/images/cencel.png")}
                  className="img-fluid"
                />
              )}
            </div>
            <div className="my-4 text-center">
              {checkDetails.isSucceed && (
                <span className="text-success fw-bold fs-4">چک معتبر است </span>
              )}
              {!checkDetails.isSucceed && (
                <span className="text-danger  fw-bold fs-4">
                  چک نا معتبر است !
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {checkDetails && (
        <div className="card" style={{ minWidth: "35%" }}>
          <div className="card-body">
            <p className="fs-5 text-dark fw-bold mb-5"> جزییات : </p>
            <ChequeDetails checkDetails={checkDetails} />
          </div>
        </div>
      )}
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-danger mt-3"
            onClick={() => {
              localStorage.clear();
              props.navigateTo("loginPage");
            }}
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
