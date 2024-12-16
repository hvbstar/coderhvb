// Đặt ngày tham gia là 12/12/2024
var specificDate = "2024-12-12T00:00:00Z";

// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold'] // Đảm bảo rằng Locket Gold được sử dụng đúng cách
};

// ========= Phần cố định ========= //
// ========= @HoangVanBao ========= //
var ua = ($request.headers["User-Agent"] || $request.headers["user-agent"] || "").toLowerCase();

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("JSON Parse Error:", e);
  $done({}); // Dừng script nếu gặp lỗi parse
}

// Thêm thông báo
obj.Attention = "Chúc mừng bạn Hoàng Văn Bảo! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Tạo thông tin gói Gold
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var hvb_entitlement = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra và gán gói Gold
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s ? (hvb_entitlement.product_identifier = s, obj.subscriber.subscriptions[s] = hoangvanbao) : obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements[e] = hvb_entitlement;
} else {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements.Locket = hvb_entitlement;
}

// Log response đã chỉnh sửa
console.log("Modified Response:", JSON.stringify(obj));

// Trả về response mới
$done({ body: JSON.stringify(obj) });
