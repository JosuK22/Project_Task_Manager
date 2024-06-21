import PropTypes from 'prop-types';
import { Text, Badge } from '../../components/ui';
import styles from './styles/PublicCard.module.css';

export default function Card({ task }) {
  const dones = task.checklists.filter((list) => list.checked);

  return (
    <div className={styles.container}>
      <Text
        style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
        step={1}
        color="#767575"
        weight="500"
      >
        <span className={styles[task.priority]}>•</span>{' '}
        {task.priority.toUpperCase()} PRIORITY
      </Text>

      <Text step={5} weight="500">
        {task.title}
      </Text>

      <div className={styles.checklists}>
        <Text weight="500">
          Checklists ({dones.length + '/' + task.checklists.length})
        </Text>
        <div className={styles.lists}>
          {task.checklists.map((list) => (
            <div key={list.id} className={styles.list}>
              <input type="checkbox" name="" id="" checked={list.checked} />
              <Text>{list.title}</Text>
            </div>
          ))}
        </div>
      </div>

      {task.dueDate && (
        <div className={styles.dueDate}>
          <Text weight="500">Due Date</Text>
          <Badge variant="error">
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Badge>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  task: PropTypes.object,
};
