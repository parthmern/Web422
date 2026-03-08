import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { usersAtom } from "../../store";
import { useForm } from "react-hook-form";

export default function AddUser() {
  const router = useRouter();
  const [users, setUsers] = useAtom(usersAtom); // global state like redux store I used before

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const watchUserName = watch("name");
  const watchEmail = watch("email");

  const isEntered = watchUserName || watchEmail;

  const onSubmit = (data, e) => {
    console.log(`form submitted - data: ${data} and ${e}`);

    const maxId = Math.max(...users.map((user) => user.id));

    const newUser = {
      id: maxId + 1,
      name: data.name,
      email: data.email,
    };

    setUsers([...users, newUser]);

    // go to home
    router.push("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add User Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name: </label>
          <br />

          <input
            className={errors.name && "inputError"}
            {...register("name", { required: true, maxLength: 20 })}
          />

          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}>
              <br />
              Name is required
            </span>
          )}

          {errors.name?.type === "maxLength" && (
            <span style={{ color: "red" }}>
              <br />
              Name cannot contain more than 20 characters
            </span>
          )}

          <br />
          <br />
        </div>

        <div>
          <label>Email: </label>
          <br />

          <input
            className={errors.email && "inputError"}
            {...register("email", { required: true })}
          />

          {errors.email?.type === "required" && (
            <span style={{ color: "red" }}>
              <br />
              Email is required
            </span>
          )}

          <br />
          <br />
        </div>

        <button
          type="submit"
          style={{ padding: "3px", marginTop: "15px", marginRight: "10px" }}
        >
          Add User
        </button>

        <button
          type="button"
          onClick={() => {
            router.push("/");
          }}
          style={{ padding: "3px", marginTop: "15px" }}
        >
          Cancel
        </button>

        <>
          {isEntered && (
            <p>
              You entered : {watchUserName} | {watchEmail}
            </p>
          )}
        </>
      </form>
    </div>
  );
}
