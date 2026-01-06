# 锐今阁新中式女装买手店网站 - 技术架构文档

## 文档信息

| 项目 | 内容 |
|------|------|
| **项目名称** | 锐今阁新中式女装买手店网站 |
| **文档版本** | 1.0 |
| **创建日期** | 2025-01-03 |
| **技术架构师** | Winston |
| **技术栈** | 纯 HTML5、CSS3、原生 JavaScript (ES6+) |
| **核心理念** | 柔古锐今，解构新生 |
| **目标平台** | GitHub Pages 静态托管 |
| **页面数量** | 4个核心页面 |
| **开发团队** | 初学者团队 |

---

## 1. 引言

### 1.1 项目背景
锐今阁是一个先锋新中式女装买手店，旨在通过"柔古锐今，解构新生"的设计哲学，将传统中式美学与现代解构主义设计语言深度融合。网站作为品牌展示和线下导流的核心平台，需要传达独特的品牌调性并吸引目标用户群体。

### 1.2 技术约束
- **严格技术栈**：仅使用纯 HTML、CSS、JavaScript
- **无框架依赖**：不使用 React、Vue、Angular 等前端框架
- **无构建工具**：不使用 Webpack、Vite 等构建工具
- **静态网站**：所有页面为静态HTML，无服务器端渲染
- **部署平台**：GitHub Pages

### 1.3 核心目标
1. **品牌传达**：准确传递"柔古锐今，解构新生"的设计理念
2. **用户体验**：提供沉浸式、探索式的浏览体验
3. **性能优化**：确保快速加载和流畅交互
4. **跨平台兼容**：支持桌面和移动设备

---

## 2. 技术栈

### 2.1 核心技术选择

| 类别 | 技术 | 版本 | 用途 | 选择理由 |
|------|------|------|------|----------|
| **核心语言** | HTML5 | N/A | 页面结构与语义 | 现代Web标准基础 |
| **核心语言** | CSS3 | N/A | 样式与视觉呈现 | 包含Grid、Flexbox、Custom Properties等现代特性 |
| **核心语言** | JavaScript (ES6+) | N/A | 交互与动态逻辑 | 现代语法提高可读性和可维护性 |
| **CSS架构** | CSS Custom Properties | N/A | 全局设计令牌系统 | 实现设计一致性，支持主题切换 |
| **CSS布局** | CSS Grid & Flexbox | N/A | 复杂响应式布局 | 实现解构主义非对称布局的核心技术 |
| **JavaScript API** | Intersection Observer API | N/A | 滚动触发动画、懒加载 | 高性能检测元素可见性 |
| **动画技术** | CSS Animations / Web Animations API | N/A | 高级交互动画 | 实现材质动画效果 |
| **模块系统** | ES6 Modules (import/export) | N/A | 代码组织与分割 | 现代JavaScript标准模块化方案 |
| **数据格式** | JSON | N/A | 存储产品、分类数据 | 纯静态站点标准数据格式 |
| **图形格式** | SVG | N/A | 图标、装饰性图形 | 矢量格式，无限缩放，CSS/JS可控 |
| **字体格式** | WOFF2 | N/A | 品牌字体文件 | 现代字体格式，压缩率高，性能好 |

### 2.2 开发工具

| 工具 | 用途 | 配置说明 |
|------|------|----------|
| **VS Code + Live Server 扩展** | 本地开发服务器 | 提供零配置开发环境，支持热重载 |
| **Prettier** | 代码格式化 | 统一代码风格，减少风格争论 |
| **Git** | 版本控制 | 代码管理和团队协作 |
| **GitHub Pages** | 静态网站托管 | 免费、简单，与GitHub无缝集成 |

### 2.3 第三方服务

| 服务 | 用途 | 集成方式 |
|------|------|----------|
| **Formspree** | 表单提交处理 | JavaScript Fetch API 提交数据 |
| **可选：Mapbox** | 地图展示 | 替换标准Google Maps，提供更定制化地图 |
| **可选：Google Analytics** | 用户行为分析 | 通过script标签集成 |

---

## 3. 项目结构

### 3.1 目录结构

```
ruijinge-website/
│
├── index.html                    # 首页
├── product.html                  # 单品展示页 (通用模板)
├── collection.html               # 季节分类页
├── space.html                    # 线下空间页
│
├── css/                          # 所有样式文件
│   ├── style.css                 # 全局基础样式、CSS重置、设计令牌
│   ├── layout.css                # 通用布局类
│   ├── components/               # 可复用组件样式
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── navigation.css
│   │   ├── form.css
│   │   └── ...
│   └── pages/                    # 页面专属样式
│       ├── home.css
│       ├── product-detail.css
│       ├── collection.css
│       └── space.css
│
├── js/
│   ├── config/                   # 配置与常量
│   │   └── constants.js
│   ├── modules/                  # 核心功能模块（纯函数，无副作用）
│   │   ├── dataLoader.js         # JSON数据加载
│   │   ├── filterManager.js      # 筛选逻辑
│   │   ├── animationManager.js   # 动画控制
│   │   ├── formHandler.js        # 表单处理
│   │   ├── navigation.js         # 导航管理
│   │   ├── router.js             # 路由工具
│   │   └── pageState.js          # 页面状态管理
│   ├── pages/                    # 页面入口脚本（组织各模块，处理DOM）
│   │   ├── home.js
│   │   ├── product-detail.js
│   │   ├── collection.js
│   │   └── space.js
│   └── utils/                    # 通用工具函数
│       ├── helpers.js            # 防抖、节流、DOM查询等工具
│       └── validators.js         # 数据验证工具
│
├── data/                         # 静态数据（由非技术人员维护）
│   ├── products.json             # 商品数据
│   └── categories.json           # 分类数据
│
├── assets/                       # 静态资源
│   ├── images/
│   │   ├── home/                 # 首页用图
│   │   ├── products/             # 商品图片（按ID分文件夹或统一命名）
│   │   ├── space/                # 门店环境图、360°预览序列图
│   │   └── shared/               # 图标、背景等共用图片
│   └── fonts/                    # 字体文件
│       ├── brand-font.woff2      # 品牌字体
│       └── fallback-font.woff2   # 后备字体
│
├── docs/                         # 项目文档
│   ├── frontend-architecture.md  # 本架构文档
│   ├── coding-standards.md       # 编码规范
│   └── deployment-guide.md       # 部署指南
│
└── README.md                     # 项目说明、开发指引
```

### 3.2 结构设计原则

1. **关注点分离**：HTML、CSS、JavaScript、数据、资源严格分离
2. **模块化设计**：功能模块独立，便于复用和维护
3. **渐进增强**：基础功能优先，高级功能渐进增强
4. **性能优化**：资源按需加载，图片懒加载
5. **可维护性**：清晰的文件组织，便于团队协作

---

## 4. 设计系统

### 4.1 CSS设计令牌系统

