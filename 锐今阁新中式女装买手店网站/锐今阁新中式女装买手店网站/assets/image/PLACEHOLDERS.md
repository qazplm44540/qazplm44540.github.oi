# 图片占位符说明

本文档说明网站中需要图片的位置和对应的图片路径。

## 首页 (index.html)

### 英雄区背景图
- 位置：`.hero__ink-effect`
- 路径：`assets/image/shop/1.jpg`
- 说明：首页英雄区的水墨效果背景图

### 精选产品图片
- 位置：`.c-product-card__image`
- 路径：根据产品季节从相应目录加载
  - 春季产品：`assets/image/春季/001.jpg`、`assets/image/春季/002.jpg`
  - 夏季产品：`assets/image/夏季/003.jpg`、`assets/image/夏季/004.jpg`
  - 秋季产品：`assets/image/秋季/005.jpg`、`assets/image/秋季/006.jpg`
  - 冬季产品：`assets/image/冬季/007.jpg`、`assets/image/冬季/008.jpg`

### 新品时间轴图片
- 位置：`.timeline-card__image`
- 路径：`assets/image/new/01.jpg`、`assets/image/new/02.jpg`、`assets/image/new/03.jpg`、`assets/image/new/04.jpg`

## 产品详情页 (product.html)

### 产品主图
- 位置：`.product-hero__main-image`
- 路径：根据产品季节从相应目录加载

### 产品缩略图
- 位置：`.product-hero__thumbnail img`
- 路径：根据产品季节从相应目录加载

## 分类页 (collection.html)

### 季节卡片背景图
- 位置：`.season-card__background`
- 路径：
  - 春季：`assets/image/春季/1.jpg`
  - 夏季：`assets/image/夏季/1.jpg`
  - 秋季：`assets/image/秋季/1.jpg`
  - 冬季：`assets/image/冬季/1.jpg`

### 产品网格图片
- 位置：`.c-product-card__image`
- 路径：根据产品季节从相应目录加载

### 时间轴图片
- 位置：`.timeline-card__image`
- 路径：`assets/image/new/01.jpg`、`assets/image/new/02.jpg`、`assets/image/new/03.jpg`、`assets/image/new/04.jpg`

## 空间页 (space.html)

### 品牌介绍图片
- 位置：`.space-intro__image img`
- 路径：`assets/image/shop/1.jpg`

### 360°预览图片
- 位置：`.space-preview__image`
- 路径：`assets/image/shop/2.jpg`

## 图片命名规则

1. 季节产品图片：使用三位数字编号（001.jpg, 002.jpg等）
2. 新品图片：使用两位数字编号（01.jpg, 02.jpg等）
3. 门店图片：使用单位数字编号（1.jpg, 2.jpg等）
4. 所有图片应使用JPG格式以平衡质量和文件大小
