import React from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  increment
} from 'firebase/firestore';

const CheckInWithInventory = ({ staffName = '이관' }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleCheckIn = async () => {
    try {
      // 1. 출근 기록 저장
      const attendanceRef = await addDoc(collection(db, 'attendance'), {
        staffName,
        date: today,
        checkIn: serverTimestamp(),
        status: '정상',
      });

      // 2. 재고 차감 (예: 유니폼 1개 사용)
      const inventoryRef = doc(db, 'inventory', 'uniform');
      await updateDoc(inventoryRef, {
        quantity: increment(-1),
      });

      // 3. 사용 로그 기록
      await addDoc(collection(db, 'usageLogs'), {
        staffName,
        item: '유니폼',
        quantityUsed: 1,
        usedAt: serverTimestamp(),
        relatedTo: attendanceRef.id,
      });

      alert('출근 + 재고 차감 완료!');
    } catch (error) {
      console.error('출근 오류:', error);
      alert('출근 중 오류 발생!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>🕘 재고 연동 출근</h2>
      <button
        onClick={handleCheckIn}
        style={{ padding: '1rem 2rem', fontSize: '1.2rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
      >
        출근하기 + 재고 차감
      </button>
    </div>
  );
};

export default CheckInWithInventory;
