// Đặt ngày tham gia là 12/12/2024
var specificDate = "2024-12-12T00:00:00Z"; // Ngày tham gia ở định dạng ISO 8601

// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'], // Ví dụ gói khác
  'Locket': ['Gold'] // Đảm bảo gói Locket Gold được áp dụng
};

// ========= Nội dung cố định ========= //
// ========= @HoangVanBao ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"]; // Lấy User-Agent từ request
var obj = JSON.parse($response.body); // Phân tích body từ response

// Thêm chú thích cá nhân hóa
obj.Attention = "Chúc mừng bạn Hoàng Văn Bảo! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Tạo thông tin gói Locket Gold
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

// Tạo entitlement cho gói Locket Gold
var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate, // Ngày tham gia
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z" // Ngày hết hạn
};

// Kiểm tra User-Agent và gán entitlements
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  if (s) {
    hvb_entitlement.product_identifier = s;
    obj.subscriber.subscriptions[s] = hoangvanbao;
  } else {
    obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  }
  obj.subscriber.entitlements[e] = hvb_entitlement; // Gán gói Locket Gold vào entitlements
} else {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements.Locket = hvb_entitlement; // Đảm bảo entitlements luôn có gói Locket Gold
}

// Log để kiểm tra nội dung response đã chỉnh sửa (debug)
console.log("Modified Response Body:", JSON.stringify(obj));

// Trả kết quả sau khi chỉnh sửa
$done({ body: JSON.stringify(obj) });
