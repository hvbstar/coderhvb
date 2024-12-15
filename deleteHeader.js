// ========= Header Modification ========= //
const version = 'V1.0.3';

function setHeaderValue(headers, key, value) {
  var lowerKey = key.toLowerCase();
  if (lowerKey in headers) {
    headers[lowerKey] = value;
  } else {
    headers[key] = value;
  }
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Thay đổi giá trị của X-RevenueCat-ETag
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Debug: In header đã sửa (tuỳ chọn)
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
