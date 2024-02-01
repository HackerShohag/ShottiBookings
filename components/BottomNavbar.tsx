'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BottomNavbarProps {
	className?: string;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ className }) => {
	const router = useRouter();

	const handleClick = (index: number) => {
		switch (index) {
			case 0:
				router.push('/');
				break;
			case 1:
				router.push('/contact');
				break;
			case 2:
				router.push('/bus');
				break;
			case 3:
				router.push('/profile');
				break;
			case 4:
				router.push('/login');
				break;
			default:
				break;
		}
	};

	return (
		<ul className={`flex justify-around w-full ${className}`}>
			<li className="w-full" onClick={() => handleClick(0)}>
				<div className="button bg-white items-center text-black hover:bg-red-500" style={{ cursor: 'pointer' }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Home</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(1)}>
				<div className="button bg-white text-black hover:bg-red-500" style={{ cursor: 'pointer' }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Contact</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(2)}>
				<div className="button bg-white text-black hover:bg-red-500" style={{ cursor: 'pointer' }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Ticket</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(3)}>
				<div className="button bg-white text-black hover:bg-red-500" style={{ cursor: 'pointer' }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20s-8-4.5-8-10V4h16v6c0 5.5-8 10-8 10z"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Profile</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(4)}>
				<div className="button bg-white text-black hover:bg-red-500" style={{ cursor: 'pointer' }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Login</h1>
				</div>
			</li>
		</ul>
	);
};

export default BottomNavbar;
