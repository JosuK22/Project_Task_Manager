import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Text } from '../../../components/ui';
import { SECONDARY_COLOR } from '../../../constants';
import { TasksContext } from '../../../store/TaskProvider';
import Checklist from './Checklist';
import styles from './styles/Checklists.module.css';
import toast from 'react-hot-toast';

export default function CheckLists({ task, isOpen, toggleDisclosure }) {
  const lists = task.checklists;
  const dones = lists.filter((list) => list.checked);
  const { minorTaskUpdate } = useContext(TasksContext);

  const handleList = async (listId, value) => {
    const index = lists.findIndex((l) => l._id === listId);

    if (index < 0) return;

    const copiedLists = JSON.parse(JSON.stringify(lists));
    copiedLists[index].checked = value;
    
    try {
      await minorTaskUpdate(task, { checklists: copiedLists });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Text weight="500">
          Checklits ({dones.length + '/' + lists.length})
        </Text>

        <button className={styles.button} onClick={toggleDisclosure}>
          <ChevronDown
            className={isOpen && styles.rotate}
            color={SECONDARY_COLOR}
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.lists}>
          {lists.map((list) => (
            <Checklist key={list._id} list={list} onChange={handleList} />
          ))}
        </div>
      )}
    </div>
  );
}

CheckLists.propTypes = {
  task: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  toggleDisclosure: PropTypes.func.isRequired,
};
