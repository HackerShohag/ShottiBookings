import LoginForm from "./form";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";

export const Login = async () => {

	// const router = useNavigation

	const session = await getServerSession();
	if (session) {
		// router.back();
		// router.refresh();
	}

	return (
		<LoginForm></LoginForm>
	)
}

export default function LoginPage() {

	return (
		<Login />
	)
}