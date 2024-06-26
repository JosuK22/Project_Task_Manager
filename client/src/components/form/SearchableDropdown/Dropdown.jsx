import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../store/AuthProvider';
import './styles.css';

export default function Dropdown({ onChange }) {
  const { user } = useContext(AuthContext);
  const { token } = user;
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/assignees`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch assignees');
        }
        const { data } = await response.json();
        const emailArray = data.map((item) => item.email);

        const formattedOptions = emailArray.map((email) => ({
          value: email,
          label: email,
          customLabel: email.substring(0, 2), 
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching assignees:', error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [token]);

  const handleOnChange = (selectedOption) => {
    setSelectedOption(selectedOption); // Update selected option state
    onChange(selectedOption); // Propagate change to parent component
  };

  const getOptionLabel = (option) => (
    <div className="boardLists">
      <div className='intialsContainer'>
        <span className="initials">{option.customLabel}</span>
      </div>
      <div className='emailContainer'>
        <span className="members">{option.label}</span>
      </div>
      <button className="assignButton">Assign</button>
    </div>
  );

  return (
    <Select
      options={options}
      value={selectedOption} // Set selected option
      onChange={handleOnChange} // Handle change event
      placeholder="Select an email..."
      isSearchable
      isClearable
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 'none',
        }),
      }}
      isLoading={isLoading}
      getOptionLabel={getOptionLabel}
      className='react-select-container'
      classNamePrefix="react-select"
    />
  );
}
