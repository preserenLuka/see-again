import api from "./axios.ts";

type Class = {
    name: string,
    studyYear: string,
    classId: string,
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
