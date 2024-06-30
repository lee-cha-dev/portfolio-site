import React, {useEffect} from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Container,
    Image,
    Link,
    UnorderedList,
    ListItem,
    Flex,
    Divider
} from '@chakra-ui/react';
import {ChevronLeftIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import ollamaImage from "../images/ollama.png";
import tscImage from "../images/tsc.png";
import portfolioImage from "../images/portfolio.png";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Projects = () => {
    const bgGradient = "linear(to-br, #0a192f, #4A0E4E)";
    const textColor = "whiteAlpha.900";
    const navigate = useNavigate();

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
        window.scrollTo(0, 0);
    }, []);

    const handleBackToHome = () => {
        navigate('/');
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    return (
        <Box bgGradient={bgGradient} minHeight="100vh" color={textColor} paddingBottom={8} overflow="hidden">

            <Box position="absolute" top="4" left="1" zIndex="10">
                <RouterLink to="/">
                    <Button
                        leftIcon={<ChevronLeftIcon />}
                        variant="ghost"
                        color="#64FFDA"
                        _hover={{ bg: 'whiteAlpha.200' }}
                        onClick={handleBackToHome}
                    >
                        Back to Home
                    </Button>
                </RouterLink>
            </Box>
            <Container maxW="container.xl" py={20}>
                <VStack spacing={16} align="center">
                    <Flex display="flex" width="100%" alignItems="center" justifyContent="center">
                        <Heading
                            as="h1"
                            fontSize={["3xl", "4xl", "5xl"]}
                            bgGradient="linear(to-r, #64FFDA, #4299E1)"
                            bgClip="text"
                            fontWeight="extrabold"
                            textAlign="center"
                            marginBottom={6}
                            marginTop={10}
                        >
                            Projects
                        </Heading>
                    </Flex>

                    {/* TSC: Public Folder Index Project */}
                    <VStack spacing={8} align="center" maxW="3xl">
                        <Heading
                            as="h2"
                            fontSize="2xl"
                            color="#64FFDA"
                            textAlign="center"
                        >
                            TSC: Public Folder Index
                        </Heading>
                        <Text fontSize="lg" textAlign="center">
                            A custom-built GUI application designed to streamline the process of querying over 7,800 paths within public folders and 65,000 contact entries in the Exchange server.
                        </Text>
                        <Image
                            src={tscImage}
                            alt="TSC: Public Folder Index Screenshot"
                            borderRadius="md"
                            maxWidth="100%"
                            height="auto"
                        />
                        <Text fontSize="lg" textAlign="center">
                            This innovative solution transforms a traditionally time-consuming task into an instantaneous operation, completing queries in less than 1 second.
                        </Text>
                        <VStack align="start" spacing={4} width="100%">
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Key Features:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Instantaneous queries (less than 1-2 seconds)</ListItem>
                                <ListItem>User-friendly interface built with customtkinter</ListItem>
                                <ListItem>Enhanced productivity for IT personnel</ListItem>
                                <ListItem>Automated index updates</ListItem>
                                <ListItem>Decreases traffic to the Exchange Server</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technical Highlights:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Fast and efficient searches using a pre-built index</ListItem>
                                <ListItem>Standalone executable packaged with PyInstaller</ListItem>
                                <ListItem>Professional installer created with Inno Setup</ListItem>
                                <ListItem>Allows techs to perform tasks without server privileges</ListItem>
                            </UnorderedList>
                        </VStack>
                        <Link href="https://github.com/lee-cha-dev/PublicFoldersIndex"
                              target="_blank" isExternal color="#64FFDA"
                              marginTop={8}
                        >
                            <Button
                                colorScheme="blue"
                                size="lg"
                                px={8}
                                {...blueGlowStyles}
                            >
                                GitHub <ExternalLinkIcon mx="2px" />
                            </Button>
                        </Link>
                    </VStack>

                    <Divider my={10} borderColor="whiteAlpha.300" />

                    <VStack spacing={8} align="center" maxW="3xl">
                        <Heading
                            as="h2"
                            fontSize="2xl"
                            color="#64FFDA"
                            textAlign="center"
                        >
                            Ollama Chat App
                        </Heading>
                        <Text fontSize="lg" textAlign="center">
                            A chat interface for Ollama LLMs that can be installed and run locally.
                        </Text>
                        <Image
                            src={ollamaImage}
                            alt="Ollama Chat App Screenshot"
                            borderRadius="md"
                            maxWidth="100%"
                            height="auto"
                        />
                        <Text fontSize="lg" textAlign="center">
                            This application provides a user-friendly interface for interacting with locally installed Ollama language models. It was developed in a Windows 10 environment using conda.
                        </Text>
                        <VStack align="start" spacing={4} width="100%">
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Key Features:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Integrates with Ollama's local LLM setup</ListItem>
                                <ListItem>Runs on http://localhost:11434 for LLM hosting</ListItem>
                                <ListItem>Uses http://localhost:11434/api/generate for response generation</ListItem>
                                <ListItem>Customizable model selection (default: llama2:13b)</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technical Details:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Requires Ollama installation and a downloaded model</ListItem>
                                <ListItem>Custom modification to ctk_button.py from customtinker for specific click behaviors</ListItem>
                                <ListItem>Utilizes a model_path.py file for configuration</ListItem>
                            </UnorderedList>
                        </VStack>
                        <Link href="https://ollama.com/blog/windows-preview" isExternal color="#64FFDA">
                            Learn more about Ollama Windows Preview <ExternalLinkIcon mx="2px" />
                        </Link>
                    </VStack>
                    <Link href="https://github.com/lee-cha-dev/ollama_chat_app" target="_blank" isExternal color="#64FFDA">
                        <Button
                            colorScheme="blue"
                            size="lg"
                            px={8}
                            {...blueGlowStyles}
                        >
                            GitHub <ExternalLinkIcon mx="2px" />
                        </Button>
                    </Link>

                    <Divider my={10} borderColor="whiteAlpha.300" />

                    {/* Portfolio Site Project */}
                    <VStack spacing={8} align="center" maxW="3xl">
                        <Heading
                            as="h2"
                            fontSize="2xl"
                            color="#64FFDA"
                            textAlign="center"
                        >
                            Personal Portfolio Website
                        </Heading>
                        <Text fontSize="lg" textAlign="center">
                            A modern, responsive portfolio website showcasing my projects and skills as a Software Developer and Data Analyst.
                        </Text>
                        <Image
                            src={portfolioImage}
                            alt="Portfolio Website Screenshot"
                            borderRadius="md"
                            maxWidth="100%"
                            height="auto"
                        />
                        <Text fontSize="lg" textAlign="center">
                            This website serves as a central hub for my professional online presence, featuring a sleek dark mode design and smooth user experience.
                        </Text>
                        <VStack align="start" spacing={4} width="100%">
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Key Features:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Responsive design for all devices</ListItem>
                                <ListItem>Dark mode theme for modern aesthetics</ListItem>
                                <ListItem>Project showcase with detailed descriptions</ListItem>
                                <ListItem>Skills section highlighting technical expertise</ListItem>
                                <ListItem>Smooth navigation and scrolling effects</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technologies Used:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>React.js for building the UI</ListItem>
                                <ListItem>Chakra UI for styling and components</ListItem>
                                <ListItem>React Router for navigation</ListItem>
                                <ListItem>GitHub Pages for hosting</ListItem>
                            </UnorderedList>
                        </VStack>
                        <Link href="https://github.com/lee-cha-dev/portfolio-site" target="_blank" isExternal color="#64FFDA">
                            <Button
                                colorScheme="blue"
                                size="lg"
                                px={8}
                                {...blueGlowStyles}
                            >
                                GitHub <ExternalLinkIcon mx="2px" />
                            </Button>
                        </Link>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default Projects;