"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";


export default function ProfileIdPage() {
  const { id } = useParams(); // 🧠 Get [id] from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ LOGOUT function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  // ✅ Get user details using id from params
  const getUserDetailsById = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to load user", error);
      toast.error("Error loading user");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Load user when component mounts or id changes
  useEffect(() => {
    if (id) getUserDetailsById();
  }, [id]);

  // ⌛ Loading state
  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-10 ">User Profile</h1>

      {user ? (
        <div className="bg-gray-400 shadow p-6 rounded text-black mb-10">
          <p className="text-lg m-2"><strong>ID:</strong> {user._id}</p>
          <p className="text-lg m-2"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg m-2"><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}

      <button
        onClick={logout}
        className="cursor-pointer  hover:bg-white hover:border-black hover:text-black border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2 mt-10"
      >
        Logout
      </button>

      <Link className="text-blue-500 hover:underline mt-5" href="/">Go to home page</Link>
    </div>
  );
}
