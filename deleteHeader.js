// ========= Header Modification ========= //
const version = 'V1.0.3';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Kiểm tra xem header "X-RevenueCat-ETag" có tồn tại không trước khi thay đổi
if(modifiedHeaders["X-RevenueCat-ETag"]) {
  setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
}

// Debug: In header đã sửa (tuỳ chọn)
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
