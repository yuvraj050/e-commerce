import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let url = '';
      let requestData = {};

      // Ensure backendUrl doesn't have a trailing slash
      const formattedBackendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;

      if (currentState === 'Sign Up') {
        // Registration Endpoint
        url = `${formattedBackendUrl}/api/user/register`;  // Ensure only one slash
        requestData = { name, email, password };
      } else {
        // Login Endpoint
        url = `${formattedBackendUrl}/api/user/login`;  // Ensure only one slash
        requestData = { email, password };
      }

      console.log('Making request to:', url); // Log URL for debugging

      const response = await axios.post(url, requestData);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currentState} successful!`);
        navigate('/'); // Redirect after successful login or registration
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during submission:', error);

      // If the error is an AxiosError, check the response
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The server responded with a status code outside of the 2xx range
          console.error('Response error:', error.response.data);
          toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          toast.error('No response received from the server.');
        } else {
          // Something went wrong while setting up the request
          console.error('Request setup error:', error.message);
          toast.error(`Request setup error: ${error.message}`);
        }
      } else {
        // If it's not an AxiosError
        toast.error('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect if already logged in
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? '' : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
