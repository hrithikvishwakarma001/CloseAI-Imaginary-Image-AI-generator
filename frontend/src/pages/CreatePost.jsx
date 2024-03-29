import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { FormField } from "../components";
import { preview } from "../assets";
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	FormControl,
	Heading,
	Image,
	Spinner,
	Text,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContextProvider";

const CreatePost = () => {
	const toast = useToast();
	const { name } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);
	const [generatingImg, setGeneratingImg] = React.useState(false);
	const [form, setForm] = React.useState({
		name,
		prompt: "",
		photo: "",
	});

	const generateImage = async () => {
		if (!form.name) {
			return toast({
				title: "Please Enter Your Name",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
		if (!form.prompt) {
			return toast({
				title: "Please Enter Your Prompt",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}

		if (form.name && form.prompt) {
			try {
				console.log("generating....");
				setGeneratingImg(true);
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_API}/api/v1/closeai`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ prompt: form.prompt }),
					}
				);
				const data = await response.json();
				setForm((prev) => ({
					...prev,
					photo: `data:image/jpeg;base64,${data.photo}`,
				}));
				console.log("generating end");
			} catch (error) {
				alert(error.message);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			return toast({
				title: "Please Enter Your Prompt and Prompt",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.name && form.prompt) {
			setLoading(true);
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_API}/api/v1/posts`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(form),
					}
				);
				await response.json();
				navigate("/");
			} catch (error) {
				alert(error);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please enter your prompt");
		}
	};

	const handleSurpriseMe = () => {
		setForm((prev) => ({ ...prev, prompt: getRandomPrompt(form.prompt) }));
	};
	return (
		<>
			<Center
				p='0'
				m='0'
				w='100%'
				bg="yellow.400"
				bgGradient='linear(to-r, yellow.400, #FDCB55)'
				>
				<Text
					color='black'
					px='4'
					py='1'
					borderRadius={"10px"}
					fontWeight={["600", "600", "600", "600"]}>
					{" "}
					<strong>
						Note: Image Generation Delay and API Key Usage
						Occasionally
					</strong>
					, the image generation process may experience some delays.
					We kindly request your patience if the image takes longer
					than expected. If the image fails to generate within 30
					seconds, we recommend leaving the page and attempting again.
					Please note that the OpenAI API, which powers the image
					generation, is not entirely free to use. To ensure the
					sustainability of our service, we periodically update the
					API key.
				</Text>
			</Center>
			<Container maxW='8xl' mx='auto'>
				<Heading mt='2rem' fontSize='32px'>
					Create Your Imagination
				</Heading>
				<Text color='#666e75' fontSize={"sm"} mw='500px' mt='2'>
					Create imagination and visually stunning images through
					CloseAI and share them with the community.
				</Text>
				<FormControl mt='16' maxW={"3xl"} onSubmit={handleSubmit}>
					<VStack spacing={5} align='stretch'>
						<FormField
							label='Your Name'
							type='text'
							name='name'
							placeholder='Enter your name'
							value={form.name}
							handleChange={handleChange}
						/>
						<FormField
							label='Prompt'
							type='text'
							name='prompt'
							placeholder='A plush toy robot sitting against a yellow wall'
							value={form.prompt}
							handleChange={handleChange}
							isSurpriseMe
							handleSurpriseMe={handleSurpriseMe}
						/>
						<Box
							bg={useColorModeValue("gray.200", "#1b1b1b")}
							pos={"relative"}
							w='64'
							p='3'
							h={"64"}
							border={"2px dashed"}
							borderColor={useColorModeValue(
								"gray.400",
								"gray.700"
							)}
							borderRadius={"md"}
							overflow={"hidden"}
							fontSize={"sm"}
							rounded={"md"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}>
							{form.photo ? (
								<Image
									src={form.photo}
									alt='preview'
									objectFit='contain'
								/>
							) : (
								<Image
									src={preview}
									alt='preview'
									objectFit='contain'
								/>
							)}
							{generatingImg && (
								<Box
									pos='absolute'
									inset={0}
									zIndex={0}
									display='flex'
									alignItems='center'
									justifyContent='center'
									bg='rgba(0,0,0,0.3)'>
									<Spinner
										thickness='4px'
										speed='0.65s'
										color='black.500'
										size='md'
									/>
								</Box>
							)}
						</Box>
					</VStack>
					<Flex
						mt='5'
						spacing='10'
						direction='column'
						display='flex'
						alignItems='flex-start'>
						<Button
							mb='5'
							w={{ base: "100%", md: "auto" }}
							type='button'
							_hover={{ bg: "green.300" }}
							bg={useColorModeValue("green.200", "green.700")}
							onClick={generateImage}>
							{generatingImg ? "Generating..." : "Generate"}
						</Button>

						<Text
							color={useColorModeValue("gray.600", "gray.400")}
							fontSize={"sm"}>
							once you generate the image, you can share it with
							the community.
						</Text>
						<Button
							mt='5'
							w={{ base: "100%", md: "70%", lg: "50%" }}
							type='submit'
							_hover={{ bg: "purple.300" }}
							bg={useColorModeValue("purple.200", "purple.700")}
							onClick={handleSubmit}>
							{loading
								? "Sharing..."
								: "Share with the community"}
						</Button>
					</Flex>
				</FormControl>
			</Container>
		</>
	);
};

export default CreatePost;