```css
/* css/style.css - 设计令牌定义 */
:root {
    /* ===== 颜色系统 ===== */
    /* 品牌色 - 源于中国传统色彩 */
    --color-primary: #2c3e50;     /* 黛蓝 - 主品牌色 */
    --color-secondary: #d35400;   /* 赭石 - 强调色 */
    --color-accent: #27ae60;      /* 竹青 - 点缀色 */
    
    /* 中性色 */
    --color-surface: #ffffff;     /* 表面色 */
    --color-background: #f8f9fa;  /* 背景色 */
    --color-border-light: #e0e0e0; /* 边框浅色 */
    --color-border-dark: #b0b0b0;  /* 边框深色 */
    
    /* 语义色 */
    --color-success: #27ae60;     /* 成功 */
    --color-warning: #f39c12;     /* 警告 */
    --color-error: #e74c3c;       /* 错误 */
    --color-info: #3498db;        /* 信息 */
    
    /* ===== 字体系统 ===== */
    /* 字体族 */
    --font-heading: 'BrandFont', 'Noto Serif SC', serif;  /* 书法风格标题 */
    --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* 现代无衬线正文 */
    
    /* 字体大小 */
    --text-xs: 0.75rem;   /* 12px */
    --text-sm: 0.875rem;  /* 14px */
    --text-base: 1rem;    /* 16px */
    --text-lg: 1.125rem;  /* 18px */
    --text-xl: 1.25rem;   /* 20px */
    --text-2xl: 1.5rem;   /* 24px */
    --text-3xl: 1.875rem; /* 30px */
    --text-4xl: 2.25rem;  /* 36px */
    
    /* 行高 */
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    
    /* ===== 间距系统 (8px基准) ===== */
    --spacing-xs: 0.25rem;   /* 2px */
    --spacing-sm: 0.5rem;    /* 4px */
    --spacing-md: 1rem;      /* 8px */
    --spacing-lg: 2rem;      /* 16px */
    --spacing-xl: 4rem;      /* 32px */
    --spacing-2xl: 8rem;     /* 64px */
    
    /* ===== 边框半径 ===== */
    --border-radius-sm: 0.125rem;  /* 2px */
    --border-radius-md: 0.25rem;   /* 4px */
    --border-radius-lg: 0.5rem;    /* 8px */
    --border-radius-xl: 1rem;      /* 16px */
    --border-radius-full: 9999px;  /* 完全圆形 */
    
    /* ===== 阴影系统 ===== */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    /* ===== 动画与过渡 ===== */
    /* 时长 */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --duration-very-slow: 1000ms;
    
    /* 缓动函数 */
    --ease-linear: linear;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    
    /* ===== 响应式断点 ===== */
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
    --breakpoint-2xl: 1536px;
    
    /* ===== 层级 (z-index) ===== */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}
```

### 4.2 响应式设计策略

```css
/* 移动优先的响应式设计 */
/* 基础样式 - 移动端 (< 640px) */

/* 小屏幕 (>= 640px) */
@media (min-width: 640px) {
    :root {
        --spacing-md: 1.25rem; /* 调整间距 */
    }
}

/* 中屏幕 (>= 768px) */
@media (min-width: 768px) {
    :root {
        --text-base: 1.125rem; /* 增大基础字体 */
    }
}

/* 大屏幕 (>= 1024px) */
@media (min-width: 1024px) {
    /* 桌面端特定样式 */
}

/* 超大屏幕 (>= 1280px) */
@media (min-width: 1280px) {
    /* 大桌面端特定样式 */
}
```

### 4.3 解构主义视觉元素

```css
/* 解构主义设计语言实现 */
/* 1. 非对称布局 */
.asymmetric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-md);
    grid-auto-flow: dense; /* 密集填充 */
}

.asymmetric-grid-item:nth-child(3n+1) {
    grid-column: span 2;
}

.asymmetric-grid-item:nth-child(5n+2) {
    grid-row: span 2;
}

/* 2. 材质对比 */
.material-contrast {
    background: 
        linear-gradient(45deg, 
            rgba(255, 255, 255, 0.1) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(255, 255, 255, 0.1) 75%, 
            transparent 75%, 
            transparent);
    background-size: 4px 4px;
    border: 1px solid var(--color-border-light);
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.05),
        0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 3. 破碎边缘效果 */
.broken-edge {
    position: relative;
    overflow: hidden;
}

.broken-edge::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, transparent 50%, var(--color-surface) 50%);
}

/* 4. 水墨晕开动画 */
@keyframes ink-diffuse {
    0% {
        transform: scale(0.1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.8;
    }
}

.ink-animation {
    animation: ink-diffuse var(--duration-slow) var(--ease-out);
}
```

---

## 5. 组件架构

### 5.1 组件开发标准

#### 组件三要素模式
每个组件由三部分组成：
1. **HTML结构** - 定义组件DOM结构
2. **CSS样式** - 定义组件视觉表现
3. **JavaScript行为** - 定义组件交互逻辑

#### 命名约定

| 元素类型 | 命名规范 | 示例 | 说明 |
|---------|----------|------|------|
| **CSS 组件类** | `c-{组件名}` | `.c-product-card` | "c-"代表Component |
| **CSS 元素类** | `c-{组件名}__{元素名}` | `.c-product-card__image` | 双下划线连接 |
| **CSS 修饰符** | `c-{组件名}--{修饰符}` | `.c-button--primary` | 双横杠连接 |
| **JS 钩子类** | `js-{目标}` | `.js-view-detail` | **仅用于JS选择，无样式** |
| **状态类** | `is-{状态}` | `.is-active` | 表示组件状态 |
| **HTML data属性** | `data-{名字}` | `data-product-id` | 存储自定义数据 |

#### 组件模板示例

**HTML 结构 (部分)**
```html
<article class="c-product-card" data-product-id="123">
  <div class="c-product-card__image-container">
    <img 
      src="assets/images/products/123/main.jpg" 
      alt="商品描述" 
      class="c-product-card__image js-product-image"
      loading="lazy"
    >
    <span class="c-product-card__tag">新品</span>
  </div>
  
  <div class="c-product-card__content">
    <h3 class="c-product-card__title js-product-title">商品名称</h3>
    <button class="c-button c-button--text js-view-detail">探索细节</button>
  </div>
</article>
```

**CSS 样式 (`css/components/product-card.css`)**
```css
.c-product-card {
  --card-bg-color: var(--color-surface);
  --card-border: 1px solid var(--color-border-light);
  
  background-color: var(--card-bg-color);
  border: var(--card-border);
  border-radius: var(--border-radius-lg);
  transition: transform var(--duration-normal) var(--ease-out);
}

.c-product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**JavaScript 行为 (`js/modules/productCard.js`)**
```javascript
export function initProductCard(cardElement) {
  const viewDetailBtn = cardElement.querySelector('.js-view-detail');
  const productId = cardElement.dataset.productId;

  viewDetailBtn?.addEventListener('click', () => {
    window.location.href = `product.html?id=${productId}`;
  });
}
```

### 5.2 核心组件库

#### 1. 按钮组件 (`css/components/button.css`)
```css
.c-button {
  --button-bg: var(--color-primary);
  --button-color: white;
  --button-padding: var(--spacing-sm) var(--spacing-lg);
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-padding);
  background-color: var(--button-bg);
  color: var(--button-color);
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast) ease;
}

.c-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.c-button--primary {
  --button-bg: var(--color-accent);
}

