import React, { useState } from 'react';

interface AuthFormProps {
  title: string; // 表单标题（如"登录"或"注册"）
  onSubmit: (data: Record<string, string>) => void; // 提交回调函数
  fields: { name: string; label: string; type: string }[]; // 动态表单字段配置
  submitButtonText: string; // 提交按钮文本
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, fields, submitButtonText }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // 清除字段错误
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 简单验证
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} 不能为空`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="auth-form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={errors[field.name] ? 'error' : ''}
            />
            {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
          </div>
        ))}
        <button type="submit" className="submit-button">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
