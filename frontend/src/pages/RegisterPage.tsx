import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createUser } from "../api/userApi.ts";
import { useAuthStore } from "../store/authStore";
import logoImage from "../../public/logo.svg";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await createUser(data);

      console.log("User created:", response.data);

      registerUser(data.email, data.firstName, data.lastName);

      useAuthStore.setState({
        user: response.data,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-secondary)]">

      {/* Logo */}
      <img
        src={logoImage}
        alt="No pupil left behind logo"
        className="h-12 w-auto mb-6"
      />

      {/* White card */}
      <div className="bg-[var(--bg-primary)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--text-primary)]">
          Sign Up
        </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text-primary)] opacity-80">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-[var(--border-color)] rounded-md text-base outline-none transition-colors text-[var(--text-primary)] bg-[var(--bg-primary)] focus:border-[var(--text-primary)]"
                {...register("firstName", {
                  required: "First name is required!",
                })}
              />
              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text-primary)] opacity-80">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-[var(--border-color)] rounded-md text-base outline-none transition-colors text-[var(--text-primary)] bg-[var(--bg-primary)] focus:border-[var(--text-primary)]"
                {...register("lastName", { required: "Last name is required!" })}
              />
              {errors.lastName && (
                <span className="error-message">
                  {errors.lastName.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text-primary)] opacity-80">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border border-[var(--border-color)] rounded-md text-base outline-none transition-colors text-[var(--text-primary)] bg-[var(--bg-primary)] focus:border-[var(--text-primary)]"
                {...register("email", { required: "Email is required!" })}
              />
              {errors.email && (
                <span className="error-message">
                  {errors.email.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--text-primary)] opacity-80">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-[var(--border-color)] rounded-md text-base outline-none transition-colors text-[var(--text-primary)] bg-[var(--bg-primary)] focus:border-[var(--text-primary)]"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="error-message">
                  {errors.password.message as string}
                </span>
              )}
            </div>

            <button type="submit" className="w-full py-3 mt-4 black-white-style">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-[var(--text-primary)] opacity-70">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
      </div>
    </div>
  );
};

export default RegisterPage;
