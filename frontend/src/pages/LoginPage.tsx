import React from "react";
import { SignIn } from "@clerk/clerk-react";

const LoginPage: React.FC = () => {

    return(
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    );
}

export default LoginPage;