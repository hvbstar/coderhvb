// ================== newUserFix.js ==================
// ✅ Fix lỗi cho người dùng mới hoặc không có module trước đó
// ✅ Kiểm tra và cấp quyền Locket Gold chính xác hơn
// ✅ Cải thiện log & tối ưu hiệu suất

var specificDate = "2025-01-01T00:00:00Z"; // Định dạng ISO 8601
var expiresDate = "2099-12-30T01:04:17Z"; // Đồng bộ ngày hết hạn

// Kiểm tra response trước khi parse JSON
if (!$response.body) {
  console.log("❌ Lỗi: Response body không tồn tại!");
  $done({});
}

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("❌ Error parsing response body:", e);
  $done({});
}

// Đảm bảo các key cơ bản tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// Nếu thiết bị đã có Locket Gold, không cần cấp lại
if (obj.subscriber.entitlements["Locket"]) {
  console.log("⚠️ Thiết bị đã có Locket Gold, không cần cấp lại!");
  $done({ body: JSON.stringify(obj) });
} else {
  console.log("🔄 Thiết bị chưa có Locket Gold, tiến hành cấp quyền!");
}

// Định nghĩa gói Locket Gold
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: expiresDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: expiresDate
};

// Áp dụng quyền lợi cho Locket Gold
obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
obj.subscriber.entitlements["Locket"] = hvb_entitlement;

// Thông báo thành công
console.log("✅ Locket Gold đã được kích hoạt thành công!");

// Trả kết quả cuối cùng
$done({ body: JSON.stringify(obj) });

// URL Đã Fix Để Tránh Các Lỗi Không Mong Muốn Trong Quá Trình Sử Dụng. Cảm Ơn Bạn Luôn Đồng Hành Cùng Tôi !!!
