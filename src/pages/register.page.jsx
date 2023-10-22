import RegisterForm from "../components/auth/registerForm.auth";

const Register = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/*Register Form*/}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
