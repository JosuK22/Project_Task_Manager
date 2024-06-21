import { Toaster } from 'react-hot-toast';
import Navigation from './Navigation';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './styles/index.module.css';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../store/AuthProvider';

export default function AdminLayout() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#fff',
            color: 'black',
          },
        }}
      />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <main className={styles.container}>
          <div className={styles.navigation}>
            <Navigation />
          </div>
          {user && (
            <div className={styles.outlet}>
              <Outlet />
            </div>
          )}
        </main>
      )}
    </div>
  );
}
