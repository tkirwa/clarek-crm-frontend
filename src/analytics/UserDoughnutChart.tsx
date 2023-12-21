import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { API_BASE_URL } from "../utils/config";
import { useAuth } from "../auth/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
}

const UserDoughnutChart: React.FC = () => {
  const { token } = useAuth();

  const [userData, setUserData] = useState<User[]>([]);
  const [userCount, setUserCount] = useState<{ [key: string]: number }>({
    normal: 0,
    admin: 0,
  });

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await axios.get<User[]>(
          `${API_BASE_URL}/api/users`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Calculate user count when userData changes
    const count: { [key: string]: number } = {
      user: 0,
      admin: 0,
    };

    userData.forEach((user) => {
      count[user.role === "admin" ? "admin" : "user"]++;
    });

    setUserCount(count);
  }, [userData]);

  // Prepare data for the Doughnut chart
  const data = {
    labels: Object.keys(userCount),
    datasets: [
      {
        data: Object.values(userCount),
        backgroundColor: ["#3498DB", "#E74C3C"], // Blue for normal users, Red for admins
      },
    ],
  };

  return (
    <div className="text-center mt-8">
      <h4 className="text-lg font-semibold mb-4">Total Users</h4>
      <Doughnut data={data} />
    </div>
  );
};

export default UserDoughnutChart;
