// ================== deleteHeader.js ==================
// ✅ Xóa toàn bộ header liên quan đến RevenueCat
// ✅ Hỗ trợ iOS 18 - Bypass lỗi chứng nhận
// ✅ Loại bỏ thông tin cache để tránh lưu dữ liệu cũ

const version = 'V1.1.1';

// Xác định hệ điều hành từ User-Agent
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var isIOS18 = ua.includes("iOS 18");  // Xác định thiết bị iOS 18

// Log request headers
console.log("Request Headers:", JSON.stringify($request.headers));

// Lấy headers hiện tại từ request (Tạo một bản sao mới để tránh lỗi)
var modifiedHeaders = Object.assign({}, $request.headers);

// Xóa hoặc thay đổi giá trị của các header không cần thiết
function deleteHeader(e, key) {
  if (key in e) delete e[key];
}

// Chỉ xóa các headers không cần thiết
[
  "X-RevenueCat-Nonce",
  "X-RevenueCat-Transaction-Id",
  "Authorization",
  "User-Agent",
  "Referer"  // ✅ Thêm vào để loại bỏ cache cũ
].forEach(header => deleteHeader(modifiedHeaders, header));

// Nếu iOS 18, thêm một số header để bỏ qua kiểm tra chứng nhận
if (isIOS18) {
  modifiedHeaders["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate";
  modifiedHeaders["Pragma"] = "no-cache";
  modifiedHeaders["Expires"] = "0";
  modifiedHeaders["Connection"] = "keep-alive";
}

// Log modified headers
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });

// URL Đã Fix Để Tránh Các Lỗi Không Mong Muốn Trong Quá Trình Sử Dụng. Cảm Ơn Bạn Luôn Đồng Hành Cùng Tôi !!!
