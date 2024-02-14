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
import getTrainingColor from './[training]/GetTrainingColor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TMGraph({
  weightAndDate,
  training,
}: {
  weightAndDate: { [x: string]: any }[] | undefined;
  training?: string;
}) {
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

  const scalesOptions = {
    grid: {
      color: isDarkMode ? 'rgb(203 213 225)' : 'rgb(30 41 59)',
    },
    ticks: {
      font: {
        size: 15,
      },
      color: isDarkMode ? 'rgb(241 245 249)' : 'rgb(30 41 59)',
    },
  };

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
          color: isDarkMode ? 'rgb(241 245 249)' : 'rgb(30 41 59)',
        },
      },
    },
    scales: {
      x: scalesOptions,
      y: scalesOptions,
    },
  };

  const labels = weightAndDate?.map((item) => item.date);

  const trainingMap = {
    press: '프레스',
    squat: '스쿼트',
    bench: '벤치프레스',
    deadLift: '데드리프트',
  };

  const trainingData = {
    labels,
    datasets: [
      {
        label: trainingMap[training! as keyof typeof trainingMap],
        data: weightAndDate?.map((item) => item[training!]),
        backgroundColor: getTrainingColor(training!, isDarkMode),
      },
    ],
  };

  return <Bar options={options} data={trainingData} />;
}
