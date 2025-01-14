// newUserFix.js - Fix lỗi cho người dùng mới hoặc không có module trước đó
var specificDate = "2025-01-01T00:00:00Z"; // Định dạng ISO 8601

// Lấy thông tin User-Agent để debug và xác định thiết bị
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
console.log("User-Agent:", ua);

// Kiểm tra dữ liệu phản hồi
try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("❌ Error parsing response body:", e);
  $done({}); // Trả kết quả trống nếu lỗi xảy ra
}

// Đảm bảo các key cơ bản tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// Nếu đã có Locket Gold thì không cần cấp lại
if (obj.subscriber.entitlements["Locket"]) {
  console.log("⚠️ Locket Gold đã được kích hoạt, không cần cấp lại!");
  $done({ body: JSON.stringify(obj) });
}

// Tạo thông tin về quyền lợi và đăng ký Locket Gold
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z", // Ngày hết hạn lâu dài
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate, // Ngày tham gia
  purchase_date: specificDate, // Ngày mua
  store: "app_store"
};

var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate, // Ngày tham gia
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z" // Ngày hết hạn lâu dài
};

// Áp dụng quyền lợi cho Locket Gold
obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
obj.subscriber.entitlements["Locket"] = hvb_entitlement;

// Thông báo thành công và ghi log
console.log("✅ Locket Gold đã được kích hoạt thành công cho thiết bị này!");

// Trả kết quả cuối cùng
$done({ body: JSON.stringify(obj) });
