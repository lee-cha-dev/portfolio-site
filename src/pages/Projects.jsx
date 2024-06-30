import React, {useEffect, useState} from 'react';
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
    Divider, IconButton
} from '@chakra-ui/react';
import {ChevronLeftIcon, ExternalLinkIcon, ChevronUpIcon} from '@chakra-ui/icons';
import ollamaImage from "../images/ollama.png";
import tscImage from "../images/tsc.png";
import portfolioImage from "../images/portfolio.png";
import reformatitImage from "../images/reformatit.png";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Projects = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const bgGradient = "linear(to-br, #0a192f, #4A0E4E)";
    const textColor = "whiteAlpha.900";
    const navigate = useNavigate();

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

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                                <ListItem>Allows techs to perform tasks without server privileges</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technologies Used:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Python</ListItem>
                                <ListItem>customtkinter (for GUI)</ListItem>
                                <ListItem>PyInstaller (for executable packaging)</ListItem>
                                <ListItem>Inno Setup (for installer creation)</ListItem>
                                <ListItem>VBA (for automated index updates in Outlook)</ListItem>
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

                    {/* Ollama starts here */}
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
                                <ListItem>Requires Ollama installation and a downloaded model</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technologies Used:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Python</ListItem>
                                <ListItem>customtkinter (for GUI)</ListItem>
                                <ListItem>requests (for API communication)</ListItem>
                                <ListItem>threading (for asynchronous operations)</ListItem>
                                <ListItem>JSON (for data parsing)</ListItem>
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

                    {/* ReformatIT Project */}
                    <VStack spacing={8} align="center" maxW="3xl">
                        <Heading
                            as="h2"
                            fontSize="2xl"
                            color="#64FFDA"
                            textAlign="center"
                        >
                            ReformatIT
                        </Heading>
                        <Text fontSize="lg" textAlign="center">
                            A full-stack web application for image format conversion, featuring a React and Chakra UI frontend with a Python and FastAPI backend.
                        </Text>
                        <Image
                            src={reformatitImage}
                            alt="ReformatIT Application Screenshot"
                            borderRadius="md"
                            maxWidth="100%"
                            height="auto"
                        />
                        <Text fontSize="lg" textAlign="center">
                            ReformatIT allows users to upload images and convert them to various formats, providing a seamless and user-friendly interface for image processing tasks.
                        </Text>
                        <VStack align="start" spacing={4} width="100%">
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Key Features:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>User-friendly image upload interface</ListItem>
                                <ListItem>Support for multiple image format conversions</ListItem>
                                <ListItem>Dark mode design for comfortable use</ListItem>
                                <ListItem>Responsive layout for various device sizes</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Technologies Used:
                            </Heading>
                            <UnorderedList spacing={2} pl={4}>
                                <ListItem>Frontend: React, Chakra UI</ListItem>
                                <ListItem>Backend: Python, FastAPI</ListItem>
                                <ListItem>Image Processing: Pillow (Python Imaging Library)</ListItem>
                            </UnorderedList>
                            <Heading as="h3" fontSize="xl" color="#B794F4" alignSelf="left">
                                Supported Formats:
                            </Heading>
                            <Text>
                                BMP, GIF, HEIF, ICO, IM, JPEG, JPG, PCX, PNG, PPM, SGI, SPIDER, TIFF, WebP
                            </Text>
                        </VStack>
                    </VStack>
                    <Link href="https://www.reformatit.com" target="_blank" isExternal color="#64FFDA">
                        <Button
                            colorScheme="blue"
                            size="lg"
                            px={8}
                            {...blueGlowStyles}
                        >
                            ReformatIT<ExternalLinkIcon mx="2px" />
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
            {showScrollButton && (
                <IconButton
                    aria-label="Scroll to top"
                    icon={<ChevronUpIcon />}
                    size="lg"
                    position="fixed"
                    bottom="4"
                    right="4"
                    zIndex="tooltip"
                    onClick={scrollToTop}
                    {...blueGlowStyles}
                />
            )}
        </Box>
    );
};

export default Projects;