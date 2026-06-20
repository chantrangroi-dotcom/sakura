document.addEventListener("DOMContentLoaded", () => {
    const formSteps = document.querySelectorAll(".form-step");
    const stepDots = document.querySelectorAll(".progress-bar .step");
    const nextButtons = document.querySelectorAll(".btn-next");
    const prevButtons = document.querySelectorAll(".btn-prev");
    const bookingForm = document.getElementById("booking-form");
    const dateInput = document.getElementById("booking-date");

    let currentStep = 0; // Bước đầu tiên (Index bằng 0)

    // Khóa ngày trong quá khứ
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // Hàm cập nhật giao diện ẩn/hiện form và thanh tiến trình
    function updateFormSteps() {
        // Cập nhật ẩn/hiện các khối bước
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        // Cập nhật màu sắc trên thanh tiến trình 1-2-3
        stepDots.forEach((dot, index) => {
            dot.classList.toggle("active", index <= currentStep);
        });
    }

    // Hàm kiểm tra tính hợp lệ dữ liệu ở bước 1
    function validateStep() {
        if (currentStep === 0) {
            const name = document.getElementById("booking-name");
            const phone = document.getElementById("booking-phone");
            let isValid = true;

            if (name.value.trim() === "") {
                name.nextElementSibling.style.display = "block";
                name.style.borderColor = "#ff5252";
                isValid = false;
            } else {
                name.nextElementSibling.style.display = "none";
                name.style.borderColor = "#ddd";
            }

            if (phone.value.trim().length < 9) {
                phone.nextElementSibling.style.display = "block";
                phone.style.borderColor = "#ff5252";
                isValid = false;
            } else {
                phone.nextElementSibling.style.display = "none";
                phone.style.borderColor = "#ddd";
            }

            return isValid;
        }
        return true; // Các bước khác mặc định cho qua
    }

    // Xử lý khi nhấn nút "Tiếp theo"
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (validateStep()) {
                currentStep++;
                if (currentStep >= formSteps.length) currentStep = formSteps.length - 1;
                updateFormSteps();
            }
        });
    });

    // Xử lý khi nhấn nút "Quay lại"
    prevButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            if (currentStep < 0) currentStep = 0;
            updateFormSteps();
        });
    });

    // Xử lý khi bấm nút "Xác nhận đặt bàn" cuối cùng
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const submitBtn = document.querySelector(".btn-submit");
            const name = document.getElementById("booking-name").value;
            const phone = document.getElementById("booking-phone").value;
            const date = dateInput.value;
            const time = document.getElementById("booking-time").value;
            const guests = document.getElementById("booking-guests").options[document.getElementById("booking-guests").selectedIndex].text;

            // Hiệu ứng loading giả lập gửi dữ liệu lên server
            submitBtn.disabled = true;
            submitBtn.style.background = "#8e6c58";
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang hoàn tất lịch hẹn...`;

            setTimeout(() => {
                alert(`🎉 ĐẶT BÀN HOÀN TẤT THÀNH CÔNG!\n\nHệ thống đã lưu trữ lịch của bạn:\n👤 Khách hàng: ${name}\n📞 SĐT: ${phone}\n⏰ Thời gian: ${time} ngày ${date}\n👥 Số lượng: ${guests}`);
                
                // Reset form về trạng thái ban đầu
                bookingForm.reset();
                currentStep = 0;
                updateFormSteps();

                submitBtn.disabled = false;
                submitBtn.style.background = "#6b3e26";
                submitBtn.innerHTML = `Xác Nhận Đặt Bàn <i class="fa-solid fa-circle-check"></i>`;
            }, 1500);
        });
    }
});