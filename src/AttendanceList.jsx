import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { STAFF_LIST, DEFAULT_STAFF, TIME_FORMAT_OPTIONS } from './constants';
import { tableStyles } from './styles';

const AttendanceList = ({ initialStaff = DEFAULT_STAFF }) => {
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(initialStaff);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async (date, staff) => {
    setIsLoading(true);
    setError(null);
    try {
      let q;
      if (date) {
        q = query(
          collection(db, 'attendance'),
          where('staffName', '==', staff),
          where('date', '==', date),
          orderBy('date', 'desc')
        );
      } else {
        q = query(
          collection(db, 'attendance'),
          where('staffName', '==', staff),
          orderBy('date', 'desc')
        );
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecords(data);
    } catch (err) {
      setError('출결 기록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching records:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords(selectedDate, selectedStaff);
  }, [selectedDate, selectedStaff, fetchRecords]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '❌';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('ko-KR', TIME_FORMAT_OPTIONS);
  };

  return (
    <div style={tableStyles.container}>
      <h2>🧑‍💼 출결 기록 (직원별 보기)</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="staff-select">
          직원 선택: {' '}
          <select
            id="staff-select"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            style={tableStyles.select}
            aria-label="직원 선택"
          >
            {STAFF_LIST.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        <label htmlFor="date-select">
          날짜 선택: {' '}
          <input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={tableStyles.dateInput}
            aria-label="날짜 선택"
          />
        </label>

        {selectedDate && (
          <button
            onClick={() => setSelectedDate('')}
            style={tableStyles.clearButton}
            aria-label="날짜 필터 초기화"
          >
            전체 보기
          </button>
        )}
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          로딩 중...
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableStyles.th}>날짜</th>
              <th style={tableStyles.th}>출근</th>
              <th style={tableStyles.th}>퇴근</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="3" style={tableStyles.td}>기록이 없습니다.</td>
              </tr>
            ) : (
              records.map((rec) => (
                <tr key={rec.id}>
                  <td style={tableStyles.td}>{rec.date}</td>
                  <td style={tableStyles.td}>{formatTime(rec.checkIn)}</td>
                  <td style={tableStyles.td}>{formatTime(rec.checkOut)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

AttendanceList.propTypes = {
  initialStaff: PropTypes.string
};

export default AttendanceList;