.c-button--text {
  --button-bg: transparent;
  --button-color: var(--color-primary);
}

.c-button--outline {
  --button-bg: transparent;
  --button-color: var(--color-primary);
  border: 2px solid var(--color-primary);
}
```

#### 2. 卡片组件 (`css/components/card.css`)
```css
.c-card {
  --card-bg: var(--color-surface);
  --card-shadow: var(--shadow-md);
  
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: all var(--duration-normal) ease;
}

.c-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.c-card--elevated {
  --card-shadow: var(--shadow-xl);
}

/* 解构主义卡片变体 */
.c-card--deconstructed {
  border-radius: var(--border-radius-lg) var(--border-radius-sm) 
                var(--border-radius-sm) var(--border-radius-lg);
  transform: rotate(0.5deg);
}
```

#### 3. 导航组件 (`css/components/navigation.css`)
```css
.c-navigation {
  --nav-bg: var(--color-surface);
  --nav-link-color: var(--color-primary);
  
  background-color: var(--nav-bg);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(10px);
}

.c-navigation__link {
  color: var(--nav-link-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.c-navigation__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--duration-normal) ease;
}

.c-navigation__link:hover::after,
.c-navigation__link.is-active::after {
  width: 100%;
}
```

#### 4. 表单组件 (`css/components/form.css`)
```css
.c-form-group {
  margin-bottom: var(--spacing-lg);
}

.c-form-label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-primary);
}

.c-form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  transition: border-color var(--duration-fast) ease;
}

.c-form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

.c-form-error {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-top: var(--spacing-xs);
}
```

---

## 6. 状态管理

### 6.1 状态管理策略

#### 1. 组件级状态
- 使用DOM的`data-*`属性存储简单状态
- 使用JavaScript对象管理复杂状态
- 通过自定义事件进行状态变更通知

#### 2. 页面级状态
- 使用`sessionStorage`存储临时状态（如筛选条件）
- 使用URL参数传递跨页面状态（如产品ID）
- 使用JavaScript模块管理共享状态

#### 3. 应用级状态
- 对于简单的静态网站，避免全局状态
- 如需共享状态，使用发布-订阅模式

### 6.2 筛选器状态管理示例

**状态管理模块 (`js/modules/filterManager.js`)**
```javascript
// 筛选器状态管理
let currentFilters = {
    season: [],
    material: [],
    cut: []
};

export const FILTERS_CHANGED_EVENT = 'filtersChanged';

export function updateFilter(filterType, filterValue, isActive) {
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
}

export function getCurrentFilters() {
    return JSON.parse(JSON.stringify(currentFilters));
}

function saveFiltersToStorage() {
    try {
        sessionStorage.setItem('ruijinge_filters', JSON.stringify(currentFilters));
    } catch (error) {
        console.warn('无法保存筛选状态:', error);
    }
}

function dispatchFiltersChangedEvent() {
    const event = new CustomEvent(FILTERS_CHANGED_EVENT, {
        detail: { filters: getCurrentFilters() }
    });
    document.dispatchEvent(event);
}
```

**状态监听与UI更新**
```javascript
// 在分类页面中
import { FILTERS_CHANGED_EVENT, getCurrentFilters } from './filterManager.js';

document.addEventListener(FILTERS_CHANGED_EVENT, (event) => {
    const filters = event.detail.filters;
    updateProductList(filters); // 更新商品列表
    updateActiveFilterTags(filters); // 更新筛选标签显示
});
```

### 6.3 页面状态恢复

**页面状态管理 (`js/modules/pageState.js`)**
```javascript
// 页面状态管理（如滚动位置）
export function saveScrollPosition(page) {
    const state = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        timestamp: Date.now()
    };
    
    try {
        sessionStorage.setItem(`page_state_${page}`, JSON.stringify(state));
    } catch (error) {
        console.warn('无法保存页面状态:', error);
    }
}

export function restoreScrollPosition(page) {
    try {
        const saved = sessionStorage.getItem(`page_state_${page}`);
        if (saved) {
            const state = JSON.parse(saved);
            // 只恢复1分钟内的状态
            if (Date.now() - state.timestamp < 60 * 1000) {
                window.scrollTo(state.scrollX, state.scrollY);
            }
        }
    } catch (error) {
        console.warn('无法恢复页面状态:', error);
    }
}
```

---

## 7. 数据管理与API集成

### 7.1 数据架构

#### JSON数据结构
```json
// data/products.json
[
  {
    "id": "product-001",
    "name": "解构水墨连衣裙",
    "price": 1280,
    "description": "融合传统水墨画意境与现代解构剪裁",
    "season": ["spring", "summer"],
    "material": ["silk", "cotton"],
    "cut": ["asymmetric"],
    "themeColor": "#2c3e50",
    "images": {
      "main": "assets/images/products/001/main.jpg",
      "details": ["assets/images/products/001/detail-1.jpg"]
    },
    "story": "设计灵感来源于宋代山水画...",
    "isNew": true,
    "isFeatured": true,
    "createdAt": "2024-12-01T10:00:00Z"
  }
]

// data/categories.json
{
  "seasons": [
    {"id": "spring", "name": "春日", "color": "#27ae60"},
    {"id": "summer", "name": "夏日", "color": "#3498db"}
  ],
  "materials": [
    {"id": "silk", "name": "丝绸"},
    {"id": "cotton", "name": "棉麻"}
  ],
  "cuts": [
    {"id": "asymmetric", "name": "不对称剪裁"},
    {"id": "deconstructed", "name": "解构主义"}
  ]
}
```

### 7.2 数据加载器

**数据加载模块 (`js/modules/dataLoader.js`)**
```javascript
const DATA_BASE_URL = './data';

// 简单缓存机制
const cache = {
    products: null,
    categories: null,
    lastUpdated: null
};

export async function fetchProducts() {
    // 检查缓存（5分钟内有效）
    if (cache.products && cache.lastUpdated && 
        Date.now() - cache.lastUpdated < 5 * 60 * 1000) {
        return cache.products;
    }
    
    try {
        const response = await fetch(`${DATA_BASE_URL}/products.json`);
        if (!response.ok) throw new Error('数据加载失败');
        
        const data = await response.json();
        
        // 更新缓存
        cache.products = data;
        cache.lastUpdated = Date.now();
        
        return data;
    } catch (error) {
        console.error('加载产品数据失败:', error);
        
        // 返回缓存数据作为降级
        if (cache.products) {
            console.warn('返回缓存的产品数据');
            return cache.products;
        }
        
        return [];
    }
}

export async function fetchProductById(id) {
    const products = await fetchProducts();
    return products.find(product => product.id === id) || null;
}

export async function fetchCategories() {
    if (cache.categories) {
        return cache.categories;
    }
    
    try {
        const response = await fetch(`${DATA_BASE_URL}/categories.json`);
        if (!response.ok) throw new Error('分类数据加载失败');
        
        const data = await response.json();
        cache.categories = data;
        return data;
    } catch (error) {
        console.error('加载分类数据失败:', error);
        return { seasons: [], materials: [], cuts: [] };
    }
}
```

### 7.3 API客户端

**API客户端配置 (`js/modules/apiClient.js`)**
```javascript
class ApiClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }
    
    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        return this._handleResponse(response);
    }
    
    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return this._handleResponse(response);
    }
    
    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }
        return await response.json();
    }
}

