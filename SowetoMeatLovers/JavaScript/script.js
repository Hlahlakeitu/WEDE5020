// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    if (menu) {

        menu.classList.toggle("show");

    }

}


// Close menu when navigation link is clicked

const navigationLinks =
    document.querySelectorAll("#navMenu a");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const menu =
            document.getElementById("navMenu");

        if (menu) {

            menu.classList.remove("show");

        }

    });

});


// ========================================
// GALLERY LIGHTBOX
// ========================================

function openLightbox(element) {

    const image =
        element.querySelector("img");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");


    if (image && lightbox && lightboxImage) {

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeLightbox(event) {

    if (event) {

        event.stopPropagation();

    }


    const lightbox =
        document.getElementById("lightbox");


    if (lightbox) {

        lightbox.classList.remove("show");

        document.body.style.overflow = "auto";

    }

}


// Close lightbox with ESC key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});
// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value;


            const formMessage =
                document.getElementById("formMessage");


            if (name.trim() !== "") {

                formMessage.textContent =
                    "Thank you, " +
                    name +
                    "! Your message has been received.";

                contactForm.reset();

            }

        }
    );

}