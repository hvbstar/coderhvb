// ========= Header Modification ========= //
// Script By HoangVanBao - Version 1.0.3
function setHeaderValue(headers, headerName, newValue) {
  const lowerHeader = headerName.toLowerCase();
  headers[lowerHeader] ? headers[lowerHeader] = newValue : headers[headerName] = newValue;
}

// Lấy headers hiện tại từ request
const modifiedHeaders = $request.headers;

// Xóa giá trị "X-RevenueCat-ETag"
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Debug header đã sửa đổi
console.log("Modified Request Headers:", JSON.stringify(modifiedHeaders, null, 2));

// Trả lại headers đã chỉnh sửa
$done({ headers: modifiedHeaders });
