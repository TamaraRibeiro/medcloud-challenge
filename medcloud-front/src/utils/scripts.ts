import { Patient } from "../pages/patients";

export function splitArrayPagination(array: Patient[]) {
    const size = 10;
    const result = [];

    for (let i = 0; i < array.length; i += size) {
        const newArray = array.slice(i, i + size);
        result.push(newArray);
    }

    return result;
}

