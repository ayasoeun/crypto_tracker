import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "To_Do" | "Doing" | "Done"; //should have one of these
}
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});
