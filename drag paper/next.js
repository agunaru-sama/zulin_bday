document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  nextBtn.addEventListener("click", () => {
    window.location.href = "../gameboy/index.html"; 
    // ganti sesuai folder HTML berikutnya
  });
});
