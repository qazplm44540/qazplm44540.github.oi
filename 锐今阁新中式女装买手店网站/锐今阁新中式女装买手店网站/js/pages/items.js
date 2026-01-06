// 单品页脚本
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.Navigation.initNavigation();
    window.Navigation.initScrollEffect();
    initItemsPage();
});

// 初始化单品页
async function initItemsPage() {
    try {
        // 显示加载状态
        showLoading();

        // 加载热卖商品
        const products = await window.DataLoader.getFeaturedProducts();

        // 隐藏加载状态
        hideLoading();

        // 渲染商品
        renderProducts(products);
    } catch (error) {
        console.error('初始化单品页失败:', error);
        hideLoading();
        showError('加载数据失败，请刷新页面重试');
    }
}

// 渲染商品列表
function renderProducts(products) {
    const container = document.querySelector('.js-items-grid');
    const countElement = document.querySelector('.js-items-count span');
    const noResultsElement = document.querySelector('.js-no-results');

    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 更新商品数量
    if (countElement) {
        countElement.textContent = products.length;
    }

    // 显示或隐藏无结果提示
    if (noResultsElement) {
        noResultsElement.style.display = products.length === 0 ? 'block' : 'none';
    }

    // 如果没有商品，直接返回
    if (products.length === 0) {
        return;
    }

    // 添加商品卡片
    products.forEach(product => {
        const card = window.ProductCard.createProductCard(product);
        container.appendChild(card);
        window.ProductCard.initProductCard(card);
    });

    // 添加加载动画
    const cards = container.querySelectorAll('.c-product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 显示加载状态
function showLoading() {
    const loadingElement = document.querySelector('.js-items-loading');
    const gridElement = document.querySelector('.js-items-grid');
    const noResultsElement = document.querySelector('.js-no-results');

    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
    if (gridElement) {
        gridElement.style.display = 'none';
    }
    if (noResultsElement) {
        noResultsElement.style.display = 'none';
    }
}

// 隐藏加载状态
function hideLoading() {
    const loadingElement = document.querySelector('.js-items-loading');
    const gridElement = document.querySelector('.js-items-grid');

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    if (gridElement) {
        gridElement.style.display = 'grid';
    }
}

// 显示错误
function showError(message) {
    const container = document.querySelector('.container');
    if (!container) return;

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.padding = 'var(--spacing-lg)';
    errorElement.style.textAlign = 'center';
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.marginTop = 'var(--spacing-xl)';

    container.appendChild(errorElement);
}

