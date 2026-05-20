/**
 * Shramik Shanti Campus - System Infrastructure Operations Engine
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("SSC Operations Engine Core Online.");

    /* 1. Universal Mobile Menu Viewport Tray Toggles */
    const hamburgerBtn = document.getElementById("hamburger");
    const mobileNavTray = document.getElementById("mobile-nav");
    
    if (hamburgerBtn && mobileNavTray) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle("active");
            mobileNavTray.classList.toggle("open");
            
            // Prevent main page scrolling when mobile menu drawer is open
            if (mobileNavTray.classList.contains("open")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu immediately if user clicks anywhere outside the tray layout
        document.addEventListener("click", (e) => {
            if (!mobileNavTray.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove("active");
                mobileNavTray.classList.remove("open");
                document.body.style.overflow = "";
            }
        });
    }

    /* 2. Interactive Navigation Link Sync Highlight */
    const currentFileName = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar-links a, .mobile-nav a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentFileName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    /* 3. Advanced Scroll-Triggered Metric Counters Animation */
    const counters = document.querySelectorAll('.counter, .stat-num[data-count]');
    const animationDuration = 2000; 

    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const startCounting = (counterElement) => {
            const attrVal = counterElement.getAttribute('data-target') || counterElement.getAttribute('data-count');
            const targetNumber = parseInt(attrVal, 10);
            const suffix = counterElement.getAttribute('data-suffix') || '';
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);
                const easeProgress = progress * (2 - progress); // Ease Out Deceleration Math
                const currentCount = Math.floor(easeProgress * targetNumber);

                counterElement.innerText = currentCount + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = targetNumber + suffix; 
                }
            };
            requestAnimationFrame(updateCounter);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => startCounting(counter));
                    statsObserver.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.2 }); 
        const statsSection = document.querySelector('.stats-bar');
        if (statsSection) statsObserver.observe(statsSection);
    } else {
        counters.forEach(counter => {
            const attrVal = counter.getAttribute('data-target') || counter.getAttribute('data-count');
            counter.innerText = attrVal + (counter.getAttribute('data-suffix') || '');
        });
    }

    /* 4. Cross-Page Content Taxonomy Filtering (Notices & Gallery) */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const noticeCards = document.querySelectorAll(".notice-card");
    const noticeItems = document.querySelectorAll(".notice-item");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const activeFilter = e.target.getAttribute("data-filter");

            noticeCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (activeFilter === "all" || category === activeFilter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });

            noticeItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (activeFilter === "all" || category === activeFilter) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (activeFilter === "all" || category === activeFilter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    /* 5. Production Web3Forms Input AJAX Submission Controller */
    const liveForms = document.querySelectorAll("form");
    liveForms.forEach(form => {
        if(form.querySelector("input[name='access_key']")) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector("button[type='submit']");
                const originalLabel = submitBtn.innerText;
                
                submitBtn.disabled = true;
                submitBtn.innerText = "Processing Transmission...";

                const payload = new FormData(form);
                const object = Object.fromEntries(payload);
                const json = JSON.stringify(object);

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: json
                    });
                    const res = await response.json();
                    if (response.status === 200 && res.success) {
                        alert("Thank you! Submission written successfully to registration servers.");
                        form.reset();
                    } else {
                        alert("Error: " + res.message);
                    }
                } catch (err) {
                    alert("Network Error: Transmission failed. Confirm active connectivity networks.");
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalLabel;
                }
            });
        }
    });

    /* 6. Integrated Multi-Mode Modal Popup Module (Academic Programs & Notices Details) */
    const modalOverlay = document.getElementById("courseModal");
    const closeOverlayBtn = document.getElementById("closeModalBtn");
    const modalTriggers = document.querySelectorAll(".course-trigger, .notice-modal-trigger, .notice-card, .notice-item");

    const mTitle = document.getElementById("modalTitle");
    const mDuration = document.getElementById("modalDuration");
    const mSeats = document.getElementById("modalSeats");
    const mDetails = document.getElementById("modalDetails");
    const mEligibility = document.getElementById("modalEligibility");
    const mCareers = document.getElementById("modalCareers");

    if (modalOverlay && modalTriggers.length > 0) {
        const openModal = (button) => {
            const isNoticeMode = button.classList.contains("notice-modal-trigger") || button.classList.contains("notice-card") || button.classList.contains("notice-item");
            
            mTitle.innerText = button.getAttribute("data-title") || button.querySelector("h3").innerText;
            mDetails.innerText = button.getAttribute("data-details") || button.querySelector("p").innerText;

            if (isNoticeMode) {
                const dateText = button.getAttribute("data-date") || button.querySelector(".notice-date-text")?.innerText || button.querySelector(".notice-date")?.innerText || "Recent";
                const catText = button.getAttribute("data-mode") || button.getAttribute("data-category") || "General Notice";
                
                mDuration.innerText = dateText;
                mSeats.innerText = "🏷️ Category: " + catText.toUpperCase();
                mEligibility.innerText = "Official release statement published cleanly via the internal operations board framework under Pokhara University guidelines.";
                mCareers.innerText = "Approach the primary administration registrar cell block if further tracking documentation or verification is required.";
            } else {
                mDuration.innerText = "⏱️ Duration: " + button.getAttribute("data-duration");
                mSeats.innerText = "👥 Seats: " + button.getAttribute("data-seats");
                mEligibility.innerText = button.getAttribute("data-eligibility");
                mCareers.innerText = button.getAttribute("data-careers");
            }

            modalOverlay.classList.add("modal-active");
            document.body.style.overflow = "hidden"; 
        };

        const closeModal = () => {
            modalOverlay.classList.remove("modal-active");
            document.body.style.overflow = ""; 
        };

        modalTriggers.forEach(trigger => {
            if(trigger.hasAttribute("data-title") || trigger.querySelector("h3")) {
                trigger.addEventListener("click", (e) => {
                    if (e.target.tagName !== 'A') { 
                        openModal(trigger);
                    }
                });
            }
        });
        if (closeOverlayBtn) closeOverlayBtn.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
    }

    /* 7. Photo Gallery Lightbox Slider Engine */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightboxBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    
    let currentGalleryArray = [];
    let activePhotoIndex = 0;

    const syncGalleryStateArray = () => {
        currentGalleryArray = Array.from(document.querySelectorAll(".gallery-item:not(.hidden)"));
    };

    const displayLightboxPhoto = (index) => {
        if (index >= 0 && index < currentGalleryArray.length) {
            activePhotoIndex = index;
            const targetAsset = currentGalleryArray[activePhotoIndex];
            lightboxImg.src = targetAsset.getAttribute("data-src") || targetAsset.querySelector("img").src;
            lightboxCaption.innerText = targetAsset.getAttribute("data-caption") || targetAsset.querySelector(".gallery-caption")?.innerText || "";
        }
    };

    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {
            syncGalleryStateArray();
            const matchingIndex = currentGalleryArray.indexOf(item);
            if (matchingIndex !== -1) {
                displayLightboxPhoto(matchingIndex);
                if (lightbox) {
                    lightbox.style.display = "flex";
                    document.body.style.overflow = "hidden";
                }
            }
        });
    });

    if (lightbox) {
        const exitLightbox = () => { lightbox.style.display = "none"; document.body.style.overflow = ""; };
        if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", exitLightbox);
        
        if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); if (activePhotoIndex < currentGalleryArray.length - 1) displayLightboxPhoto(activePhotoIndex + 1); });
        if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); if (activePhotoIndex > 0) displayLightboxPhoto(activePhotoIndex - 1); });
        lightbox.addEventListener("click", (e) => { if (e.target === lightbox) exitLightbox(); });
    }
});