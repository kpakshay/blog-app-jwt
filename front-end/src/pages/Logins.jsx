export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center bg-white border border-gray-300 p-8 rounded-lg w-80 sm:w-96">
        <h1 className="text-3xl font-sans font-bold mb-6">Instagram</h1>

        <form className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
            Log In
          </button>
        </form>

        <p className="text-sm text-blue-500 text-center mt-2 cursor-pointer hover:underline">
          Forgot password?
        </p>

        <div className="flex items-center my-4 w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <p className="text-blue-600 font-semibold text-sm text-center cursor-pointer hover:underline">
          Log in with Facebook
        </p>
      </div>

      <div className="flex flex-col items-center bg-white border border-gray-300 p-4 rounded-lg mt-4 w-80 sm:w-96">
        <p className="text-sm">
          Don't have an account?{" "}
          <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
