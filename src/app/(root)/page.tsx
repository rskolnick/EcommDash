import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<p>Hello Admin Dashboard</p>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}