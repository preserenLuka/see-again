import React from "react";
import { useForm } from "react-hook-form";
import { createClass } from "../../../api/classesApi.ts";
import { useAuthStore } from "../../../store/authStore.ts";

type FormValues = {
  name: string;
  studyYear: string;
  userId: string;
};

const AddClass: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { user } = useAuthStore();

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user?.id) return;
      const classData = {
        ...data,
        userId: user.id,
      };

      await createClass(classData);
      reset();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 p-4 border-y border-border min-h-[150px]"
    >
      {/* Class Name */}
      <div className="flex flex-col justify-end">
        <label className="font-medium mb-1 text-primary-text">Class name</label>
        <input
          type="text"
          placeholder="Input class name"
          {...register("name", { required: "Name is required!" })}
          className="w-full px-4 py-2 black-white-style h-[55px] box-border"
        />
        <div className="h-6 mt-1">
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>
      </div>

      {/* Study Year */}
      <div className="flex flex-col justify-end">
        <label className="font-medium mb-1 text-primary-text">
          School year
        </label>
        <select
          {...register("studyYear", { required: "Letnik je obvezen" })}
          className="w-full px-4 py-2 black-white-style h-[55px] box-border appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-no-repeat bg-[right_1rem_center]"
        >
          <option value="">Select</option>
          {[...Array(9)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}. letnik
            </option>
          ))}
        </select>
        <div className="h-6 mt-1">
          {errors.studyYear && (
            <span className="error-message">{errors.studyYear.message}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col justify-end">
        <button
          type="submit"
          className="w-full px-4 py-2 black-white-style h-[55px] box-border"
        >
          Add class
        </button>
        <div className="h-6 mt-1">
          {errors.name && (
            <span className="error-message invisible">placeholder</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddClass;
