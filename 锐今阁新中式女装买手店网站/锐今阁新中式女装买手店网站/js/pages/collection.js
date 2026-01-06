// 分类页脚本
// 保存分类数据，供筛选器使用
let categoriesData = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.Navigation.initNavigation();
    window.Navigation.initScrollEffect();
    initCollection();
});

// 初始化分类页
async function initCollection() {
    try {
        // 加载数据
        const [products, categories] = await Promise.all([
            window.DataLoader.fetchProducts(),
            window.DataLoader.fetchCategories()
        ]);

        // 保存分类数据
        categoriesData = categories;

        // 初始化季节导航
        initSeasonNavigation(categories);

        // 初始化筛选器
        initFilters(categories);

        // 初始化产品网格
        await initProductsGrid(products, categories);

        // 恢复筛选器状态（这会触发事件，所以要在初始化完成后调用）
        window.FilterManager.restoreFiltersFromStorage();
    } catch (error) {
        console.error('初始化分类页失败:', error);
        showError('加载数据失败，请刷新页面重试');
    }
}

// 初始化季节导航
function initSeasonNavigation(categories) {
    const container = document.querySelector('.js-season-nav');
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 添加季节卡片
    categories.seasons.forEach(season => {
        const card = document.createElement('div');
        card.className = 'season-card';
        card.dataset.season = season.id;

        // 背景色和图片
        const background = document.createElement('div');
        background.className = 'season-card__background';
        background.style.backgroundColor = season.color;
        
        // 添加季节图片
        const seasonImage = document.createElement('img');
        seasonImage.src = `assets/image/${season.id === 'spring' ? '春季' : season.id === 'summer' ? '夏季' : season.id === 'autumn' ? '秋季' : '冬季'}/1.jpg`;
        seasonImage.alt = season.name;
        seasonImage.className = 'season-card__image';
        // background.appendChild(seasonImage);

        // 内容
        const content = document.createElement('div');
        content.className = 'season-card__content';

        const title = document.createElement('h3');
        title.className = 'season-card__title';
        title.textContent = season.name;

        const description = document.createElement('p');
        description.className = 'season-card__description';
        description.textContent = season.description;

        content.appendChild(title);
        content.appendChild(description);

        card.appendChild(background);
        card.appendChild(content);

        // 添加点击事件
        card.addEventListener('click', () => {
            // 更新筛选器
            window.FilterManager.resetFilters();
            window.FilterManager.updateFilter('season', season.id, true);
            console.log('点击季节卡片:', season.id, '当前筛选器:', window.FilterManager.getCurrentFilters());

            // 滚动到产品区域
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });

        container.appendChild(card);
    });
}

// 初始化筛选器
function initFilters(categories) {
    // 季节筛选器
    const seasonFiltersContainer = document.querySelector('.js-season-filters');
    if (seasonFiltersContainer) {
        window.FilterManager.createFilterUI(
            seasonFiltersContainer, 
            'season', 
            categories.seasons
        );
    }

    // 重置按钮
    const resetButtons = document.querySelectorAll('.js-reset-filters');
    resetButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.FilterManager.resetFilters();
            // 重置后需要更新筛选器UI的选中状态
            updateFilterUICheckboxes();
        });
    });

    // 监听筛选器变更
    document.addEventListener(window.FilterManager.FILTERS_CHANGED_EVENT, (event) => {
        const filters = event.detail.filters;

        // 更新产品网格
        updateProductsGrid(filters, categories);

        // 更新季节导航激活状态
        updateSeasonNavigation(filters);

        // 更新筛选器UI的选中状态
        updateFilterUICheckboxes();
    });
}

// 更新筛选器UI的选中状态
function updateFilterUICheckboxes() {
    const filters = window.FilterManager.getCurrentFilters();
    const seasonFiltersContainer = document.querySelector('.js-season-filters');
    
    if (seasonFiltersContainer) {
        const checkboxes = seasonFiltersContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const filterType = checkbox.name;
            const filterValue = checkbox.value;
            checkbox.checked = filters[filterType] && filters[filterType].includes(filterValue);
        });
    }
}


// 初始化产品网格
async function initProductsGrid(products, categories) {
    const container = document.querySelector('.js-products-grid');
    const countElement = document.querySelector('.js-products-count span');
    const noResultsElement = document.querySelector('.js-no-results');

    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 获取当前筛选器
    const filters = window.FilterManager.getCurrentFilters();

    // 过滤产品
    const filteredProducts = window.FilterManager.filterProducts(products, filters);

    // 更新产品数量
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }

    // 显示或隐藏无结果提示
    if (noResultsElement) {
        noResultsElement.style.display = filteredProducts.length === 0 ? 'block' : 'none';
    }

    // 添加产品卡片
    filteredProducts.forEach(product => {
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

// 更新产品网格
async function updateProductsGrid(filters, categories) {
    // 如果没有传入 categories，使用保存的全局变量
    const categoriesToUse = categories || categoriesData;
    if (!categoriesToUse) {
        console.error('分类数据未加载');
        return;
    }
    
    const products = await window.DataLoader.fetchProducts();
    console.log('更新产品网格 - 筛选器:', filters, '产品数量:', products.length);
    await initProductsGrid(products, categoriesToUse);
}

// 更新季节导航激活状态
function updateSeasonNavigation(filters) {
    const seasonCards = document.querySelectorAll('.season-card');

    seasonCards.forEach(card => {
        const seasonId = card.dataset.season;

        if (filters.season.includes(seasonId)) {
            card.classList.add('is-active');
        } else {
            card.classList.remove('is-active');
        }
    });
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
