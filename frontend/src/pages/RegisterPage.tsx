import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "/"

type RegisterFormInputs = {
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
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Form data:", data);
    createUser(data)

    // Example API call:
    // const [response, error] = await UserAPI.register(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {/* First Name */}
        <div>
          <label className="block mb-1">First Name</label>
          <input
            className="w-full border p-2 rounded"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            className="w-full border p-2 rounded"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full border p-2 rounded"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="w-full border p-2 rounded"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;