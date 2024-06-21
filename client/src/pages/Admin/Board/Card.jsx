import { Menu } from '@headlessui/react';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Button, Modal, Text } from '../../../components/ui';
import Badge from '../../../components/ui/Badge';
import useModal from '../../../hooks/useModal';
import { TasksContext } from '../../../store/TaskProvider';
import CheckLists from './Checklists';
import TaskForm from './TaskForm';
import styles from './styles/Card.module.css';
import copyLink from '../../../utils/copyLink';
import toast from 'react-hot-toast';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function Card({ task, isOpen, toggleDisclosure }) {
  const { minorTaskUpdate, deleteTask } = useContext(TasksContext);
  const { isOpen: deleteIsOpen, toggleModal: toggleDeleteModal } = useModal();
  const { isOpen: editIsOpen, toggleModal: toggleEditModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleTaskDelete = (taskId) => {
    setIsLoading(true);
    try {
      deleteTask(taskId);
      toggleDeleteModal();
      toast.success('Deleted task successfully');
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  const handleMinorUpdates = (updates) => {
    try {
      minorTaskUpdate(task, updates);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <Text
            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            step={1}
            color="#767575"
            weight="500"
          >
            <span className={styles[task.priority]}>•</span>{' '}
            {task.priority.toUpperCase()} PRIORITY
          </Text>

          <div className={styles.menu}>
            <Menu>
              <Menu.Button className={styles.menuButton}>
                <MoreHorizontal />
              </Menu.Button>

              <div className={styles.menuItems}>
                <Menu.Items>
                  <Menu.Item className={styles.menuItem}>
                    {({ active }) => (
                      <div
                        className={active && styles.active}
                        onClick={toggleEditModal}
                      >
                        Edit
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => copyLink(task._id)}
                    className={styles.menuItem}
                  >
                    {({ active }) => (
                      <div className={active && styles.active}>Share</div>
                    )}
                  </Menu.Item>

                  <Menu.Item
                    onClick={toggleDeleteModal}
                    className={styles.menuItem}
                  >
                    {({ active }) => (
                      <div
                        style={{ color: 'red' }}
                        className={`${styles.error} ${active && styles.active}`}
                      >
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </div>
            </Menu>
          </div>
        </div>

        <Text step={5} weight="500">
          {task.title}
        </Text>

        <CheckLists
          isOpen={isOpen}
          toggleDisclosure={toggleDisclosure}
          task={task}
          checklists={task.checklists}
        />

        <div className={styles.badges}>
          {task.dueDate && (
            <Badge
              variant={
                task.status == 'done'
                  ? 'success'
                  : task.isExpired
                  ? 'error'
                  : ''
              }
            >
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Badge>
          )}
          <div className={styles.categoryBadges}>
            {categories.map((category) => {
              if (category.value !== task.status) {
                return (
                  <div key={category.id} className="">
                    <Badge
                      onClick={() =>
                        handleMinorUpdates({ status: category.value })
                      }
                    >
                      {category.title}
                    </Badge>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {deleteIsOpen && (
        <Modal toggleModal={toggleDeleteModal}>
          <Text step={4} weight="500" style={{ textAlign: 'center' }}>
            Are you sure want to delete?
          </Text>

          <div className={styles.deleteActions}>
            <Button onClick={() => handleTaskDelete(task._id)}>
              {isLoading ? 'Deleting...' : 'Yes, Delete'}
            </Button>
            <Button variant="outline" color="error" onClick={toggleDeleteModal}>
              Canel
            </Button>
          </div>
        </Modal>
      )}

      {editIsOpen && (
        <Modal toggleModal={toggleEditModal}>
          <TaskForm
            defaultTask={task}
            action="update"
            toggleModal={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDisclosure: PropTypes.func.isRequired,
};
