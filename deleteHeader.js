// ========= Header Modification ========= //
const version = 'V1.0.4'; // Cập nhật phiên bản

// Hàm thiết lập giá trị cho header
function setHeaderValue(headers, key, value) {
  const lowerCaseKey = key.toLowerCase();
  headers[lowerCaseKey] = value;
}

// Lấy headers hiện tại từ request
const modifiedHeaders = { ...$request.headers };

// Thay đổi hoặc xóa giá trị của các header mục tiêu
const targetHeaders = ["X-RevenueCat-ETag"]; // Thêm các header khác nếu cần
targetHeaders.forEach(header => setHeaderValue(modifiedHeaders, header, ""));

// Debug: In header đã sửa (tuỳ chọn)
console.log("Modified Headers:", JSON.stringify(modifiedHeaders, null, 2));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
