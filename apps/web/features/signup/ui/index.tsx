
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useSignupForm } from '../model/use-signup';

export function SignupForm() {
	const { form, onSubmit } = useSignupForm();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Enter your information below to create your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Full Name</FieldLabel>
							<Input id="name" type="text" placeholder="John Doe" {...form.register('name')} />
							{form.formState.errors.name && (
								<p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
							{form.formState.errors.email && (
								<p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
							)}
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input id="password" type="password" {...form.register('password')} />
							{form.formState.errors.password && (
								<p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
							)}
							<FieldDescription>Must be at least 8 characters long.</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
							<Input id="confirm-password" type="password" {...form.register('confirmPassword')} />
							{form.formState.errors.confirmPassword && (
								<p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
							)}
							<FieldDescription>Please confirm your password.</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type="submit">Create Account</Button>
								<Button variant="outline" type="button">
									Sign up with Google
								</Button>
								<FieldDescription className="px-6 text-center">
									Already have an account? <Link href="/signin">Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