// 创建不同用途的API客户端
export const dataApi = new ApiClient('./data');
export const formApi = new ApiClient('https://formspree.io/f');
```

### 7.4 表单处理

**表单处理模块 (`js/modules/formHandler.js`)**
```javascript
import { formApi } from './apiClient.js';

const FORM_ID = 'your-formspree-form-id-here';

export async function submitAppointmentForm(formData) {
    try {
        const response = await formApi.post(`/${FORM_ID}`, formData);
        
        return {
            success: true,
            message: '预约提交成功！我们会尽快与您联系。',
            data: response
        };
    } catch (error) {
        console.error('表单提交错误:', error);
        return {
            success: false,
            message: '提交失败，请稍后重试或直接致电门店。'
        };
    }
}

export function validateForm(formData) {
    const errors = {};
    
    // 姓名验证
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = '请输入至少2个字符的姓名';
    }
    
    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
    }
    
    // 电话验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
        errors.phone = '请输入有效的手机号码';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
```

---

## 8. 路由与导航

### 8.1 多页面路由策略

#### 页面导航
- **传统多页面应用**：每个页面独立HTML文件
- **URL参数传递**：用于状态传递（如`product.html?id=123`）
- **锚点导航**：同一页面内跳转

#### 导航组件
```javascript
// js/modules/navigation.js
export function initNavigation(navSelector = '.c-navigation') {
    const nav = document.querySelector(navSelector);
    if (!nav) return;
    
    // 设置当前页面激活状态
    setActiveNavLink(nav);
    
    // 初始化移动端菜单
    initMobileMenu(nav);
    
    // 初始化平滑滚动
    initSmoothScrolling(nav);
}

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
```

### 8.2 URL参数处理

**单品页路由处理 (`js/pages/product-detail.js`)**
```javascript
import { fetchProductById } from '../modules/dataLoader.js';

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function loadProduct() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        // 重定向到分类页
        window.location.href = 'collection.html';
        return;
    }
    
    const product = await fetchProductById(productId);
    
    if (!product) {
        // 显示404状态
        showProductNotFound();
        return;
    }
    
    // 渲染产品详情
    renderProductDetail(product);
    
    // 更新页面元数据（SEO优化）
    updatePageMetadata(product);
}

// 更新页面标题和meta标签
function updatePageMetadata(product) {
    document.title = `${product.name} | 锐今阁`;
    
    // 更新meta描述
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = product.description.substring(0, 150) + '...';
    
    // 更新Open Graph标签（社交媒体分享）
    updateOpenGraphTags(product);
}

function updateOpenGraphTags(product) {
    const ogTags = {
        'og:title': product.name,
        'og:description': product.description.substring(0, 200),
        'og:image': product.images.main,
        'og:url': window.location.href
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    });
}
```

### 8.3 路由工具函数

**路由工具模块 (`js/modules/router.js`)**
```javascript
export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    
    return result;
}

export function updateUrlParams(newParams) {
    const currentParams = getUrlParams();
    const mergedParams = { ...currentParams, ...newParams };
    
    // 构建新的URL
    const newUrl = new URL(window.location);
    Object.entries(mergedParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            newUrl.searchParams.delete(key);
        } else {
            newUrl.searchParams.set(key, value);
        }
    });
    
    // 更新URL（不刷新页面）
    window.history.pushState({}, '', newUrl);
}

export function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '' || page === '/') {
        return 'home';
    }
    
    return page.replace('.html', '');
}
```

---

## 9. 动画与交互

### 9.1 CSS动画系统

#### 基础动画类
```css
/* 基础动画类 */
.c-fade-in {
    animation: fadeIn var(--duration-normal) var(--ease-out);
}

.c-slide-up {
    animation: slideUp var(--duration-normal) var(--ease-out);
}

.c-scale-in {
    animation: scaleIn var(--duration-normal) var(--ease-out);
}

/* 动画关键帧 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from { 
        opacity: 0;
        transform: scale(0.9);
    }
    to { 
        opacity: 1;
        transform: scale(1);
    }
}
```

#### 解构主义动画
```css
/* 水墨晕开效果 */
@keyframes inkSpread {
    0% {
        transform: scale(0.1);
        opacity: 0;
        filter: blur(10px);
    }
    50% {
        opacity: 0.8;
        filter: blur(5px);
    }
    100% {
        transform: scale(1);
        opacity: 0.3;
        filter: blur(2px);
    }
}

.ink-spread {
    animation: inkSpread var(--duration-slow) var(--ease-out) forwards;
}

/* 布料飘动效果 */
@keyframes clothWave {
    0%, 100% {
        transform: rotate(0deg) translateY(0);
    }
    25% {
        transform: rotate(0.5deg) translateY(-2px);
    }
    75% {
        transform: rotate(-0.5deg) translateY(2px);
    }
}

.cloth-wave {
    animation: clothWave 3s var(--ease-in-out) infinite;
}
```

### 9.2 JavaScript驱动的交互

#### Intersection Observer 动画触发
```javascript
// js/modules/animationManager.js
export function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('c-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.js-animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}
```

#### 3D材质预览
```javascript
// js/modules/materialPreview.js
export function initMaterialPreview(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const previewImage = container.querySelector('.js-material-preview');
    let isDragging = false;
    let startX = 0;
    let rotationY = 0;
    
    container.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        container.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        
        const deltaX = event.clientX - startX;
        rotationY = deltaX * 0.5; // 控制旋转速度
        
        // 应用3D变换
        previewImage.style.transform = `
            perspective(1000px) 
            rotateY(${rotationY}deg)
        `;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
        
        // 添加弹性回归动画
        previewImage.style.transition = 'transform 0.5s ease-out';
        previewImage.style.transform = 'perspective(1000px) rotateY(0deg)';
        
        setTimeout(() => {
            previewImage.style.transition = '';
        }, 500);
    });
    
    // 触摸设备支持
    container.addEventListener('touchstart', (event) => {
        isDragging = true;
        startX = event.touches[0].clientX;
    });
    
    container.addEventListener('touchmove', (event) => {
        if (!isDragging) return;
        
        const deltaX = event.touches[0].clientX - startX;
        rotationY = deltaX * 0.5;
        
        previewImage.style.transform = `
            perspective(1000px) 
            rotateY(${rotationY}deg)
        `;
    });
    
    container.addEventListener('touchend', () => {
        isDragging = false;
        previewImage.style.transform = 'perspective(1000px) rotateY(0deg)';
    });
}
```

#### 动态网格布局
```javascript
// js/modules/dynamicGrid.js
export function initDynamicGrid(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const items = container.querySelectorAll('.js-grid-item');
    const baseSize = 200; // 基础网格大小
    
    // 创建非对称布局
    items.forEach((item, index) => {
        // 根据位置计算不同的尺寸
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        // 创建非对称模式
        let width = baseSize;
        let height = baseSize;
        
        if (row % 2 === 0 && col % 2 === 0) {
            width = baseSize * 1.5;
            height = baseSize * 1.2;
        } else if (row % 3 === 1) {
            width = baseSize * 0.8;
            height = baseSize * 1.5;
        }
        
        // 应用随机旋转（解构主义）
        const rotation = (Math.random() - 0.5) * 2; // -1到1度
        item.style.transform = `rotate(${rotation}deg)`;
        
        // 设置CSS变量
        item.style.setProperty('--item-width', `${width}px`);
        item.style.setProperty('--item-height', `${height}px`);
    });
    
    // 鼠标悬停效果
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'rotate(0deg) scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            const rotation = (Math.random() - 0.5) * 2;
            item.style.transform = `rotate(${rotation}deg) scale(1)`;
            item.style.zIndex = '';
        });
    });
}
```

### 9.3 页面过渡效果

#### 页面加载动画
```javascript
// js/modules/pageTransitions.js
export function initPageTransitions() {
    // 页面加载完成时
    window.addEventListener('load', () => {
        document.body.classList.add('c-page-loaded');
        
        // 延迟显示内容，确保动画播放
        setTimeout(() => {
            document.body.classList.add('c-content-visible');
        }, 300);
    });
    
    // 链接点击时的过渡
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (link && link.href && !link.target && !link.href.includes('#')) {
            // 如果是内部链接，添加过渡效果
            const isInternalLink = link.href.includes(window.location.origin);
            if (isInternalLink) {
                event.preventDefault();
                document.body.classList.add('c-page-exiting');
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        }
    });
}
```

```css
/* 页面过渡样式 */
.c-page-loading {
    opacity: 0;
}

