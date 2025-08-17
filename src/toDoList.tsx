import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");

//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value }, // value is in currenValue property
//         } = event;
//         setToDo(value);
//         setToDoError(""); // put here!! to check conditions of every changes made
//     };

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//         if (toDo.length < 10) {
//             setToDoError("toDo should longer than 10");
//         }
//         // console.log("submit");
//     };
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input
//                     onChange={onChange}
//                     value={toDo}
//                     placeholder="Write a to do"
//                     type="text"
//                 />
//                 <button>Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     );
// }

function ToDoList() {
    const { register, handleSubmit, formState } = useForm();
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(formState.errors);
    return (
        <div>
            <form
                style={{ display: "grid", gap: 10, maxWidth: 200 }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: true,
                        minLength: 10,
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            message: "Only correct email forms allowed ",
                        },
                    })}
                    placeholder="Email"
                />
                <input
                    {...register("firstname", { required: true })}
                    placeholder="First Name"
                />
                <input
                    {...register("lastname", { required: true })}
                    placeholder="Last Name"
                />
                <input
                    {...register("username", { required: true })}
                    placeholder="Username"
                />
                <input
                    {...register("password", {
                        required: true,
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: "Only correct password allowed",
                        },
                    })}
                    placeholder="Password"
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
