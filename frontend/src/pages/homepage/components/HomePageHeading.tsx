import React from "react";
import logoImage from "../../../../public/logo.svg";
import { useAuthStore } from "../../../store/authStore.ts";
import { useNavigate } from "react-router-dom";

const HomePageHeader: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4">
      {/* LEFT SECTION — Logo + text */}
      <div className="flex items-center gap-3">
        <img src={logoImage} alt="Logo" className="w-50" />
      </div>

      {/* RIGHT SECTION — Name + Settings + Avatar (or logout) */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          {user && (
            <>
              <p className="font-semibold">{user.firstName}</p>
              {/* Logout button */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-gray-400 hover:text-red-400 transition"
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* Avatar (placeholder if none) */}
        <img
          src={"https://placehold.co/40x40"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomePageHeader;
