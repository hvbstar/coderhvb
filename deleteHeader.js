// deleteHeader.js
// ========= Xóa các header cũ có thể gây xung đột ========= //
const version = 'V1.0.4';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Xóa hoặc thay đổi giá trị của các header không cần thiết
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
setHeaderValue(modifiedHeaders, "X-RevenueCat-Subscriber-Id", "");
setHeaderValue(modifiedHeaders, "X-RevenueCat-User-Id", "");

// Debug: In header đã sửa (tuỳ chọn)
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
