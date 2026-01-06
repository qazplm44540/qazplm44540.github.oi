// 产品详情页脚本
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.Navigation.initNavigation();
    window.Navigation.initScrollEffect();
    loadProductFromUrl();
    setupAppointmentModal();
});

// 从URL加载产品
async function loadProductFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('未找到产品ID');
        return;
    }

    try {
        const product = await window.DataLoader.fetchProductById(productId);

        if (!product) {
            showError('未找到该产品');
            return;
        }

        // 加载分类数据
        const categories = await window.DataLoader.fetchCategories();

        // 渲染产品详情
        renderProductDetail(product, categories);

        // 加载相关产品
        loadRelatedProducts(product, categories);

        // 设置材质预览
        setupMaterialPreview(product);

        // 显示内容，隐藏加载状态
        showContent();
    } catch (error) {
        console.error('加载产品详情失败:', error);
        showError('加载产品详情失败，请刷新页面重试');
    }
}

// 渲染产品详情
function renderProductDetail(product, categories) {
    // 设置页面标题
    document.title = `${product.name} - 锐今阁`;

    // 设置页面背景色（根据产品主题色）
    if (product.themeColor) {
        document.documentElement.style.setProperty('--product-theme-color', product.themeColor);
    }

    // 填充基本信息
    document.querySelector('.js-product-title').textContent = product.name;
    document.querySelector('.js-product-price').textContent = `¥${product.price}`;
    document.querySelector('.js-product-description').textContent = product.description;

    // 填充季节信息
    const season = categories.seasons.find(s => s.id === product.season);
    document.querySelector('.js-product-season').textContent = season ? season.name : '';

    // 填充材质信息
    const materialNames = product.material.map(matId => {
        const material = categories.materials.find(m => m.id === matId);
        return material ? material.name : matId;
    }).join('、');
    document.querySelector('.js-product-material').textContent = materialNames;

    // 填充剪裁信息
    const cutNames = product.cut.map(cutId => {
        const cut = categories.cuts.find(c => c.id === cutId);
        return cut ? cut.name : cutId;
    }).join('、');
    document.querySelector('.js-product-cut').textContent = cutNames;

    // 设置产品图片
    setupProductImages(product);

    // 填充设计故事
    document.querySelector('.js-story-content').textContent = product.story;
}

// 设置产品图片
function setupProductImages(product) {
    const mainImage = document.querySelector('.js-main-image');
    const thumbnailList = document.querySelector('.js-thumbnail-list');

    // 设置主图
    mainImage.src = product.images.main;
    mainImage.alt = product.title;

    // 设置缩略图
    if (product.images.details && product.images.details.length > 0) {
        // 添加主图缩略图
        addThumbnail(product.images.main, 0);

        // 添加细节图缩略图
        product.images.details.forEach((image, index) => {
            addThumbnail(image, index + 1);
        });
    }

    function addThumbnail(src, index) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'product-hero__thumbnail';
        if (index === 0) thumbnail.classList.add('is-active');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${product.title} - 图 ${index + 1}`;

        thumbnail.appendChild(img);
        thumbnailList.appendChild(thumbnail);

        // 点击缩略图切换主图
        thumbnail.addEventListener('click', () => {
            // 更新主图
            mainImage.src = src;

            // 更新激活状态
            document.querySelectorAll('.product-hero__thumbnail').forEach(t => {
                t.classList.remove('is-active');
            });
            thumbnail.classList.add('is-active');
        });
    }
}

// 加载相关产品
async function loadRelatedProducts(currentProduct, categories) {
    const container = document.querySelector('.js-related-products');
    if (!container) return;

    try {
        // 获取同季节的其他产品
        const products = await window.DataLoader.fetchProducts();
        const relatedProducts = products
            .filter(p => p.season === currentProduct.season && p.id !== currentProduct.id)
            .slice(0, 3); // 最多显示3个相关产品

        // 清空容器
        container.innerHTML = '';

        // 添加相关产品卡片
        relatedProducts.forEach(product => {
            const card = window.ProductCard.createProductCard(product);
            container.appendChild(card);
            window.ProductCard.initProductCard(card);
        });
    } catch (error) {
        console.error('加载相关产品失败:', error);
        container.innerHTML = '<p>加载相关产品失败</p>';
    }
}

// 设置材质预览
function setupMaterialPreview(product) {
    const cube = document.querySelector('.js-material-cube');
    if (!cube) return;

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // 设置材质图片
    const faces = cube.querySelectorAll('.material-preview__face');
    faces.forEach(face => {
        face.style.backgroundImage = `url(${product.images.main})`;
    });

    // 鼠标事件
    cube.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // 触摸事件
    cube.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        e.preventDefault();

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === cube || cube.contains(e.target)) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            // 旋转立方体
            const rotateY = currentX * 0.5;
            const rotateX = -currentY * 0.5;

            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }

    function dragEnd() {
        isDragging = false;
    }
}

// 设置预约模态框
function setupAppointmentModal() {
    const modal = document.querySelector('.js-appointment-modal');
    const form = document.querySelector('.js-appointment-form');
    const dateInput = document.querySelector('#date');

    if (!modal || !form || !dateInput) return;

    // 设置模态框
    window.FormHandler.setupModal(modal);

    // 设置日期输入
    window.FormHandler.setupDateInput(dateInput);

    // 设置表单验证
    window.FormHandler.setupFormValidation(form);

    // 处理表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 收集表单数据
        const formData = {
            name: document.querySelector('#name').value,
            phone: document.querySelector('#phone').value,
            date: document.querySelector('#date').value,
            time: document.querySelector('#time').value,
            notes: document.querySelector('#notes').value,
            product: document.querySelector('.js-product-title').textContent
        };

        // 验证表单
        const validation = window.FormHandler.validateForm(formData);

        if (!validation.isValid) {
            window.FormHandler.displayFormErrors(validation.errors, form);
            return;
        }

        // 显示提交中状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '提交中...';
        submitButton.disabled = true;

        try {
            // 提交表单
            const result = await window.FormHandler.submitAppointmentForm(formData);

            // 显示结果
            alert(result.message);

            if (result.success) {
                // 成功后关闭模态框并重置表单
                modal.style.display = 'none';
                form.reset();
            }
        } catch (error) {
            console.error('表单提交失败:', error);
            alert('提交失败，请稍后重试');
        } finally {
            // 恢复按钮状态
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// 显示错误状态
function showError(message) {
    document.querySelector('.js-loading-state').style.display = 'none';
    document.querySelector('.js-error-state').style.display = 'flex';

    const errorElement = document.querySelector('.js-error-state p');
    if (errorElement && message) {
        errorElement.textContent = message;
    }
}

// 显示内容
function showContent() {
    document.querySelector('.js-loading-state').style.display = 'none';
    document.querySelector('.js-product-content').style.display = 'block';

    // 添加入场动画
    const sections = document.querySelectorAll('.product-hero, .product-story, .material-preview, .related-products');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}
