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
type FormValues = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    password1: string;
    username: string;
};

function ToDoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>();
    const onValid = (data: FormValues) => {
        if (data.password !== data.password1) {
            setError("password", { message: "Password are not the same" });
        }
    };
    console.log(errors);
    return (
        <div>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 200,
                }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "Email is required",
                        minLength: 10,
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            message: "Only correct email forms allowed ",
                        },
                    })}
                    placeholder="Email"
                />
                <span>{errors?.email?.message}</span>

                <input
                    {...register("firstname", {
                        required: "First Name is required",
                        validate: {
                            val1: (value) =>
                                value.includes("me")
                                    ? "can't have 'me' inside"
                                    : true,
                            val2: (value) =>
                                value.includes("qwe")
                                    ? "'no qwe allowed'"
                                    : true,
                        },
                    })}
                    placeholder="First Name"
                />
                <span>{errors?.firstname?.message}</span>

                <input
                    {...register("lastname", {
                        required: "Last Name is required",
                    })}
                    placeholder="Last Name"
                />
                <span>{errors?.lastname?.message}</span>

                <input
                    {...register("username", {
                        required: "UserName is required",
                    })}
                    placeholder="Username"
                />
                <span>{errors?.username?.message}</span>

                <input
                    {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: "Only correct password allowed",
                        },
                    })}
                    placeholder="Password"
                />
                <input
                    {...register("password1", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: "Only correct password allowed",
                        },
                    })}
                    placeholder="Password"
                />
                <span>{errors?.password?.message}</span>

                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
