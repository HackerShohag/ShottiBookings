export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Sotti Bookings - Bus, Train or Hotel bookings in one",
	description: "Sotti Bookings is ticket booking service platform which offers Bus and Train ticket servicing along with Hotel bookings",
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
		address: "http://localhost:5000/api",
	},
};
