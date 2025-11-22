import React from "react";

const Settings: React.FC = () => {
    return (
        <div className="border-y border-gray-300 flex flex-col">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">Font size</h2>
                <select>
                    <option value="small">small</option>
                    <option value="small">medium</option>
                    <option value="small">large</option>
                </select>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">Theme color</h2>
                <select>
                    <option value="dark">dark</option>
                    <option value="white">white</option>
                    <option value="blue">blue</option>
                </select>
            </div>
        </div>
    );
}

export default Settings;