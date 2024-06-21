import PropTypes from 'prop-types';
import { Text } from '../ui';

import styles from './styles/FormInput.module.css';
import { useState } from 'react';

const checkType = (type) => {
  if (type === 'password') {
    return false;
  }

  return true;
};

export default function FormInput({
  register,
  error,
  label,
  placeholder,
  mainIcon,
  secondaryIcon,
  type = 'text',
}) {
  const [isVisible, setIsVisible] = useState(() => checkType(type));

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.icon}>{mainIcon}</div>
        <input
          {...register(label)}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
        />
        <div
          onClick={togglePassword}
          style={{ cursor: 'pointer' }}
          className={styles.icon}
        >
          {secondaryIcon}
        </div>
      </div>
      <Text color="red">{error?.message}</Text>
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  mainIcon: PropTypes.element,
  secondaryIcon: PropTypes.element,
  register: PropTypes.any,
};
