<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecom24x7</title>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ url('frontend/css/style.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/css/theme.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/css/searchtab.css') }}">
    <link rel="stylesheet" type="text/css" href="slick/slick.css">
    <link rel="stylesheet" type="text/css" href="slick/slick-theme.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css">
    <link href="cdn/shop/t/40/assets/theme78b0.css?v=139269663027275441241714929435" rel="stylesheet" type="text/css" media="all">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/dashboard/vendor/fonts/boxicons.css') }}">

    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ asset('assets/dashboard/vendor/css/core.css') }}" class="template-customizer-core-css">
    <link rel="stylesheet" href="{{ asset('assets/dashboard/vendor/css/theme-default.css') }}" class="template-customizer-theme-css">
    <link rel="stylesheet" href="{{ asset('assets/dashboard/css/demo.css') }}">

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ asset('assets/dashboard/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}">

    <!-- Page CSS -->
    <link rel="stylesheet" href="{{ asset('assets/dashboard/vendor/css/pages/page-auth.css') }}">
    
    
     <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Helpers -->
    <script src="{{ asset('assets/dashboard/vendor/js/helpers.js') }}"></script>
</head>

<body class="no-js">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background:#fffdf5!important;">
        <div class="container-fluid">
            <a class="navbar-brand" href="{{ url('/') }}"><img src="{{ url('frontend/img/logo (2).png') }}" alt="Ecom24x7" style="width:133px;"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item site-nav__item site-nav__expanded-item">
                        <a class="nav-link active site-nav__link site-nav__link--underline" aria-current="page" href="{{ url('/') }}">Home</a>
                    </li>
                     <li class="nav-item site-nav__item site-nav__expanded-item">
                    <a class="nav-link site-nav__link site-nav__link--underline" href="{{ url('/about') }}">About Us</a>
                    </li> 
                    <li class="nav-item site-nav__item site-nav__expanded-item">
                        <a class="nav-link site-nav__link site-nav__link--underline" href="{{ url('/jewelry') }}"> Shop Now</a>
                    </li>
                    <li class="nav-item site-nav__item site-nav__expanded-item">
                     <a class="nav-link site-nav__link site-nav__link--underline" href="{{ url('/blog') }}">Blog</a>
                    </li>
                    <li class="nav-item site-nav__item site-nav__expanded-item">
                        <a class="nav-link site-nav__link site-nav__link--underline" href="{{ url('/contact') }}">Contact Us</a>
                    </li>
                </ul>
                
   <form class="d-flex" id="search-form">
   <button type="button" id="search-previous" style="display: none;">Up Arrow</button>
   <button type="button" id="search-next" style="display: none;">Down Arrow</button>
</form>
<p id="search-count"></p>
<div id="search-results"></div>

<form class="d-flex" id="search-form" action="{{ route('search') }}" method="GET">
    <!--@csrf-->
    <div class="input-group">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-input" name="query">
        <button class="" type="submit"><i class="fas fa-search"></i></button>
    </div>
</form>


<!--<div id="search-results">-->
    <!-- Search results will be dynamically inserted here -->
<!--</div>-->

<!-- Container for displaying products -->
<div class="product-container">
    <!-- Products will be dynamically added here -->
</div>
                <div class="header-item header-item--icons">
                    <div class="site-nav">
                            <div class="site-nav__icons">
                                <a class="site-nav__link site-nav__link--icon small--hide" href="{{ url('/signin') }}">
                                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-user" viewBox="0 0 64 64">
                                        <path d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z" />
                                    </svg>
                                    <span class="icon__fallback-text">Log in</span>
                                </a>
<a class="site-nav__link site-nav__link--icon small--hide" href="{{ url('/wishlist') }}">
   <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-heart" viewBox="0 0 64 64">
            <path d="M32 58s-7.2-4.1-12-8.5C14.5 44.6 10 40.2 10 34.5 10 28 15 23 21.5 23c3.4 0 6.8 1.8 8.5 4.7C32.7 24.8 36.1 23 39.5 23 46 23 51 28 51 34.5c0 5.7-4.5 10.1-10 15C39.2 53.9 32 58 32 58z"/>
        </svg>
        <span class="icon__fallback-text">Wishlist</span>
</a>
                                <a href="{{ url('/cart') }}" class="site-nav__link site-nav__link--icon js-drawer-open-cart" aria-controls="CartDrawer" data-icon="cart">
                                    <span class="cart-link">
                                        <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-cart" viewBox="0 0 64 64">
                                            <path fill="none" d="M14 17.44h46.79l-7.94 25.61H20.96l-9.65-35.1H3" />
                                            <circle cx="27" cy="53" r="2" />
                                            <circle cx="47" cy="53" r="2" />
                                        </svg>
                                        <span class="icon__fallback-text">Cart</span>
                                        <span id="CartBubble" class="cart-link__bubble"></span>
                                    </span>
                                </a>
                            </div>
                        </div>
                </div>
   
           </div>
       </div>
</nav>

                    <div class="announcement-bar">
                        <div class="page-width">
                            <div class="slideshow-wrapper">
                                <button type="button" class="visually-hidden slideshow__pause" data-id="header"
                                    aria-live="polite">
                                    <span class="slideshow__pause-stop">
                                        <svg aria-hidden="true" focusable="false" role="presentation"
                                            class="icon icon-pause" viewBox="0 0 10 13">
                                            <g fill="#000" fill-rule="evenodd">
                                                <path d="M0 0h3v13H0zM7 0h3v13H7z" />
                                            </g>
                                        </svg>
                                        <span class="icon__fallback-text">Pause slideshow</span>
                                    </span>
                                    <span class="slideshow__pause-play">
                                        <svg aria-hidden="true" focusable="false" role="presentation"
                                            class="icon icon-play" viewBox="18.24 17.35 24.52 28.3">
                                            <path fill="#323232" d="M22.1 19.151v25.5l20.4-13.489-20.4-12.011z" />
                                        </svg>
                                        <span class="icon__fallback-text">Play slideshow</span>
                                    </span>
                                </button>

                                <div id="AnnouncementSlider" class="announcement-slider" data-compact="true"
                                    data-block-count="3">
                                    <div id="AnnouncementSlide-1524770292306" class="announcement-slider__slide"
                                        data-index="0"><span class="announcement-text">📦 Free Shipping Across India!</span>
                                    </div>
                                    <div id="AnnouncementSlide-1524770296206" class="announcement-slider__slide"
                                        data-index="1"><span class="announcement-text">💎 All Products Are 100% Lab-Grown 
                                            </span></div>
                                    <div id="AnnouncementSlide-bbd40ada-6bda-4119-96e1-5be93ee73fba"
                                        class="announcement-slider__slide" data-index="2"><span
                                            class="announcement-text"> 🔥 Summer Sale On Now – Up to 25% Off!</span></div>
                                </div>
                            </div>
                        </div>
                    </div>





<style>
    .highlight {
        background-color: #0d1a2f;
        font-weight: bold;
    }
    .result-item {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
    }
</style>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchCount = document.getElementById('search-count');

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                fetch(`/search?query=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        displayResults(data);
                    })
                    .catch(error => {
                        console.error('Error fetching search results:', error);
                    });
            } else {
                searchResults.innerHTML = '';
                searchCount.textContent = '';
            }
        });

        function displayResults(data) {
            searchResults.innerHTML = '';
            if (data.length > 0) {
                data.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p>`;
                    searchResults.appendChild(resultItem);
                });
                searchCount.textContent = `${data.length} results found`;
            } else {
                searchCount.textContent = 'No results found';
            }
        }
    });
    // Show all announcements in a slider fashion

    function showAnnouncements() {
        const slider = document.getElementById('AnnouncementSlider');
        const slides = slider.querySelectorAll('.announcement-slider__slide');
        let currentIndex = 0;
        const totalSlides = slides.length;
        let intervalId;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = (i === index) ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        // Initial display
        showSlide(currentIndex);

        // Start interval
        intervalId = setInterval(nextSlide, 3000);

        // Optional: Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(intervalId));
        slider.addEventListener('mouseleave', () => {
            intervalId = setInterval(nextSlide, 3000);
        });
    }

    showAnnouncements();
</script>



    <!-- Include Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="{{ asset('assets/dashboard/js/main.js') }}"></script>