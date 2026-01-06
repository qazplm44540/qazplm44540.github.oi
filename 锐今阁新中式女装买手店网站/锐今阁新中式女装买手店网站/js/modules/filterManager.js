// 筛选器管理模块
(function() {
    'use strict';
    
    // 筛选器状态
    let currentFilters = {
        season: [],
        material: [],
        cut: []
    };

    // 筛选器变更事件
    const FILTERS_CHANGED_EVENT = 'filtersChanged';

    // 保存筛选器到本地存储
    function saveFiltersToStorage() {
        try {
            sessionStorage.setItem('ruijinge_filters', JSON.stringify(currentFilters));
        } catch (error) {
            console.warn('无法保存筛选状态:', error);
        }
    }

    // 触发筛选器变更事件
    function dispatchFiltersChangedEvent() {
        const event = new CustomEvent(FILTERS_CHANGED_EVENT, {
            detail: { filters: window.FilterManager.getCurrentFilters() }
        });
        document.dispatchEvent(event);
    }

    window.FilterManager = {
        FILTERS_CHANGED_EVENT: FILTERS_CHANGED_EVENT,

        updateFilter(filterType, filterValue, isActive) {
            if (!currentFilters[filterType]) return;

            if (isActive) {
                if (!currentFilters[filterType].includes(filterValue)) {
                    currentFilters[filterType].push(filterValue);
                }
            } else {
                const index = currentFilters[filterType].indexOf(filterValue);
                if (index > -1) {
                    currentFilters[filterType].splice(index, 1);
                }
            }

            saveFiltersToStorage();
            dispatchFiltersChangedEvent();
        },

        getCurrentFilters() {
            return JSON.parse(JSON.stringify(currentFilters));
        },

        resetFilters() {
            currentFilters = {
                season: [],
                material: [],
                cut: []
            };

            saveFiltersToStorage();
            dispatchFiltersChangedEvent();
        },

        restoreFiltersFromStorage() {
            try {
                const saved = sessionStorage.getItem('ruijinge_filters');
                if (saved) {
                    currentFilters = JSON.parse(saved);
                    dispatchFiltersChangedEvent();
                }
            } catch (error) {
                console.warn('无法恢复筛选状态:', error);
            }
        },

        filterProducts(products, filters) {
            return products.filter(product => {
                // 季节筛选
                if (filters.season.length > 0 && !filters.season.includes(product.season)) {
                    return false;
                }

                // 材质筛选
                if (filters.material.length > 0) {
                    const hasMaterial = filters.material.some(mat => 
                        product.material.includes(mat)
                    );
                    if (!hasMaterial) return false;
                }

                // 剪裁筛选
                if (filters.cut.length > 0) {
                    const hasCut = filters.cut.some(cut => 
                        product.cut.includes(cut)
                    );
                    if (!hasCut) return false;
                }

                return true;
            });
        },

        createFilterUI(container, filterType, options, selectedValues = []) {
            container.innerHTML = '';

            options.forEach(option => {
                const filterOption = document.createElement('label');
                filterOption.className = 'filter-option';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = filterType;
                input.value = option.id;
                input.checked = selectedValues.includes(option.id);

                const box = document.createElement('span');
                box.className = 'filter-option__box';

                const label = document.createElement('span');
                label.className = 'filter-option__label';
                label.textContent = option.name;

                filterOption.appendChild(input);
                filterOption.appendChild(box);
                filterOption.appendChild(label);

                // 添加事件监听
                const self = this;
                input.addEventListener('change', () => {
                    self.updateFilter(filterType, option.id, input.checked);
                });

                container.appendChild(filterOption);
            });
        },

        createActiveFiltersDisplay(container, filters, categories) {
            container.innerHTML = '';

            // 如果没有活动筛选器，不显示
            if (
                filters.season.length === 0 && 
                filters.material.length === 0 && 
                filters.cut.length === 0
            ) {
                return;
            }

            const activeFiltersContainer = document.createElement('div');
            activeFiltersContainer.className = 'active-filters';

            // 季节筛选器
            filters.season.forEach(seasonId => {
                const season = categories.seasons.find(s => s.id === seasonId);
                if (season) {
                    activeFiltersContainer.appendChild(
                        this.createActiveFilterChip(season.name, 'season', seasonId)
                    );
                }
            });

            // 材质筛选器
            filters.material.forEach(materialId => {
                const material = categories.materials.find(m => m.id === materialId);
                if (material) {
                    activeFiltersContainer.appendChild(
                        this.createActiveFilterChip(material.name, 'material', materialId)
                    );
                }
            });

            // 剪裁筛选器
            filters.cut.forEach(cutId => {
                const cut = categories.cuts.find(c => c.id === cutId);
                if (cut) {
                    activeFiltersContainer.appendChild(
                        this.createActiveFilterChip(cut.name, 'cut', cutId)
                    );
                }
            });

            container.appendChild(activeFiltersContainer);
        },

        createActiveFilterChip(name, type, value) {
            const chip = document.createElement('div');
            chip.className = 'active-filter';

            const label = document.createElement('span');
            label.textContent = name;

            const remove = document.createElement('span');
            remove.className = 'active-filter__remove';
            remove.textContent = '×';

            chip.appendChild(label);
            chip.appendChild(remove);

            // 添加移除事件
            remove.addEventListener('click', () => {
                this.updateFilter(type, value, false);
            });

            return chip;
        }
    };
})();
