import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import LoginBtn from './LoginBtn';

const AuthBtn = () => {
	return (
		<>
			<SignedOut>
				<LoginBtn />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</>
	);
};

export default AuthBtn;
