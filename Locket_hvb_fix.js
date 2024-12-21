// Updated Locket_hvb_fix.js with fixed user_id
// ========= User ID Configuration ========= //
const fixedUserId = "1234567890abcdef"; // Thay đổi ID này thành user_id thực của bạn

// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Initialize ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// Bắt lỗi khi parsing response
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

// Gán user_id cố định
obj.subscriber.original_app_user_id = fixedUserId;

// ========= Modify Subscription Data ========= //
var specificDate = "2024-12-21T00:00:00Z"; // Ngày tham gia cố định
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z", // Ngày hết hạn lâu dài
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
  expires_date: "2099-12-31T23:59:59Z"
};

// Áp dụng Mapping
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let entitlementKey = mapping[match][0] || "Locket";
  let subscriptionKey = mapping[match][1] || "com.hoangvanbao.premium.yearly";

  obj.subscriber.subscriptions[subscriptionKey] = hoangvanbao;
  obj.subscriber.entitlements[entitlementKey] = hvb_entitlement;
} else {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements["Locket"] = hvb_entitlement;
}

// ========= Video Length Modification ========= //
// Đảm bảo rằng video_length luôn được thiết lập lại thành 15 giây
if (!obj.subscriber.features) {
  obj.subscriber.features = {};
}
obj.subscriber.features.video_length = 15; // Cho phép quay video dài 15 giây

// ========= Add Attention Message ========= //
obj.Attention = "Chúc mừng bạn Hoàng Văn Bảo! Vui lòng không bán hoặc chia sẻ cho người khác!";
console.log("Final Modified Response:", JSON.stringify(obj, null, 2));

// ========= Return Final Result ========= //
$done({ body: JSON.stringify(obj) });
