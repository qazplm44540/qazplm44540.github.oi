// 产品卡片模块
(function() {
    'use strict';
    
    // 获取季节名称
    function getSeasonName(seasonId) {
        const seasonNames = {
            'spring': '春',
            'summer': '夏',
            'autumn': '秋',
            'winter': '冬'
        };

        return seasonNames[seasonId] || '';
    }

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}年${month}月${day}日`;
    }
    
    window.ProductCard = {
        createProductCard(product) {
            const card = document.createElement('article');
            card.className = 'c-product-card asymmetric-grid-item';
            card.dataset.productId = product.id;

            // 图片容器
            const imageContainer = document.createElement('div');
            imageContainer.className = 'c-product-card__image-container';

            // 季节标签
            const seasonTag = document.createElement('span');
            seasonTag.className = 'c-product-card__season-tag';
            seasonTag.textContent = getSeasonName(product.season);
            imageContainer.appendChild(seasonTag);

            // 新品标签
            if (product.isNew) {
                const newTag = document.createElement('span');
                newTag.className = 'c-card__tag';
                newTag.textContent = '新品';
                imageContainer.appendChild(newTag);
            }

            // 产品图片
            const image = document.createElement('img');
            image.className = 'c-product-card__image';
            image.src = product.images.main;
            image.alt = product.title;
            image.loading = 'lazy';

            // 图片容器添加图片
            imageContainer.appendChild(image);

            // 内容容器
            const content = document.createElement('div');
            content.className = 'c-product-card__content';

            // 产品信息容器（名称和价格）
            const info = document.createElement('div');
            info.className = 'c-product-card__info';

            // 产品标题
            const title = document.createElement('h3');
            title.className = 'c-product-card__title';
            title.textContent = product.name;

            // 产品价格
            const price = document.createElement('p');
            price.className = 'c-product-card__price';
            price.textContent = `¥${product.price}`;

            // 组装信息
            info.appendChild(title);
            info.appendChild(price);

            // 组装内容
            content.appendChild(info);

            // 组装卡片
            card.appendChild(imageContainer);
            card.appendChild(content);
            
            // 添加点击事件跳转到详情页
            card.addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });
            card.style.cursor = 'pointer';

            return card;
        },

        createTimelineCard(product) {
            const card = document.createElement('div');
            card.className = 'timeline-card';

            // 新品标签
            if (product.isNew) {
                const newTag = document.createElement('span');
                newTag.className = 'timeline-card__tag';
                newTag.textContent = '新品';
                card.appendChild(newTag);
            }

            // 图片容器
            const imageContainer = document.createElement('div');
            imageContainer.className = 'timeline-card__image-container';

            // 产品图片
            const image = document.createElement('img');
            image.className = 'timeline-card__image';
            image.src = product.images.main;
            image.alt = product.title;
            image.loading = 'lazy';

            imageContainer.appendChild(image);

            // 内容容器
            const content = document.createElement('div');
            content.className = 'timeline-card__content';

            // 产品标题
            const title = document.createElement('h3');
            title.className = 'timeline-card__title';
            title.textContent = product.name;

            // 产品日期
            const date = document.createElement('p');
            date.className = 'timeline-card__date';
            date.textContent = formatDate(product.createdAt);

            content.appendChild(title);
            content.appendChild(date);

            // 组装卡片
            card.appendChild(imageContainer);
            card.appendChild(content);

            return card;
        },

        initProductCard(cardElement) {
            const viewDetailBtn = cardElement.querySelector('.js-view-detail');
            const productId = cardElement.dataset.productId;

            if (viewDetailBtn) {
                viewDetailBtn.addEventListener('click', () => {
                    window.location.href = `product.html?id=${productId}`;
                });
            }

            // 添加悬停效果
            cardElement.addEventListener('mouseenter', () => {
                cardElement.classList.add('is-hovered');
            });

            cardElement.addEventListener('mouseleave', () => {
                cardElement.classList.remove('is-hovered');
            });
        }
    };
})();
