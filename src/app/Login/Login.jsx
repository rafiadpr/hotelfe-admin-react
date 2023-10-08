import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginFailed = () => {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: "Email atau password yang Anda masukkan salah",
    });
  };

  const handleLogin = () => {
    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.logged) {
        localStorage.setItem("logged", response.data.logged);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);

        if (response.data.data.role === "Admin") {
          navigate("/HomeAdmin"); // Use navigate to navigate to the Admin page
        } else if (response.data.data.role === "Resepsionis") {
          navigate("/ResepsionisResepsionis"); // Use navigate to navigate to the Resepsionis page
        }

        handleLogin();
      } else {
        console.log("LOGIN GAGAL");
        handleLoginFailed();
      }
    } catch (error) {
      console.log(error);
      handleLoginFailed();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-3 mr-3"
                onClick={handleTogglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
