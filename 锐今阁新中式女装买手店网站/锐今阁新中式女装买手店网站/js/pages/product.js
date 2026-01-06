// 产品详情页脚本
import { fetchProductById, fetchProducts } from '../modules/dataLoader.js';
import { initNavigation, initScrollEffect } from '../modules/navigation.js';
import { createProductCard } from '../modules/productCard.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffect();
    initProductPage();
});

// 初始化产品详情页
async function initProductPage() {
    try {
        // 从URL获取产品ID
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            showError('未找到产品ID');
            return;
        }

        // 加载产品数据
        const product = await fetchProductById(productId);

        if (!product) {
            showError('未找到产品');
            return;
        }

        // 加载相关产品
        const products = await fetchProducts();
        const relatedProducts = products.filter(p => 
            p.id !== productId && 
            (p.season === product.season || 
             p.material.some(m => product.material.includes(m)) ||
             p.cut.some(c => product.cut.includes(c)))
        ).slice(0, 4);

        // 渲染产品详情
        renderProductDetail(product);

        // 渲染相关产品
        renderRelatedProducts(relatedProducts);

        // 初始化产品图片功能
        initProductImages(product);

        // 初始化材质预览
        initMaterialPreview(product);

        // 显示产品内容
        showProductContent();
    } catch (error) {
        console.error('初始化产品详情页失败:', error);
        showError('加载产品失败，请刷新页面重试');
    }
}

// 渲染产品详情
function renderProductDetail(product) {
    // 更新产品标题
    document.title = `${product.name} - 锐今阁`;

    // 更新产品基本信息
    document.querySelector('.js-product-title').textContent = product.title;
    document.querySelector('.js-product-price').textContent = `¥${product.price}`;
    document.querySelector('.js-product-season').textContent = getSeasonName(product.season);
    document.querySelector('.js-product-material').textContent = product.material.join('、');
    document.querySelector('.js-product-cut').textContent = product.cut.join('、');

    // 更新产品描述
    document.querySelector('.js-product-description').textContent = product.description;

    // 更新设计故事
    document.querySelector('.js-product-story').textContent = product.story;
}

// 渲染相关产品
function renderRelatedProducts(products) {
    const container = document.querySelector('.js-related-products');
    if (!container || products.length === 0) return;

    // 清空容器
    container.innerHTML = '';

    // 添加产品卡片
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// 初始化产品图片功能
function initProductImages(product) {
    const mainImage = document.querySelector('.js-main-image');
    const thumbnailList = document.querySelector('.js-thumbnail-list');

    if (!mainImage || !thumbnailList) return;

    // 设置主图
    mainImage.src = product.images.main;
    mainImage.alt = product.title;

    // 添加缩略图
    const allImages = [product.images.main, ...product.images.details];

    allImages.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'product-hero__thumbnail';
        if (index === 0) thumbnail.classList.add('is-active');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${product.title} - 图${index + 1}`;
        img.loading = 'lazy';

        thumbnail.appendChild(img);
        thumbnailList.appendChild(thumbnail);

        // 添加点击事件
        thumbnail.addEventListener('click', () => {
            // 更新主图
            mainImage.src = imageSrc;

            // 更新活动状态
            document.querySelectorAll('.product-hero__thumbnail').forEach(thumb => {
                thumb.classList.remove('is-active');
            });
            thumbnail.classList.add('is-active');
        });
    });

    // 初始化图片放大功能
    initImageZoom();
}

// 初始化图片放大功能
function initImageZoom() {
    const mainImage = document.querySelector('.js-main-image');
    const imageZoom = document.querySelector('.js-image-zoom');

    if (!mainImage || !imageZoom) return;

    mainImage.addEventListener('mouseenter', () => {
        imageZoom.style.opacity = '1';
    });

    mainImage.addEventListener('mouseleave', () => {
        imageZoom.style.opacity = '0';
    });

    mainImage.addEventListener('mousemove', (e) => {
        const rect = mainImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        imageZoom.style.backgroundPosition = `${x}% ${y}%`;
    });

    // 设置放大镜背景
    imageZoom.style.backgroundImage = `url(${mainImage.src})`;
}

// 初始化材质预览
function initMaterialPreview(product) {
    const container = document.querySelector('.js-material-preview');
    if (!container || !product.material.length) return;

    // 清空容器
    container.innerHTML = '';

    // 添加材质卡片
    product.material.forEach(material => {
        const card = document.createElement('div');
        card.className = 'material-preview-card';

        const title = document.createElement('h3');
        title.className = 'material-preview-card__title';
        title.textContent = material;

        const description = document.createElement('p');
        description.className = 'material-preview-card__description';
        description.textContent = getMaterialDescription(material);

        card.appendChild(title);
        card.appendChild(description);
        container.appendChild(card);
    });
}

// 获取季节名称
function getSeasonName(seasonId) {
    const seasonMap = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
    };

    return seasonMap[seasonId] || seasonId;
}

// 获取材质描述
function getMaterialDescription(material) {
    const materialDescriptions = {
        '丝绒': '柔软光滑，富有光泽，适合展现奢华感与复古韵味',
        '针织': '柔软舒适，富有弹性，适合展现随性自然的风格',
        '毛呢': '挺括保暖，质感厚重，适合展现高级感与正式感',
        '人棉': '轻盈飘逸，垂感好，适合展现流动感与舒适感',
        '皮质': '硬朗有型，质感独特，适合展现前卫感与个性',
        '雪尼尔': '厚实柔软，纹理丰富，适合展现温暖感与复古感'
    };

    return materialDescriptions[material] || '精选优质面料，注重质感与舒适度';
}

// 显示产品内容
function showProductContent() {
    document.querySelector('.js-loading-state').style.display = 'none';
    document.querySelector('.js-product-content').style.display = 'block';
}

// 显示错误信息
function showError(message) {
    document.querySelector('.js-loading-state').style.display = 'none';
    document.querySelector('.js-error-state').style.display = 'block';

    const errorText = document.querySelector('.js-error-state p');
    if (errorText) {
        errorText.textContent = message;
    }
}
