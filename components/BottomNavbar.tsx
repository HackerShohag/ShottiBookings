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
				<div className="button text-white hover:bg-white" style={{ cursor: 'pointer', backgroundColor: "#ff1596" }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Home</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(1)}>
				<div className="button text-white hover:bg-white" style={{ cursor: 'pointer', backgroundColor: "#ff1596" }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Contact</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(2)}>
				<div className="button text-white hover:bg-white" style={{ cursor: 'pointer', backgroundColor: "#ff1596" }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
							<rect x="1" y="2" width="22" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Ticket</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(3)}>
				<div className="button text-white hover:bg-white" style={{ cursor: 'pointer', backgroundColor: "#ff1596" }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20s-8-4.5-8-10V4h16v6c0 5.5-8 10-8 10z"></path>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Profile</h1>
				</div>
			</li>
			<li className="w-full" onClick={() => handleClick(4)}>
				<div className="button text-white hover:bg-white" style={{ cursor: 'pointer', backgroundColor: "#ff1596" }}>
					<div className="flex items-center justify-center">
						<svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
							</g>
						</svg>
					</div>
					<h1 className="text-sm text-center pb-2">Login</h1>
				</div>
			</li>
		</ul>
	);
};

export default BottomNavbar;
