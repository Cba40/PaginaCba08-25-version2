document.addEventListener("DOMContentLoaded", () => {
  const carruseles = document.querySelectorAll(".servicios-row-wrapper, .portfolio-row-wrapper");

  carruseles.forEach(wrapper => {
    const track = wrapper.querySelector(".servicios-row, .portfolio-row");
    const items = Array.from(track.children);
    const prevBtn = wrapper.querySelector(".carousel-btn.prev");
    const nextBtn = wrapper.querySelector(".carousel-btn.next");

    let startIndex = 0;
    const visible = 3;

    function render(direction) {
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
      if (startIndex < items.length - visible) startIndex++;
      else startIndex = 0;
      render("next");
    });

    prevBtn.addEventListener("click", () => {
      if (startIndex > 0) startIndex--;
      else startIndex = items.length - visible;
      render("prev");
    });

    render(); // inicial
  });
});
