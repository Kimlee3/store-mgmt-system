import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AttendanceSummaryDashboard = () => {
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    late: 0,
    earlyLeave: 0,
  });

  const [chartData, setChartData] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchAttendanceSummary = async () => {
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

      setSummary({ present, absent, late, earlyLeave });
      setChartData([
        { name: '출근', value: present },
        { name: '결근', value: absent },
        { name: '지각', value: late },
        { name: '조퇴', value: earlyLeave },
      ]);
    };

    fetchAttendanceSummary();
  }, [today]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>📊 오늘의 출결 요약</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
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
  );
};

export default AttendanceSummaryDashboard;
