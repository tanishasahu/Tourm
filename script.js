
// ================================
// FOR SWIPER SLIDER
// ================================

function buildSlider(name, options) {

    if (typeof Swiper === "undefined") return;

    const container = document.querySelector("." + name + "-swiper");

    if (!container) return;

    const wrapper = container.querySelector(".swiper-wrapper");

    if (!wrapper) return;

    const minSlides = options.minSlides || 0;

    const originals = Array.from(wrapper.children);

    if (!originals.length) return;

    let i = 0;

    while (wrapper.children.length < minSlides) {

        wrapper.appendChild(
            originals[i % originals.length].cloneNode(true)
        );

        i++;

    }

    const nav = document.querySelector(
        '.slider-nav[data-slider="' + name + '"]'
    );

    const swiperOptions = {

        loop: true,

        spaceBetween: 22,

        grabCursor: true,

        navigation: nav
            ? {
                nextEl: nav.querySelector('[data-dir="next"]'),
                prevEl: nav.querySelector('[data-dir="prev"]')
            }
            : false,

        ...options

    };

    delete swiperOptions.minSlides;

    new Swiper(container, swiperOptions);

}


// ================================
// CATEGORIES SLIDER
// ================================

buildSlider("categories", {

    minSlides: 10,

    slidesPerView: 1.2,

    breakpoints: {

        576: {
            slidesPerView: 2
        },

        768: {
            slidesPerView: 3
        },

        1200: {
            slidesPerView: 4
        }

    }

});


// ================================
// DESTINATIONS SLIDER
// ================================

buildSlider("destinations", {

    minSlides: 10,

    slidesPerView: 1.2,

    breakpoints: {

        576: {
            slidesPerView: 2
        },

        992: {
            slidesPerView: 3
        },

        1200: {
            slidesPerView: 5
        }

    }

});


// ================================
// TOURS SLIDER
// ================================

buildSlider("tours", {

    minSlides: 8,

    slidesPerView: 1.2,

    breakpoints: {

        576: {
            slidesPerView: 2
        },

        992: {
            slidesPerView: 3
        }

    }

});


// ================================
// GUIDES SLIDER
// ================================

buildSlider("guides", {

    minSlides: 8,

    slidesPerView: 1.3,

    breakpoints: {

        576: {
            slidesPerView: 2
        },

        992: {
            slidesPerView: 4
        }

    }

});


// ================================
// TESTIMONIALS SLIDER
// ================================

buildSlider("testimonials", {

    minSlides: 6,

    slidesPerView: 1,

    breakpoints: {

        768: {
            slidesPerView: 2
        }

    }

});


// ================================
// COUNTER
// ================================

function animateCount(el) {

    const target = parseInt(
        el.getAttribute("data-target"),
        10
    );

    if (isNaN(target)) return;

    const duration = 1600;

    const start = performance.now();

    function tick(now) {

        const progress = Math.min(
            (now - start) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        el.textContent =
            Math.floor(eased * target);

        if (progress < 1) {

            requestAnimationFrame(tick);

        } else {

            el.textContent = target;

        }

    }

    requestAnimationFrame(tick);

}


// ================================
// COUNTER OBSERVER
// ================================

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                const el = entry.target;

                if (el.classList.contains("count")) {

                    animateCount(el);

                }

                revealObserver.unobserve(el);

            });

        },

        {
            threshold: 0.4
        }

    );

    document.querySelectorAll(".count").forEach(function (el) {

        revealObserver.observe(el);

    });

}


// ================================
// STICKY HEADER
// ================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 220) {

            navbar.classList.add("is-stuck");

        } else {

            navbar.classList.remove("is-stuck");

        }

    });

}


// ================================
// MOBILE MENU
// ================================

const menuBtn = document.querySelector("#menu-btn");

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (menuBtn) {

            menuBtn.checked = false;

        }

    });

});


// ================================
// CONTACT US -> FOOTER
// ================================

const contactLink = document.querySelector(
    '.menu a[href="#footer"]'
);

