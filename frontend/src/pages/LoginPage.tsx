import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './auth.module.css';
import { loginUser } from "../api/userApi.ts"
import { useAuthStore } from '../store/authStore';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
        const response = await loginUser(data);

        console.log("User loged in:", response.data);

        useAuthStore.setState({
            user: response.data,
        });

        login(data.email);
        navigate("/");
    } catch (error: any) {
        console.error("Registration error:", error);
        alert(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              {...register('email', { required: 'Email is required!' })}
            />
            {errors.email && <p className="error-message">{errors.email.message as string}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              {...register('password', { required: 'Password is required!' })}
            />
            {errors.password && <span className="error-message">{errors.password.message as string}</span>}
          </div>

          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <p className={styles.linkText}>
          Don't have an account? <Link to="/sign-up" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;