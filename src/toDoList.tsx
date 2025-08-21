import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log("add to do", data.toDo);
        setValue("toDo", "");
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("toDo", { required: "please write a to do" })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
        </div>
    );
}
// type FormValues = {
//     email: string;
//     firstname: string;
//     lastname: string;
//     password: string;
//     password1: string;
//     username: string;
// };

// function ToDoList() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//     } = useForm<FormValues>();
//     const onValid = (data: FormValues) => {
//         if (data.password !== data.password1) {
//             setError("password", { message: "Password are not the same" });
//         }
//     };
//     console.log(errors);
//     return (
//         <div>
//             <form
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     maxWidth: 200,
//                 }}
//                 onSubmit={handleSubmit(onValid)}
//             >
//                 <input
//                     {...register("email", {
//                         required: "Email is required",
//                         minLength: 10,
//                         pattern: {
//                             value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
//                             message: "Only correct email forms allowed ",
//                         },
//                     })}
//                     placeholder="Email"
//                 />
//                 <span>{errors?.email?.message}</span>

//                 <input
//                     {...register("firstname", {
//                         required: "First Name is required",
//                         validate: {
//                             val1: (value) =>
//                                 value.includes("me")
//                                     ? "can't have 'me' inside"
//                                     : true,
//                             val2: (value) =>
//                                 value.includes("qwe")
//                                     ? "'no qwe allowed'"
//                                     : true,
//                         },
//                     })}
//                     placeholder="First Name"
//                 />
//                 <span>{errors?.firstname?.message}</span>

//                 <input
//                     {...register("lastname", {
//                         required: "Last Name is required",
//                     })}
//                     placeholder="Last Name"
//                 />
//                 <span>{errors?.lastname?.message}</span>

//                 <input
//                     {...register("username", {
//                         required: "UserName is required",
//                     })}
//                     placeholder="Username"
//                 />
//                 <span>{errors?.username?.message}</span>

//                 <input
//                     {...register("password", {
//                         required: "Password is required",
//                         pattern: {
//                             value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
//                             message: "Only correct password allowed",
//                         },
//                     })}
//                     placeholder="Password"
//                 />
//                 <input
//                     {...register("password1", {
//                         required: "Password is required",
//                         pattern: {
//                             value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
//                             message: "Only correct password allowed",
//                         },
//                     })}
//                     placeholder="Password"
//                 />
//                 <span>{errors?.password?.message}</span>

//                 <button>Add</button>
//             </form>
//         </div>
//     );
// }

export default ToDoList;
