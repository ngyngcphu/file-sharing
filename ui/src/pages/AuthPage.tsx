import { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import { authService } from '@services';
import { useUserStore } from '@states';

export function AuthPage() {
  const navigate: NavigateFunction = useNavigate();
  const { getUserData } = useUserStore();
  const [isSignup, setIsSignup] = useState<boolean>(false);

  if (isSignup === false) {

    const { register, handleSubmit } = useForm<LoginPayload>();
    const submit = async (data: LoginPayload) => {
      try {
        await authService.login(data);
        await getUserData();
        navigate('/home');
      } catch (err) {
        const errorMessage = (err as ResponseError).message;
        toast.error(errorMessage);
      }
    };

    return (
      <Card color='transparent' shadow={false}>
        <Typography variant='h4' color='blue-gray'>
          Login
        </Typography>
        <Typography color='gray' className='mt-1 font-normal'>
          Enter your email and password.
        </Typography>
        <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
          <div className='mb-4 flex flex-col gap-6'>
            <Input
              id='auth-email'
              size='lg'
              label='Username'
              icon={<UserIcon />}
              {...register('username', {
                required: true,
                minLength: 5
              })}
              crossOrigin=''
            />
            <Input
              id='auth-password'
              type='password'
              size='lg'
              icon={<KeyIcon />}
              label='Password'
              {...register('password', {
                required: true,
                minLength: 8
              })}
              crossOrigin=''
            />
          </div>
          <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
            Login
          </Button>
        </form>
        <Typography color="gray" className="flex items-center justify-center gap-2 mt-4 text-center font-normal">
          Do not have an account?{" "}
          <span
            className="font-medium text-gray-900 cursor-pointer"
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </span>
        </Typography>
      </Card>
    );
  } else {

    const { register, handleSubmit } = useForm<SignupPayload>();
    const submit = async (data: SignupPayload) => {
      try {
        const response = await toast.promise(
          authService.signup(data),
          {
            pending: 'Registration request is pending',
            success: {
              render() {
                setIsSignup(false);
                return 'Sign up successfully. Please log in!'
              }
            },
            error: 'Sign up failed!'
          }
        );
        console.log(response);
      } catch (err) {
        const errorMessage = (err as ResponseError).message;
        toast.error(errorMessage);
      }
    }

    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(submit)}>
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              label='Full Name'
              icon={<UserIcon />}
              {...register('fullName', {
                required: true,
                minLength: 10
              })}
              crossOrigin=''
            />
            <Input
              size="lg"
              label='Username'
              icon={<UserIcon />}
              {...register('username', {
                required: true,
                minLength: 5
              })}
              crossOrigin=''
            />
            <Input
              type="password"
              size="lg"
              label='Password'
              icon={<KeyIcon />}
              {...register('password', {
                required: true,
                minLength: 8
              })}
              crossOrigin=''
            />
          </div>
          <Button className="mt-6" fullWidth type='submit'>
            sign up
          </Button>
          <Typography color="gray" className="flex items-center justify-center gap-2 mt-4 text-center font-normal">
            Already have an account?{" "}
            <span
              className="font-medium text-gray-900 cursor-pointer"
              onClick={() => setIsSignup(false)}
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Card>
    );
  }
}
