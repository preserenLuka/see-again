import React from "react";
import { SignUp } from "@clerk/clerk-react";

const RegisterPage: React.FC = () => {

    return(
        <div className="flex justify-center items-center h-screen">
            <SignUp />
        </div>
    );
}

export default RegisterPage;