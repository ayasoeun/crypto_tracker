import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const [toDos, setToDos] = useRecoilState<IToDo[]>(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = ({ toDo }: IForm) => {
        console.log("add to do", toDo);
        setToDos((oldToDo) => [
            { text: toDo, id: Date.now(), category: "To_Do" },
            ...oldToDo,
        ]);
        setValue("toDo", "");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("toDo", { required: "please write a to do" })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
