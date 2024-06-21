import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { Text } from '../../../components/ui';
import { AuthContext } from '../../../store/AuthProvider';
import { TasksContext } from '../../../store/TaskProvider';
import getFormattedDate from '../../../utils/getFormatedDate';
import TasksContainer from './TasksContainer';
import styles from './styles/index.module.css';

const options = [
  { id: 1, name: 'Today', value: 1 },
  { id: 2, name: 'This week', value: 7 },
  { id: 3, name: 'This month', value: 30 },
];

export default function Board() {
  const { user } = useContext(AuthContext);
  const { selectedDateRange, setSelectedDateRange } = useContext(TasksContext);
  const dateString = getFormattedDate(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <Text step={5} weight="500">
          Welcome! {user.info.name}
        </Text>
        <Text style={{ opacity: '0.4' }} weight="500">
          {dateString}
        </Text>
      </div>

      <div className={styles.groupTwo}>
        <Text step={6} weight="500">
          Board
        </Text>

        <Listbox
          as="div"
          className={styles.listbox}
          value={selectedDateRange}
          onChange={setSelectedDateRange}
        >
          {({ open }) => (
            <>
              <Listbox.Button className={styles.listboxButton}>
                {selectedDateRange.name}
                <ChevronDown size={16} className={open ? styles.rotate : ''} />
              </Listbox.Button>

              <Listbox.Options className={styles.listboxOptions}>
                {options.map((option) => (
                  <Listbox.Option key={option.id} value={option}>
                    {({ active, selected }) => (
                      <div
                        className={`${active && styles.active} ${
                          styles.listboxOption
                        } ${selected && styles.selected}`}
                      >
                        {option.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      </div>

      <TasksContainer />
    </div>
  );
}
