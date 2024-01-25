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
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { signOut, useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { CompanyLogo } from "@/components/icons";
import LogOutPage, { LogOutButton } from "@/app/logout/logout";
import React from "react";
import { Listbox, ListboxItem, ListboxSection, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import ListboxWrapper from "./ListboxWrapper";

export const Navbar = () => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const { data: session, status } = useSession();

	return (
		<>
			<NextUINavbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="xl" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand as="li" className="gap-3 max-w-fit">
						<NextLink className="flex justify-start items-center gap-1" href="/">
							<CompanyLogo />
							<p className="font-bold text-inherit">{siteConfig.companyName}</p>
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
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu>
					<ListboxWrapper>
						<Listbox>
							<ListboxSection title="General" showDivider>
								{siteConfig.navMenuItems.map((item, index) => (
									<ListboxItem key={`${item}-${index}`}>
										<Link
											color={"foreground"}
											href={item.href}
											size="lg"
											onClick={() => { setIsMenuOpen(false); }}
										>
											{item.label}
										</Link>
									</ListboxItem>
								))}
							</ListboxSection>

							<ListboxSection title="Admin Actions" showDivider hidden={session?.user.role !== 'admin'}>
								{siteConfig.navAdminItems.map((item, index) => (
									<ListboxItem key={`${item}-${index}`}>
										<Link
											color={"foreground"}
											href={item.href}
											size="lg"
											onClick={() => { setIsMenuOpen(false); }}
										>
											{item.label}
										</Link>
									</ListboxItem>
								))}
							</ListboxSection>

							<ListboxSection title="Operator Actions" showDivider hidden={session?.user.role !== 'operator'}>
								{siteConfig.navOperatorItems.map((item, index) => (
									<ListboxItem key={`${item}-${index}`}>
										<Link
											color={"foreground"}
											href={item.href}
											size="lg"
											onClick={() => { setIsMenuOpen(false); }}
										>
											{item.label}
										</Link>
									</ListboxItem>
								))}
							</ListboxSection>

							<ListboxSection title="Moderator Actions" showDivider hidden={session?.user.role !== 'moderator'}>
								{siteConfig.navOperatorItems.map((item, index) => (
									<ListboxItem key={`${item}-${index}`}>
										<Link
											color={"foreground"}
											href={item.href}
											size="lg"
											onClick={() => { setIsMenuOpen(false); }}
										>
											{item.label}
										</Link>
									</ListboxItem>
								))}
							</ListboxSection>

							<ListboxSection title="User Actions">

								{session ? (
									siteConfig.navMenuUserItems.map((item, index) => (
										<ListboxItem key={`${item}-${index}`}>
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
												onClick={() => { setIsMenuOpen(false); if (item.label === 'Log Out') { onOpen(); } }}
											>
												{item.label}
											</Link>
										</ListboxItem>
									))
								) : (
									siteConfig.navMenuAuthItems.map((item, index) => (
										<ListboxItem key={`${item}-${index}`}>
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
												onClick={() => { setIsMenuOpen(false); }}
											>
												{item.label}
											</Link>
										</ListboxItem>
									))
								)}
								{/* {session ? (
							<NavbarItem className="hidden md:flex">
								<LogOutButton />
							</NavbarItem>
						) : null} */}
							</ListboxSection>
						</Listbox>
					</ListboxWrapper>
				</NavbarMenu>
			</NextUINavbar>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Log Out</ModalHeader>
							<ModalBody>
								Do you really want to log out?
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									No
								</Button>
								<Button color="primary" onPress={() => { signOut() }}>
									Yes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
