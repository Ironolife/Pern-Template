import { login } from '#web/api/routes/auth';
import { useToggle } from '#web/hooks/useToggle';
import { useAuthStore } from '#web/stores/auth.store';
import { setAuthCookie } from '#web/utils/authCookie';
import { onFormError } from '#web/utils/onFormError';
import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { loginFormSchema, LoginFormValues } from '@pern-template/shared';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const LoginForm: VFC = () => {
  const defaultValues: LoginFormValues = {
    usernameOrEmail: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  });

  const loginMutation = useMutation(login);
  const { setAuth } = useAuthStore(({ setAuth }) => ({ setAuth }));
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = (formValues) => {
    loginMutation.mutate(formValues, {
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
          name='usernameOrEmail'
          control={control}
          render={({ field }) => (
            <TextField
              label='Username or Email'
              error={!!errors.usernameOrEmail}
              helperText={errors.usernameOrEmail?.message}
              required
              autoComplete='username'
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
              autoComplete='current-password'
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
        loading={loginMutation.isLoading}
        variant='contained'
        color='primary'
        size='large'
        sx={{ height: '56px' }}
      >
        Login
      </LoadingButton>
    </Stack>
  );
};

export default LoginForm;
