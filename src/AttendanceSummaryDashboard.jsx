import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AttendanceSummaryDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchAttendanceSummary = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, 'attendance'),
          where('date', '==', today)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());

        let present = 0;
        let absent = 0;
        let late = 0;
        let earlyLeave = 0;

        data.forEach((record) => {
          if (!record.checkIn) {
            absent++;
          } else {
            present++;
            if (record.status === '지각') late++;
            if (record.status === '조퇴') earlyLeave++;
          }
        });

        setChartData([
          { name: '출근', value: present },
          { name: '결근', value: absent },
          { name: '지각', value: late },
          { name: '조퇴', value: earlyLeave },
        ]);
      } catch (error) {
        console.error('Error fetching attendance summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceSummary();
  }, [today]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>📊 오늘의 출결 요약</h2>
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>📊 오늘의 출결 요약</h2>
        <p>오늘의 출결 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>📊 오늘의 출결 요약</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AttendanceSummaryDashboard;