.c-page-loaded {
    animation: pageFadeIn var(--duration-normal) var(--ease-out) forwards;
}

.c-content-visible .c-content {
    animation: contentSlideUp var(--duration-slow) var(--ease-out) forwards;
}

.c-page-exiting {
    animation: pageFadeOut var(--duration-normal) var(--ease-in) forwards;
}

@keyframes pageFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes pageFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes contentSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## 10. 性能优化

### 10.1 加载性能优化

#### 1. 图片优化策略
```javascript
// 图片懒加载
export function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // 提前50px加载
        threshold: 0.01
    });
    
    images.forEach(img => observer.observe(img));
}
```

```html
<!-- 图片使用示例 -->
<img 
    data-src="assets/images/products/001/main.jpg" 
    src="assets/images/placeholder.jpg" 
    alt="商品描述"
    class="js-lazy-image"
>
```

#### 2. 字体加载优化
```css
/* 字体加载策略 */
@font-face {
    font-family: 'BrandFont';
    src: url('../assets/fonts/brand-font.woff2') format('woff2');
    font-display: swap; /* 使用交换策略 */
    font-weight: 400;
    font-style: normal;
}

/* 使用系统字体作为后备，避免FOUT */
body {
    font-family: system-ui, -apple-system, sans-serif;
}

.fonts-loaded body {
    font-family: 'BrandFont', system-ui, -apple-system, sans-serif;
}
```

```javascript
// 字体加载检测
document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
});
```

#### 3. 关键CSS内联
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>锐今阁 | 柔古锐今，解构新生</title>
    
    <!-- 关键CSS内联 -->
    <style>
        /* 最小化的关键CSS */
        :root {
            --color-surface: #ffffff;
            --color-background: #f8f9fa;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: var(--color-background);
            color: #333;
        }
        
        .c-loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-surface);
            z-index: 9999;
        }
    </style>
    
    <!-- 非关键CSS异步加载 -->
    <link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">
    <noscript>
        <link rel="stylesheet" href="css/style.css">
    </noscript>
</head>
```

### 10.2 运行时性能优化

#### 1. 防抖与节流
```javascript
// js/utils/helpers.js
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用示例
window.addEventListener('resize', throttle(() => {
    console.log('调整窗口大小');
}, 200));

window.addEventListener('scroll', debounce(() => {
    console.log('滚动停止');
}, 100));
```

#### 2. 虚拟滚动（如需处理大量数据）
```javascript
// 简化的虚拟滚动示例
export class VirtualScroll {
    constructor(container, itemHeight, totalItems, renderItem) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.totalItems = totalItems;
        this.renderItem = renderItem;
        
        this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
        this.buffer = 5; // 缓冲区
        
        this.init();
    }
    
    init() {
        // 设置容器高度
        this.container.style.height = `${this.totalItems * this.itemHeight}px`;
        
        // 创建可视区域
        this.viewport = document.createElement('div');
        this.viewport.style.position = 'relative';
        this.container.appendChild(this.viewport);
        
        // 监听滚动
        this.container.addEventListener('scroll', () => {
            this.updateVisibleItems();
        });
        
        // 初始渲染
        this.updateVisibleItems();
    }
    
    updateVisibleItems() {
        const scrollTop = this.container.scrollTop;
        const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
        const endIndex = Math.min(
            this.totalItems,
            startIndex + this.visibleItems + this.buffer * 2
        );
        
        // 更新可视项
        this.viewport.innerHTML = '';
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = this.renderItem(i);
            item.style.position = 'absolute';
            item.style.top = `${i * this.itemHeight}px`;
            this.viewport.appendChild(item);
        }
    }
}
```

### 10.3 内存管理

#### 1. 事件监听器管理
```javascript
// 事件监听器管理器
export class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    add(element, event, handler, options) {
        if (!this.listeners.has(element)) {
            this.listeners.set(element, new Map());
        }
        
        const elementListeners = this.listeners.get(element);
        if (!elementListeners.has(event)) {
            elementListeners.set(event, []);
        }
        
        elementListeners.get(event).push(handler);
        element.addEventListener(event, handler, options);
    }
    
    remove(element, event, handler) {
        const elementListeners = this.listeners.get(element);
        if (!elementListeners) return;
        
        const eventListeners = elementListeners.get(event);
        if (!eventListeners) return;
        
        if (handler) {
            // 移除特定处理器
            const index = eventListeners.indexOf(handler);
            if (index > -1) {
                element.removeEventListener(event, handler);
                eventListeners.splice(index, 1);
            }
        } else {
            // 移除所有该事件的处理器
            eventListeners.forEach(h => {
                element.removeEventListener(event, h);
            });
            elementListeners.delete(event);
        }
        
        // 清理空元素
        if (elementListeners.size === 0) {
            this.listeners.delete(element);
        }
    }
    
    removeAll() {
        this.listeners.forEach((elementListeners, element) => {
            elementListeners.forEach((eventListeners, event) => {
                eventListeners.forEach(handler => {
                    element.removeEventListener(event, handler);
                });
            });
        });
        this.listeners.clear();
    }
}

// 使用示例
const eventManager = new EventManager();

// 添加监听器
eventManager.add(window, 'resize', () => {
    console.log('窗口大小改变');
});

