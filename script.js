function autoScale() {
    const root = document.getElementById("scaleRoot");
    const screenWidth = window.innerWidth;

    const designWidth = 360; // asumsi desain HP
    let scale = screenWidth / designWidth;

    // batas aman
    scale = Math.min(Math.max(scale, 1), 1.7);

    root.style.transform = `scale(${scale})`;
    root.style.transformOrigin = "top center";
}

window.addEventListener("load", autoScale);
window.addEventListener("resize", autoScale);

var heart= document.getElementById('heart'),
    heartW = heart.offsetWidth,
    heartH = heart.offsetHeight;

document.body.onmousemove = function( event ) {
  var x = event.clientX - (heartW / 2);
  var y = event.clientY  - (heartH / 2);
  
  heart.style.transform = "translate("+ x +"px, "+ y +"px) rotate(-45deg)"
}

document.getElementById("nextBtn").onclick = function () {
  window.location.href = "../next/index.html";
};

const heartInput = document.getElementById("heartInput");
const nextBtn = document.getElementById("nextBtn");

heartInput.addEventListener("change", () => {
  if (heartInput.checked) {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }
});

nextBtn.onclick = () => {
  window.location.href = "../envelope/index.html"; // sesuaikan path
};
