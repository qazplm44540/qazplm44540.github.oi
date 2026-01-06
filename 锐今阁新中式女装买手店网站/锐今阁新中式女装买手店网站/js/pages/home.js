// 首页脚本
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.Navigation.initNavigation();
    window.Navigation.initScrollEffect();
    loadFeaturedProducts();
    loadNewArrivals();
    initInkEffect();
});

// 加载精选产品
async function loadFeaturedProducts() {
    const container = document.querySelector('.js-featured-products');
    if (!container) return;

    try {
        const products = await window.DataLoader.getFeaturedProducts();

        // 清空容器
        container.innerHTML = '';

        // 添加产品卡片
        products.forEach(product => {
            const card = window.ProductCard.createProductCard(product);
            container.appendChild(card);
            window.ProductCard.initProductCard(card);
        });
    } catch (error) {
        console.error('加载精选产品失败:', error);
        showError(container, '加载产品失败，请刷新页面重试');
    }
}

// 加载新品
async function loadNewArrivals() {
    const container = document.querySelector('.js-new-arrivals');
    if (!container) return;

    try {
        const products = await window.DataLoader.getNewProducts();

        // 清空容器
        container.innerHTML = '';

        // 按日期排序（最新的在前）
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // 添加时间轴卡片
        products.forEach(product => {
            const card = window.ProductCard.createTimelineCard(product);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('加载新品失败:', error);
        showError(container, '加载新品失败，请刷新页面重试');
    }
}

// 初始化水墨效果
function initInkEffect() {
    const heroBackground = document.querySelector('.hero__background');
    if (!heroBackground) return;

    // 创建多个水墨效果元素
    for (let i = 0; i < 5; i++) {
        const inkEffect = document.createElement('div');
        inkEffect.className = 'ink-diffusion';

        // 随机大小和位置
        const size = Math.random() * 300 + 100;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;

        inkEffect.style.width = `${size}px`;
        inkEffect.style.height = `${size}px`;
        inkEffect.style.left = `${posX}%`;
        inkEffect.style.top = `${posY}%`;
        inkEffect.style.animationDelay = `${delay}s`;

        heroBackground.appendChild(inkEffect);
    }
}

// 显示错误信息
function showError(container, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.padding = 'var(--spacing-lg)';
    errorElement.style.textAlign = 'center';
    errorElement.style.color = 'var(--color-error)';

    container.appendChild(errorElement);
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
}

// 添加滚动动画样式
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// 调用滚动动画初始化
document.addEventListener('DOMContentLoaded', initScrollAnimations);
