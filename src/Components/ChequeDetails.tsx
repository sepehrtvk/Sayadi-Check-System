import React from "react";
import { ChequeInquiryResponse } from "../Api/chequeInquiry";

type ChequeDetail = {
  checkDetails: ChequeInquiryResponse;
};

const ChequeDetails = (props: ChequeDetail) => {
  const renderField = (key: string, value: any) => {
    return (
      <div className="d-flex justify-content-between align-items-center my-3 pb-3 border-bottom text-dark">
        <div className="fw-bold ">
          <span>{key}: </span>
        </div>
        <div className="mx-2">
          <span> {value ? value : "---"} </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderField("sayadId", props.checkDetails.sayadId)}
      {renderField("createdAt", props.checkDetails.createdAt)}
      {renderField("nationalId", props.checkDetails.nationalId)}
      {renderField("trackId", props.checkDetails.trackId)}
      {renderField(
        "inquiryResult.status",
        props.checkDetails.inquiryResult.status
      )}
      {renderField(
        "result.amount",
        props.checkDetails.inquiryResult.result.amount
      )}
      {renderField("message", props.checkDetails.inquiryResult.result.message)}
      {renderField(
        "description",
        props.checkDetails.inquiryResult.result.description
      )}
      {renderField(
        "fromIban",
        props.checkDetails.inquiryResult.result.fromIban
      )}
      {renderField(
        "serialNo",
        props.checkDetails.inquiryResult.result.serialNo
      )}
      {renderField(
        "seriesNo",
        props.checkDetails.inquiryResult.result.seriesNo
      )}
      {renderField("reason", props.checkDetails.inquiryResult.result.reason)}
      {renderField("dueDate", props.checkDetails.inquiryResult.result.dueDate)}
      {renderField(
        "bankCode",
        props.checkDetails.inquiryResult.result.bankCode
      )}
      {renderField(
        "guaranteeStatus",
        props.checkDetails.inquiryResult.result.guaranteeStatus
      )}
      {renderField("locked", props.checkDetails.inquiryResult.result.locked)}

      {props.checkDetails.inquiryResult.result.holders &&
        props.checkDetails.inquiryResult.result.holders.map((holder, index) =>
          renderField("holder.name " + (index + 1).toString(), holder.name)
        )}
      {props.checkDetails.inquiryResult.result.holders &&
        props.checkDetails.inquiryResult.result.holders.map((holder, index) =>
          renderField("holder.idCode " + (index + 1).toString(), holder.idCode)
        )}
      {props.checkDetails.inquiryResult.result.signers &&
        props.checkDetails.inquiryResult.result.signers.map((signer, index) =>
          renderField("signer.name " + (index + 1).toString(), signer.name)
        )}
      {renderField("locked", props.checkDetails.inquiryResult.result.locked)}
    </div>
  );
};

export default ChequeDetails;
