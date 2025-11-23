import api from "./axios.ts";

type Class = {
    title: string;
    description: string;
    date: string;
    topics: string[];
    classId: string;
    content: string;
}

export const createLecture = (classData: Class) => {
    const response = api.post("lectures/", classData);
    return response;
}
export const getLectures = (classId: string) => {
    const response = api.get(`lectures/class/${classId}/`);
    return response;
}
export const getLectureById = (lectureId: string) => {
    const response = api.get(`lectures/${lectureId}`);
    return response;
}
