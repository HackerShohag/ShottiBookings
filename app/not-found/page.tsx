import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {

	const router = useRouter();

	setInterval(() => {
		router.push('/');
		router.refresh();
	}, 3000);

	return (
		<div>
			<h1 className={title()}>Page Not Found</h1>
			<p>Redirecting to home page...</p>
		</div>
	);
}
