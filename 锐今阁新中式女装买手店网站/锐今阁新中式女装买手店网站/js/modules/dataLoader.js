// 数据加载模块
(function() {
    'use strict';

    // 简单缓存机制
    const cache = {
        products: null,
        categories: null,
        lastUpdated: null
    };

    window.DataLoader = {
        async fetchProducts() {
            // 检查缓存（5分钟内有效）
            if (cache.products && cache.lastUpdated &&
                Date.now() - cache.lastUpdated < 5 * 60 * 1000) {
                return cache.products;
            }

            // 直接从全局变量获取数据
            if (window.ProductsData) {
                cache.products = window.ProductsData;
                cache.lastUpdated = Date.now();
                return window.ProductsData;
            }

            console.warn('产品数据未加载，返回空数组');
            return [];
        },

        async fetchProductById(id) {
            const products = await this.fetchProducts();
            return products.find(product => product.id === id) || null;
        },

        async fetchCategories() {
            if (cache.categories) {
                return cache.categories;
            }

            // 直接从全局变量获取数据
            if (window.CategoriesData) {
                cache.categories = window.CategoriesData;
                return window.CategoriesData;
            }

            console.warn('分类数据未加载，返回空对象');
            return { seasons: [], materials: [], cuts: [] };
        },

        getFeaturedProducts() {
            return this.fetchProducts().then(products => 
                products.filter(product => product.isFeatured)
            );
        },

        getNewProducts() {
            return this.fetchProducts().then(products => 
                products.filter(product => product.isNew)
            );
        },

        getProductsBySeason(season) {
            return this.fetchProducts().then(products => 
                products.filter(product => product.season === season)
            );
        }
    };
})();
