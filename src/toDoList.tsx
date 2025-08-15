import { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value }, // value is in currenValue property
        } = event;
        setToDo(value);
        setToDoError(""); // put here!! to check conditions of every changes made
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
        if (toDo.length < 10) {
            setToDoError("toDo should longer than 10");
        }
        console.log("submit");
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={toDo}
                    placeholder="Write a to do"
                    ty pe="text"
                />
                <button>Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>
    );
}
 */
function ToDoList() {
    const { register, watch } = useForm();
    // console.log(register("toDo")); //returns an object
    console.log(watch());
    return (
        <div>
            <form>
                <input {...register("email")} placeholder="Email" />
                <input {...register("password")} placeholder="Password" />
                <input {...register("number")} placeholder="Phone Number" />
                <input {...register("address")} placeholder="Address" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
