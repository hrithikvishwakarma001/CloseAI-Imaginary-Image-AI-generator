import React, { useState } from "react";
import {
	Box,
	Button,
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	FormHelperText,
	InputRightElement,
	useColorModeValue,
	Container,
	Center,
	Text,
	Link,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiBearFace } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
const Signup = () => {
	const toast = useToast();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const inintialState = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};
	const [state, setState] = useState(inintialState);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const navigate = useNavigate();
	const fetchData = async (user) => {
		const response = await fetch("http://localhost:8080/api/test/genotp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (response.status === 409) {
			toast({
				title: "Error.",
				description: "Email already exists.",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
			return;
		}
		toast({
			title: "OTP sent to your email.",
			description: "We've created your account for you.",
			status: "success",
			duration: 4000,
			isClosable: true,
		});
		setState(inintialState);
		const data = await response.json();
		localStorage.setItem("token", data);
		navigate("/login");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			state.firstName === "" ||
			state.lastName === "" ||
			state.email === "" ||
			state.password === ""
		) {
			toast({
				title: "Error.",
				description: "Please fill all the fields.",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		} else {
			const user = {
				name: state.firstName + " " + state.lastName,
				email: state.email,
				password: state.password,
			};
			// console.log(user);
			fetchData(user);
		}
	};
	const handleAuthentication = () => {
		fetch("http://localhost:8080/auth/google")
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};
	return (
		<div>
			<Container>
				<Box
					borderWidth='1px'
					rounded='lg'
					shadow='1px 1px 3px rgba(0,0,0,0.3)'
					maxWidth={400}
					bg={useColorModeValue("white", "black")}
					p={6}
					m='50px auto'
					as='form'>
					<Heading
						w='100%'
						textAlign={"center"}
						fontWeight='normal'
						m={"5%"}
						size='lg'
						fontFamily={"franklin gothic medium"}
						display='flex'
						justifyContent='center'
						alignItems={"center"}>
						<Text
							mr={10}
							onClick={() => navigate("/")}
							cursor='pointer'
							fontSize='2xl'
							fontFamily={"franklin"}
							justifyContent='center'
							alignItems={"center"}
							gap={2}
							display='flex'
							fontWeight='bolder'>
							<GiBearFace size='2rem' />
							CloseAi
						</Text>
					</Heading>
					<Flex>
						<FormControl mr='5%'>
							<FormLabel
								htmlFor='first-name'
								fontWeight={"normal"}>
								First name
							</FormLabel>
							<Input
								id='first-name'
								name='firstName'
								placeholder='First name'
								_placeholder={{ color: "gray.500" }}
								onChange={handleChange}
								required	
							/>
						</FormControl>

						<FormControl>
							<FormLabel
								htmlFor='last-name'
								fontWeight={"normal"}>
								Last name
							</FormLabel>
							<Input
								id='last-name'
								name='lastName'
								_placeholder={{ color: "gray.500" }}
								placeholder='Last name'
								onChange={handleChange}
								required
							/>
						</FormControl>
					</Flex>
					<FormControl mt='5%'>
						<FormLabel htmlFor='email' fontWeight={"normal"}>
							Email address
						</FormLabel>
						<Input
							id='email'
							type='email'
							name='email'
							_placeholder={{ color: "gray.500" }}
							placeholder='Enter email'
							onChange={handleChange}
							required
						/>
						<FormHelperText>
							We'll never share your email.
						</FormHelperText>
					</FormControl>

					<FormControl>
						<FormLabel
							htmlFor='password'
							fontWeight={"normal"}
							mt='5%'>
							Password
						</FormLabel>
						<InputGroup size='md'>
							<Input
								pr='4.5rem'
								type={show ? "text" : "password"}
								placeholder='Enter password'
								_placeholder={{ color: "gray.500" }}
								name='password'
								onChange={handleChange}
								required
							/>
							<InputRightElement width='4.5rem'>
								<Button
									h='1.75rem'
									size='sm'
									onClick={handleClick}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Flex
							justifyContent='space-between'
							alignItems='center'
							flexDirection='column'
							w='100%'>
							{/* <NavLink to='/' w="100%"> */}
							<Button
								w='full'
								variant='solid'
								mt='2rem'
								onClick={handleSubmit}>
								Submit
							</Button>
							{/* </NavLink> */}
							<Link
								mt='1rem'
								as='a'
								href='http://localhost:8080/auth/google'
								// target='_blank'
								rel='noopener noreferrer'
								underline='none'
								w='100%'>
								<Button
									w={"full"}
									maxW={"md"}
									variant={"outline"}
									leftIcon={<FcGoogle />}
									onClick={handleAuthentication}>
									<Center>
										<Text>Sign in with Google</Text>
									</Center>
								</Button>
							</Link>
						</Flex>
					</FormControl>
				</Box>
			</Container>
		</div>
	);
};

export default Signup;
