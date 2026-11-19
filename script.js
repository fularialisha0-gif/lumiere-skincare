// ======================================
// LUMIÈRE — INTERACTIVE WEBSITE
// ======================================


// 1. LOADING SCREEN

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1500);
});


// 2. SCROLL PROGRESS BAR

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    document.querySelector(".scroll-progress").style.width =
        progress + "%";

});


// 3. RITUAL CREATOR

const ritualButtons =
    document.querySelectorAll(".ritual-options button");

const ritualResult =
    document.getElementById("ritual-result");

ritualButtons.forEach(button => {

    button.addEventListener("click", () => {

        ritualButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const selectedRitual = button.dataset.ritual;

        if (selectedRitual === "Morning glow") {

            ritualResult.textContent =
                "Your morning, your glow. Start your day with a little magic. ☀";

        } else {

            ritualResult.textContent =
                "Slow down, unwind and enjoy your evening ritual. ☾";

        }

    });

});


// 4. PRODUCT CARD INTERACTION

const productButtons =
    document.querySelectorAll(".product-btn");

productButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const productNames = [
            "Radiance Serum",
            "Cloud Cream",
            "Velvet Cleanser"
        ];

        alert(
            "Discover " + productNames[index] +
            " — A LUMIÈRE skincare experience."
        );

    });

});


// 5. REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".story, .product-card, .ritual"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// 6. HERO MOUSE INTERACTION

const heroVisual = document.querySelector(".hero-visual");
const bottle = document.querySelector(".product-bottle");

if (heroVisual && bottle) {

    heroVisual.addEventListener("mousemove", (event) => {

        const rect = heroVisual.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 15;
        const rotateX = (0.5 - y / rect.height) * 15;

        bottle.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    heroVisual.addEventListener("mouseleave", () => {

        bottle.style.transform = "";

    });

}
// LUMIERE SKIN DISCOVERY QUIZ

const findMatchBtn = document.getElementById("findMatch");

findMatchBtn.addEventListener("click", function () {

    const skinType = document.getElementById("skinType").value;
    const skinConcern = document.getElementById("skinConcern").value;
    const skinPreference = document.getElementById("skinPreference").value;

    const result = document.getElementById("skinResult");

    if (!skinType || !skinConcern || !skinPreference) {
        result.innerHTML = `
            <p>Please answer all three questions first. 💜</p>
        `;
        return;
    }

    let recommendation = "";

    if (skinConcern === "dullness") {
        recommendation = "Radiance Serum";
    } 
    else if (skinConcern === "dryness" || skinConcern === "hydration") {
        recommendation = "Cloud Cream";
    } 
    else if (skinConcern === "oil") {
        recommendation = "Velvet Cleanser";
    } 
    else if (skinConcern === "sensitivity" || skinType === "sensitive" || skinPreference === "gentle") {
        recommendation = "Gentle skincare routine";
    }

    result.innerHTML = `
        <div class="result-card">
            <p>YOUR PERSONAL SKIN MATCH ✨</p>

            <h2>${recommendation}</h2>

            <p>
                Your answers helped us find a skincare
                option to explore.
            </p>

            <a href="#collection" class="hero-btn">
                Explore Collection ↗
            </a>
        </div>
    `;

});
// 3D MOUSE TILT EFFECT

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
});
// LUMIERE PRODUCT DETAILS POPUP

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("modalClose");

document.addEventListener("click", function (event) {

    const button = event.target.closest(".details-toggle");

    if (!button) return;

    const card = button.closest(".product-card");

    const image = card.querySelector(".product-photo");
    const title = card.querySelector("h3");
    const details = card.querySelector(".product-details");

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = title.textContent;

    const detailsCopy = details.cloneNode(true);

    detailsCopy.querySelectorAll("h4").forEach(heading => {

        // INGREDIENT BADGES
        if (heading.textContent.includes("KEY INGREDIENTS")) {

            const ingredientText = heading.nextElementSibling;

            if (ingredientText) {

                const ingredients = ingredientText.textContent.split("·");

                const badgeContainer = document.createElement("div");
                badgeContainer.className = "ingredient-badges";

                ingredients.forEach(item => {
                    const badge = document.createElement("span");
                    badge.className = "ingredient-badge";
                    badge.textContent = item.trim();
                    badgeContainer.appendChild(badge);
                });

                ingredientText.replaceWith(badgeContainer);
            }
        }

        // BENEFIT CARDS
        if (heading.textContent.includes("BENEFITS")) {

            const benefitList = heading.nextElementSibling;

            if (benefitList && benefitList.tagName === "UL") {

                benefitList.className = "benefit-cards";

                benefitList.querySelectorAll("li").forEach(item => {
                    item.className = "benefit-card";
                    item.insertAdjacentHTML("afterbegin", "✧ ");
                });
            }
        }

    });

    modalDescription.innerHTML = detailsCopy.innerHTML;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

});

function closeProductModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeProductModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeProductModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeProductModal();
    }
});