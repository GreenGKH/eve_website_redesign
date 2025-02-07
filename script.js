window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    let isScrolling = false;
    let currentIndex = 0;

    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        isScrolling = true;

        sections[currentIndex].classList.remove("active");

        currentIndex = index;
        sections[currentIndex].classList.add("active");

        sections[currentIndex].scrollIntoView({ behavior: "smooth" });

        // Empêche un scroll trop rapide
        setTimeout(() => {
            isScrolling = false;
        }, 300);
    }

    function getCurrentSectionIndex() {
        let index = 0;
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                index = i;
            }
        });
        return index;
    }

    window.addEventListener("wheel", function (event) {
        if (isScrolling) return;
        const direction = event.deltaY > 0 ? 1 : -1;
        scrollToSection(currentIndex + direction);
    });

    window.addEventListener("keydown", function (event) {
        if (isScrolling) return;
        if (event.key === "ArrowDown") {
            scrollToSection(currentIndex + 1);
        } else if (event.key === "ArrowUp") {
            scrollToSection(currentIndex - 1);
        }
    });

    sections[0].classList.add("active");
});
