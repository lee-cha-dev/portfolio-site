import React, { useEffect } from 'react';
import { Box, VStack, Heading, Text, Button, SimpleGrid, Container, Badge, Stack, Link, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { ExternalLinkIcon, DownloadIcon } from '@chakra-ui/icons';
const Portfolio = () => {
    const skillList = [
        'JavaScript', 'React', 'HTML/CSS', 'Java', 'JavaFX', 'Python', 'Chakra UI',
        'SQL', 'MariaDB', 'GitBash'
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const bgGradient = "linear(to-br, #0a192f, #4A0E4E)";
    const textColor = "whiteAlpha.900";

    const glowStyles = {
        transition: "all 0.3s ease-in-out",
        _hover: {
            boxShadow: "0 0 20px #4299E1, 0 0 30px #4299E1",
            transform: "translateY(-2px)",
        }
    };

    const blueGlowStyles = {
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

    const purpleGlowStyles = {
        transition: "all 0.3s ease-in-out",
        bgGradient: "linear(to-r, #6B46C1, #553C9A)",
        boxShadow: "0 0 15px #6B46C1",
        color: "white",
        _hover: {
            boxShadow: "0 0 20px #6B46C1, 0 0 30px #6B46C1",
            transform: "translateY(-2px)",
            bgGradient: "linear(to-r, #553C9A, #44337A)"
        }
    };

    useEffect(() => {
        if (location.pathname === '/') {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const handleViewProjects = () => {
        navigate('/projects');
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    const handleDownloadResume = async () => {
        const fileName = 'Lee_Charles_Resume.pdf';
        const fileUrl = ''; // Ensure this path is correct

        try {
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            console.log('Content-Type:', contentType); // Log the content type

            // Proceed with download even if content-type is not PDF
            const blob = await response.blob();
            console.log('Blob type:', blob.type); // Log the blob type

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({
                title: "Resume download initiated",
                description: "If the download doesn't start automatically, please check your downloads folder or try the manual download link.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Download failed:', error);
            toast({
                title: "Download failed",
                description: (
                    <VStack align="start">
                        <Text>{`Error: ${error.message}`}</Text>
                        <Text>Please try the manual download link below or contact me for a copy.</Text>
                        <Link href={fileUrl} download={fileName} color="blue.500" isExternal>
                            Manual Download Link
                        </Link>
                    </VStack>
                ),
                status: "error",
                duration: 10000,
                isClosable: true,
            });
        }
    };

    return (
        <Box bgGradient={bgGradient} minHeight="100vh" color={textColor} paddingLeft={4} paddingRight={4} paddingTop={5}>
            <Container maxW="container.xl" py={20}>
                <VStack spacing={20} align="center" textAlign="center">
                    <Box>
                        <Heading
                            as="h1"
                            fontSize={["4xl", "5xl", "6xl"]}
                            mb={4}
                            bgGradient="linear(to-r, #64FFDA, #4299E1)"
                            bgClip="text"
                            fontWeight="extrabold"
                        >
                            Lee Charles
                        </Heading>
                        <Text fontSize="2xl" fontWeight="bold" color="whiteAlpha.800">
                            Software Developer & Data Analyst
                        </Text>
                    </Box>

                    <Text fontSize="xl" maxW="3xl" color="whiteAlpha.800">
                        Graduate student pursuing a Master's in Data Analytics, with a strong foundation in Information
                        Technology and Software Development, holding a Bachelor's degree in Information Technology with
                        a minor in Software Development.
                    </Text>

                    <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={6}
                        justify="center"
                        width="100%"
                    >
                        <RouterLink to="/projects">
                            <Button
                                colorScheme="blue"
                                size="lg"
                                px={8}
                                // boxShadow="0 0 15px #4299E1"
                                {...blueGlowStyles}
                                width={{ base: "full", md: "auto" }}
                                onClick={handleViewProjects}
                            >
                                View Projects
                            </Button>
                        </RouterLink>
                        <Button
                            colorScheme="purple"
                            size="lg"
                            px={8}
                            {...purpleGlowStyles}
                            width={{ base: "full", md: "auto" }}
                            leftIcon={<DownloadIcon />}
                            onClick={handleDownloadResume}
                        >
                            Download Resume
                        </Button>
                    </Stack>

                    <Box w="100%">
                        <Heading
                            as="h2"
                            fontSize="3xl"
                            mb={12}
                            bgGradient="linear(to-r, #64FFDA, #4299E1)"
                            bgClip="text"
                        >
                            Skills
                        </Heading>
                        <SimpleGrid columns={[2, 3, 4, 5]} spacing={6}>
                            {skillList.map((skill) => (
                                <Badge
                                    key={skill}
                                    fontSize="md"
                                    fontWeight="bold"
                                    p={3}
                                    borderRadius="md"
                                    bg="whiteAlpha.200"
                                    color="whiteAlpha.900"
                                    {...glowStyles}
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box w="100%">
                        <Heading
                            as="h2"
                            fontSize="3xl"
                            mb={12}
                            bgGradient="linear(to-r, #64FFDA, #4299E1)"
                            bgClip="text"
                        >
                            Social Media
                        </Heading>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={6}
                            justify="center"
                            width="100%"
                        >
                            <Link href="https://www.linkedin.com/in/lee-charles-98324910b/"
                                  target="_blank" isExternal color="#64FFDA"
                            >
                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    px={8}
                                    boxShadow="0 0 15px #4299E1"
                                    {...blueGlowStyles}
                                    width={{ base: "full", md: "auto" }}
                                    paddingRight={6}
                                >
                                    LinkedIn <ExternalLinkIcon mx={2} />
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default Portfolio;