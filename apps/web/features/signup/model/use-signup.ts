import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signupSchema, type SignupValues } from './schema';
import { signUp } from '@/server/auth/auth.service';
import { useRouter } from 'next/navigation';

export function useSignupForm() {
	const router = useRouter();

	const form = useForm<SignupValues>({
		resolver: zodResolver(signupSchema),
		mode: 'onBlur',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: SignupValues) => {
		try {
			await signUp(values);
			router.push('/');
		} catch (err) {
			toast.error('Error', { description: (err as Error).message });
		}
	};

	return { form, onSubmit };
}
