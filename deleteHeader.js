// ========= Header Modification ========= //
const version = 'V1.0.3';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers || {};

// Kiểm tra và xóa "X-RevenueCat-ETag" nếu tồn tại
if (modifiedHeaders["X-RevenueCat-ETag"] || modifiedHeaders["x-revenuecat-etag"]) {
  setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
  console.log("Header X-RevenueCat-ETag removed");
} else {
  console.log("X-RevenueCat-ETag not found");
}

// Debug: In header đã sửa
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Trả về header mới
$done({ headers: modifiedHeaders });
