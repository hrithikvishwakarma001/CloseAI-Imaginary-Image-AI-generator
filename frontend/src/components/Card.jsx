import React from "react";
import {
	Box,
	Button,
	Flex,
	GridItem,
	Image,
	Text,
} from "@chakra-ui/react";
import { download } from "../assets";
import { downLoadImage } from "../utils";
const Card = ({ _id, name, photo, prompt, index }) => {
	const randomColor = `hsl(${Math.random() * 360}, 40%, 50%)`;
	const [isHover, setIsHover] = React.useState(false);

	const colSpanInZeroIndexAndNinthIndex = index === 0 || index === 9 ? 2 : 1;
	const rowSpanInZeroIndexAndNinthIndex = index === 0 || index === 9 ? 2 : 1;
	return (
		<GridItem
			colSpan={[1,colSpanInZeroIndexAndNinthIndex]}
			rowSpan={[1,rowSpanInZeroIndexAndNinthIndex]}>
			<Box
				rounded={"xl"}
				position={"relative"}
				boxShadow={"2xl"}
				_hover={{
					boxShadow: "dark-lg",
				}}
				transition={"all .3s ease-in-out"}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}>
				<Image
					src={photo}
					alt={prompt}
					w='full'
					h='auto'
					rounded={"xl"}
					objectFit={"cover"}
				/>
				<Flex
					position={"absolute"}
					bottom={0}
					left={0}
					right={0}
					maxH={"94.5%"}
					bgGradient={"linear(to-b, transparent, gray.800)"}
					rounded={"md"}
					bg={"blackAlpha.500"}
					m={2}
					p='4'
					direction={"column"}
					display={isHover ? "block" : "none"}
					transition={"all .3s ease"}>
					<Text
						color={"white"}
						fontSize={"xs"}
						overflowY={"auto"}
						fontFamily='cursive'>
						{prompt}
					</Text>
					<Flex
						mt='2'
						gap={"2"}
						alignItems='center'
						justifyContent={"space-between"}>
						<Flex alignItems='center' gap='2'>
							<Text
								w='7'
								h='7'
								color={"white"}
								fontSize={"xs"}
								fontWeight={"bold"}
								textTransform={"uppercase"}
								objectFit={"cover"}
								bg={randomColor}
								p='2'
								rounded='full'
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}>
								{name[0]}
							</Text>
							<Text
								color={"white"}
								fontSize={"sm"}
								fontWeight={"bold"}>
								{name}
							</Text>
						</Flex>
						<Button
							onClick={() => downLoadImage(_id, photo)}
							outline='none'
							bg='transparent'
							border='none'
							_hover={{
								bg: "transparent",
								border: "none",
							}}>
							<Image
								src={download}
								w='6'
								h='6'
								alt='download'
								objectFit={"contain"}
								filter='invert(1)'
							/>
						</Button>
					</Flex>
				</Flex>
			</Box>
		</GridItem>
	);
};

export default Card;
