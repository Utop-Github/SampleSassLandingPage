# CHIẾN DỊCH QUẢNG CÁO
**MỤC LỤC**

 [I. Giới thiệu](#i-giới-thiệu)
 
 [II. Hướng dẫn cài đặt nguồn](#ii-hướng-dẫn-cài-đặt-nguồn)
 
 [III. Các cú pháp truy xuất](#iii-các-cú-pháp-truy-xuất)
 
  - [1. Truy xuất biến](#1-truy-xuất-biến)
  
  - [2. Truy xuất hàm](#2-truy-xuất-hàm)

    - [2.1 window.utopWidget.getFieldsFormSubmit()](#21-windowutopwidgetgetfieldsformsubmit)

    - [2.2 window.utopWidget.validateFormSubmit(dataValidate)](#22-windowutopwidgetvalidateformsubmitdatavalidate)

    - [2.3 window.utopWidget.getMessageError()](#23-windowutopwidgetgetmessageerrorerr)

    - [2.4 window.utopWidget.requestOTP({campaignId, bizId, phoneNumber})](#24-windowutopwidgetrequestotpcampaignid-bizid-phonenumber)

    - [2.5 window.utopWidget.exchangeCode({campaignId, bizId, phoneNumber, code, otp?})](#25-windowutopwidgetexchangecodecampaignid-bizid-phonenumber-code-otp)

    - [2.6 window.utopWidget.spinGift({campaignId, bizId, phoneNumber, transactionId, timestamp, signature})](#26-windowutopwidgetspingiftcampaignid-bizid-phonenumber-transactionid-timestamp-signature)

    - [2.7 window.utopWidget.getListZone()](#27-windowutopwidgetgetlistzone)

    - [2.8 window.utopWidget.getListProvince()](#28-windowutopwidgetgetlistprovince)

[IV. Danh sách mã lỗi](#iv-danh-sách-mã-lỗi)

<a name = "I"></a>

## I. Giới thiệu

Tài liệu hướng dẫn cài đặt mã nguồn ví dụ được UEngage xây dựng sẵn, và cách sử dụng đoạn mã được tạo ra tại bước 3 theo các thiết lập được cài đặt.

<a name = "II"></a>

## II. Hướng dẫn cài đặt nguồn

Bạn có thể clone repo hoặc download file ‘SampleSassLandingPage.zip’ nhánh ‘master’..

**Cú pháp cài đặt:**

1. Clone repo bằng lệnh `git clone https://github.com/Utop-Github/SampleSassLandingPage.git`
2. Chạy lệnh `cd SampleSassLandingPage`
3. Chạy lệnh `npm install` hoặc `yarn` để cài đặt các modules. (Đối với việc download file, bạn sẽ thực hiện từ bước này)
4. Sau khi cài đặt các modules, vào **public/index.html** và paste đoạn mã config, được copy ở UEngage tại bước 3, vào phía dưới dòng ghi chú và trên thẻ đóng body (\</body\>). Sau đó, bạn có thể code lại toàn bộ giao diện theo thương hiệu của bạn.
   UEngage sẽ cung cấp các hàm cụ thể để hỗ trợ việc render và xử lý data.
5. Chạy lệnh `npm start` hoặc `yarn start`

**Nếu bạn muốn sử dụng hosting Utop, bạn cần upload file lên UEngage. Để upload file, bạn cần thực hiện các bước sau:**

1. Sau 5 bước cài đặt ở trên, hãy chạy lệnh `npm run build` hoặc `yarn build`.
2. Khi có thư mục build, nén tất cả file có trong thư mục build ra 1 file zip.
3. Cuối cùng tại bước 3 trên UEngage, hãy chọn và upload file zip này, UEngage sẽ tiến hành CI/CD website theo file bạn đã upload.
4. UEngage sẽ render website và có thể xem trước bằng việc chọn nút ‘Xem trước trang’ dưới file vừa upload

Sau các bước cài đặt, bạn sẽ cần hiểu và sử dụng các biến cũng như các hàm mà UEngage cung cấp để chiến dịch của bạn được hoạt động.

<a name = "III"></a>

## III. Các cú pháp truy xuất

<a name = "III-1"></a>

### 1. Truy xuất biến

Để truy xuất các biến ứng với thông tin chiến dịch của bạn thì sử dụng cú pháp:

```js
window.masterData.campaignInfo
```

Thông tin được UEngage cung cấp bao gồm: `campaignId`, `campaignName`, `bizId`, `appId`, `startDate`, `endDate`
Ví dụ:

```js
const campaignId = window.masterData.campaignInfo.campaignId;
console.log(campaignId); //75a9dee0-ee68-4562-aeba-0b76bb9c4857
```

<a name = "III-2"></a>

### 2. Truy xuất hàm

Sau khi copy và paste đoạn mã config theo hướng dẫn ở mục **_[II](#ii-hướng-dẫn-cài-đặt-nguồn)_** vào nguồn của bạn, thì trong bất kỳ file .js nào, bạn chỉ cần sử dụng theo cú pháp:

```js
window.utopWidget
```

Dưới đây là danh sách các hàm mà UEngage cung cấp cho bạn

<a name = "III-2-1"></a>

#### 2.1 window.utopWidget.getFieldsFormSubmit()

Khi bạn thiết lập các field trong biểu mẫu tại bước 2 trên UEngage (trigger/ tab field).
UEngage cung cấp cho bạn hàm để lấy về danh sách các field đã đó, theo format:

```typescript
{
    attributeName: 'inputLotteryCode' | 'phoneNumber' | 'name' |
    'province' | 'zone' | 'dob' | 'gender' | 'address' | 'email',
    labelText: string,
    isRequired: boolean,
    listZone?: []
}
```

Bạn có thể tuỳ ý render và validate giá trị field theo mong muốn của bạn.

_**Lưu ý**: Với `attributeName: 'zone'` thì sẽ có thêm field `listZone` với giá
trị là mảng danh sách các zone bạn đã config trên portal_

Ví dụ:

```js
const listFields = window.utopWidget.getFieldsFormSubmit();
console.log(listFields);
// [
//     {attributeName: "inputLotteryCode", labelText: "Mã dự thưởng", isRequired: true},
//     {attributeName: "phoneNumber", labelText: "Số điện thoại", isRequired: true},
//     {attributeName: zone, labelText: "Khu vực", isRequired: false, listZone: ["Hồ Chí Minh", "Cần Thơ"]}
// ]
```

<a name = "III-2-2"></a>

#### 2.2 window.utopWidget.validateFormSubmit(dataValidate)

UEngage cung cấp 1 hàm để hỗ trợ cho bạn validate các field trong biểu mẫu, nhưng bạn có thể validate theo cách của bạn.

_**Lưu ý**: `dataValidate` là một Object với **key** ứng với `attributeName`, **value** ứng với giá trị mà bạn mapping với **key** đó. Nếu truyền sai UEngage sẽ không thể hỗ trợ bạn validate mà trả bạn mã lỗi. Hàm sẽ trả về 1 Promise, bạn có thể sử dụng `then-catch` hoặc `try-catch` để nhận kết quả từ hàm._

Nếu hàm validate lỗi sẽ reject 1 Object với format:

```js
{
  code: "Mã lỗi",
  message: "Message mặc định theo UEngage"
}
```

Danh sách mã lỗi vui lòng tham khảo mục **_[IV.](#iv-danh-sách-mã-lỗi)_** bên dưới.
Nếu validate thành công thì result bạn nhận đc sẽ là **`true`**

Ví dụ 1:

```js
const dataValidate = { inputLotteryCode: "", phoneNumber: "0123456789" };
const validate = validateFormSubmit(dataValidate);
console.log(validate);
// {code: “InvalidRequired”, message: “Field phoneNumber is required”}
```

Ví dụ 2:

```js
const dataValidate = { inputLotteryCode: "BJWQJ21312", phoneNumber: "ahihi" };
const validate = validateFormSubmit(dataValidate);
console.log(validate);
// {code: “InvalidPhoneNumber”, message: “Invalid field phoneNumber - phoneNumber must be 9-10 digits”}
```

Ví dụ 3:

```js
const dataValidate = { inputLotteryCode: "BJWQJ21312", phoneNumber: "0123456789" };
const validate = validateFormSubmit(dataValidate);
console.log(validate);
// true
```

<a name = "III-2-3"></a>

#### 2.3 window.utopWidget.getMessageError(err)

UEngage cung cấp 1 hàm để hỗ trợ cho bạn bắt lỗi, nhưng bạn có thể tuỳ ý catch mã lỗi để xử lý theo cách của bạn.
Khi sử dụng hàm của UEngage, UEngage sẽ trả về 1 Object với format:

```js
{
  code: "Mã lỗi",
  message: "Nội dung đã được UEngage mapping và xử lý dựa trên config nội dung lỗi của bạn trên portal"
}
```

Ví dụ 1:

```js
try {
  const response = await window.utopWidget.exchangeCode({
    campaignId: "campaign123",
    bizId: "bizid123",
    code: "submitcode",
    phoneNumber: "012345678",
  });
} catch (err) {
  const error = window.utopWidget.getMessageError(err);
  console.log(error); // {code: "CampaignIsNotFound", message: "Không tìm thấy chiến dịch, vui lòng kiểm tra lại!"}
}
```

Ví dụ 2:

```js
try {
  const response = await window.utopWidget.exchangeCode({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    code: "BPOMP7CZ7B",
    phoneNumber: "012345678",
  });
} catch (err) {
  const error = window.utopWidget.getMessageError(err);
  console.log(error); // {code: "CodeIsUsed", message: "Mã số BPOMP7CZ7B không hợp lệ hoặc đã được sử dụng. Quý khách vui lòng thử lại. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ và tư vấn."}
}
```

<a name = "III-2-4"></a>

#### 2.4 window.utopWidget.requestOTP({campaignId, bizId, phoneNumber})

UEngage cung cấp hàm để call api get OTP, giúp bạn xác thực số điện thoại thông qua gửi mã OTP đến người dùng cuối.
Khi sử dụng, vui lòng truyền giá trị mapping số điện thoại ứng với key **phoneNumber**. Sau khi call, UEngage sẽ trả về 1 Promise để bạn biết kết quả.
Nếu config của bạn trên UEngage **không** thiết lập ‘Xác thực bằng mã OTP’ thì hàm sẽ trả về **`false`**

_**Lưu ý**: Để lấy đc **campaignId** hoặc **bizId** tương ứng với chiến dịch mà bạn đang thiết lập, hãy sử dụng cú pháp như đã hướng dẫn ở mục ***[III.1](#1-truy-xuất-biến)***_

Ví dụ :

```js
try {
  const response = await window.utopWidget.requestOTP({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    phoneNumber: "012345678",
  });
  console.log(response); // false
} catch (err) {
  // handle error here
}
```

<a name = "III-2-5"></a>

#### 2.5 window.utopWidget.exchangeCode({campaignId, bizId, phoneNumber, code, otp?})

Khi người dùng cuối điền thông tin và tham gia chiến dịch của bạn. UEngage cung cấp hàm để kiểm tra thông tin tham dự.
Khi sử dụng hàm, vui lòng truyền giá trị số điện thoại ứng với key `phoneNumber` và giá trị mã thẻ cào ứng với key `code`. Hàm cung cấp api để call ‘Submit Lottery Code’ và sẽ trả về 1 Promise để bạn biết kết quả.

Nếu **CÓ** thiết lập xác thực người dùng bằng mã OTP thì sẽ truyền giá trị OTP vào key `otp`

_**Lưu ý**: Để sử dụng được hàm này, vui lòng ở ‘Button’ (hoặc thẻ tag) gọi hàm, đặt id cho thẻ tag với id như sau: `utopSubmitFormBtn`. Nếu **KHÔNG** tìm đc id ứng với thẻ đã gọi hàm thì sẽ trả lỗi._

Sau khi call api thì result bạn nhận đc sẽ

- Nếu thành công sẽ gồm các thông tin để định danh transaction, sau đó bạn thực hiện tích hợp thêm hàm `spinGift` ở mục **_[2.6](#26-windowutopwidgetspingiftcampaignid-bizid-phonenumber-transactionid-timestamp-signature)_** bên dưới

- Nếu thất bại sẽ là 1 format error:

```js
{
  code: "Mã lỗi",
  message: ""
}
```

Danh sách mã lỗi vui lòng tham khảo mục **_[IV](#iv-danh-sách-mã-lỗi)_** bên dưới

Bạn có thể tuỳ ý catch mã lỗi để xử lý hoặc có thể sử dụng hàm `getMessageError` đã mô tả tại mục **_[2.3](#23-windowutopwidgetgetmessageerrorerr)_** mà UEngage cung cấp, giúp bạn xử lý mã lỗi.

Ví dụ 1:

```js
try {
  const response = await window.utopWidget.exchangeCode({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    code: "BPOMP7CZ7B",
    phoneNumber: "0123456789",
  });
  console.log(response);
  // {
  //     "bizId": "3faa1971-45f8-41d9-901e-699bb3f41d7e",
  //     "campaignId": "75a9dee0-ee68-4562-aeba-0b76bb9c4857",
  //     "phoneNumber": "0123456789",
  //     "transactionId": "18437c42-8fac-43ad-89e5-eb04e3cae633",
  //     "timestamp": 1706768578,
  //     "timestampStr": null,
  //     "signature": "f5c13908deabe03d4cef5ce32b0052e8820829560785dcd9b2628e537d375b96",
  //     "nextAction": 0
  // }
} catch (err) {
  // handle error here
}
```

Ví dụ 2:

```js
try {
  const response = await window.utopWidget.exchangeCode({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    code: "BPOMP7CZ7B",
    phoneNumber: "0123456789",
    otp: "123456",
  });
  console.log(response);
} catch (err) {
  // err: {code: 'InvalidOtp', message: 'OTP không hợp lệ'}
  // handle error here
}
```

<a name = "III-2-6"></a>

#### 2.6 window.utopWidget.spinGift({campaignId, bizId, phoneNumber, transactionId, timestamp, signature})

Sau bước kiểm tra thông tin người tham dự, bạn sẽ sử dụng hàm này để phát quà.
Khi sử dụng, vui lòng truyền giá trị số điện thoại ứng với key `phoneNumber`. Hàm sẽ cung cấp cho bạn api để call ‘Achieve Gift’, sau đó, sẽ trả về 1 Promise để bạn biết kết quả.

Các thông tin như: `transactionId`, `timestamp`, `signature` chỉ có được thông qua kết quả của việc call api ‘exchangeCode’ đã mô tả tại mục **_[2.5](#25-windowutopwidgetexchangecodecampaignid-bizid-phonenumber-code-otp)_**

Nếu bạn không config widget ‘Achieve Gift’ trong bước 2 trên UEngage thì hàm sẽ trả về **`false`**

Sau khi call api thì kết quả bạn nhận được là:

- Nếu thành công sẽ là 1 format Object

```js
{
  code: "AchieveGift",
  message: "Nội dung đã được UEngage mapping và xử lý dựa trên config nội dung trúng thưởng của bạn trên portal"
}
```

- Nếu thất bại sẽ là 1 format Object:

```js
{
  code: "Mã lỗi",
  message: ""
}
```

Danh sách mã lỗi vui lòng tham khảo mục dưới **_[IV](#iv-danh-sách-mã-lỗi)_**

Bạn có thể tuỳ ý catch mã lỗi để xử lý hoặc có thể sử dụng hàm
`getMessageError` đã mô tả tại mục **_[2.3](#23-windowutopwidgetgetmessageerrorerr)_** mà UEngage cung cấp, giúp bạn xử lý mã lỗi.

Ví dụ :

```js
try {
  const resExchangeCode = await window.utopWidget.exchangeCode({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    code: "BPOMP7CZ7B",
    phoneNumber: "0123456789",
  });
  console.log(resExchangeCode);
  // {
  //     "bizId": "3faa1971-45f8-41d9-901e-699bb3f41d7e",
  //     "campaignId": "75a9dee0-ee68-4562-aeba-0b76bb9c4857",
  //     "phoneNumber": "0123456789",
  //     "transactionId": "18437c42-8fac-43ad-89e5-eb04e3cae633",
  //     "timestamp": 1706768578,
  //     "timestampStr": null,
  //     "signature": "f5c13908deabe03d4cef5ce32b0052e8820829560785dcd9b2628e537d375b96",
  //     "nextAction": 0
  // }
  const resSpinGift = await window.utopWidget.spinGift({
    campaignId: window.masterData.campaignInfo.campaignId,
    bizId: window.masterData.campaignInfo.bizId,
    phoneNumber: "0123456789",
    transactionId: resExchangeCode.transactionId,
    timestamp: resExchangeCode.timestamp,
    signature: resExchangeCode.signature,
  });
  console.log(resSpinGift);
  // {
  //     code: "AchieveGift",
  //     message: "Chúc mừng Quý khách trúng thưởng giải tessss. Liên hệ tổng đài (1,000đ/phút) để được hỗ trợ",
  // };
} catch (err) {
  // handle error here
}
```

<a name = "III-2-7"></a>

#### 2.7 window.utopWidget.getListZone()

UEngage cung cấp hàm để lấy danh sách khu vực mà bạn đã thiết lập tại widget “Submit Lottery Code Form” trong tab ‘Field’.
Hàm sẽ trả về **`false`** nếu bạn không thiết lập trường này 

Ví dụ:

```js
const listZone = window.utopWidget.getListZone();
console.log(listZone); // ["Hồ Chí Minh", "Cần Thơ"]
```

<a name = "III-2-8"></a>

#### 2.8 window.utopWidget.getListProvince()

UEngage cung cấp hàm để lấy danh sách tên 63 tỉnh thành Việt Nam. Hàm sẽ trả về 1 Promise để bạn biết kết quả.

Ví dụ:

```js
const [listProvince, setListProvince] = useState([])
useEffect(() => {
  window.utopWidget.getListProvince().then((res) => setListProvince(res))
  // [{id: "01", value: "Thành phố Hà Nội", communeId: "00001"}, ...]
}, [])
```

<a name = "IV"></a>

## IV. Danh sách mã lỗi

Khi sử dụng bất kì hàm được mô tả tại mục **_[III.](#iii-các-cú-pháp-truy-xuất)_** ở trên, hàm có lỗi xảy ra thì UEngage sẽ trả 1 Object với format:

```js
{
  code: "Mã Lỗi",
  message: "Tuỳ mã sẽ có message mặc định tương ứng"
}
```

| **Mã Lỗi**                | **Chú thích**                                                                               | **Ghi chú**          |
| :------------------------ | :------------------------------------------------------------------------------------------ | :------------------- |
| InvalidOtp                | OTP không hợp lệ                                                                            | API                  |
| CampaignIsNotPublished    | Chiến dịch chưa xuất bản                                                                    | API                  |
| CampaignIsNotFound        | Không tìm thấy chiến dịch                                                                   | API                  |
| CampaignNotStartYet       | Chiến dịch chưa bắt đầu                                                                     | API                  |
| CampaignFinished          | Chiến dịch đã kết thúc                                                                      | API                  |
| UserIsBlocked             | Người dùng bị chặn                                                                          | API                  |
| DailySubmissionExceed     | Giới hạn phát quà ngày                                                                      | API                  |
| WeeklySubmissionExceeded  | Giới hạn phát quà tuần                                                                      | API                  |
| MonthlySubmissionExceeded | Giới hạn phát quà tháng                                                                     | API                  |
| SubmissionExceeded        | Giới hạn phát quà trong chiến dịch                                                          | API                  |
| CodeIsUsed                | Mã dự thưởng đã sử dụng                                                                     | API                  |
| CodeIsNotFound            | Không tìm thấy mã dự thưởng                                                                 | API                  |
| InvalidLength             | Form bạn gửi validate có độ dài không khớp với config field mà bạn đã thiết lập trên portal | validateFormSubmit() |
| InvalidField              | Form bạn gửi chứa key không khớp với attributeName mà UEngage đã quy định                   | validateFormSubmit() |
| InvalidRequired           | Config mà bạn thiếp lập có required nhưng giá trị bạn mapping vào field lại không có        | validateFormSubmit() |
| InvalidPhoneNumber        | phoneNumber chỉ hỗ trợ số Việt Nam từ 9-10 số                                               | validateFormSubmit() |
| InvalidName               | name chỉ nhận text và khoảng trắng                                                          | validateFormSubmit() |
| InvalidDob                | dob chỉ nhận pattern: dd/mm/yyyy \| dd/mm/yy \| dd-mm-yyyy \| dd-mm-yy                      | validateFormSubmit() |
| NotFoundSubmitBtn         | Không tìm thấy id tương ứng của button submit                                               | exchangeCode()       |

_© 2023 - Bản quyền thuộc Utop JSC - Thành viên FPT_