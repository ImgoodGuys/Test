function switchTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("naptheForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        username: form.username.value.trim(),
        telco: form.telco.value,
        serial: form.serial.value.trim(),
        code: form.code.value.trim(),
        amount: form.amount.value.trim()
      };

      const ketquaEl = document.getElementById("ketqua");
      ketquaEl.innerText = "⏳ Đang xử lý...";

      try {
        const res = await fetch("https://replit.com/@hn0709196/serverjs?s=app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.status === 1) {
          ketquaEl.innerText = "✅ Nạp thẻ thành công! Số tiền đã cộng vào tài khoản.";
        } else {
          ketquaEl.innerText = `❌ Thất bại: ${result.message || "Lỗi không xác định"}`;
        }
      } catch (err) {
        console.error(err);
        ketquaEl.innerText = "❌ Lỗi kết nối đến máy chủ.";
      }
    });
  }
});
