import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const TodayStatusCard = () => {
  const [status, setStatus] = useState('loading');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const checkToday = async () => {
      const q = query(
        collection(db, 'attendance'),
        where('staffName', '==', '이관'),
        where('date', '==', today)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setStatus('not_checked_in');
      } else {
        const data = snapshot.docs[0].data();
        if (!data.checkOut) {
          setStatus('checked_in_only');
        } else {
          setStatus('checked_out');
        }
      }
    };

    checkToday();
  }, [today]);

  const statusText = {
    loading: '🔄 상태 확인 중...',
    not_checked_in: '🕘 아직 출근하지 않았어요!',
    checked_in_only: '✅ 출근 완료! 아직 퇴근하지 않았어요.',
    checked_out: '🏁 오늘 출결 완료!',
  };

  const bgColor = {
    loading: '#f0f0f0',
    not_checked_in: '#fff3cd',
    checked_in_only: '#cce5ff',
    checked_out: '#d4edda',
  };

  return (
    <div
      style={{
        backgroundColor: bgColor[status],
        padding: '1rem 2rem',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '2rem auto',
        border: '1px solid #ccc',
        fontSize: '1.1rem',
        textAlign: 'center',
      }}
    >
      <strong>{statusText[status]}</strong>
    </div>
  );
};

export default TodayStatusCard;