import api from "./axios.ts";

type Class = {
    name: string,
    studyYear: string,
    userId: string,
}

export const createClass = (classData: Class) => {
    const response = api.post("classes/", classData);
    return response;
}
export const getClasses = (userId: string) => {
    const response = api.get(`classes/user/${userId}`);
    return response;
}
export const getClassById = (classId: string) => {
    const response = api.get(`classes/${classId}`);
    return response;
}
