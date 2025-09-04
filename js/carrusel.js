document.addEventListener("DOMContentLoaded", () => {
  const carruseles = document.querySelectorAll(".servicios-row-wrapper, .portfolio-row-wrapper");

  carruseles.forEach(wrapper => {
    const track = wrapper.querySelector(".servicios-row, .portfolio-row");
    const items = Array.from(track.children);
    const prevBtn = wrapper.querySelector(".carousel-btn.prev");
    const nextBtn = wrapper.querySelector(".carousel-btn.next");

    let startIndex = 0;

    function getVisible() {
      if (window.innerWidth <= 480) return 1;       // Móvil
      if (window.innerWidth <= 768) return 2;       // Tablet
      return 3;                                     // Desktop
    }

    function render(direction) {
      const visible = getVisible();

      items.forEach(item => {
        item.classList.remove("visible", "slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
        item.style.display = "none";
      });

      for (let i = 0; i < visible; i++) {
        const idx = (startIndex + i) % items.length;
        const card = items[idx];
        card.style.display = "flex";
        card.classList.add("visible");

        if (direction === "next") {
          card.classList.add("slide-in-right");
          setTimeout(() => card.classList.remove("slide-in-right"), 400);
        }
        if (direction === "prev") {
          card.classList.add("slide-in-left");
          setTimeout(() => card.classList.remove("slide-in-left"), 400);
        }
      }
    }

    nextBtn.addEventListener("click", () => {
      const visible = getVisible();
      if (startIndex < items.length - visible) startIndex++;
      else startIndex = 0;
      render("next");
    });

    prevBtn.addEventListener("click", () => {
      const visible = getVisible();
      if (startIndex > 0) startIndex--;
      else startIndex = items.length - visible;
      render("prev");
    });

    window.addEventListener("resize", () => render()); // Re-render al cambiar tamaño

    render(); // inicial
  });
});
