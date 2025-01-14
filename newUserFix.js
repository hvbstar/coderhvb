// newUserFix.js
// ========= Fix for new users or those without previous modules ========= //
var specificDate = "2025-01-01T00:00:00Z"; // Định dạng ISO 8601

// Kiểm tra dữ liệu phản hồi
try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("Error parsing response body:", e);
  $done({}); // Trả kết quả trống nếu lỗi xảy ra
}

// Đảm bảo các key cơ bản tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// Tạo thông tin về quyền lợi và đăng ký Locket Gold
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z", // Ngày hết hạn lâu dài
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,  // Ngày tham gia
  purchase_date: specificDate,          // Ngày mua
  store: "app_store"
};

var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate, // Ngày tham gia
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z" // Ngày hết hạn lâu dài
};

// Đảm bảo rằng thông tin được cấp chính xác cho Locket Gold
obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
obj.subscriber.entitlements["Locket"] = hvb_entitlement;

// Trả kết quả cuối cùng
$done({ body: JSON.stringify(obj) });
