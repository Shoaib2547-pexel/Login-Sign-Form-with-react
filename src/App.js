import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  let [showpass, setshowpass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState({
    Uname: '',
    Upassword: ''
  });

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    setFormData({...formData,[name]:value})
    
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: value
    // }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Uname, Upassword } = formData;

    if (!Uname || !Upassword) {
      toast.error("Both fields are required");
      return;
    }

    if (isLogin) {
      const matched = usersData.find(
        (user) => user.Uname === Uname && user.Upassword === Upassword
      );

      if (matched) {
        toast.success("Login Successful");
      } else {
        toast.error("Invalid Credentials");
      }
    } else {
      const exists = usersData.some((user) => user.Uname === Uname);
      if (exists) {
        toast.error("User already exists");
        return;
      }

      const newUsers = [...usersData, { Uname, Upassword }];
      setUsersData(newUsers);
      toast.success("Sign Up Successful");
    }

    setFormData({
      Uname: '',
      Upassword: ''
    });
  };

  const HandleShowPassword = (event) => {
    setshowpass(!showpass);
    event.preventDefault();
  };

  return (
    <>
      <div className="App h-svh flex items-center justify-center bg-[#06142e]">
        <div // Login Container
          className="p-[30px] bg-[#0c1831] rounded-lg shadow-neon-blue w-[350px] m-2 md:h-auto h-[300px] md:w-[600px] overflow-hidden relative">
          <motion.h1  // Heading
            key={isLogin ? 'logins' : 'signup'}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="font-bold absolute left-[10%] md:top-[10px] top-0 text-[30px] text-white font-serif mb-6 mt-6"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.h1>

          <motion.form  // Input Form
          key={isLogin?"Login":"Sign up"}
          initial={{opacity:0 ,x:-20}}
          animate={{opacity:1 ,x:0}}
          transition={{duration:0.5}}
          className="md:mt-3" 
          onSubmit={handleSubmit}>
            <div className="flex flex-col md:py-12 pt-6">
              <div className="flex items-center border-b border-[#00c3ff] w-[50%]">
                <input
                  type="text"
                  placeholder="Username"
                  name="Uname"
                  value={formData.Uname}
                  onChange={handleInputChange}
                  className="flex-1 my-2 py-2 bg-transparent placeholder-white text-white focus:border-cyan-400 focus:outline-none"
                />
                <FontAwesomeIcon icon={faUser} className="text-[#00c3ff] ml-2" />
              </div>

              <div className="flex items-center border-b border-[#00c3ff] w-[50%]">
                <input
                  type={showpass ? 'text' : 'password'}
                  placeholder="Password"
                  name="Upassword"
                  value={formData.Upassword}
                  onChange={handleInputChange}
                  className="flex-1 my-2 py-2 bg-transparent placeholder-white text-white focus:border-cyan-400 focus:outline-none"
                />
                <button onClick={HandleShowPassword}>
                  <FontAwesomeIcon icon={faLock} className="text-[#00c3ff] ml-2" />
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-700 to-[#00c3ff] w-[50%] rounded-[20px] mt-5 p-2 text-white font-semibold"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            key={isLogin ? 'login-panel' : 'signup-panel'}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute h-full w-[40%] top-0 right-0 bg-gradient-to-r from-blue-700 to-[#00c3ff] flex justify-center items-center"
          >
            <h1 className="font-serif text-[24px] font-bold text-white">
              {isLogin ? 'Login Panel' : 'SignUp Panel'}
            </h1>
          </motion.div>

          <div className="flex md:pl-5 text-white md:mt-4 mt-8">
            <p className="pr-2 md:text-[16px] text-[12px]">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              type="button"
              className="text-[#00c3ff] md:text-[16px] text-[12px]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
