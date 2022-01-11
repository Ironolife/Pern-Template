import { registerFormSchema, RegisterFormValues } from '@pern-template/shared';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { VFC } from 'react';
import { register } from '#web/api/routes/auth';
import { useAuthStore } from '#web/stores/auth.store';
import { setAuthCookie } from '#web/utils/authCookie';
import { onFormError } from '#web/utils/onFormError';
import { useToggle } from '#web/hooks/useToggle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const RegisterForm: VFC = () => {
  const defaultValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues,
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });

  const registerMutation = useMutation(register);
  const setAuth = useAuthStore(({ setAuth }) => setAuth);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormValues> = (formValues) => {
    registerMutation.mutate(formValues, {
      onSuccess: (res) => {
        // Store JWTs in zustand store
        setAuth(res);

        // Store JWTs in cookie
        setAuthCookie(res);

        // Redirect to homepage
        router.replace('/');
      },
      onError: onFormError(setError),
    });
  };

  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={8}>
      <Stack spacing={4}>
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <TextField
              label='Username'
              error={!!errors.username}
              helperText={errors.username?.message}
              required
              autoComplete='username'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              label='Email'
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              type='email'
              autoComplete='email'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              label='Password'
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />
      </Stack>
      <LoadingButton
        type='submit'
        loading={registerMutation.isLoading}
        variant='contained'
        color='primary'
        size='large'
        sx={{ height: '56px' }}
      >
        Register
      </LoadingButton>
    </Stack>
  );
};

export default RegisterForm;
