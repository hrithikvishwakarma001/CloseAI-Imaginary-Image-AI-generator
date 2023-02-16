import React, { ReactNode, useContext } from "react";
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Button,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
	FiSun,
	FiSearch,
	FiMoon,
	FiImage,
} from "react-icons/fi";
import { GiBearFace } from "react-icons/gi";
import { useColorMode } from "@chakra-ui/color-mode";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
export default function SidebarWithHeader({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH='100vh' bg={useColorModeValue("gray.100", "#111111")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const nevigate = useNavigate();
	return (
		<Box
			bg={useColorModeValue("white", "#000000")}
			w={{ base: "full", md: 60 }}
			pos='fixed'
			h='full'
			{...rest}>
			<Flex
				h='20'
				alignItems='center'
				mx='8'
				justifyContent='space-between'>
				<Text
					onClick={() => nevigate("/")}
					cursor='pointer'
					fontSize='2xl'
					fontFamily={"franklin"}
					justifyContent='center'
					alignItems={"center"}
					gap={2}
					display='flex'
					fontWeight='bolder'>
					<GiBearFace size='2rem' />
					CloseAI
				</Text>
				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</Flex>

			<NavLink to='/'>
				<Flex
					p='2'
					mt='5'
					mx='8'
					py='2'
					rounded={"md"}
					alignItems='center'
					_hover={{
						bg: useColorModeValue("gray.200", "#111111"),
					}}>
					<Icon
						as={FiHome}
						fontSize='20'
						mr='5'
						color={useColorModeValue("gray.700", "gray.200")}
					/>
					<Text
						fontWeight={600}
						color={useColorModeValue("gray.600", "gray.200")}>
						Home
					</Text>
				</Flex>
			</NavLink>
			<NavLink to='/create-post'>
				<Flex
					p={2}
					mt='1'
					mx='8'
					rounded={"md"}
					alignItems='center'
					_hover={{
						bg: useColorModeValue("gray.200", "#111111"),
					}}>
					<Icon
						as={FiImage}
						fontSize='20'
						mr='5'
						color={useColorModeValue("gray.700", "gray.200")}
					/>
					<Text
						fontWeight={600}
						color={useColorModeValue("gray.600", "gray.200")}>
						Generate image
					</Text>
				</Flex>
			</NavLink>
		</Box>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const { isAuth } = useContext(AuthContext);
	const nevigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue("gray.100", "#111111")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>
			<Text
				onClick={() => nevigate("/")}
				cursor='pointer'
				fontSize='xl'
				fontFamily={"franklin"}
				justifyContent='center'
				alignItems={"center"}
				gap={2}
				display={{ base: "flex", md: "none" }}
				fontWeight='bolder'>
				<GiBearFace size='1.7rem' />
				CloseAI
			</Text>
			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size='lg'
					variant='ghost'
					_hover={{ bg: "transparent" }}
					aria-label='open menu'
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
				/>
				{isAuth ? (
					<Flex alignItems={"center"}>
						<Menu>
							<MenuButton
								py={2}
								transition='all 0.3s'
								_focus={{ boxShadow: "none" }}>
								<HStack>
									<Avatar
										size={"sm"}
										src='https://avatars.githubusercontent.com/u/55044774?v=4'
									/>
									<VStack
										display={{ base: "none", md: "flex" }}
										alignItems='flex-start'
										spacing='1px'
										ml='2'>
										<Text fontSize='sm'>
											Hrithik Vishwakarma
										</Text>
										<Text fontSize='xs' color='gray.600'>
											Admin
										</Text>
									</VStack>
									<Box display={{ base: "none", md: "flex" }}>
										<FiChevronDown />
									</Box>
								</HStack>
							</MenuButton>
							<MenuList
								bg={useColorModeValue("white", "gray.900")}
								borderColor={useColorModeValue(
									"gray.200",
									"gray.700"
								)}
								>
								<MenuItem>Profile</MenuItem>
								<MenuItem>Settings</MenuItem>
								<MenuDivider />
								<MenuItem>Sign out</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				) : (
					<>
						<NavLink to='/signup'>
							<Button
								display={{ base: "none", md: "flex" }}
								fontSize={"sm"}
								fontWeight={400}
								variant='solid'
								bg={useColorModeValue("gray.500", "black")}
								color={useColorModeValue("white", "white")}
								_hover={{
									bg: useColorModeValue(
										"gray.600",
										"gray.900"
									),
								}}
								ml={2}>
								Signup
							</Button>
						</NavLink>
						<NavLink to='/login_v1'>
							<Button
								display={{ base: "none", md: "flex" }}
								fontSize={"sm"}
								fontWeight={400}
								variant='solid'
								bg={useColorModeValue("gray.500", "black")}
								color={useColorModeValue("white", "white")}
								_hover={{
									bg: useColorModeValue(
										"gray.600",
										"gray.900"
									),
								}}
								ml={-2}
								mr={4}>
								Login
							</Button>
						</NavLink>
					</>
				)}
			</HStack>
		</Flex>
	);
};
