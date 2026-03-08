import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { usersAtom } from "../../store";
import { useForm } from "react-hook-form";

export default function EditingUser() {
  const router = useRouter();
  const { id } = router.query;

  const [users, setUsers] = useAtom(usersAtom);

  const user = users.find((u) => u.id === Number(id));

  if (id && !user) {
    router.replace("/404"); // redirect to not found hanlding case
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit = (data) => {
    console.log(`form submitted - data: ${data} `);
    const updatedUsers = users.map((u) =>
      u.id === Number(id) ? { ...u, ...data } : u
    );

    setUsers(updatedUsers);
    router.push("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <br />

          <input
            className={errors.name && "inputError"}
            {...register("name", { required: true, maxLength: 20 })}
          />

          {errors.name?.type === "required" && (
            <span className="inputErrorText">
              <br />
              Name is required
            </span>
          )}

          {errors.name?.type === "maxLength" && (
            <span className="inputErrorText">
              <br />
              Name cannot contain more than 20 characters
            </span>
          )}

          <br />
          <br />
        </div>

        <div>
          <label>Email</label>
          <br />

          <input
            className={errors.email && "inputError"}
            {...register("email", { required: true })}
          />

          {errors.email?.type === "required" && (
            <span className="inputErrorText">
              <br />
              Email is required
            </span>
          )}

          <br />
          <br />
        </div>

        <button style={{ padding: "3px" }} type="submit">
          Save
        </button>

        <button
          type="button"
          style={{ marginLeft: "10px", padding: "3px" }}
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
