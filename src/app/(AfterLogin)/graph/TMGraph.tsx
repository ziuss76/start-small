'use client';

import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TMGraph({ weightAndDate }: { weightAndDate: any[] }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const res = document.cookie.split('; ').filter((item) => {
      return item.includes('mode');
    });

    if (res.length > 0) {
      if (res[0].includes('dark')) {
        setIsDarkMode(true);
      }
    }
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2, // 너비 높이 = 1.2: 1
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 15,
          },
          color: 'rgba(6, 182, 212, 0.9)',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? 'rgb(203 213 225)' : 'rgb(30 41 59)', // slate-300, slate-800
        },
        ticks: {
          font: {
            size: 15,
          },
          color: 'rgba(6, 182, 212, 0.9)',
        },
      },
      y: {
        grid: {
          color: isDarkMode ? 'rgb(203 213 225)' : 'rgb(30 41 59)', // slate-300, slate-800
        },
        ticks: {
          font: {
            size: 15,
          },
          color: 'rgba(6, 182, 212, 0.9)',
        },
      },
    },
  };

  const labels = weightAndDate.map((item) => item.date);

  const press = {
    labels,
    datasets: [
      {
        label: '프레스',
        data: weightAndDate.map((item) => item.press),
        backgroundColor: 'rgba(6, 182, 212, 0.9)',
      },
    ],
  };

  return <Bar options={options} data={press} />;
}
