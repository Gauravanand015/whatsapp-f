import LoginForm from "../components/auth/loginForm.auth";

const Login = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/*Register Form*/}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
