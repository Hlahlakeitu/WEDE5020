/* =====================================
   SOWETO MEAT LOVERS
   WEBSITE JAVASCRIPT
===================================== */


/* =====================================
   1. MOBILE NAVIGATION
===================================== */

function toggleMenu() {

    const navMenu = document.getElementById("navMenu");
    const menuButton = document.querySelector(".menu-btn");

    if (!navMenu || !menuButton) return;

    const isOpen = navMenu.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}


document.addEventListener("DOMContentLoaded", function () {

    const navMenu = document.getElementById("navMenu");
    const menuButton = document.querySelector(".menu-btn");

    if (navMenu && menuButton) {

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");
                menuButton.setAttribute("aria-expanded", "false");

            });

        });


        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navMenu.classList.remove("show");
                menuButton.setAttribute("aria-expanded", "false");

            }

        });


        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {

                navMenu.classList.remove("show");
                menuButton.setAttribute("aria-expanded", "false");

            }

        });

    }

});


/* =====================================
   2. GALLERY LIGHTBOX
===================================== */

let previousFocusElement = null;


function openLightbox(galleryItem) {

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    if (!lightbox || !lightboxImage || !galleryItem) return;

    const image = galleryItem.querySelector("img");

    if (!image) return;

    previousFocusElement = document.activeElement;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Gallery image";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const closeButton = lightbox.querySelector(".close-lightbox");

    if (closeButton) {
        closeButton.focus();
    }

}


function closeLightbox(event) {

    const lightbox = document.getElementById("lightbox");

    if (!lightbox) return;

    if (
        event &&
        event.target !== lightbox &&
        !event.target.closest(".close-lightbox")
    ) {
        return;
    }

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    const lightboxImage = document.getElementById("lightboxImage");

    if (lightboxImage) {
        lightboxImage.src = "";
    }

    if (previousFocusElement) {
        previousFocusElement.focus();
    }

}


document.addEventListener("keydown", function (event) {

    const lightbox = document.getElementById("lightbox");

    if (
        event.key === "Escape" &&
        lightbox &&
        lightbox.classList.contains("active")
    ) {

        closeLightbox({ target: lightbox });

    }

});


