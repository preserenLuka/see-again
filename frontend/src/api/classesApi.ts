import api from "./axios.ts";

type Class = {
    name: string,
    description: string,
}

export const createClass = (classData: Class) => {
    const response = api.post("classes/", classData);
    return response;
}
export const getClasses = () => {
    const response = api.get("classes/");
    return response;
}

