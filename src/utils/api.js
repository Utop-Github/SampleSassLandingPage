import axios from "axios";
import configApi from "./configApi";

export function requestOTPAPI(payload) {
  return axios({
    method: "POST",
    url: `${configApi.baseUrl}/campaignpromotion/sandbox/otp/request`,
    data:payload,
    headers: {
      "Ocp-Apim-Subscription-Key": configApi.subkey,
    },
  });
}
export function exchangeCodeAPI(payload) {
  return axios({
    method: "POST",
    url: `${configApi.baseUrl}/campaignpromotion/sandbox/lotterycode/exchange`,
    data: payload,
    headers: {
      "Ocp-Apim-Subscription-Key": configApi.subkey,
    },
  });
}
export function spinGiftAPI(payload) {
  return axios({
    method: "POST",
    url: `${configApi.baseUrl}/campaignpromotion/sandbox/gift/spin`,
    data: payload,
    headers: {
      "Ocp-Apim-Subscription-Key": configApi.subkey,
    },
  });
}
