"use client";
import { signInWithEmail } from "@/app/lib/signInWithEmail";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = await signInWithEmail(email, password);
    if (!data) setError("Błędny email lub hasło");
    else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <form
        action=""
        className="border m-5 w-1/2 h-1/2 p-10 flex flex-col items-center gap-5"
      >
        <input
          type="text"
          placeholder="Email"
          className="border p-1 text-center w-1/2"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Hasło"
          className="border p-1 text-center w-1/2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <input
          type="submit"
          value="Zaloguj"
          className="border p-1 text-center w-1/2"
          onClick={(e) => onSubmit(e)}
        />
      </form>
    </>
  );
}