if (contactLink) {

    contactLink.addEventListener("click", function (e) {

        e.preventDefault();

        const footer = document.querySelector("#footer");

        if (footer) {

            footer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        if (menuBtn) {

            menuBtn.checked = false;

        }

    });

}


// ================================
// HERO SEARCH
// ================================

const heroSearch = document.querySelector(".hero_search");

if (heroSearch) {

    const selects =
        heroSearch.querySelectorAll("select");

    const destination = selects[0];
    const activity = selects[1];
    const duration = selects[2];
    const price = selects[3];

    const searchButton =
        heroSearch.querySelector(".hero_search-btn");


    if (searchButton) {

        searchButton.addEventListener("click", function (e) {

            e.preventDefault();

            const destinationValue =
                destination.value;

            const activityValue =
                activity.value;

            const durationValue =
                duration.value;

            const priceValue =
                price.value;


            if (
                destinationValue ===
                "Where are you going?"
            ) {

                alert("Please select a destination.");

                destination.focus();

                return;

            }


            const toursSection =
                document.querySelector("#tours");

            if (!toursSection) return;


            const tourCards =
                toursSection.querySelectorAll(".tour-card");


            let found = false;


            tourCards.forEach(function (card) {

                const cardText =
                    card.textContent.toLowerCase();

                const searchDestination =
                    destinationValue.toLowerCase();


                if (
                    cardText.includes(searchDestination)
                ) {

                    card.style.display = "";

                    found = true;

                } else {

                    card.style.display = "none";

                }

            });


            toursSection.scrollIntoView({
                behavior: "smooth"
            });


            let resultMessage =
                document.querySelector(
                    ".search-result-message"
                );


            if (!resultMessage) {

                resultMessage =
                    document.createElement("div");

                resultMessage.className =
                    "search-result-message";

                resultMessage.style.cssText = `
                    margin: 25px auto;
                    padding: 16px 20px;
                    max-width: 700px;
                    border-radius: 12px;
                    background: #eef6f7;
                    color: #0b2e39;
                    font-weight: 600;
                    text-align: center;
                `;


                const tourContainer =
                    toursSection.querySelector(".container");

                if (tourContainer) {

                    tourContainer.prepend(
                        resultMessage
                    );

                }

            }


            if (found) {

                resultMessage.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    Tours found for
                    <strong>${destinationValue}</strong>
                    <br>
                    <small>
                        ${activityValue} •
                        ${durationValue} •
                        ${priceValue}
                    </small>
                `;

            } else {

                resultMessage.innerHTML = `
                    <i class="fa-solid fa-circle-info"></i>
                    No tour found for
                    <strong>${destinationValue}</strong>.
                `;

            }

        });

    }

}


// ================================
// NAVBAR SEARCH ICON
// ================================

const navbarSearch =
    document.querySelector(".navbar-search");

if (navbarSearch) {

    navbarSearch.addEventListener("click", function (e) {

        e.preventDefault();

        const searchSection =
            document.querySelector(".hero_search");

        if (searchSection) {

            searchSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            setTimeout(function () {

                const destination =
                    searchSection.querySelector("select");

                if (destination) {

                    destination.focus();

                }

            }, 600);

        }

    });

}


// ================================
// SCROLL ANIMATION
// ================================

if ("IntersectionObserver" in window) {

    const animObserve =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";

                    entry.target.style.transform = "none";

                    animObserve.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0,

                rootMargin:
                    "0px 0px -80px 0px"
            }

        );


    document
        .querySelectorAll("section, .footers")
        .forEach(function (el) {

            el.style.opacity = "0";

            el.style.transform =
                "translateY(40px)";

            el.style.transition =
                "opacity 0.9s ease, transform 0.9s ease";

            animObserve.observe(el);

        });

}


// =====================================================
// BOOK NOW -> DYNAMIC BOOKING PAGE
// =====================================================

document.addEventListener("click", function (e) {

    const bookButton =
        e.target.closest(".book-now");

    if (!bookButton) return;

    e.preventDefault();


    const tourCard =
        bookButton.closest(".tour-card");

    if (!tourCard) return;


    const titleElement =
        tourCard.querySelector("h3 a");

    const imageElement =
        tourCard.querySelector("img");

    const locationElement =
        tourCard.querySelector(".tour-card_loc");

    const priceElement =
        tourCard.querySelector(".tour-card_price");

    const daysElement =
        tourCard.querySelector(".tour-card_days");


    const tourName =
        titleElement
            ? titleElement.textContent.trim()
            : "Your Selected Tour";


    const tourImage =
        imageElement
            ? imageElement.src
            : "";


    const tourLocation =
        locationElement
            ? locationElement.textContent.trim()
            : "";


    const tourPrice =
        priceElement
            ? priceElement.textContent.trim()
            : "";


    const tourDays =
        daysElement
            ? daysElement.textContent.trim()
            : "";


    createBookingPage(
        tourName,
        tourImage,
        tourLocation,
        tourPrice,
        tourDays
    );

});


// =====================================================
// CREATE BOOKING PAGE
// =====================================================

function createBookingPage(
    tourName,
    tourImage,
    tourLocation,
    tourPrice,
    tourDays
) {

    document.body.innerHTML = `

        <div class="booking-page">

            <header class="booking-header">

                <a href="#" id="backHome">
                    <i class="fa-solid fa-arrow-left"></i>
                    Back to Tours
                </a>

                <h2>
                    <i class="fa-solid fa-paper-plane"></i>
                    Tourm<span>.</span>
                </h2>

            </header>


            <main class="booking-container">

                <div class="booking-card">


                    <!-- TOUR IMAGE -->

                    <div class="booking-image">

                        ${
                            tourImage
                            ? `
                                <img
                                    src="${tourImage}"
                                    alt="${tourName}"
                                >
                            `
                            : ""
                        }


                        <div class="booking-image-text">

                            <span>
                                BOOK YOUR TRIP
                            </span>

                            <h1>
                                ${tourName}
                            </h1>

                        </div>

                    </div>


                    <!-- BOOKING FORM -->

                    <div class="booking-form-area">

                        <h2>
                            Complete Your Booking
                        </h2>

                        <p class="booking-subtitle">
                            Fill in your details and reserve your tour.
                        </p>


                        <form id="bookingForm">


                            <div class="form-row">


                                <div class="form-group">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="bookingName"
                                        placeholder="Enter your full name"
                                        required
                                    >

                                </div>


                                <div class="form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="bookingEmail"
                                        placeholder="Enter your email"
                                        required
                                    >

                                </div>


                            </div>


                            <div class="form-row">


                                <div class="form-group">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="bookingPhone"
                                        placeholder="Enter phone number"
                                        required
                                    >

                                </div>


                                <div class="form-group">

                                    <label>
                                        Travel Date
                                    </label>

                                    <input
                                        type="date"
                                        id="bookingDate"
                                        required
                                    >

                                </div>


                            </div>


                            <div class="form-row">


                                <div class="form-group">

                                    <label>
                                        Number of Travelers
                                    </label>

                                    <select
                                        id="travelers"
                                        required
                                    >

                                        <option value="">
                                            Select travelers
                                        </option>

                                        <option value="1">
                                            1 Person
                                        </option>

                                        <option value="2">
                                            2 Persons
                                        </option>

                                        <option value="3">
                                            3 Persons
                                        </option>

                                        <option value="4">
                                            4 Persons
                                        </option>

                                        <option value="5">
                                            5 Persons
                                        </option>

                                        <option value="6">
                                            6+ Persons
                                        </option>

                                    </select>

                                </div>


                                <div class="form-group">

                                    <label>
                                        Travel Type
                                    </label>

                                    <select id="travelType">

                                        <option>
                                            Solo Trip
                                        </option>

                                        <option>
                                            Couple Trip
                                        </option>

                                        <option>
                                            Family Trip
                                        </option>

                                        <option>
                                            Group Trip
                                        </option>

                                    </select>

                                </div>


                            </div>


                            <div class="form-group">

                                <label>
                                    Special Request
                                </label>

                                <textarea
                                    id="specialRequest"
                                    rows="4"
                                    placeholder="Any special request?"
                                ></textarea>

                            </div>


                            <!-- TOUR SUMMARY -->

                            <div class="booking-summary">


                                <div>

                                    <span>
                                        Selected Tour
                                    </span>

                                    <strong>
                                        ${tourName}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        ${tourLocation}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Price
                                    </span>

                                    <strong>
                                        ${tourPrice}
                                    </strong>

                                </div>


                            </div>


                            <button
                                type="submit"
                                class="confirm-booking"
                            >

                                Confirm Booking

                                <i class="fa-solid fa-arrow-right"></i>

                            </button>


                            <p
                                id="bookingSuccess"
                                class="booking-success"
                            ></p>


                        </form>

                    </div>

                </div>

            </main>

        </div>
    `;


    // ================================
    // BOOKING PAGE CSS
    // ================================

    const bookingStyle =
        document.createElement("style");


    bookingStyle.innerHTML = `

        * {
            box-sizing: border-box;
        }


        body {
            margin: 0;
            font-family: "Manrope", Arial, sans-serif;
            background: #eef6f7;
            color: #0b2e39;
        }


        .booking-page {
            min-height: 100vh;
        }


        .booking-header {
            min-height: 80px;
            background: #ffffff;

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 7%;

            box-shadow:
                0 4px 20px rgba(0,0,0,.06);
        }


        .booking-header h2 {
            margin: 0;
            color: #0e8f9c;
            font-size: 25px;
        }


        .booking-header h2 i {
            margin-right: 8px;
        }


        .booking-header h2 span {
            color: #3fc0cc;
        }


        .booking-header a {
            text-decoration: none;
            color: #0b2e39;
            font-weight: 700;
        }


        .booking-header a i {
            margin-right: 8px;
            color: #0e8f9c;
        }


        .booking-container {
            width: min(1150px, 92%);
            margin: 50px auto;
        }


        .booking-card {
            background: #ffffff;

            border-radius: 24px;

            overflow: hidden;

            box-shadow:
                0 20px 60px rgba(11,46,57,.12);
        }


        .booking-image {
            height: 300px;

            position: relative;

            overflow: hidden;

            background: #0b2e39;
        }


        .booking-image img {
            width: 100%;
            height: 100%;

            object-fit: cover;

            opacity: .72;
        }


        .booking-image::after {
            content: "";

            position: absolute;

            inset: 0;

            background:
                linear-gradient(
                    to top,
                    rgba(11,46,57,.9),
                    rgba(11,46,57,.1)
                );
        }


        .booking-image-text {
            position: absolute;

            z-index: 2;

            left: 45px;
            bottom: 35px;

            color: #fff;
        }


        .booking-image-text span {
            font-size: 13px;

            letter-spacing: 2px;

            color: #3fc0cc;

            font-weight: 800;
        }


        .booking-image-text h1 {
            margin: 8px 0 0;

            font-size:
                clamp(28px, 5vw, 45px);
        }


        .booking-form-area {
            padding: 45px;
        }


        .booking-form-area h2 {
            margin: 0;

            font-size: 30px;
        }


        .booking-subtitle {
            color: #5f6a6d;

            margin-bottom: 30px;
        }


        .form-row {
            display: grid;

            grid-template-columns:
                1fr 1fr;

            gap: 20px;

            margin-bottom: 20px;
        }


        .form-group {
            margin-bottom: 20px;
        }


        .form-group label {
            display: block;

            margin-bottom: 8px;

            font-weight: 700;

            font-size: 14px;
        }


        .form-group input,
        .form-group select,
        .form-group textarea {

            width: 100%;

            border:
                1px solid #dde9eb;

            border-radius: 10px;

            padding: 14px 16px;

            font-family: inherit;

            font-size: 15px;

            outline: none;

            background: #fff;

            color: #0b2e39;

            transition: .3s;
        }


        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {

            border-color: #0e8f9c;

            box-shadow:
                0 0 0 3px
                rgba(14,143,156,.1);
        }


        .form-group textarea {
            resize: vertical;
        }


        .booking-summary {

            background: #eef6f7;

            border-radius: 14px;

            padding: 20px;

            display: grid;

            grid-template-columns:
                1.4fr 1fr 1fr;

            gap: 20px;

            margin:
                10px 0 25px;
        }


        .booking-summary span {

            display: block;

            font-size: 12px;

            color: #5f6a6d;

            margin-bottom: 5px;
        }


        .booking-summary strong {
            font-size: 15px;
        }


        .confirm-booking {

            width: 100%;

            border: none;

            border-radius: 10px;

            padding: 16px;

            background: #0e8f9c;

            color: #fff;

            font-size: 16px;

            font-weight: 800;

            cursor: pointer;

            transition: .3s;
        }


        .confirm-booking:hover {

            background: #0b7480;

            transform:
                translateY(-2px);
        }


        .booking-success {

            text-align: center;

            color: #0e8f9c;

            font-weight: 800;

            margin:
                18px 0 0;

            min-height: 22px;
        }


        @media (max-width: 700px) {

            .booking-header {
                padding: 0 20px;
            }


            .booking-header h2 {
                font-size: 20px;
            }


            .booking-container {
                width: 94%;
                margin: 25px auto;
            }


            .booking-image {
                height: 230px;
            }


            .booking-image-text {
                left: 25px;
                bottom: 25px;
            }


            .booking-form-area {
                padding: 25px 20px;
            }


            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }


            .booking-summary {
                grid-template-columns: 1fr;
            }

        }

    `;


    document.head.appendChild(
        bookingStyle
    );


    // ================================
    // BACK TO TOURS
    // ================================

    document
        .getElementById("backHome")
        .addEventListener("click", function (e) {

            e.preventDefault();

            location.reload();

        });


    // ================================
    // BOOKING FORM
    // ================================

    document
        .getElementById("bookingForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();


            const name =
                document
                    .getElementById("bookingName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("bookingEmail")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("bookingPhone")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("bookingDate")
                    .value;


            const travelers =
                document
                    .getElementById("travelers")
                    .value;


            const successMessage =
                document.getElementById(
                    "bookingSuccess"
                );


            if (
                !name ||
                !email ||
                !phone ||
                !date ||
                !travelers
            ) {

                successMessage.textContent =
                    "Please fill all required details.";

                successMessage.style.color =
                    "#d9534f";

                return;

            }


            successMessage.textContent =
                "✓ Booking request submitted successfully!";

            successMessage.style.color =
                "#0e8f9c";


            document
                .getElementById("bookingForm")
                .reset();

        });

}


// =====================================================
// HEART BUTTON -> WISHLIST PAGE
// =====================================================

document.addEventListener("click", function (e) {

    const heartButton =
        e.target.closest(".tour-card_fav");

    if (!heartButton) return;

    e.preventDefault();


    const tourCard =
        heartButton.closest(".tour-card");

    if (!tourCard) return;


    const imageElement =
        tourCard.querySelector("img");

    const titleElement =
        tourCard.querySelector("h3 a");

    const locationElement =
        tourCard.querySelector(".tour-card_loc");

    const priceElement =
        tourCard.querySelector(".tour-card_price");

    const daysElement =
        tourCard.querySelector(".tour-card_days");


    const tourData = {

        image:
            imageElement
                ? imageElement.src
                : "",

        title:
            titleElement
                ? titleElement.textContent.trim()
                : "Selected Tour",

        location:
            locationElement
                ? locationElement.textContent.trim()
                : "",

        price:
            priceElement
                ? priceElement.textContent.trim()
                : "",

        days:
            daysElement
                ? daysElement.textContent.trim()
                : ""

    };


    // Save wishlist data
    localStorage.setItem(
        "tourWishlist",
        JSON.stringify(tourData)
    );


    createWishlistPage(
        tourData
    );

});


// =====================================================
// CREATE WISHLIST PAGE
// =====================================================

function createWishlistPage(tour) {

    document.body.innerHTML = `

        <div class="wishlist-page">

            <header class="wishlist-header">

                <button
                    id="wishlistBack"
                    class="wishlist-back"
                >
                    <i class="fa-solid fa-arrow-left"></i>
                    Back to Tours
                </button>

                <h2>
                    <i class="fa-solid fa-heart"></i>
                    My Wishlist
                </h2>

            </header>


            <main class="wishlist-container">

                <div class="wishlist-title">

                    <span>
                        SAVED TOUR
                    </span>

                    <h1>
                        Your Favourite Trip
                    </h1>

                    <p>
                        Your selected tour is saved in your wishlist.
                    </p>

                </div>


                <div class="wishlist-card">


                    <div class="wishlist-image">

                        <img
                            src="${tour.image}"
                            alt="${tour.title}"
                        >

                    </div>


                    <div class="wishlist-content">

                        <span class="wishlist-location">

                            <i class="fa-solid fa-location-dot"></i>

                            ${tour.location}

                        </span>


                        <h2>
                            ${tour.title}
                        </h2>


                        <p class="wishlist-days">

                            <i class="fa-solid fa-calendar-days"></i>

                            ${tour.days}

                        </p>


                        <div class="wishlist-price">

                            ${tour.price}

                        </div>


                        <button
                            id="wishlistBook"
                            class="wishlist-book"
                        >

                            Book Now

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                    </div>

                </div>

            </main>

        </div>
    `;


    // ================================
    // WISHLIST CSS
    // ================================

    const wishlistStyle =
        document.createElement("style");


    wishlistStyle.innerHTML = `

        .wishlist-page {

            min-height: 100vh;

            background: #eef6f7;

            color: #0b2e39;

            font-family:
                "Manrope",
                Arial,
                sans-serif;

        }


        .wishlist-header {

            min-height: 80px;

            background: #fff;

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 0 7%;

            box-shadow:
                0 4px 20px
                rgba(0,0,0,.06);

        }


        .wishlist-header h2 {

            margin: 0;

            color: #0e8f9c;

        }


        .wishlist-header h2 i {

            margin-right: 8px;

        }


        .wishlist-back {

            border: none;

            background: transparent;

            color: #0b2e39;

            font-size: 15px;

            font-weight: 700;

            cursor: pointer;

        }


        .wishlist-back i {

            color: #0e8f9c;

            margin-right: 7px;

        }


        .wishlist-container {

            width: min(1000px, 92%);

            margin: 0 auto;

            padding: 70px 0;

        }


        .wishlist-title {

            text-align: center;

            margin-bottom: 40px;

        }


        .wishlist-title span {

            color: #0e8f9c;

            font-size: 13px;

            font-weight: 800;

            letter-spacing: 2px;

        }


        .wishlist-title h1 {

            font-size: 40px;

            margin: 8px 0;

        }


        .wishlist-title p {

            color: #5f6a6d;

        }


        .wishlist-card {

            background: #fff;

            border-radius: 22px;

            padding: 25px;

            display: grid;

            grid-template-columns:
                45% 1fr;

            gap: 30px;

            align-items: center;

            box-shadow:
                0 20px 50px
                rgba(11,46,57,.10);

        }


        .wishlist-image img {

            width: 100%;

            height: 320px;

            object-fit: cover;

            border-radius: 16px;

            display: block;

        }


        .wishlist-location {

            color: #0e8f9c;

            font-weight: 700;

            font-size: 14px;

        }


        .wishlist-content h2 {

            font-size: 30px;

            line-height: 1.2;

            margin: 12px 0;

        }


        .wishlist-days {

            color: #5f6a6d;

        }


        .wishlist-price {

            color: #0e8f9c;

            font-size: 24px;

            font-weight: 800;

            margin: 20px 0;

        }


        .wishlist-book {

            border: none;

            background: #0e8f9c;

            color: #fff;

            padding: 14px 25px;

            border-radius: 30px;

            cursor: pointer;

            font-size: 15px;

            font-weight: 700;

            transition: .3s;

        }


        .wishlist-book:hover {

            background: #0b7480;

            transform:
                translateY(-2px);

        }


        @media (max-width: 700px) {

            .wishlist-header {

                padding: 0 20px;

            }


            .wishlist-header h2 {

                font-size: 19px;

            }


            .wishlist-container {

                width: 94%;

                padding: 40px 0;

            }


            .wishlist-title h1 {

                font-size: 30px;

            }


            .wishlist-card {

                grid-template-columns: 1fr;

            }


            .wishlist-image img {

                height: 240px;

            }


            .wishlist-content h2 {

                font-size: 25px;

            }

        }

    `;


    document.head.appendChild(
        wishlistStyle
    );


    // ================================
    // WISHLIST BACK BUTTON
    // ================================

    document
        .getElementById("wishlistBack")
        .addEventListener("click", function () {

            location.reload();

        });


    // ================================
    // WISHLIST BOOK NOW
    // ================================

    document
        .getElementById("wishlistBook")
        .addEventListener("click", function () {

            createBookingPage(

                tour.title,

                tour.image,

                tour.location,

                tour.price,

                tour.days

            );

        });

}


// =====================================================
// NEWSLETTER SUBSCRIBE
// =====================================================

const newsletterForm =
    document.querySelector(".newsletter_form");

const subscribeMessage =
    document.querySelector(".subscribe-message");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    "input[type='email']"
                );


            if (
                !emailInput ||
                !emailInput.value.trim()
            ) {

                return;

            }


            if (subscribeMessage) {

                subscribeMessage.textContent =
                    "✓ Successfully subscribed! Thank you.";

            }


            emailInput.value = "";

        }
    );

}
// ========================================
// SIGN UP / REGISTER
// ========================================

document.addEventListener("click", function (e) {

    const signup = e.target.closest(".topbar_signup");

    if (!signup) return;

    e.preventDefault();

    document.body.innerHTML = `
        <div class="register-page">

            <div class="register-box">

                <button class="register-close" id="closeRegister">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="register-icon">
                    <i class="fa-solid fa-user-plus"></i>
                </div>

                <h1>Create Account</h1>

                <p>
                    Sign up to plan your next amazing journey.
                </p>

                <form id="registerForm">

                    <div class="register-field">
                        <label>Full Name</label>

                        <div class="register-input">
                            <i class="fa-regular fa-user"></i>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                required
                            >
                        </div>
                    </div>

                    <div class="register-field">
                        <label>Email Address</label>

                        <div class="register-input">
                            <i class="fa-regular fa-envelope"></i>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            >
                        </div>
                    </div>

                    <div class="register-field">
                        <label>Password</label>

                        <div class="register-input">
                            <i class="fa-solid fa-lock"></i>

                            <input
                                type="password"
                                id="password"
                                placeholder="Create password"
                                required
                            >

                            <button
                                type="button"
                                id="showPassword"
                            >
                                <i class="fa-regular fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="register-submit">
                        Create Account
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </form>

            </div>

        </div>
    `;

    // ========================================
    // REGISTER PAGE STYLE
    // ========================================

    const style = document.createElement("style");

    style.textContent = `

        .register-page {
            min-height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 15px;

            background:
                linear-gradient(
                    rgba(11, 46, 57, .85),
                    rgba(11, 46, 57, .85)
                ),
                url("images/hero-bg.jpg")
                center/cover no-repeat;

            font-family: "Manrope", sans-serif;
        }

        .register-box {
            width: 100%;
            max-width: 450px;
            background: #fff;
            padding: 40px;
            border-radius: 22px;
            position: relative;
            box-shadow: 0 25px 70px rgba(0,0,0,.25);
        }

        .register-close {
            position: absolute;
            top: 15px;
            right: 15px;

            width: 38px;
            height: 38px;

            border: none;
            border-radius: 50%;

            background: #eef6f7;
            color: #0b2e39;

            cursor: pointer;
            font-size: 17px;
        }

        .register-icon {
            width: 65px;
            height: 65px;

            margin: 0 auto 15px;

            border-radius: 50%;

            background: #0e8f9c;
            color: #fff;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 24px;
        }

        .register-box h1 {
            text-align: center;
            color: #0b2e39;
            margin-bottom: 8px;
        }

        .register-box > p {
            text-align: center;
            color: #5f6a6d;
            font-size: 14px;
            margin-bottom: 25px;
        }

        .register-field {
            margin-bottom: 18px;
        }

        .register-field label {
            display: block;
            margin-bottom: 7px;
            font-size: 14px;
            font-weight: 700;
            color: #0b2e39;
        }

        .register-input {
            position: relative;
        }

        .register-input > i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #0e8f9c;
        }

        .register-input input {
            width: 100%;
            height: 50px;

            border: 1px solid #dde9eb;
            border-radius: 10px;

            padding: 0 45px;

            outline: none;
            font-family: inherit;
        }

        .register-input input:focus {
            border-color: #0e8f9c;
        }

        #showPassword {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);

            border: none;
            background: transparent;

            cursor: pointer;
            color: #5f6a6d;
        }

        .register-submit {
            width: 100%;
            height: 52px;

            border: none;
            border-radius: 10px;

            background: #0e8f9c;
            color: #fff;

            font-family: inherit;
            font-weight: 700;
            font-size: 15px;

            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            transition: .3s;
        }

        .register-submit:hover {
            background: #0b7480;
            transform: translateY(-2px);
        }

        @media (max-width: 500px) {

            .register-box {
                padding: 30px 22px;
            }

            .register-box h1 {
                font-size: 25px;
            }

        }

    `;

    document.head.appendChild(style);


    // ========================================
    // CLOSE
    // ========================================

    document
        .getElementById("closeRegister")
        .addEventListener("click", function () {
            location.reload();
        });


    // ========================================
    // SHOW / HIDE PASSWORD
    // ========================================

    document
        .getElementById("showPassword")
        .addEventListener("click", function () {

            const password = document.getElementById("password");
            const icon = this.querySelector("i");

            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                password.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }

        });


    // ========================================
    // REGISTER SUBMIT
    // ========================================

    document
        .getElementById("registerForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            alert("🎉 Account Created Successfully!");

        });

});
