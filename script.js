document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       MENU MOBILE
    ========================== */

    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".main-nav");

    if (header && nav) {
        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.setAttribute("aria-label", "Abrir menu");
        menuButton.setAttribute("aria-expanded", "false");

        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        header.querySelector(".header-container").appendChild(menuButton);

        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("nav-open");

            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                menuButton.setAttribute("aria-label", "Fechar menu");
            } else {
                menuButton.setAttribute("aria-label", "Abrir menu");
            }
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("nav-open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });
    }


    /* =========================
       SCROLL SUAVE
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =========================
       MENU ATIVO CONFORME SCROLL
    ========================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

    function updateActiveMenu() {
        let currentSection = "";

        const scrollPosition = window.scrollY + 160;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveMenu);
    updateActiveMenu();


    /* =========================
       HEADER COM SOMBRA AO ROLAR
    ========================== */

    function updateHeader() {
        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =========================
       ANIMAÇÃO DE ENTRADA
    ========================== */

    const animatedElements = document.querySelectorAll(
        ".software-card, .feature-item, .hero-panel, .about-text, .section-heading"
    );

    animatedElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });


    /* =========================
       ANO AUTOMÁTICO NO FOOTER
    ========================== */

    const footerCopyright = document.querySelector(
        ".footer-container > p"
    );

    if (footerCopyright) {
        const year = new Date().getFullYear();

        footerCopyright.textContent =
            `© ${year} Stray Cats Software. Todos os direitos reservados.`;
    }


    /* =========================
       BOTÕES DE DOWNLOAD
    ========================== */

    const downloadLinks = document.querySelectorAll(
        ".software-actions .button-primary"
    );

    downloadLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (link.getAttribute("href") === "#") {
                console.log(
                    "Adicione o link de download do software no atributo href."
                );
            }
        });
    });
});