import React, { useEffect, useState } from 'react';
import { Box, H1 } from '@adminjs/design-system';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const CustomDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  const labels = data.map((user) => user.username);

  const postCounts = data.map((user) => user.posts.length);

  const postsChartData = {
    labels,
    datasets: [
      {
        label: 'Number of Posts',
        data: postCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const avgComments = data.map((user) => {
    const postCount = user.posts.length;
    const commentCount = user.comments.length;
    return postCount > 0 ? commentCount / postCount : 0;
  });

  const commentsChartData = {
    labels,
    datasets: [
      {
        label: 'Avg. Comments per Post',
        data: avgComments,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box>
      <H1>Custom Dashboard</H1>

      <Box mt="20px">
        <H1>Posts Distribution by User</H1>
        <Bar data={postsChartData} options={options} />
      </Box>

      <Box mt="20px">
        <H1>Average Comments per Post by User</H1>
        <Line data={commentsChartData} options={options} />
      </Box>
    </Box>
  );
};

export default CustomDashboard;
