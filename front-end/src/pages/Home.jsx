import React from "react";
import axios from "axios";

// HomeScreen.jsx
const fetchProfile = async () => {
  try{
  const res = await axios.post("http://localhost:3000/api/users/profile",{}, {
    withCredentials: true
  });
  console.log(res);
}catch(err){
  console.log(err,"fetchprifile")
}
};


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Home Page</h1>
      <p className="text-gray-700">Welcome to the Home screen!</p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <img src="https://via.placeholder.com/150" alt="Example" className="rounded-lg shadow" />
        <img src="https://via.placeholder.com/150" alt="Example" className="rounded-lg shadow" />
        <img src="https://via.placeholder.com/150" alt="Example" className="rounded-lg shadow" />
      </div>
      <button onClick={fetchProfile}>Console</button>
    </div>
  );
};

export default Home;
