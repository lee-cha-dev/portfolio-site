import React from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
    const bgGradient = "linear(to-br, #0a192f, #4A0E4E)";
    const textColor = "whiteAlpha.900";

    const glowStyles = {
        transition: "all 0.3s ease-in-out",
        bgGradient: "linear(to-r, #3182CE, #2B6CB0)",
        boxShadow: "0 0 15px #3182CE",
        color: "white",
        _hover: {
            boxShadow: "0 0 20px #3182CE, 0 0 30px #3182CE",
            transform: "translateY(-2px)",
            bgGradient: "linear(to-r, #2B6CB0, #2C5282)"
        }
    };

    return (
        <Box
            bgGradient={bgGradient}
            minHeight="100vh"
            color={textColor}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <VStack spacing={8} textAlign="center">
                <Heading
                    as="h1"
                    fontSize={["4xl", "5xl", "6xl"]}
                    bgGradient="linear(to-r, #64FFDA, #4299E1)"
                    bgClip="text"
                    fontWeight="extrabold"
                >
                    404
                </Heading>
                <Heading as="h2" fontSize={["2xl", "3xl", "4xl"]} color="whiteAlpha.800">
                    Page Not Found
                </Heading>
                <Text fontSize="xl" maxW="md">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </Text>
                <RouterLink to="/">
                    <Button
                        size="lg"
                        px={8}
                        {...glowStyles}
                    >
                        Return to Home
                    </Button>
                </RouterLink>
            </VStack>
        </Box>
    );
};

export default NotFound;