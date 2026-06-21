import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyBJy6RRfcPHjsVWjIUa7EH5JhhmZKwD2Wk",
    authDomain: "quancaffe-d800b.firebaseapp.com",
    databaseURL: "https://quancaffe-d800b-default-rtdb.firebaseio.com",
    projectId: "quancaffe-d800b",
    storageBucket: "quancaffe-d800b.firebasestorage.app",
    messagingSenderId: "387316681830",
    appId: "1:387316681830:web:94dc3be83a58b4d6f5b1a7"
};

/* =========================
   KHỞI TẠO FIREBASE
========================= */

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("🔥 Firebase khởi tạo thành công");

/* =========================
   TEST KẾT NỐI FIREBASE
========================= */

push(ref(db, "test"), {
    status: "online",
    time: new Date().toISOString()
})
.then(() => {
    console.log("✅ Firebase kết nối thành công");
})
.catch((err) => {
    console.error("❌ Firebase lỗi:", err);
    alert("Firebase lỗi:\n" + err.message);
});

/* =========================
   FORM ĐẶT BÀN
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const formSteps = document.querySelectorAll(".form-step");
    const stepDots = document.querySelectorAll(".progress-bar .step");
    const nextButtons = document.querySelectorAll(".btn-next");
    const prevButtons = document.querySelectorAll(".btn-prev");
    const bookingForm = document.getElementById("booking-form");

    let currentStep = 0;

    function updateFormSteps() {

        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        stepDots.forEach((dot, index) => {
            dot.classList.toggle("active", index <= currentStep);
        });
    }

    updateFormSteps();

    /* =========================
       NÚT TIẾP THEO
    ========================= */

    nextButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            if (currentStep === 0) {

                const name =
                    document.getElementById("booking-name").value.trim();

                const phone =
                    document.getElementById("booking-phone").value.trim();

                if (!name) {
                    alert("Vui lòng nhập họ tên!");
                    return;
                }

                if (phone.length < 9) {
                    alert("Vui lòng nhập số điện thoại hợp lệ!");
                    return;
                }
            }

            if (currentStep === 1) {

                const date =
                    document.getElementById("booking-date").value;

                if (!date) {
                    alert("Vui lòng chọn ngày!");
                    return;
                }
            }

            currentStep++;
            updateFormSteps();

        });

    });

    /* =========================
       NÚT QUAY LẠI
    ========================= */

    prevButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            if (currentStep > 0) {
                currentStep--;
                updateFormSteps();
            }

        });

    });

    /* =========================
       GỬI ĐẶT BÀN
    ========================= */

    bookingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn =
            document.querySelector(".btn-submit");

        const bookingData = {

            name:
                document.getElementById("booking-name").value.trim(),

            phone:
                document.getElementById("booking-phone").value.trim(),

            date:
                document.getElementById("booking-date").value,

            time:
                document.getElementById("booking-time").value,

            guests:
                document.getElementById("booking-guests").value,

            notes:
                document.getElementById("booking-notes").value.trim(),

            createdAt:
                new Date().toLocaleString("vi-VN")
        };

        try {

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...`;

            console.log("📤 Đang gửi:", bookingData);

            await push(
                ref(db, "dat_ban"),
                bookingData
            );

            console.log("✅ Đặt bàn thành công");

            alert("🎉 Đặt bàn thành công!");

            bookingForm.reset();

            currentStep = 0;

            updateFormSteps();

        } catch (error) {

            console.error("❌ Firebase Error:", error);

            alert(
                "Lỗi Firebase:\n\n" +
                error.code +
                "\n\n" +
                error.message
            );

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                `Xác Nhận Đặt Bàn <i class="fa-solid fa-circle-check"></i>`;
        }

    });

});