import React from "react";
import { useForm } from "react-hook-form";
import { createClass } from "../../../api/classesApi.ts";
import { useAuthStore } from "../../../store/authStore.ts"

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

  const { user } = useAuthStore()

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
    <div className="p-6 border-y border-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">

        {/* Class Name */}
        <div className="flex flex-col flex-1">
          <label className="font-medium mb-1">Class name</label>
          <input
            type="text"
            placeholder="Input class name"
            {...register("name", { required: "Name is required!" })}
            className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        {/* Study Year */}
        <div className="flex flex-col w-32">
          <label className="font-medium mb-1">School year</label>
          <select
            {...register("studyYear", { required: "Letnik je obvezen" })}
            className="
                border border-gray-300 
                rounded-lg 
                px-3 py-2 
                bg-white 
                text-gray-900 
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-400 
                focus:border-blue-400
                appearance-none
            "
            >
            <option value="">Select</option>
            {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                {i + 1}. letnik
                </option>
            ))}
            </select>
          {errors.studyYear && (
            <span className="error-message">
              {errors.studyYear.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-6 rounded-lg border-2 border-gray-300 bg-white text-gray-900 font-medium focus:outline-none hover:bg-stone-900 hover:text-slate-100 hover:border-blue-400 focus-visible:bg-stone-900 focus-visible:text-slate-100 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-300 transition-colors"
        >
          Add class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
