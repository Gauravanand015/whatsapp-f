import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./authInput";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    if (res?.payload?.user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}

      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Heading*/}

        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>

        {/*Form*/}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-1 space-y-3">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Error */}
          {error ? <p className="text-red-300">{error}</p> : null}

          {/*Submit button*/}
          <button className="signUp_Button" type="submit">
            {status === "loading" ? (
              <SyncLoader color="#fff" size={16} />
            ) : (
              "Sign in"
            )}
          </button>

          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-1 text-center text-sm dark:text-dark_text_1">
            <span>you don't have an account?</span>
            <Link
              to="/register"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
