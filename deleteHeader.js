// ================== deleteHeader.js ==================
// ✅ Xóa toàn bộ header liên quan đến RevenueCat
// ✅ Hỗ trợ iOS 18 - Bypass lỗi chứng nhận
// ✅ Loại bỏ thông tin cache để tránh lưu dữ liệu cũ

const version = 'V1.1.0';

// Xác định hệ điều hành từ User-Agent
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var isIOS18 = ua.includes("iOS 18");  // Xác định thiết bị iOS 18

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Xóa hoặc thay đổi giá trị của các header không cần thiết
function deleteHeader(e, key) {
  var r = key.toLowerCase();
  if (r in e) delete e[r];
}

// Xóa toàn bộ header liên quan đến RevenueCat
[
  "X-RevenueCat-ETag",
  "X-RevenueCat-Subscriber-Id",
  "X-RevenueCat-User-Id",
  "X-RevenueCat-Nonce",
  "X-RevenueCat-Transaction-Id",
  "Authorization",
  "User-Agent"
].forEach(header => deleteHeader(modifiedHeaders, header));

// Nếu iOS 18, thêm một số header để bỏ qua kiểm tra chứng nhận
if (isIOS18) {
  modifiedHeaders["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate";
  modifiedHeaders["Pragma"] = "no-cache";
  modifiedHeaders["Expires"] = "0";
  modifiedHeaders["Connection"] = "keep-alive";
}

// Debug: In header đã sửa (tuỳ chọn)
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