// 组件销毁时清理
function destroyComponent() {
    eventManager.remove(window, 'resize');
}
```

---

## 11. 测试策略

### 11.1 测试类型

#### 1. 手动测试
- **视觉测试**：检查设计一致性
- **功能测试**：验证所有交互功能
- **跨浏览器测试**：Chrome、Safari、Firefox
- **设备测试**：手机、平板、桌面设备

#### 2. 自动化测试（可选）
```javascript
// 简单的功能测试示例
// tests/smoke.test.js
function testDataLoader() {
    console.log('测试数据加载器...');
    
    // 模拟测试
    const mockProducts = [{ id: 'test', name: '测试商品' }];
    localStorage.setItem('test_products', JSON.stringify(mockProducts));
    
    // 测试获取数据
    const products = JSON.parse(localStorage.getItem('test_products'));
    const passed = Array.isArray(products) && products.length > 0;
    
    console.log(passed ? '✅ 测试通过' : '❌ 测试失败');
    return passed;
}

function testFormValidation() {
    console.log('测试表单验证...');
    
    // 测试用例
    const testCases = [
        { input: '', expected: false, description: '空姓名' },
        { input: '张', expected: false, description: '单字姓名' },
        { input: '张三', expected: true, description: '有效姓名' }
    ];
    
    let allPassed = true;
    
    testCases.forEach(testCase => {
        const isValid = testCase.input.length >= 2;
        const passed = isValid === testCase.expected;
        
        if (!passed) {
            allPassed = false;
            console.log(`❌ ${testCase.description}: 期望 ${testCase.expected}, 得到 ${isValid}`);
        }
    });
    
    console.log(allPassed ? '✅ 所有测试通过' : '❌ 有测试失败');
    return allPassed;
}

// 运行所有测试
function runAllTests() {
    console.log('开始运行测试...\n');
    
    const tests = [testDataLoader, testFormValidation];
    let passedCount = 0;
    
    tests.forEach(test => {
        try {
            if (test()) passedCount++;
        } catch (error) {
            console.error(`测试出错: ${error.message}`);
        }
    });
    
    console.log(`\n测试完成: ${passedCount}/${tests.length} 通过`);
    return passedCount === tests.length;
}

// 在开发环境中运行
if (window.location.hostname === 'localhost') {
    runAllTests();
}
```

### 11.2 性能测试

#### Lighthouse 性能检查清单
```javascript
// 简单的性能监控
export function monitorPerformance() {
    // 记录关键性能指标
    window.addEventListener('load', () => {
        const timing = performance.timing;
        
        const metrics = {
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            tcp: timing.connectEnd - timing.connectStart,
            ttfb: timing.responseStart - timing.requestStart,
            domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
            pageLoad: timing.loadEventEnd - timing.navigationStart
        };
        
        console.log('性能指标:', metrics);
        
        // 发送到分析服务（如果启用）
        if (window.analytics) {
            window.analytics.track('page_performance', metrics);
        }
    });
    
    // 监控FPS
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 50) {
                console.warn(`低FPS警告: ${fps}`);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}
```

### 11.3 兼容性测试

#### 特性检测
```javascript
// 特性检测工具
export const featureDetection = {
    // 检查CSS Grid支持
    cssGrid: () => {
        const element = document.createElement('div');
        return 'grid' in element.style || 'msGrid' in element.style;
    },
    
    // 检查Flexbox支持
    flexbox: () => {
        const element = document.createElement('div');
        return 'flex' in element.style || 'webkitFlex' in element.style;
    },
    
    // 检查Intersection Observer支持
    intersectionObserver: () => {
        return 'IntersectionObserver' in window &&
               'IntersectionObserverEntry' in window;
    },
    
    // 检查Web Animations API支持
    webAnimations: () => {
        return 'animate' in document.documentElement;
    },
    
    // 检查Touch事件支持
    touchEvents: () => {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0;
    },
    
    // 检查ES6模块支持
    es6Modules: () => {
        try {
            new Function('import("")');
            return true;
        } catch (err) {
            return false;
        }
    }
};

// 应用兼容性策略
export function applyCompatibility() {
    const features = featureDetection;
    
    // 如果不支持CSS Grid，使用降级样式
    if (!features.cssGrid()) {
        document.documentElement.classList.add('no-css-grid');
    }
    
    // 如果不支持Intersection Observer，使用降级方案
    if (!features.intersectionObserver()) {
        console.warn('Intersection Observer不支持，使用降级方案');
        // 实现降级方案
    }
    
    // 如果不支持ES6模块，显示警告
    if (!features.es6Modules()) {
        console.error('ES6模块不支持，请使用现代浏览器');
        // 可以提供降级方案或提示
    }
}
```

---

## 12. 部署与CI/CD

### 12.1 GitHub Pages部署流程

#### 1. 基础部署配置
```bash
# 1. 初始化Git仓库
git init
git add .
git commit -m "初始提交"

# 2. 连接到GitHub仓库
git remote add origin https://github.com/your-username/ruijinge-website.git
git branch -M main
git push -u origin main
```

#### 2. GitHub Pages设置
1. 访问仓库设置 → Pages
2. 源分支选择：`main`
3. 文件夹选择：`/ (根目录)`
4. 保存设置
5. 启用HTTPS（自动）

#### 3. 自定义域名（可选）
1. 在仓库设置中添加自定义域名
2. 在域名服务商添加CNAME记录
3. 等待DNS传播

### 12.2 部署前检查清单

```javascript
// deploy-checklist.js
const fs = require('fs');
const path = require('path');

function checkDeployment() {
    const checks = [];
    
    // 检查1：所有图片是否已压缩
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const images = getAllFiles('./assets/images', imageExtensions);
    
    checks.push({
        name: '图片压缩',
        status: images.length > 0 ? '⚠️ 需要检查' : '✅ 无图片',
        details: `找到 ${images.length} 张图片`
    });
    
    // 检查2：所有资源是否使用相对路径
    const htmlFiles = getAllFiles('.', ['.html']);
    const absolutePaths = [];
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        // 检查绝对路径（以/开头但不以//开头）
        const matches = content.match(/src=["'](\/[^/][^"']*)["']/g);
        if (matches) {
            absolutePaths.push(...matches);
        }
    });
    
    checks.push({
        name: '相对路径检查',
        status: absolutePaths.length === 0 ? '✅ 通过' : '❌ 失败',
        details: absolutePaths.length > 0 ? `找到绝对路径: ${absolutePaths.join(', ')}` : '所有路径都是相对的'
    });
    
    // 检查3：关键文件是否存在
    const requiredFiles = [
        'index.html',
        'css/style.css',
        'js/modules/dataLoader.js',
        'data/products.json'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    checks.push({
        name: '必要文件检查',
        status: missingFiles.length === 0 ? '✅ 通过' : '❌ 失败',
        details: missingFiles.length > 0 ? `缺失文件: ${missingFiles.join(', ')}` : '所有必要文件都存在'
    });
    
    // 输出检查结果
    console.log('部署前检查结果:');
    checks.forEach(check => {
        console.log(`${check.status} ${check.name}: ${check.details}`);
    });
    
    return checks.every(check => !check.status.includes('❌'));
}

function getAllFiles(dir, extensions) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath, extensions));
        } else {
            const ext = path.extname(file).toLowerCase();
            if (extensions.includes(ext)) {
                results.push(filePath);
            }
        }
    });
    
    return results;
}

