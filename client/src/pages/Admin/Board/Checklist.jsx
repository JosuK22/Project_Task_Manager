import PropTypes from 'prop-types';
import { Text } from '../../../components/ui';
import styles from './styles/Checklilst.module.css';

export default function Checklist({ list, onChange }) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name=""
        id=""
        checked={list.checked}
        onChange={(e) => onChange(list._id, e.target.checked)}
      />
      <Text>{list.title}</Text>
    </div>
  );
}

Checklist.propTypes = {
  list: PropTypes.object,
  onChange: PropTypes.func,
};
