import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/userApi";
import { useAuthStore } from "../store/authStore";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
      <div className="bg-[var(--bg-primary)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--text-primary)]">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
              <p className="error-message">{errors.email.message as string}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--text-primary)] opacity-80">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-[var(--border-color)] rounded-md text-base outline-none transition-colors text-[var(--text-primary)] bg-[var(--bg-primary)] focus:border-[var(--text-primary)]"
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && (
              <span className="error-message">
                {errors.password.message as string}
              </span>
            )}
          </div>

          <button type="submit" className="w-full py-3 mt-4 black-white-style">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-[var(--text-primary)] opacity-70">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
