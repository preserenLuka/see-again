import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './auth.module.css';
import { createUser } from "../api/userApi.ts"

type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await createUser(data);

      console.log("User created:", response.data);

      registerUser(data.email, data.firstName, data.lastName);

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              className={styles.input}
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              className={styles.input}
              {...register('lastName', { required: 'Last name is required' })}
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className={styles.error}>{errors.email.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            {errors.password && <span className={styles.error}>{errors.password.message as string}</span>}
          </div>

          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <Link to="/sign-in" className={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;