// 运行检查
if (require.main === module) {
    const readyForDeployment = checkDeployment();
    process.exit(readyForDeployment ? 0 : 1);
}
```

### 12.3 简单的构建脚本

```bash
#!/bin/bash
# build.sh - 简单的构建脚本

echo "开始构建锐今阁网站..."

# 1. 清理构建目录
rm -rf dist
mkdir -p dist

# 2. 复制必要文件
cp -r index.html product.html collection.html space.html dist/
cp -r css dist/
cp -r js dist/
cp -r data dist/
cp -r assets dist/

# 3. 压缩图片（需要安装ImageMagick）
if command -v convert &> /dev/null; then
    echo "压缩图片..."
    find dist/assets/images -name "*.jpg" -exec convert {} -quality 85 {} \;
else
    echo "ImageMagick未安装，跳过图片压缩"
fi

# 4. 生成版本文件
echo "生成版本信息..."
{
    echo "构建时间: $(date)"
    echo "Git版本: $(git rev-parse --short HEAD 2>/dev/null || echo '无')"
    echo "项目: 锐今阁新中式女装买手店网站"
} > dist/VERSION.txt

# 5. 创建robots.txt
echo "创建robots.txt..."
cat > dist/robots.txt << EOF
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://ruijinge.com/sitemap.xml
EOF

# 6. 创建sitemap.xml
echo "创建sitemap.xml..."
cat > dist/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ruijinge.com/</loc>
        <lastmod>$(date +%Y-%m-%d)</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ruijinge.com/collection.html</loc>
        <lastmod>$(date +%Y-%m-%d)</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ruijinge.com/space.html</loc>
        <lastmod>$(date +%Y-%m-%d)</lastmod>
        <priority>0.7</priority>
    </url>
</urlset>
EOF

echo "构建完成！输出目录: dist/"
```

### 12.4 部署后验证

```javascript
// post-deploy-check.js
// 部署后运行的检查脚本

async function postDeployCheck(baseURL) {
    const endpoints = [
        '',
        'collection.html',
        'space.html'
    ];
    
    console.log('开始部署后检查...\n');
    
    let allPassed = true;
    
    for (const endpoint of endpoints) {
        const url = `${baseURL}/${endpoint}`;
        
        try {
            const response = await fetch(url);
            const status = response.status;
            const contentType = response.headers.get('content-type');
            
            const passed = status === 200 && contentType.includes('text/html');
            
            console.log(`${passed ? '✅' : '❌'} ${url}`);
            console.log(`  状态: ${status}, 类型: ${contentType}`);
            
            if (!passed) {
                allPassed = false;
            }
        } catch (error) {
            console.log(`❌ ${url}`);
            console.log(`  错误: ${error.message}`);
            allPassed = false;
        }
    }
    
    console.log(`\n检查完成: ${allPassed ? '✅ 所有检查通过' : '❌ 有检查失败'}`);
    return allPassed;
}

// 使用示例
// postDeployCheck('https://your-username.github.io/ruijinge-website');
```

---

## 13. 开发工作流

### 13.1 Git工作流

#### 分支策略
```
main (生产环境)
├── develop (开发集成)
│   ├── feature/home-page (功能分支)
│   ├── feature/product-detail
│   └── feature/filters
└── hotfix/urgent-fix (紧急修复)
```

#### 提交规范
```bash
# 提交类型
feat:     新功能
fix:      修复bug
docs:     文档更新
style:    代码格式调整
refactor: 代码重构
test:     测试相关
chore:    构建过程或辅助工具变动

# 示例
git commit -m "feat: 添加首页动态网格布局"
git commit -m "fix: 修复移动端导航菜单显示问题"
git commit -m "docs: 更新组件使用说明"
```

### 13.2 开发环境设置

#### 1. 环境要求
- Node.js (可选，用于运行脚本)
- Git
- VS Code 推荐扩展:
  - Live Server
  - Prettier - Code formatter
  - ESLint (可选)
  - Auto Rename Tag
  - CSS Peek

#### 2. 项目初始化
```bash
# 克隆项目
git clone https://github.com/your-username/ruijinge-website.git
cd ruijinge-website

# 安装开发依赖（如果有）
npm install

# 启动开发服务器
# 使用VS Code Live Server扩展
# 或使用Python简单服务器
python3 -m http.server 8000
```

#### 3. 开发命令
```json
// 如果使用package.json
{
  "scripts": {
    "dev": "echo '使用Live Server扩展打开index.html'",
    "format": "prettier --write \"**/*.{js,html,css}\"",
    "check": "node deploy-checklist.js",
    "build": "bash build.sh",
    "test": "node tests/smoke.test.js"
  }
}
```

### 13.3 代码审查清单

#### HTML检查清单
- [ ] 使用语义化标签
- [ ] 所有图片有alt属性
- [ ] 表单字段有正确的label关联
- [ ] 使用正确的标题层级 (h1-h6)
- [ ] 链接有适当的href和title
- [ ] 使用aria属性提高可访问性

#### CSS检查清单
- [ ] 使用CSS变量（设计令牌）
- [ ] 遵循命名约定（c-, js-, is- 前缀）
- [ ] 响应式设计完整
- [ ] 颜色对比度符合WCAG AA
- [ ] 动画性能优化（使用transform和opacity）

#### JavaScript检查清单
- [ ] 使用ES6+语法
- [ ] 模块化组织代码
- [ ] 错误处理完整
- [ ] 避免全局变量污染
- [ ] 性能优化（防抖、节流、懒加载）

---

## 14. 附录

### 14.1 数据JSON完整示例

```json
// data/products.json 完整示例
[
  {
    "id": "product-001",
    "name": "解构水墨连衣裙",
    "slug": "deconstructed-ink-dress",
    "price": 1280,
    "originalPrice": 1580,
    "description": "融合传统水墨画意境与现代解构剪裁，采用不对称设计，打破传统连衣裙的对称美学。",
    "shortDescription": "水墨意境，解构剪裁",
    "season": ["spring", "summer"],
    "material": ["silk", "cotton"],
    "cut": ["asymmetric", "deconstructed"],
    "color": ["black", "white"],
    "size": ["S", "M", "L"],
    "themeColor": "#2c3e50",
    "images": {
      "main": "assets/images/products/001/main.jpg",
      "gallery": [
        "assets/images/products/001/detail-1.jpg",
        "assets/images/products/001/detail-2.jpg",
        "assets/images/products/001/detail-3.jpg"
      ],
      "thumbnail": "assets/images/products/001/thumbnail.jpg"
    },
    "story": {
      "title": "水墨新解",
      "content": "设计灵感来源于宋代山水画中的水墨意境。我们将传统的水墨元素进行解构，重新组合成现代的几何图案。衣袖的不对称设计象征着山水画中的虚实对比，裙摆的层叠则模仿了水墨的渲染效果。",
      "inspiration": ["宋代山水画", "水墨艺术", "几何解构"]
    },
    "details": {
      "fabric": "70%丝绸，30%棉",
      "care": "冷水手洗，平铺晾干",
      "origin": "中国杭州",
      "weight": "450g"
    },
    "tags": ["新品", "推荐", "限量"],
    "isNew": true,
    "isFeatured": true,
    "inStock": true,
    "stockCount": 15,
    "createdAt": "2024-12-01T10:00:00Z",
    "updatedAt": "2024-12-01T10:00:00Z"
  }
]

