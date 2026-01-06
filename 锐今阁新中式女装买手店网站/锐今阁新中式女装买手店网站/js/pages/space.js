// 空间页脚本
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.Navigation.initNavigation();
    window.Navigation.initScrollEffect();
    initSpacePage();
});

// 初始化空间页
function initSpacePage() {
    // 初始化360°预览
    init360Preview();

    // 初始化预约表单
    initAppointmentForm();

    // 初始化地图
    initMap();
}

// 初始化360°预览
function init360Preview() {
    const image = document.querySelector('.js-preview-image');
    const prevButton = document.querySelector('.js-preview-prev');
    const nextButton = document.querySelector('.js-preview-next');

    if (!image || !prevButton || !nextButton) return;

    // 图片序列
    const images = [
        'assets/image/shop/2.jpg'
        // 这里可以添加更多图片以实现真正的360°效果
    ];

    let currentIndex = 0;

    // 上一张按钮
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updatePreviewImage();
    });

    // 下一张按钮
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updatePreviewImage();
    });

    // 更新预览图片
    function updatePreviewImage() {
        image.style.transform = 'scale(0.95)';
        setTimeout(() => {
            image.src = images[currentIndex];
            image.style.transform = 'scale(1)';
        }, 200);
    }

    // 添加拖动旋转效果
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;

    const container = document.querySelector('.space-preview__image-container');
    if (!container) return;

    container.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // 触摸事件
    container.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;

        // 根据拖动距离计算旋转角度
        currentRotation += deltaX * 0.5;

        // 应用旋转
        image.style.transform = `rotateY(${currentRotation}deg)`;

        startX = currentX;
    }

    function dragEnd() {
        isDragging = false;
    }
}

// 初始化预约表单
function initAppointmentForm() {
    const form = document.querySelector('.js-appointment-form');
    const successElement = document.querySelector('.js-appointment-success');
    const newAppointmentButton = document.querySelector('.js-new-appointment');

    if (!form || !successElement || !newAppointmentButton) return;

    // 设置表单验证
    window.FormHandler.setupFormValidation(form);

    // 设置日期输入
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        window.FormHandler.setupDateInput(dateInput);
    }

    // 处理表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 收集表单数据
        const formData = {
            name: document.querySelector('#name').value,
            phone: document.querySelector('#phone').value,
            date: document.querySelector('#date').value,
            time: document.querySelector('#time').value,
            notes: document.querySelector('#notes').value
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
                // 成功后显示成功消息
                form.style.display = 'none';
                successElement.style.display = 'block';
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

    // 再次预约按钮
    newAppointmentButton.addEventListener('click', () => {
        form.style.display = 'block';
        successElement.style.display = 'none';
        form.reset();
    });
}

// 初始化地图
function initMap() {
    const mapContainer = document.querySelector('.map-placeholder');
    if (!mapContainer) return;

    // 这里可以集成实际的地图API，如百度地图或高德地图
    // 以下是简单的示例实现
    mapContainer.innerHTML = `
        <div class="map-info">
            <h3>锐今阁</h3>
            <p>北京市朝阳区三里屯路19号</p>
            <p>营业时间：周一至周五 10:00-20:00，周末 10:00-21:00</p>
            <div class="map-directions">
                <a href="https://map.baidu.com/direction?destination=北京市朝阳区三里屯路19号" target="_blank" class="c-button c-button--primary">获取路线</a>
            </div>
        </div>
    `;

    // 添加地图样式
    const mapStyles = document.createElement('style');
    mapStyles.textContent = `
        .map-info {
            padding: var(--spacing-xl);
            text-align: center;
        }

        .map-directions {
            margin-top: var(--spacing-lg);
        }
    `;
    document.head.appendChild(mapStyles);
}
