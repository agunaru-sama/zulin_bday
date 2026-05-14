let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Fungsi universal untuk Mouse dan Touch saat bergerak (Move)
    const moveHandler = (e) => {
      let clientX, clientY;
      
      // Deteksi apakah digeser pakai jari atau mouse
      if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if(!this.rotating) {
        this.mouseX = clientX;
        this.mouseY = clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = clientX - this.mouseTouchX;
      const dirY = clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    // Pasang di document agar saat digeser kencang, kertas tidak lepas
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });

    // Fungsi universal saat kertas mulai dipegang/disentuh (Start)
    const startHandler = (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      let clientX, clientY;
      if (e.type === 'touchstart') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
        // Klik kanan mouse untuk rotasi
        if(e.button === 2) {
          this.rotating = true;
        }
      }
      
      this.mouseTouchX = clientX;
      this.mouseTouchY = clientY;
      this.prevMouseX = clientX;
      this.prevMouseY = clientY;
    };

    paper.addEventListener('mousedown', startHandler);
    paper.addEventListener('touchstart', startHandler);

    // Fungsi universal saat kertas dilepas (End)
    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchend', endHandler);

    // Untuk fitur putar dua jari (Gesture di perangkat tertentu)
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// Logika Tombol Next
const lastPaper = document.querySelector(".paper.last");
const nextBtn = document.getElementById("nextBtn");

function checkTopPaper() {
  if (!lastPaper) return;

  const z = parseInt(lastPaper.style.zIndex || 0);
  if (z >= highestZ - 1) {
    lastPaper.classList.add("show-next");
  }
}

// Tambahkan event touchstart juga di sini
document.querySelectorAll(".paper").forEach(paper => {
  ['mousedown', 'touchstart'].forEach(eventType => {
    paper.addEventListener(eventType, () => {
      document.querySelectorAll(".paper").forEach(p => p.classList.remove("active"));
      paper.classList.add("active");

      if (paper.classList.contains("last")) {
        setTimeout(checkTopPaper, 100);
      }
    });
  });
});

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    window.location.href = "../gameboy/index.html"; // ganti path jika perlu
  });
}
