'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const LoginBtn = () => {
	return (
		<SignInButton mode='modal'>
			<Button variant='outline' size='sm'>
				Hyr
			</Button>
		</SignInButton>
	);
};

export default LoginBtn;
