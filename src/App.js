import React from 'react';
import AttendanceButtons from './AttendanceButtons';
import AttendanceList from './AttendanceList';
import TodayStatusCard from './TodayStatusCard';
import AttendanceSummaryDashboard from './AttendanceSummaryDashboard';
import CheckInWithInventory from './CheckInWithInventory';
import { DEFAULT_STAFF } from './constants';

const App = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1>매장 인적 자원 관리 시스템</h1>
      </header>

      <main>
        <section style={{ marginBottom: '2rem' }}>
          <TodayStatusCard />
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <AttendanceButtons staffName={DEFAULT_STAFF} />
        </section>

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />

        <section style={{ marginBottom: '2rem' }}>
          <AttendanceList initialStaff={DEFAULT_STAFF} />
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <AttendanceSummaryDashboard />
        </section>

        <section>
          <CheckInWithInventory />
        </section>
      </main>

      <footer style={{
        marginTop: '3rem',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 매장 인적 자원 관리 시스템. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;