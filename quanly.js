// Tải dữ liệu khi mở trang
document.addEventListener("DOMContentLoaded", loadBookings);

function saveBooking() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let time = document.getElementById("time").value;

    if (!name || !phone || !time) return alert("Điền đủ thông tin!");

    let booking = { name, phone, time };
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings(); // Cập nhật bảng
    // Reset form
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("time").value = "";
}

function loadBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    bookings.forEach((b, index) => {
        tbody.innerHTML += `<tr>
            <td>${b.name}</td><td>${b.phone}</td><td>${b.time}</td>
            <td><button onclick="deleteBooking(${index})">Xóa</button></td>
        </tr>`;
    });
}

function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings"));
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
}