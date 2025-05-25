export const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginTop: '1rem',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  }
};

export const tableStyles = {
  th: {
    padding: '8px',
    border: '1px solid #ccc',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  td: {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  container: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
  },
  select: {
    padding: '0.4rem',
    marginRight: '1rem',
  },
  dateInput: {
    padding: '0.3rem',
  },
  clearButton: {
    marginLeft: '1rem',
    padding: '0.4rem 1rem',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ddd',
    }
  }
}; 