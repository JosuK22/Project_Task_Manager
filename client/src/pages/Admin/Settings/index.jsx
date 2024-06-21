import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import FormInput from '../../../components/form/FormInput';
import { Button, Text } from '../../../components/ui';
import { useContext, useEffect, useState } from 'react';
import { Eye, User } from 'lucide-react';
import { AuthContext } from '../../../store/AuthProvider';
import styles from './styles/index.module.css';

const schema = yup
  .object({
    name: yup.string(),
    newPassword: yup.string(),
    oldPassword: yup.string(),
  })
  .required();

const defaultValues = { name: '', oldPassword: '', newPassword: '' };

export default function Settings() {
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const { user, updateInfo } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/users', {
        // const res = await fetch("http://localhost:3003/" + '/users', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      });

      if (!res.ok) {
        const errJson = await res.json();
        console.log(errJson);
        const { errors } = errJson;

        for (const property in errors) {
          setError(property, { type: 'custom', message: errors[property] });
        }

        throw new Error(errJson.message);
      }

      toast.success('Successfully updated info!');
      setIsSafeToReset(true);
      await updateInfo();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  //https://stackoverflow.com/questions/62741410/react-hook-form-empty-input-field-after-each-submit
  useEffect(() => {
    if (!isSafeToReset) return;

    reset(defaultValues); // asynchronously reset your form values
  }, [reset, isSafeToReset]);

  return (
    <div className={styles.container}>
      <Text step={5} weight="500">
        Settings
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          error={errors.name}
          label="name"
          register={register}
          placeholder={'Name'}
          mainIcon={<User />}
        />
        <FormInput
          error={errors.name}
          label="oldPassword"
          register={register}
          placeholder={'Old Password'}
          secondaryIcon={<Eye />}
          mainIcon={<User />}
          type="password"
        />
        <FormInput
          error={errors.name}
          label="newPassword"
          register={register}
          placeholder={'New Password'}
          mainIcon={<User />}
          secondaryIcon={<Eye />}
          type="password"
        />

        <Button>{isSubmitting ? 'Updating...' : 'Update'}</Button>
      </form>
    </div>
  );
}
