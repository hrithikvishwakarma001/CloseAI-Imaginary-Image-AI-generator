import React from "react";
import { Card, } from "../components";
import {
	Center,
	Container,
	Flex,
	FormLabel,
	Grid,
	Heading,
	Input,
	Spinner,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post,index) => {
			return <Card key={post._id} {...post} index={index}/>;
		});
	}
	return (
		<Text
			mt='5'
			fontSize='xl'
			fontWeight='bold'
			color='purple.400'
			textAlign='center'
			uppercase='true'>
			{title}
		</Text>
	);
};
const Home = () => {
	const [loading, setLoading] = React.useState(false);
	const [allPosts, setAllPosts] = React.useState([]);
	const [search, setSearch] = React.useState("");
	const [searchResults, setSearchResults] = React.useState([]);
	const [searchTimeout, setSearchTimeout] = React.useState(null);
	React.useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_API}/api/v1/posts`
				);
				const data = await response.json();
				const reversedData = data.data.reverse();
				setAllPosts(reversedData);
			} catch (error) {
				alert(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value);
		clearTimeout(searchTimeout);
		setSearch(e.target.value);
		setSearchTimeout(
			setTimeout(() => {
				setLoading(true);
				const filteredPosts = allPosts.filter((post) => {
					return (
						post.prompt
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						post.name.toLowerCase().includes(search.toLowerCase())
					);
				});
				setSearchResults(filteredPosts);
				setLoading(false);
			}, 500)
		);
	};

	return (
		<Container maxW='8xl' mx='auto'>
			<Heading mt='2rem' fontSize='32px' >
				The Community Showcase
			</Heading>
			<Text
				color='#666e75'
				fontSize={"sm"}
				mw='500px'
				mt='2'>
				Browse through a collection of imagination and visually stunning
				images generated by CloseAI.
			</Text>
			<Stack mt='16'>
				<Flex gap={2} mb={4}>
					<FormLabel
						w={{ base: "100%", md: "70%", lg: "50%" }}
						htmlFor='search'
						display='block'
						fontSize='sm'
						fontWeight='medium'
						mb='1'>
						Search posts
						<Input
							bg={useColorModeValue("gray.200", "black")}
							_placeholder={{ color: "gray.500" }}
							type='text'
							name='search'
							placeholder='Search for a prompt or name'
							value={search}
							onChange={handleSearch}
							required
							mt='2'
							_focus={{
								borderColor: "none",
							}}
							_focusVisible={{
								borderColor: "none",
							}}
							border='none'
							rounded='5px'
							px='2'
							py='1'
							fontSize='sm'
							fontWeight='medium'
						/>
					</FormLabel>
				</Flex>
			</Stack>
			<Stack mt='10'>
				{loading ? (
					<Center>
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='black.500'
							size='md'
						/>
					</Center>
				) : (
					<>
						{search && (
							<Text
								as='h2'
								fontSize='xl'
								mb='3'
								>
								Showing result for &nbsp;
								<Text
									as='span'
									fontWeight={600}>
									{search}
								</Text>
							</Text>
						)}
						<Grid
							templateColumns={{
								base: "repeat(1, 1fr)",
								md: "repeat(2, 1fr)",
								lg: "repeat(4, 1fr)",
							}}
							gap={10}
							mt='5'>
							{search ? (
								<RenderCards
									data={searchResults}
									title='NO SEARCH RESULTS FOUND'
								/>
							) : (
								<RenderCards
									data={allPosts}
									title='NO POSTS FOUND'
								/>
							)}
						</Grid>
					</>
				)}
			</Stack>
		</Container>
	);
};

export default Home;
