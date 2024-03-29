window.utopWidgetConfig = {
  baseUrl: "https://apiqa.utop.io",
  subKey: "1e814ea18c2c4075a6bfe96bb4bbe9ee",
  campaignId: "e3a29f34-0036-48ad-a78b-7288ae9829c6",
  bizId: "3faa1971-45f8-41d9-901e-699bb3f41d7e",
};
window.utopWidget = {
  requestOTP: function (data) {
    return fetch(
      `${window.utopWidgetConfig.baseUrl}/campaignpromotion/sandbox/otp/request`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": window.utopWidgetConfig.subKey,
        },
        body: JSON.stringify(data),
      }
    );
  },
  exchangeCode: function (data) {
    return fetch(
      `${window.utopWidgetConfig.baseUrl}/campaignpromotion/sandbox/lotterycode/exchange`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": window.utopWidgetConfig.subKey,
        },
        body: JSON.stringify(data),
      }
    );
  },
  spinGift: function (data) {
    return fetch(
      `${window.utopWidgetConfig.baseUrl}/campaignpromotion/sandbox/gift/spin`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": window.utopWidgetConfig.subKey,
        },
        body: JSON.stringify(data),
      }
    );
  },
};

window.masterData = {
  campaignInfo: {
    campaignName: "test",
    endDate: "2024-01-14T08:22:59.821Z",
    startDate: "2024-01-03T08:22:56.134Z",
  },
  dataStep1: {
    allowedBrowsers: ["Chrome", "Safari", "Firefox"],
    isBlockedAnonymous: true,
    maximumDevice: null,
    maximumConfig: [
      {
        configBy: "limitPerCampaign",
        configAccess: 123,
      },
      {
        configBy: "limitPerMonth",
        configAccess: 23,
      },
    ],
    blockingContent: {
      exceedLimit:
        "Quyền truy cập của bạn đã bị hạn chế do có quá nhiều người tham gia truy cập trên cùng một thiết bị hoặc trình duyệt. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
      invalidBrowser:
        "Quyền truy cập của bạn đã bị hạn chế do sử dụng trình duyệt ẩn danh hoặc sử dụng trình duyệt không hợp lệ. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
    },
  },
  dataStep2: {
    nodes: [
      {
        id: "1",
        type: "shape",
        position: {
          x: 0,
          y: -100,
        },
        data: {
          type: "finished",
          shape: "round-rect",
          width: 300,
          height: 100,
          color: "#FFFFFF",
          title: "Trigger",
          label: "Submit lottery code form",
          filter: "",
          iconImg: {
            type: "svg",
            key: null,
            ref: null,
            props: {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              children: {
                type: "path",
                key: null,
                ref: null,
                props: {
                  d: "M14.1482 4.72002C13.9268 4.34764 13.6124 4.03921 13.2358 3.825C12.8592 3.6108 12.4334 3.49817 12.0002 3.49817C11.567 3.49817 11.1412 3.6108 10.7646 3.825C10.388 4.03921 10.0736 4.34764 9.85221 4.72002C9.40666 4.47874 8.93217 4.29526 8.44021 4.17402C8.77588 3.51882 9.28586 2.96896 9.91399 2.58499C10.5421 2.20103 11.264 1.99786 12.0002 1.99786C12.7364 1.99786 13.4583 2.20103 14.0864 2.58499C14.7146 2.96896 15.2245 3.51882 15.5602 4.17402C15.0682 4.29525 14.5937 4.47873 14.1482 4.72002ZM9.38421 7.43702C9.92169 7.25142 10.4775 7.12403 11.0422 7.05702C10.6168 6.47368 10.07 5.9894 9.43963 5.63747C8.80921 5.28554 8.11005 5.07431 7.39023 5.01832C6.67041 4.96232 5.947 5.06288 5.26974 5.31308C4.59248 5.56329 3.97744 5.95719 3.46691 6.46772C2.95638 6.97825 2.56247 7.59329 2.31227 8.27055C2.06207 8.94781 1.96151 9.67122 2.0175 10.391C2.0735 11.1109 2.28472 11.81 2.63665 12.4404C2.98858 13.0709 3.47287 13.6176 4.05621 14.043C4.12348 13.478 4.25121 12.9218 4.43721 12.384C3.81685 11.7209 3.47851 10.8426 3.49364 9.93466C3.50877 9.02672 3.87618 8.1602 4.51828 7.5181C5.16038 6.87599 6.0269 6.50858 6.93485 6.49346C7.84279 6.47833 8.72107 6.81667 9.38421 7.43702ZM19.9442 14.042C20.5275 13.6166 21.0118 13.0699 21.3638 12.4394C21.7157 11.809 21.9269 11.1099 21.9829 10.39C22.0389 9.67022 21.9383 8.94681 21.6881 8.26955C21.4379 7.59229 21.044 6.97725 20.5335 6.46672C20.023 5.95619 19.4079 5.56229 18.7307 5.31208C18.0534 5.06188 17.33 4.96132 16.6102 5.01732C15.8904 5.07331 15.1912 5.28454 14.5608 5.63647C13.9304 5.9884 13.3836 6.47268 12.9582 7.05602C13.5229 7.12337 14.0788 7.2511 14.6162 7.43702C15.2793 6.81667 16.1576 6.47833 17.0656 6.49346C17.9735 6.50858 18.84 6.87599 19.4821 7.5181C20.1242 8.1602 20.4916 9.02672 20.5068 9.93466C20.5219 10.8426 20.1836 11.7209 19.5632 12.384C19.7462 12.914 19.8762 13.469 19.9442 14.042ZM9.50021 13.25C9.50021 13.0511 9.57922 12.8603 9.71988 12.7197C9.86053 12.579 10.0513 12.5 10.2502 12.5H14.5002C14.6526 12.5001 14.8013 12.5466 14.9266 12.6333C15.0518 12.7201 15.1477 12.8429 15.2015 12.9854C15.2552 13.128 15.2643 13.2836 15.2274 13.4314C15.1906 13.5792 15.1096 13.7124 14.9952 13.813V13.814L14.9822 13.825L14.9292 13.875C14.5957 14.2013 14.2865 14.5516 14.0042 14.923C13.4472 15.654 12.8162 16.693 12.4742 17.947C12.4483 18.0421 12.404 18.1311 12.3437 18.2091C12.2834 18.287 12.2084 18.3523 12.1229 18.4013C12.0373 18.4502 11.943 18.4818 11.8453 18.4943C11.7475 18.5068 11.6483 18.4999 11.5532 18.474C11.4581 18.4482 11.3691 18.4038 11.2911 18.3435C11.2132 18.2832 11.1479 18.2082 11.099 18.1227C11.05 18.0371 11.0184 17.9428 11.0059 17.8451C10.9934 17.7473 11.0003 17.6481 11.0262 17.553C11.4342 16.057 12.1782 14.846 12.8092 14.015L12.8202 14H10.2502C10.0513 14 9.86053 13.921 9.71988 13.7804C9.57922 13.6397 9.50021 13.4489 9.50021 13.25ZM12.0002 22C13.8567 22 15.6372 21.2625 16.95 19.9498C18.2627 18.637 19.0002 16.8565 19.0002 15C19.0002 13.1435 18.2627 11.363 16.95 10.0503C15.6372 8.73752 13.8567 8.00002 12.0002 8.00002C10.1437 8.00002 8.36321 8.73752 7.05046 10.0503C5.7377 11.363 5.00021 13.1435 5.00021 15C5.00021 16.8565 5.7377 18.637 7.05046 19.9498C8.36321 21.2625 10.1437 22 12.0002 22ZM12.0002 20.5C10.5415 20.5 9.14257 19.9206 8.11112 18.8891C7.07967 17.8577 6.50021 16.4587 6.50021 15C6.50021 13.5413 7.07967 12.1424 8.11112 11.1109C9.14257 10.0795 10.5415 9.50002 12.0002 9.50002C13.4589 9.50002 14.8578 10.0795 15.8893 11.1109C16.9207 12.1424 17.5002 13.5413 17.5002 15C17.5002 16.4587 16.9207 17.8577 15.8893 18.8891C14.8578 19.9206 13.4589 20.5 12.0002 20.5Z",
                  fill: "currentColor",
                },
                _owner: null,
                _store: {},
              },
            },
            _owner: null,
            _store: {},
          },
          selected: false,
        },
        dataFlow: {
          type: "trigger",
          eventName: "submitLotteryCodeForm",
          eventConfig: {
            idLotteryCode: "f9f35ce5-525c-4ae5-8487-c401d5e1e707",
            isVerifyLotteryCode: true,
            blockedLimit: 10,
            blockedAfter: 2,
            blockedUnit: "hour",
            isStoreData: true,
            isEnableOTP: false,
            otpMethod: "sms",
            otpTimeValid: 120,
            otpProvider: "ftel",
            otpBrandName: null,
            momtChannel: false,
            zaloChannel: false,
            lotteryCodeFields: [
              {
                attributeName: "inputLotteryCode",
                labelText: "Mã thẻ cào",
                isRequired: true,
              },
              {
                attributeName: "phoneNumber",
                labelText: "Số điện thoại",
                isRequired: true,
              },
              {
                attributeName: "name",
                labelText: "Họ và tên",
                isRequired: true,
              },
              {
                attributeName: "province",
                labelText: "Tỉnh",
                isRequired: true,
              },
              {
                attributeName: "dob",
                labelText: "Ngày sinh",
                isRequired: true,
              },
            ],
            invalidCodeContent: {
              afterCampaign:
                "Chương trình khuyến mãi chưa bắt đầu. Giữ lại thẻ cào và gửi lại Mã thẻ cào vào @(startdate). Rất mong sớm gặp lại Quý khách tại chương trình.",
              campaignEnded:
                "Thời hạn chương trình khuyến mãi đã kết thúc vào @(enddate). Cám ơn Quý khách hàng đã tin dùng sản phẩm của chúng tôi.",
              invalidCode:
                "Mã số @(lotterycode) không hợp lệ hoặc đã được sử dụng. Quý khách vui lòng thử lại. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
              reachedTimes:
                "Mã số vừa nhập không đúng. Rất tiếc, Quý khách đã bị chặn vì nhập sai mã số quá @(times) lần. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
              userBlocked:
                "Xin lỗi Quý khách, SĐT @(phonenumber) đã bị chặn vì nhập sai mã số quá @(times) lần. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
              codeUsed:
                "Mã số @(lotterycode) không hợp lệ hoặc đã được sử dụng. Quý khách vui lòng thử lại. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
              codeCanceled:
                "Mã số @(lotterycode) không hợp lệ hoặc đã được sử dụng. Quý khách vui lòng thử lại. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn.",
              invalidOTP: "Mã OTP không hợp lệ",
            },
          },
        },
        selected: false,
        params: {},
        targetPosition: "bottom",
      },
    ],
  },
};
