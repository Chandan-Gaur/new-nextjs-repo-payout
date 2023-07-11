import axios from "axios";

const url = "https://payoutv20.justapay.in";

export const addSinghTek = async (data: any) => {
  const res = await axios.post(`${url}/SinghTek/register`, data);
  try {
    console.log(res.status);
    if (res.status === 201 && res.data.message) {
      return res.data.message;
    }
    return "error";
  } catch (error) {
    console.log(error);
  }
};

export const addMerchant = async (data: any, token: any) => {
  // console.log(data);
  try {
    const res = await axios.post(`${url}/SinghTek/merchant/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //   console.log(res.status);
    if (res.status === 200 && res.data.message) {
      return res.data.message;
    }
    return "error";
  } catch (error) {
    console.log(error);
  }
};

export const updateMerchantbyid = async (
  data: any,
  token: any,
  merchantid: any
) => {
  console.log(data);
  try {
    const res = await axios.patch(
      `${url}/SinghTek/merchant/update/${merchantid}`,
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const res = await fetch(
    //   `https://payoutv20.justapay.in/SinghTek/merchant/update/${merchantid}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //     body: data,
    //   }
    // );
    console.log(res);
    if (res.status === 200 && res.data.message) {
      return res.data.message;
    }
    return "error";
  } catch (error) {
    console.log(error);
  }
};

export const getallmerchants = async (data: any) => {
  try {
    const res = await axios.get(`${url}/SinghTek/merchants`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    return "error";
  }
};

export const getmerchant_transaction_by_merchant_id = async (
  token: any,
  merchantId: string
) => {
  try {
    const res = await axios.get(
      `${url}/SinghTek/getWithdrawals/${merchantId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getmerchant_transaction_by_merchant_token = async (token: any) => {
  try {
    const res = await axios.get(`${url}/Merchant/getWithdrawals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const updatestatus_merchant = async (
  token: any,
  merchantId: string,
  status: any
) => {
  try {
    const res = await axios.post(
      `${url}/SinghTek/merchant/updatestatus/`,
      {
        merchant_id: merchantId,
        merchant_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const updatestatus_user = async (
  token: any,
  merchantId: string,
  status: any
) => {
  try {
    const res = await axios.post(
      `${url}/SinghTek/withdrawal/updatestatus`,
      {
        withdrawal_id: merchantId,
        merchant_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const get_pending_merchant_transaction = async (token: any) => {
  try {
    const res = await axios.get(`${url}/SinghTek/getWithdrawals/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const get_dashboard_data = async (token: any) => {
  try {
    const res = await axios.get(`${url}/SinghTek/dashboard/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return "error";
    }
  } catch (error) {
    console.log(error);
    return "error";
  }
};
