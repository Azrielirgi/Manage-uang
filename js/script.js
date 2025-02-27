document.addEventListener("DOMContentLoaded", function () {
  // === 1. Toggle Navbar ===
  const menu = document.querySelector(".navbar-nav");
  const hamburger = document.querySelector("#hamburger-menu");

  if (menu && hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("active");
      }
    });
  }

  // === 2. Active Navigation Link ===
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
      menu.classList.remove("active");
    });
  });

  // === 3. Modal Interaksi ===
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const orderModal = document.getElementById("order-modal");
  const paymentModal = document.getElementById("payment-modal");
  const ewalletModal = document.getElementById("ewallet-modal");
  const quantityInput = document.getElementById("quantity");
  const temperatureSelect = document.getElementById("temperature");
  const confirmOrderButton = document.querySelector(".confirm-btn");
  const confirmPaymentButton = document.getElementById("confirmButton"); // Sesuaikan dengan HTML
  const successMessage = document.getElementById("success-message");
  const successModal = document.getElementById("success-modal");
  const closeSuccessModal = document.getElementById("close-success-modal");

  if (!successModal) console.warn("Modal sukses tidak ditemukan di HTML!");
  if (!successMessage)
    console.warn("Elemen pesan sukses tidak ditemukan di HTML!");
  if (!closeSuccessModal)
    console.warn("Tombol tutup modal tidak ditemukan di HTML!");

  let selectedItem = {};

  // === 4. Event Listener Tombol "Beli Sekarang" ===
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedItem.name = this.getAttribute("data-name");
      selectedItem.price = this.getAttribute("data-price");
      orderModal.style.display = "flex";
    });
  });

  // === 5. Konfirmasi Pesanan ===
  if (confirmOrderButton) {
    confirmOrderButton.addEventListener("click", function () {
      selectedItem.quantity = quantityInput.value;
      selectedItem.temperature = temperatureSelect.value;

      alert(
        `Pesanan Anda: ${selectedItem.quantity} ${selectedItem.temperature} ${selectedItem.name} telah dikonfirmasi.`
      );

      console.log("Pesanan dikonfirmasi:", selectedItem);

      orderModal.style.display = "none"; // Tutup modal pemesanan
      paymentModal.style.display = "flex"; // Buka modal pembayaran
    });
  }

  // === 6. Pilihan Metode Pembayaran ===
  document.querySelectorAll(".payment-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Hindari refresh halaman

      let method = this.innerText;
      if (method === "E-Wallet") {
        paymentModal.style.display = "none"; // Tutup modal pembayaran
        ewalletModal.style.display = "flex"; // Buka modal E-Wallet
      } else {
        if (successMessage) {
          successMessage.innerText = `Pembayaran dengan ${method} berhasil! Pesanan Anda sedang diproses.`;
        }
        if (successModal) successModal.style.display = "flex"; // Tampilkan modal sukses
        paymentModal.style.display = "none";
      }
    });
  });

  // === 7. Konfirmasi Pembayaran ===
  if (confirmPaymentButton) {
    confirmPaymentButton.addEventListener("click", function (event) {
      event.preventDefault(); // Hindari refresh halaman

      console.log("Tombol konfirmasi pembayaran diklik!");

      if (successMessage) {
        successMessage.innerText = `Pembayaran berhasil! Pesanan Anda (${selectedItem.quantity} ${selectedItem.temperature} ${selectedItem.name}) sedang diproses.`;
        console.log("Pesan sukses diubah menjadi:", successMessage.innerText);
      }

      if (successModal) successModal.style.display = "flex"; // Tampilkan modal sukses
      console.log("Modal sukses seharusnya muncul!");

      ewalletModal.style.display = "none"; // Tutup modal E-Wallet
    });
  }

  // === 8. Validasi Input Jumlah Pesanan ===
  if (quantityInput) {
    quantityInput.addEventListener("input", function () {
      if (this.value < 1) this.value = 1;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Cek apakah tombol "Tutup" ada
  let closeSuccessBtn = document.getElementById("close-success-modal");

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", function () {
      // Sembunyikan modal sukses
      document.getElementById("success-modal").style.display = "none";

      // Pindah ke bagian menu
      window.location.href = "#menu";
    });
  }
});

// === 9 Modal Transfer Bank ===
let bankModal = document.getElementById("bank-transfer-modal");
let confirmBankBtn = document.querySelector("#bank-transfer-modal button");
let openBankBtn = document.querySelector(
  ".payment-btn[onclick=\"payWith('Transfer Bank')\"]"
);

function openBankTransferModal() {
  bankModal.style.display = "flex";
}

function closeModal() {
  bankModal.style.display = "none";
  successModal.style.display = "none";
}

function showSuccessModal(message) {
  if (successModal.style.display === "flex") return; // Cegah duplikasi
  successMessage.innerText = message;

  setTimeout(() => {
    successModal.style.display = "flex";
  }, 500);
}

// Event Listener Modal Transfer Bank
if (confirmBankBtn && !confirmBankBtn.dataset.listener) {
  confirmBankBtn.dataset.listener = "true";
  confirmBankBtn.addEventListener(
    "click",
    function (event) {
      event.preventDefault(); // Hindari refresh halaman

      console.log("Tombol konfirmasi transfer diklik!");

      // Setelah user menutup alert, baru proses berikutnya dilakukan
      setTimeout(() => {
        console.log("Menutup modal transfer bank...");
        bankModal.style.display = "none"; // Tutup modal transfer bank

        // Tunggu 1 detik sebelum menampilkan modal sukses
        setTimeout(() => {
          console.log("Menampilkan modal sukses...");
          successModal.style.display = "flex"; // Tampilkan modal sukses
        }, 1000);
      }, 500); // Beri jeda setelah menutup alert rekening
    },
    500
  ); // Beri sedikit delay sebelum alert muncul
}

if (openBankBtn) {
  openBankBtn.addEventListener("click", function (event) {
    event.preventDefault();
    openBankTransferModal();
  });
}

// Event Listener Tutup Modal
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

let userName =
  new URLSearchParams(window.location.search).get("name") || "Pelanggan";

function openBankTransferModal() {
  document.getElementById("bank-transfer-modal").style.display = "flex";
}

document
  .getElementById("confirm-transfer")
  .addEventListener("click", function () {
    document.getElementById("bank-transfer-modal").style.display = "none";
    document.getElementById(
      "success-message"
    ).innerText = `Pesanan atas nama ${userName} sedang diproses.`;
    document.getElementById("success-modal").style.display = "flex";
  });

function closeSuccessModal() {
  document.getElementById("success-modal").style.display = "none";
}
