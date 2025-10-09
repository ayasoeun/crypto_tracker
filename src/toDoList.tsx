import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { IToDo, toDoState } from "./atoms";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue<IToDo[]>(toDoState); //get only Recoil value
    console.log(toDos);
    return (
        <div>
            <CreateToDo />
            <ul>
                {toDos.map((toDo) => (
                    <ToDo {...toDo} /> //instead of text={} id={}... do this
                ))}
            </ul>
        </div>
    );
}
export default ToDoList;
