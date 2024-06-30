import React, {useEffect} from 'react';
import {Box, VStack, Heading, Text, Button, SimpleGrid, Container, Badge, Stack, Link} from '@chakra-ui/react';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {ExternalLinkIcon} from '@chakra-ui/icons';

const Portfolio = () => {
    const skillList = [
        'JavaScript', 'React', 'HTML/CSS', 'Java', 'JavaFX', 'Python', 'Chakra UI',
        'SQL', 'MariaDB', 'GitBash'
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const bgGradient = "linear(to-br, #0a192f, #4A0E4E)";
    const textColor = "whiteAlpha.900";

    const glowStyles = {
        transition: "all 0.3s ease-in-out",
        _hover: {
            boxShadow: "0 0 20px #4299E1, 0 0 30px #4299E1",
            transform: "translateY(-2px)",
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
                                boxShadow="0 0 15px #4299E1"
                                {...glowStyles}
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
                            boxShadow="0 0 15px #4299E1"
                            {...glowStyles}
                            width={{ base: "full", md: "auto" }}
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
                                    {...glowStyles}
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