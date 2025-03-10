import { Input, Checkbox, Button, Typography, Textarea, Card } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    setLoading(true);

    //create a formData object and append state values
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);

      if (res.status === 200) {
        const token = res.data.UserInfo?.token;
        const adminType = res.data.UserInfo?.user?.admin_type;
        const detailsView = res.data.UserInfo?.user?.details_view;
        const UserName = res.data.UserInfo?.user?.mobile;
        if (token) {
          // Store the token in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("admin-type", adminType);
          localStorage.setItem("details-view", detailsView);
          localStorage.setItem("username", UserName);
          navigate("/home");
          toast.success("Login Succesfully");
        } else {
          toast.error("Login Failed, credentials doesn't match");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="flex flex-col m-0 lg:flex-row h-screen">
        {/* Left Side - Images with Animation and Background Color */}
        <div className="hidden lg:block lg:w-[50%] xl:block xl:w-[50%] h-full bg-white">
          {/* Container for the images */}
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* First image (top) with floating animation */}
            <div className="w-4/5 h-2/5 mb-4" style={{
              animation: "floatUpDown 3s ease-in-out infinite",
            }}>
              <img
                src="/img/em1.png"
                alt="Employee 1"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Second image (bottom) with scale animation */}
            <div className="w-4/5 h-2/5" style={{
              animation: "pulse 4s ease-in-out infinite",
            }}>
              <img
                src="/img/em2.png"
                alt="Employee 2"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* CSS for custom animations */}
          <style jsx>{`
            @keyframes floatUpDown {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}</style>
        </div>
        
        {/* Right Side - Form */}
        <div className="flex-1 flex items-center bg-pink-50/50 justify-center px-4 lg:px-8 py-12 h-full lg:w-1/2">
          <Card className="p-8 bg-gradient-to-r border border-[#A41460] hover:shadow-2xl transition-shadow duration-300 w-full max-w-md">
            <div className="flex justify-center mb-4">
              <img src="logo.png" alt="Company Logo" className="w-35 h-35" />
            </div>

            <Typography
              variant="h4"
              className="font-bold text-center mb-8 text-[#A41460]"
            >
              Sign into your account
            </Typography>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  variant="static"
                  label="Mobile Number *"
                  labelProps={{ className: "!text-[#A41460]" }}
                  placeholder="Enter your mobile number"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 text-gray-700 placeholder-gray-400"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Typography
                    variant="small"
                    className="text-[#A41460] font-medium"
                  >
                    Password *
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-medium text-[#A41460]"
                  >
                    <Link to="/forget-password">Forgot Password?</Link>
                  </Typography>
                </div>
                <Input
                  variant="static"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 text-gray-700 placeholder-gray-400"
                  labelProps={{ className: "!text-[#A41460]" }}
                />
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3 bg-[#A41460] hover:bg-[#802053] transition-colors duration-300"
                >
                  {loading ? "Checking..." : "Sign In"}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                <Typography
                  variant="small"
                  className="text-center text-blue-gray-500 font-medium"
                >
                  Not registered?
                  <Link
                    target="blank"
                    to="https://businessboosters.club/register"
                    className="text-[#A41460] ml-1"
                  >
                    Create account
                  </Link>
                </Typography>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignIn;