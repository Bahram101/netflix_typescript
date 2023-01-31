import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [login, setLogin] = useState(false);
  const {signIn, signUp, loading} = useAuth();  

  const onSubmit: SubmitHandler<Inputs> = async (data) => { 
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }

  return (
    <div className="relative h-screen w-screen flex flex-col bg-black md:bg-transparent justify-center md:items-center ">
      <Head>
        <title>Netflix | Login page</title>
        <Link rel="icon" href="/favicon.icon" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt=""
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-8 px-6 rounded bg-black/75 py-10 md:max-w-md"
      >
        <h1>Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[12px] text-orange-500 font-light">
                Please, enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[12px] text-orange-500 font-light">
                Your password must contain between 4 and 20 characters
              </p>
            )}
          </label>
        </div>
        <button
          className="bg-[#e50914] rounded py-3 w-full font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
