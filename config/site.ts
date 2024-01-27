export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Shotti Bookings - Your one-stop solution for Bus, Train, and Hotel reservations.",
	description: "Shotti Bookings is ticket booking service platform which offers Bus and Train ticket servicing along with Hotel bookings",
	navItems: [
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
		},
		{
			label: "Terms",
			href: "/terms",
		},
		{
			label: "FAQs",
			href: "/faqs",
		}
	],
	navAdminItems: [
		{
			label: "Admins",
			href: "/admin/dashboard/admins",
		},
		{
			label: "Operators",
			href: "/admin/dashboard/operators",
		},
		{
			label: "Bus Operators",
			href: "/admin/dashboard/bus-operators",
		},
		{
			label: "Customers",
			href: "/admin/dashboard/customers",
		},
		{
			label: "Buses",
			href: "/admin/dashboard/buses",
		},
		{
			label: "Bus Schedules",
			href: "/admin/dashboard/schedules",
		},
		{
			label: "Drivers",
			href: "/admin/dashboard/drivers",
		}
	],
	navOperatorItems: [
		{
			label: "Bus",
			href: "/operator/dashboard/buses",
		},
		{
			label: "Schedules",
			href: "/operator/dashboard/schedules",
		}
	],
	navModeratorItems: [
		{
			label: "Bus",
			href: "/moderator/dashboard/buses",
		},
		{
			label: "Routes",
			href: "/moderator/dashboard/routes",
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
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Terms",
			href: "/terms",
		},
		{
			label: "FAQs",
			href: "/faqs",
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
		address: "https://booking-system-phi.vercel.app/api",
	},
	companyName: "Shotti Bookings",
};
