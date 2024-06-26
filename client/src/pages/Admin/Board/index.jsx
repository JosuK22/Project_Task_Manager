import { Listbox } from '@headlessui/react';
import { ChevronDown, UsersRound } from 'lucide-react';
import { useContext, useState } from 'react';
import { Text, Modal, Button } from '../../../components/ui';
import { AuthContext } from '../../../store/AuthProvider';
import { TasksContext } from '../../../store/TaskProvider';
import getFormattedDate from '../../../utils/getFormatedDate';
import TasksContainer from './TasksContainer';
import useModal from '../../../hooks/useModal';

import styles from './styles/index.module.css';

const options = [
  { id: 1, name: 'Today', value: 1 },
  { id: 2, name: 'This week', value: 7 },
  { id: 3, name: 'This month', value: 30 },
];

export default function Board() {
  const { user } = useContext(AuthContext);
  const { token } = user;
  const { selectedDateRange, setSelectedDateRange } = useContext(TasksContext);
  const dateString = getFormattedDate(new Date());
  const [emailInput, setEmailInput] = useState('');
  const { isOpen: AddIsOpen, toggleModal: toggleAddModal } = useModal();
  const [error, setError] = useState(null); // State to hold error message
  const [modalContent, setModalContent] = useState(null); // State to manage modal content

  const handleAddAssignee = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/assignees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });

      if (res.ok) {
        // Assignee successfully added
        const data = await res.json();
        setModalContent(
          
          <div className={styles.successModal}>
            <Text step={4} weight='600' fontFamily='Noto Sans'>{emailInput} added to board</Text>
            <Text>{data.email}</Text>
            <Button variant="jumbo" onClick={closeModal}>Close</Button>
          </div>
        );
        setEmailInput('');

      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add assignee');
      }
    } catch (error) {
      console.error('Error adding assignee:', error.message);
      setError(error.message); // Set the error message state
    }
  };

  const closeModal = () => {
    setEmailInput('');
    toggleAddModal();
    setError(null);
    setModalContent(null); // Clear modal content on cancel
  };

  const modalContentDefault = (

    <div className={styles.addModal}>
      <Text step={5} weight='600' fontFamily='Noto Sans'>Add people to the board</Text>
      <div className={styles.input}>
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter the email"
        />
      </div>
      <div className={styles.errorContainer}>
        {error && <Text className={styles.error}>{error}</Text>}
      </div>
      <div className={styles.modalButtons}>
        <Button variant="jumbo" color="error" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="jumbo" onClick={handleAddAssignee}>
          Submit
        </Button>
      </div>
    </div>

  );

  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <Text step={5} weight="500">
          Welcome! {user?.info?.name || 'Guest'}
        </Text>
        <Text style={{ opacity: '0.4' }} weight="500">
          {dateString}
        </Text>
      </div>

      <div className={styles.groupTwo}>
        <div className={styles.subgroup}>
          <Text className={styles.board} step={6} weight="500">
            Board
          </Text>

          <span className={styles.icon} onClick={toggleAddModal}>
            <UsersRound className={styles.addusers} />
            <Text className={styles.addemail}>Add people</Text>
          </span>
        </div>

        <Listbox
          as="div"
          className={styles.listbox}
          value={selectedDateRange}
          onChange={setSelectedDateRange}
        >
          {({ open }) => (
            <>
              <Listbox.Button className={styles.listboxButton}>
                {selectedDateRange?.name || 'Select a range'}
                <ChevronDown size={16} className={open ? styles.rotate : ''} />
              </Listbox.Button>

              <Listbox.Options className={styles.listboxOptions}>
                {options.map((option) => (
                  <Listbox.Option key={option.id} value={option}>
                    {({ active, selected }) => (
                      <div
                        className={`${active ? styles.active : ''} ${
                          styles.listboxOption
                        } ${selected ? styles.selected : ''}`}
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

      {AddIsOpen && (
        <Modal toggleModal={toggleAddModal}>
          {modalContent || modalContentDefault}
        </Modal>
      )}
    </div>
  );
}
