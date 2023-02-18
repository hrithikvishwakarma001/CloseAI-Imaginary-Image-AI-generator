import { Button, Center, Flex, FormControl, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const FormField = ({
	label,
	name,
	type,
	prompt,
	placeholder,
	value,
	handleChange,
	handleSurpriseMe,
	isSurpriseMe,
}) => {
	return (
		<>
			<Flex gap={2} mb={4}>
				<FormLabel
					w={{ base: "100%", md: "70%", lg: "50%" }}
					htmlFor={name}
					display='block'
					fontSize='sm'
					fontFamily={"cursive"}
					fontWeight='medium'
					mb='1'>
					{label}
					{isSurpriseMe && (
						<Button
							type='button'
							onClick={handleSurpriseMe}
							fontSize='sm'
							fontWeight='semi-bold'
							px='2'
							py='1'
							rounded='5px'
							h='22px'
							ml='5px'
							_dark={{
								bg: "gray.800",
							}}
							>
							Surprise me
						</Button>
					)}
					<Input
						bg={useColorModeValue("gray.200", "black")}
						_placeholder={{ color: "gray.500" }}
						type={type}
						name={name}
						placeholder={placeholder}
						defaultValue={value}
						onChange={handleChange}
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
		</>
	);
};
export default FormField;
