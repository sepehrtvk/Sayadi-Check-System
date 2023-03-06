import React from "react";
import { ChequeInquiryResponse } from "../Api/chequeInquiry";
import { toFarsiNumber } from "../shared/util";

type ChequeDetail = {
  checkDetails: ChequeInquiryResponse;
};

const ChequeDetails = (props: ChequeDetail) => {
  const renderField = (key: string, value: any) => {
    return (
      <div className='d-flex justify-content-between align-items-center my-3 pb-3 border-bottom text-dark'>
        <div className='fw-bold '>
          <span>{key}: </span>
        </div>
        <div className='mx-2'>
          <span> {value ? toFarsiNumber(value) : "---"} </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderField("کد صیادی", props.checkDetails.sayadId)}
      {renderField("تاریخ ایجاد", props.checkDetails.createdAt)}
      {renderField("کد ملی", props.checkDetails.nationalId)}
      {renderField("کد رهگیری", props.checkDetails.trackId)}
      {renderField("وضعیت", props.checkDetails.inquiryResult.status)}
      {renderField("مبلغ", props.checkDetails.inquiryResult.result.amount)}
      {renderField("پیام", props.checkDetails.inquiryResult.result.message)}
      {renderField(
        "توضیحات",
        props.checkDetails.inquiryResult.result.description
      )}
      {renderField(
        "شماره شبا",
        props.checkDetails.inquiryResult.result.fromIban
      )}
      {renderField(
        "شماره سریال",
        props.checkDetails.inquiryResult.result.serialNo
      )}
      {renderField(
        "شماره سری",
        props.checkDetails.inquiryResult.result.seriesNo
      )}
      {renderField("دلیل", props.checkDetails.inquiryResult.result.reason)}
      {renderField(
        "تاریخ انقضا",
        props.checkDetails.inquiryResult.result.dueDate
      )}
      {renderField("کد بانک", props.checkDetails.inquiryResult.result.bankCode)}
      {renderField(
        "وضعیت گارانتی",
        props.checkDetails.inquiryResult.result.guaranteeStatus
      )}

      {props.checkDetails.inquiryResult.result.holders &&
        props.checkDetails.inquiryResult.result.holders.map((holder, index) =>
          renderField(" نام دارنده " + toFarsiNumber(index + 1), holder.name)
        )}
      {props.checkDetails.inquiryResult.result.holders &&
        props.checkDetails.inquiryResult.result.holders.map((holder, index) =>
          renderField(
            "کد ملی دارنده " + toFarsiNumber(index + 1),
            holder.idCode
          )
        )}
      {props.checkDetails.inquiryResult.result.signers &&
        props.checkDetails.inquiryResult.result.signers.map((signer, index) =>
          renderField("امضا کننده  " + toFarsiNumber(index + 1), signer.name)
        )}
      {renderField("بسته شده", props.checkDetails.inquiryResult.result.locked)}
    </div>
  );
};

export default ChequeDetails;
