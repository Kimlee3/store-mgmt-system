import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc
} from 'firebase/firestore';
import { buttonStyle } from './styles';
import { DEFAULT_STAFF } from './constants';

const AttendanceButtons = ({ staffName = DEFAULT_STAFF }) => {
  const [todayDocId, setTodayDocId] = useState(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const checkTodayAttendance = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'attendance'),
        where('staffName', '==', staffName),
        where('date', '==', today)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setTodayDocId(docData.id);
        setHasCheckedIn(true);
        setHasCheckedOut(!!docData.data().checkOut);
      }
    } catch (err) {
      setError('출근 기록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error checking attendance:', err);
    }
  }, [staffName, today]);

  useEffect(() => {
    checkTodayAttendance();
  }, [checkTodayAttendance]);

  const handleCheckIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, 'attendance'), {
        staffName,
        date: today,
        checkIn: serverTimestamp(),
      });
      setTodayDocId(docRef.id);
      setHasCheckedIn(true);
      alert('출근 완료!');
    } catch (err) {
      setError('출근 처리 중 오류가 발생했습니다.');
      console.error('Error checking in:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!todayDocId) {
        throw new Error('출근 기록이 없습니다.');
      }
      const ref = doc(db, 'attendance', todayDocId);
      await updateDoc(ref, {
        checkOut: serverTimestamp(),
      });
      setHasCheckedOut(true);
      alert('퇴근 완료!');
    } catch (err) {
      setError('퇴근 처리 중 오류가 발생했습니다.');
      console.error('Error checking out:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🕘 오늘의 출결</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      {!hasCheckedIn ? (
        <button
          onClick={handleCheckIn}
          style={buttonStyle}
          disabled={isLoading}
          aria-label="출근하기"
        >
          {isLoading ? '처리 중...' : '출근하기'}
        </button>
      ) : hasCheckedOut ? (
        <p>✅ 퇴근 완료</p>
      ) : (
        <button
          onClick={handleCheckOut}
          style={{ ...buttonStyle, backgroundColor: '#2196F3' }}
          disabled={isLoading}
          aria-label="퇴근하기"
        >
          {isLoading ? '처리 중...' : '퇴근하기'}
        </button>
      )}
    </div>
  );
};

AttendanceButtons.propTypes = {
  staffName: PropTypes.string
};

export default AttendanceButtons;