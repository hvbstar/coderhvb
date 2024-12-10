// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold'] // Đảm bảo rằng Locket Gold được sử dụng đúng cách
};

// =========   Phần cố định  ========= //
// =========  @Ohoang7 ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Tạo thông tin về gói Locket Gold
var ohoang7 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",  // Đảm bảo ngày hết hạn là lâu dài
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

var vuong2023 = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra loại gói và gán Locket Gold vào entitlements
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s ? (vuong2023.product_identifier = s, obj.subscriber.subscriptions[s] = ohoang7) : obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  obj.subscriber.entitlements[e] = vuong2023; // Gán Locket Gold vào entitlements
} else {
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  obj.subscriber.entitlements.Locket = vuong2023; // Đảm bảo Locket Gold được thêm vào
}

$done({ body: JSON.stringify(obj) });