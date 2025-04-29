import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Headerinventory() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [signedOut, setSignedOut] = useState(false); // 🔧 prevent flash of Sign In

  useEffect(() => {
    const handleStorageChange = () => {
      const name = localStorage.getItem("NAME");
      setUserName(name);
      setSignedOut(false); // reset flag on login
    };

    handleStorageChange();
    window.addEventListener("loginSuccess", handleStorageChange);

    return () => {
      window.removeEventListener("loginSuccess", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    setUserName(null);
    setSignedOut(true); // ✅ prevents showing Sign In
    navigate('/signin');
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src="/img/logo.png" alt="logo" style={styles.logo} />
        </Link>
      </div>

      <div style={styles.rightSection}>
        {!signedOut && userName ? (
          <>
            <span style={styles.greeting}>Hi, {userName}</span>
            <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
          </>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#41969c',
    padding: '12px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 10,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  greeting: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  signOutButton: {
    backgroundColor: 'white',
    color: '#dc3545',
    border: '2px solid #dc3545',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Headerinventory;
