// 导航模块
(function() {
    'use strict';
    
    // 辅助函数
    function setActiveNavLink(nav) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = nav.querySelectorAll('a[href]');

        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            const isActive = currentPage === linkPage ||
                            (currentPage === '' && linkPage === 'index.html');

            if (isActive) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            }
        });
    }

    function initMobileMenu(nav) {
        const toggle = nav.querySelector('.js-menu-toggle');
        const menu = nav.querySelector('.c-navigation__menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', !isExpanded);
            toggle.classList.toggle('is-active');
            menu.classList.toggle('is-active');
            nav.classList.toggle('is-active');

            // 防止背景滚动
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // 点击菜单项后关闭移动端菜单
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('is-active');
                menu.classList.remove('is-active');
                nav.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });

        // 点击遮罩关闭菜单
        nav.addEventListener('click', (e) => {
            if (e.target === nav && nav.classList.contains('is-active')) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('is-active');
                menu.classList.remove('is-active');
                nav.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    }

    function initSmoothScrolling(nav) {
        const links = nav.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    window.Navigation = {
        initNavigation(navSelector = '.c-navigation') {
            const nav = document.querySelector(navSelector);
            if (!nav) return;

            // 设置当前页面激活状态
            setActiveNavLink(nav);

            // 初始化移动端菜单
            initMobileMenu(nav);

            // 初始化平滑滚动
            initSmoothScrolling(nav);
        },

        initScrollEffect(navSelector = '.c-navigation') {
            const nav = document.querySelector(navSelector);
            if (!nav) return;

            let lastScrollY = window.scrollY;
            const navHeight = nav.offsetHeight;

            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;

                // 向下滚动时隐藏导航栏，向上滚动时显示
                if (currentScrollY > navHeight) {
                    if (currentScrollY > lastScrollY) {
                        // 向下滚动
                        nav.style.transform = `translateY(-${navHeight}px)`;
                    } else {
                        // 向上滚动
                        nav.style.transform = 'translateY(0)';
                    }
                } else {
                    // 在顶部时始终显示
                    nav.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
            });
        }
    };
})();
