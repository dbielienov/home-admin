import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signinSchema, type SigninValues } from './schema';
import { signIn } from '@/server/auth/auth.service';

export function useSigninForm() {
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SigninValues) => {
    try {
      await signIn(values);
    } catch (err) {
      toast.error('Error', { description: (err as Error).message });
    }
  };

  return { form, onSubmit };
}
