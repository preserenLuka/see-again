import api from "./axios.ts";

type Class = {
    name: string,
    studyYear: string,
    userId: string,
}

export const createLecture = (classData: Class) => {
    const response = api.post("lectures/", classData);
    return response;
}
export const getLectures = () => {
    const response = api.get("lectures/");
    return response;
}
export const getLectureById = (classId: string) => {
    const response = api.get(`lectures/${classId}`);
    return response;
}
