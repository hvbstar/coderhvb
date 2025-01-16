// ================== Locket_hvb_fix.js ==================
// ✅ Fix lỗi trên iOS 18 - Tăng tỉ lệ kích hoạt Locket Gold
// ✅ Tự động bỏ qua kiểm tra chứng nhận tin cậy
// ✅ Hỗ trợ cả iOS 17 & iOS 18

var specificDate = "2025-01-01T00:00:00Z"; // Định dạng ISO 8601
var expiresDate = "2099-12-30T01:04:17Z"; // Đồng bộ ngày hết hạn

// Danh sách mapping ID
const mapping = {
  'Locket': ['Gold', 'com.hoangvanbao.premium.yearly'],
  'VIP': ['vip+watch_vip', 'com.hoangvanbao.vip.yearly']
};

// Xác định hệ điều hành từ User-Agent
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var isIOS18 = /iOS (\d+)/.test(ua) && parseInt(RegExp.$1) >= 18;

// Log request headers và response body
console.log("Request Headers:", JSON.stringify($request.headers));
console.log("Response Body:", $response.body);

// Kiểm tra response trước khi parse JSON
if (!$response.body) {
  console.log("Lỗi: Response body không tồn tại!");
  $done({});
}

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("Error parsing response:", e);
  $done({});
}

// Đảm bảo object tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// Định nghĩa gói Locket Gold
var hoangvanbao = {
  is_sandbox: isIOS18,
  ownership_type: isIOS18 ? "FAMILY" : "PURCHASED",
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

// Áp dụng mapping dựa trên User-Agent
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

// 📌 Nếu iOS 18, ép giữ cache để bỏ qua kiểm tra chứng nhận tin cậy
if (isIOS18) {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"].ownership_type = "FAMILY";
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"].is_sandbox = true;
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"].store = "app_store";
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"].expires_date = expiresDate;
}

// 📌 Thêm header để bypass kiểm tra chứng nhận
$done({
  headers: {
    "X-RevenueCat-ETag": "fixed_value",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Connection": "keep-alive",
    "Accept-Encoding": "gzip, deflate, br"
  },
  body: JSON.stringify(obj)
});

// URL Đã Fix Để Tránh Các Lỗi Không Mong Muốn Trong Quá Trình Sử Dụng. Cảm Ơn Bạn Luôn Đồng Hành Cùng Tôi !!!
