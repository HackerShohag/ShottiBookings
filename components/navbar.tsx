'use client';

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	CompanyLogo,
	SearchIcon,
} from "@/components/icons";
import LogOutPage, { LogOutButton } from "@/app/logout/logout";

export const Navbar = () => {

	const { data: session, status } = useSession();

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<CompanyLogo />
						<p className="font-bold text-inherit">Sotti</p>
						<p className="text-inherit">Bookings</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				{session ? (
					<>
						<NavbarItem className="hidden md:flex">
							<Button
								as={Link}
								className="text-sm font-normal text-default-600 bg-default-100"
								href={siteConfig.links.profile}
								variant="flat"
							>
								{session.user?.name ?? session.user?.email ?? "Profile"}
							</Button>
						</NavbarItem>
						<NavbarItem className="hidden md:flex">
							<LogOutPage />
						</NavbarItem>
					</>
				) : (
					<>
						<NavbarItem className="hidden md:flex">
							<Button
								as={Link}
								className="text-sm font-normal text-default-600 bg-default-100"
								href={siteConfig.links.login}
								variant="flat"
							>
								Log In
							</Button>
						</NavbarItem>
						<NavbarItem className="hidden md:flex">
							<Button
								as={Link}
								className="text-sm font-normal text-default-600 bg-default-100"
								href={siteConfig.links.register}
								variant="flat"
							>
								Register
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={"foreground"}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
					{session ? (
						siteConfig.navMenuUserItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuUserItems.length - 1
												? "danger"
												: "foreground"
									}
									href={item.href}
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))
					) : (
						siteConfig.navMenuAuthItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuAuthItems.length - 1
												? "danger"
												: "foreground"
									}
									href={item.href}
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))
					)}
					{session ? (
						<NavbarItem className="hidden md:flex">
							<LogOutButton />
						</NavbarItem>
					) : null}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
