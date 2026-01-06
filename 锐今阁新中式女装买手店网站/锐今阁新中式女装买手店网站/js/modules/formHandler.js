// 表单处理模块
(function() {
    'use strict';
    
    const FORM_ID = 'your-formspree-form-id-here'; // 替换为实际的Formspree表单ID

    window.FormHandler = {
        async submitAppointmentForm(formData) {
    try {
        const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('表单提交失败');
        }

        return {
            success: true,
            message: '预约提交成功！我们会尽快与您联系。',
            data: await response.json()
        };
    } catch (error) {
        console.error('表单提交错误:', error);
        return {
            success: false,
                message: '提交失败，请稍后重试或直接致电门店。'
            };
        }
    },

    validateForm(formData) {
    const errors = {};

    // 姓名验证
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = '请输入至少2个字符的姓名';
    }

    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
    }

    // 电话验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
        errors.phone = '请输入有效的手机号码';
    }

    // 日期验证
    if (!formData.date) {
        errors.date = '请选择预约日期';
    } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.date = '预约日期不能早于今天';
        }
    }

    // 时间验证
    if (!formData.time) {
        errors.time = '请选择预约时间';
    }

    return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    displayFormErrors(errors, formElement) {
    // 清除所有现有错误
    formElement.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
    });

    // 显示新错误
    Object.keys(errors).forEach(fieldName => {
        const errorElement = formElement.querySelector(`.js-${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = errors[fieldName];
            }
        });
    },

    setupFormValidation(formElement) {
    const inputs = formElement.querySelectorAll('.form-input');

    inputs.forEach(input => {
        // 输入时清除错误
        input.addEventListener('input', () => {
            const fieldName = input.name;
            const errorElement = formElement.querySelector(`.js-${fieldName}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
            });
        });
    },

    setupModal(modalElement) {
    const openButtons = document.querySelectorAll('.js-book-appointment');
    const closeButton = modalElement.querySelector('.js-modal-close');
    const overlay = modalElement.querySelector('.js-modal-overlay');

    // 打开模态框
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalElement.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭模态框
    const closeModal = () => {
        modalElement.style.display = 'none';
        document.body.style.overflow = '';
    };

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalElement.style.display === 'flex') {
            closeModal();
            }
        });
    },

    // 设置日期输入的最小值为今天
    setupDateInput(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    };
})();
