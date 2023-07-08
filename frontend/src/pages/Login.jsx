import React from "react";
import {
	Box,
	Button,
	Heading,
	FormControl,
	FormHelperText,
	useColorModeValue,
	Container,
	Center,
	Text,
	PinInput,
	PinInputField,
	HStack,
	Code,
	VStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GiBearFace } from "react-icons/gi";
const Login = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const handleComplete = (value) => {
		let token = localStorage.getItem("token");
		console.log(token);
		let pin = {
			_id: token,
			userotp: value,
		};
		pin = JSON.stringify(pin);
		console.log(pin);
		const fetchData = async () => {
			const response = await fetch(
				"http://localhost:8080/api/test/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: pin,
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data.msg);
				toast({
					title: "OTP Verified",
					description: "You are now logged in",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate("/");
			} else {
				toast({
					title: "OTP Verification Failed",
					description: "Please try again",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		};
		fetchData();
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
							{/* CloseAI */}
						</Text>
					</Heading>
					<FormControl>
						<Center mb='2rem'>
							<FormHelperText>
								<Code
									colorScheme='yellow'
									children='Enter the OTP sent to your email'
								/>
							</FormHelperText>
						</Center>
						<HStack justifyContent={"center"}>
							<PinInput
								onComplete={handleComplete}
								placeholder='🐱'>
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
							</PinInput>
						</HStack>
						<VStack>
							<Link
								href='https://mail.google.com/mail/u/0/#inbox'
								isExternal>
								<Button w='10rem' variant='solid' mt='2rem'>
									Open Mail
									<ExternalLinkIcon mx='2px' ml='2' />
								</Button>
							</Link>
						</VStack>
					</FormControl>
				</Box>
			</Container>
		</div>
	);
};

export default Login;