// data/categories.json 完整示例
{
  "seasons": [
    {
      "id": "spring",
      "name": "春日",
      "description": "春意盎然，轻盈灵动",
      "color": "#27ae60",
      "icon": "🌸"
    },
    {
      "id": "summer",
      "name": "夏日",
      "description": "清爽透气，简约时尚",
      "color": "#3498db",
      "icon": "☀️"
    }
  ],
  "materials": [
    {
      "id": "silk",
      "name": "丝绸",
      "description": "光泽柔滑，高贵典雅",
      "characteristics": ["透气", "亲肤", "有光泽"]
    },
    {
      "id": "cotton",
      "name": "棉麻",
      "description": "天然透气，舒适环保",
      "characteristics": ["吸湿", "透气", "天然"]
    }
  ],
  "cuts": [
    {
      "id": "asymmetric",
      "name": "不对称剪裁",
      "description": "打破对称，创造动态美",
      "examples": ["单肩设计", "不规则下摆"]
    },
    {
      "id": "deconstructed",
      "name": "解构主义",
      "description": "重构传统，创造新形态",
      "examples": ["重组旗袍", "解构汉服"]
    }
  ]
}
```

### 14.2 浏览器支持策略

| 浏览器 | 支持级别 | 备注 |
|--------|----------|------|
| **Chrome (最新2版)** | ✅ 完全支持 | 主要目标浏览器 |
| **Safari (最新2版)** | ✅ 完全支持 | 主要目标浏览器 |
| **Firefox (最新2版)** | ✅ 完全支持 | 主要目标浏览器 |
| **Edge (最新2版)** | ✅ 完全支持 | 基于Chromium |
| **iOS Safari (最新2版)** | ✅ 完全支持 | 移动端主要浏览器 |
| **Android Chrome (最新2版)** | ✅ 完全支持 | 移动端主要浏览器 |
| **IE 11** | ❌ 不支持 | 提供基础HTML降级 |

### 14.3 性能目标

| 指标 | 目标值 | 测量工具 |
|------|--------|----------|
| **首次内容绘制 (FCP)** | < 1.5秒 | Lighthouse |
| **最大内容绘制 (LCP)** | < 2.5秒 | Lighthouse |
| **累积布局偏移 (CLS)** | < 0.1 | Lighthouse |
| **首次输入延迟 (FID)** | < 100ms | Lighthouse |
| **总阻塞时间 (TBT)** | < 200ms | Lighthouse |
| **页面完全加载** | < 3秒 | WebPageTest |
| **动画帧率** | 60fps | Chrome DevTools |
| **图片加载时间** | < 2秒 | 自定义测量 |

### 14.4 项目时间线

| 阶段 | 时间 | 主要任务 | 交付物 |
|------|------|----------|--------|
| **第1周** | 2025-01-06 ~ 01-10 | 环境搭建、基础架构 | 项目结构、设计令牌 |
| **第2周** | 2025-01-13 ~ 01-17 | 首页开发 | 首页HTML/CSS/JS |
| **第3周** | 2025-01-20 ~ 01-24 | 单品页开发 | 单品页、3D预览 |
| **第4周** | 2025-01-27 ~ 01-31 | 分类页开发 | 筛选器、时间轴 |
| **第5周** | 2025-02-03 ~ 02-07 | 空间页开发 | 360°预览、表单 |
| **第6周** | 2025-02-10 ~ 02-14 | 测试优化 | 跨浏览器测试、性能优化 |
| **第7周** | 2025-02-17 ~ 02-21 | 部署上线 | GitHub Pages部署 |
| **第8周** | 2025-02-24 ~ 02-28 | 文档完善 | 用户手册、维护文档 |

### 14.5 团队联系方式

| 角色 | 负责人 | 联系方式 | 职责 |
|------|--------|----------|------|
| **项目经理** | John | john@example.com | 项目管理、需求沟通 |
| **架构师** | Winston | winston@example.com | 技术架构、代码审查 |
| **前端开发** | 开发团队 | team@example.com | 页面开发、功能实现 |
| **UI/UX设计** | Sally | sally@example.com | 视觉设计、用户体验 |

### 14.6 文档变更记录

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|----------|--------|
| 1.0 | 2025-01-03 | 初始版本创建 | Winston |
| 1.1 | 2025-01-10 | 更新技术栈细节 | Winston |
| 1.2 | 2025-01-17 | 添加组件示例 | Winston |

---

## 15. 紧急情况处理

### 15.1 常见问题解决方案

#### 问题1：GitHub Pages不显示最新内容
**原因**：缓存或构建问题
**解决方案**：
1. 检查仓库设置中的GitHub Pages配置
2. 清除浏览器缓存
3. 在URL后添加查询参数强制刷新：`?v=2`
4. 检查构建日志中的错误

#### 问题2：表单提交失败
**原因**：Formspree配置问题或网络问题
**解决方案**：
1. 检查Formspree表单ID是否正确
2. 检查网络连接
3. 提供备选联系方式（电话）
4. 添加本地存储作为降级方案

#### 问题3：移动端布局异常
**原因**：CSS响应式问题
**解决方案**：
1. 检查viewport meta标签
2. 使用Chrome DevTools模拟移动设备
3. 检查CSS媒体查询
4. 测试真机设备

#### 问题4：图片加载缓慢
**原因**：图片过大或网络问题
**解决方案**：
1. 压缩图片文件大小
2. 使用WebP格式
3. 实现懒加载
4. 使用CDN加速

### 15.2 回滚流程

如果部署后发现问题，执行以下回滚流程：

```bash
# 1. 回滚到上一个版本
git log --oneline  # 查看提交历史
git checkout <previous-commit-hash>

# 2. 强制推送到main分支
git push origin main --force

# 3. 通知团队
# 发送通知邮件或消息
```

---

## 总结

这份技术架构文档为"锐今阁"新中式女装买手店网站提供了完整的技术实现方案，具有以下特点：

### 核心优势
1. **初学者友好**：详细的技术指导和代码示例
2. **性能优化**：全面的性能优化策略
3. **可维护性**：清晰的架构和代码规范
4. **可扩展性**：模块化设计便于功能扩展
5. **成本效益**：使用免费工具和服务

### 成功关键
1. **严格遵循技术约束**：纯HTML/CSS/JavaScript
2. **重视用户体验**：解构主义设计语言贯穿始终
3. **性能优先**：所有决策考虑性能影响
4. **团队协作**：清晰的开发流程和规范

### 下一步行动
1. **团队培训**：确保所有开发者理解架构
2. **环境搭建**：按照文档设置开发环境
3. **逐步开发**：按照时间线分阶段实施
4. **持续测试**：开发过程中持续测试和优化

如需进一步的技术支持或架构调整，请随时联系技术架构师Winston。

---
**文档状态**：✅ 完成  
**最后更新**：2025-01-03  
**下一版本计划**：根据开发进度更新
