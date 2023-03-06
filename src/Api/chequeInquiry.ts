import axios from "axios";
import { API_PORT, API_URL } from "../app-config";

export type ChequeInquiryResponse = {
  id: number;
  sayadId: string;
  message: string;
  idType: number;
  nationalId: string;
  inquiryResult: {
    result: {
      amount: number;
      locked: number;
      reason: string;
      dueDate: string;
      message: string;
      holders: [
        {
          name: string;
          idCode: string;
          idType: number;
        }
      ];
      signers: [
        {
          name: string;
          legalStamp: number;
        }
      ];
      bankCode: string;
      currency: number;
      fromIban: string;
      serialNo: string;
      seriesNo: string;
      issueDate: string;
      branchCode: string;
      chequeType: number;
      blockStatus: number;
      chequeMedia: number;
      description: string;
      chequeStatus: number;
      lockerBankCode: string;
      guaranteeStatus: number;
      lockerBranchCode: string;
    };
    status: string;
    trackId: string;
  };
  trackId: string;
  isSucceed: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function chequeInquiry(sayadId: string, idType: number) {
  try {
    const { data } = await axios.post<ChequeInquiryResponse>(
      API_URL + ":" + API_PORT + "/api/cheque-inquiries",
      { sayadId, idType },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
