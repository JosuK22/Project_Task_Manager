import { Database, LogOut, PanelsTopLeft, Settings } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Button, Text } from '../../components/ui';
import styles from './styles/Navigation.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import useModal from '../../hooks/useModal';
import Modal from '../../components/ui/Modal';

export default function Navigation() {
  const { logout } = useContext(AuthContext);
  const { isOpen, toggleModal } = useModal();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <img src={logo} alt="Pro manage" />
          </div>
          <Link to="/">
            <Text step={6} weight="600">
              Pro Manage
            </Text>
          </Link>
        </div>

        <nav className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <div className={styles.icon}>
              <PanelsTopLeft color="#767575" />
            </div>
            <Text weight="500">Board</Text>
          </NavLink>

          <NavLink
            to={'analytics'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <div className={styles.icon}>
              <Database color="#767575" />
            </div>
            <Text weight="500">Analytics</Text>
          </NavLink>

          <NavLink
            to={'settings'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <div className={styles.icon}>
              <Settings color="#767575" />
            </div>
            <Text weight="500">Settings</Text>
          </NavLink>
        </nav>

        <div onClick={toggleModal} className={styles.logout}>
          <div className={styles.icon}>
            <LogOut />
          </div>
          <Text>Logout</Text>
        </div>
      </div>

      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <Text step={4} weight="500" style={{ textAlign: 'center' }}>
            Are you sure want to logout?
          </Text>

          <div className={styles.logoutActions}>
            <Button onClick={logout}>Yes, Logout</Button>
            <Button variant="outline" color="error" onClick={toggleModal}>
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
