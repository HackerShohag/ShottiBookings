export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Shotti Bookings - Your one-stop solution for Bus, Train, and Hotel reservations.",
	description: "Shotti Bookings is ticket booking service platform which offers Bus and Train ticket servicing along with Hotel bookings",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Bus",
			href: "/bus",
		},
		{
			label: "Hotel",
			href: "/hotel",
		},
		{
			label: "Train",
			href: "/train",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Bus",
			href: "/bus",
		},
		{
			label: "Hotel",
			href: "/hotel",
		},
		{
			label: "Train",
			href: "/train",
		},
	],
	navMenuUserItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Log Out",
			href: "",
		},
	],
	navMenuAuthItems: [
		{
			label: "Register",
			href: "/register",
		},
		{
			label: "Log In",
			href: "/login",
		},
	],
	links: {
		profile: "/profile",
		login: "/login",
		register: "/register",
	},
	backendServer: {
		address: "https://ticket-booking-system-pi.vercel.app/api",
	},
	companyName: "Shotti Bookings",
};
