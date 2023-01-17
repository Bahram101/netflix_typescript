import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { useForm, SubmitErrorHandler } from "react-hook-form";

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

  const onSubmit: SubmitErrorHandler<Inputs> = (data) => console.log(data);

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
            {errors.email && <p className="p-1 text-[13px]">This field is required</p>}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
          </label>
        </div>
        <button className="bg-[#e50914] rounded py-3 w-full font-semibold">
          Sign in
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button type="submit" className="text-white hover:underline">
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