/* =====================================
   3. GALLERY KEYBOARD ACCESSIBILITY
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(function (item) {

        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-label", "Open gallery image");

        item.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                openLightbox(item);

            }

        });

    });

});


/* =====================================
   4. CONTACT FORM VALIDATION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    const formMessage = document.getElementById("formMessage");


    const fields = [

        {
            id: "name",
            errorId: "nameError",
            validate: function (value) {

                return value.trim().length >= 2
                    ? ""
                    : "Please enter your name.";

            }
        },

        {
            id: "email",
            errorId: "emailError",
            validate: function (value) {

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return emailPattern.test(value.trim())
                    ? ""
                    : "Please enter a valid email address.";

            }
        },

        {
            id: "phone",
            errorId: "phoneError",
            validate: function (value) {

                if (value.trim() === "") return "";

                const digits = value.replace(/\D/g, "");

                return digits.length >= 7 && digits.length <= 15
                    ? ""
                    : "Please enter a valid phone number.";

            }
        },

        {
            id: "subject",
            errorId: "subjectError",
            validate: function (value) {

                return value.trim() !== ""
                    ? ""
                    : "Please select an enquiry type.";

            }
        },

        {
            id: "message",
            errorId: "messageError",
            validate: function (value) {

                if (value.trim().length < 10) {
                    return "Please enter a message of at least 10 characters.";
                }

                if (value.length > 2000) {
                    return "Your message is too long.";
                }

                return "";

            }
        }

    ];


    function validateField(field) {

        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);

        if (!input || !errorElement) return true;

        const error = field.validate(input.value);

        errorElement.textContent = error;

        input.setAttribute(
            "aria-invalid",
            String(Boolean(error))
        );

        return error === "";

    }


    fields.forEach(function (field) {

        const input = document.getElementById(field.id);

        if (!input) return;

        input.addEventListener("blur", function () {
            validateField(field);
        });

        input.addEventListener("input", function () {

            const errorElement = document.getElementById(field.errorId);

            if (errorElement && errorElement.textContent !== "") {
                validateField(field);
            }

        });

    });


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;
        let firstInvalidField = null;

        fields.forEach(function (field) {

            const isValid = validateField(field);

            if (!isValid) {

                valid = false;

                if (!firstInvalidField) {
                    firstInvalidField = document.getElementById(field.id);
                }

            }

        });


        if (!valid) {

            if (formMessage) {
                formMessage.textContent =
                    "Please correct the errors before submitting.";
            }

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;

        }


        if (formMessage) {

            formMessage.textContent =
                "Your information is valid. The contact form still needs to be connected to a submission service.";

        }

    });

});
/* =====================================
   5. GALLERY SEARCH AND FILTER
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("gallerySearch");
    const filterButtons = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const resultMessage = document.getElementById("galleryResult");
    const noResults = document.getElementById("noGalleryResults");

    // Stop if this is not the Gallery page
    if (!searchInput || galleryItems.length === 0) return;

    let activeCategory = "all";


    function filterGallery() {

        const searchText = searchInput.value.trim().toLowerCase();

        let visibleCount = 0;

        galleryItems.forEach(function (item) {

            const category = item.dataset.category || "";

            const image = item.querySelector("img");

            const caption = item.querySelector(".gallery-caption");

            const imageText = (
                (image ? image.alt : "") + " " +
                (caption ? caption.textContent : "") + " " +
                category
            ).toLowerCase();

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;

            const matchesSearch =
                imageText.includes(searchText);

            const shouldShow = matchesCategory && matchesSearch;

            item.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }

        });


        // Update results
        if (resultMessage) {

            resultMessage.textContent =
                "Showing " + visibleCount +
                " of " + galleryItems.length + " images.";

        }


        // Show message when no results match
        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }

    }


    // Category filter buttons
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            activeCategory = button.dataset.filter;

            filterButtons.forEach(function (otherButton) {

                const isActive = otherButton === button;

                otherButton.classList.toggle("active", isActive);

                otherButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            filterGallery();

        });

    });


    // Live search
    searchInput.addEventListener("input", filterGallery);


    // Initial gallery display
    filterGallery();

});
/* =====================================
   4. CONTACT FORM VALIDATION
   AND SUBMISSION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    const formMessage = document.getElementById("formMessage");

    const fields = [
        {
            id: "name",
            errorId: "nameError",
            validate: function (value) {
                return value.trim().length >= 2
                    ? ""
                    : "Please enter your full name.";
            }
        },
        {
            id: "email",
            errorId: "emailError",
            validate: function (value) {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return pattern.test(value.trim())
                    ? ""
                    : "Please enter a valid email address.";
            }
        },
        {
            id: "phone",
            errorId: "phoneError",
            validate: function (value) {
                if (value.trim() === "") return "";

                const digits = value.replace(/\D/g, "");

                return digits.length >= 7 && digits.length <= 15
                    ? ""
                    : "Please enter a valid phone number.";
            }
        },
        {
            id: "subject",
            errorId: "subjectError",
            validate: function (value) {
                return value.trim() !== ""
                    ? ""
                    : "Please select an enquiry type.";
            }
        },
        {
            id: "message",
            errorId: "messageError",
            validate: function (value) {
                return value.trim().length >= 10
                    ? ""
                    : "Your message must contain at least 10 characters.";
            }
        }
    ];

    function validateField(field) {

        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);

        if (!input || !error) return true;

        const message = field.validate(input.value);

        error.textContent = message;

        input.setAttribute(
            "aria-invalid",
            String(Boolean(message))
        );

        return message === "";
    }

    fields.forEach(function (field) {

        const input = document.getElementById(field.id);

        if (!input) return;

        input.addEventListener("blur", function () {
            validateField(field);
        });

        input.addEventListener("input", function () {

            const error = document.getElementById(field.errorId);

            if (error && error.textContent !== "") {
                validateField(field);
            }

        });

    });

    contactForm.addEventListener("submit", function (event) {

        let valid = true;
        let firstInvalid = null;

        fields.forEach(function (field) {

            if (!validateField(field)) {

                valid = false;

                if (!firstInvalid) {
                    firstInvalid = document.getElementById(field.id);
                }

            }

        });

        if (!valid) {

            event.preventDefault();

            if (formMessage) {
                formMessage.textContent =
                    "Please correct the errors before submitting.";
            }

            if (firstInvalid) firstInvalid.focus();

            return;
        }

        // Valid form: allow normal submission to FormSubmit.
        if (formMessage) {
            formMessage.textContent = "Sending your enquiry...";
        }

    });

});