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
import Project from "../components/Project";

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

            <Box position="absolute" top="4" left="4" zIndex="10">
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
                    {/* TSC: Public Folder Index here */}
                    <Project
                        keyFeatures={[
                            "Instantaneous queries (less than 1-2 seconds)",
                            "User-friendly interface built with customtkinter",
                            "Enhanced productivity for IT personnel",
                            "Automated index updates",
                            "Decreases traffic to the Exchange Server",
                            "Allows techs to perform tasks without server privileges"
                        ]}
                        techUsed={[
                            "Python",
                            "customtkinter (for GUI)",
                            "PyInstaller (for executable packaging)",
                            "Inno Setup (for installer creation)",
                            "VBA (for automated index updates in Outlook)"
                        ]}
                        projectName="TSC: Public Folder Index"
                        projectImage={tscImage}
                        projectDescriptionTop="
                            A custom-built GUI application designed to streamline the process of
                            querying over 7,800 paths within public folders and 65,000 contact entries in the Exchange server.
                        "
                        projectDescriptionBottom="
                            This innovative solution transforms a traditionally time-consuming task into an
                            instantaneous operation, completing queries in less than 1 second.
                        "
                        projectLink="https://github.com/lee-cha-dev/PublicFoldersIndex"
                        projectLinkName="GitHub"
                        buttonStyle={blueGlowStyles}
                    />
                    <Divider my={10} borderColor="whiteAlpha.300" />

                    {/* Ollama starts here */}
                    <Project
                        keyFeatures={[
                            "Integrates with Ollama's local LLM setup",
                            "Runs on http://localhost:11434 for LLM hosting",
                            "Uses http://localhost:11434/api/generate for response generation",
                            "Customizable model selection (default: llama2:13b)",
                            "Requires Ollama installation and a downloaded model"
                        ]}
                        techUsed={[
                            "Python",
                            "customtkinter (for GUI)",
                            "requests (for API communication)",
                            "threading (for asynchronous operations)",
                            "JSON (for data parsing)"
                        ]}
                        projectName="Ollama Chat App"
                        projectImage={ollamaImage}
                        projectDescriptionTop="
                            A chat interface for Ollama LLMs that can be installed and run locally.
                        "
                        projectDescriptionBottom="
                            This application provides a user-friendly interface for interacting with locally installed Ollama language models.
                            It was developed in a Windows 10 environment using conda.
                        "
                        projectLink="https://github.com/lee-cha-dev/ollama_chat_app"
                        projectLinkName="GitHub"
                        buttonStyle={blueGlowStyles}
                        additionalLink={{
                            url: "https://ollama.com/blog/windows-preview",
                            text: "Learn more about Ollama Windows Preview"
                        }}
                    />
                    <Divider my={10} borderColor="whiteAlpha.300" />

                    {/* ReformatIT Project */}
                    <Project
                        keyFeatures={[
                            "User-friendly image upload interface",
                            "Support for multiple image format conversions",
                            "Dark mode design for comfortable use",
                            "Responsive layout for various device sizes"
                        ]}
                        techUsed={[
                            "Frontend: React, Chakra UI",
                            "Backend: Python, FastAPI",
                            "Image Processing: Pillow (Python Imaging Library)"
                        ]}
                        projectName="ReformatIT"
                        projectImage={reformatitImage}
                        projectDescriptionTop="
                            A full-stack web application for image format conversion, featuring a React and Chakra UI frontend
                            with a Python and FastAPI backend.
                        "
                        projectDescriptionBottom="
                            ReformatIT allows users to upload images and convert them to various formats, providing a seamless
                            and user-friendly interface for image processing tasks.
                        "
                        projectLink="https://www.reformatit.com"
                        projectLinkName="Front End Github"
                        buttonStyle={blueGlowStyles}
                        supportedFormats={[
                            "BMP", "GIF", "HEIF", "ICO", "IM", "JPEG", "JPG", "PCX",
                            "PNG", "PPM", "SGI", "SPIDER", "TIFF", "WebP"
                        ]}
                        additionalLink={{
                            url: "https://github.com/lee-cha-dev/reformatit-backend",
                            text: "Back End Github"
                        }}
                    />
                    <Divider my={10} borderColor="whiteAlpha.300" />

                    {/* Portfolio Site Project */}
                    <Project
                        keyFeatures={[
                            "Responsive design for all devices",
                            "Dark mode theme for modern aesthetics",
                            "Project showcase with detailed descriptions",
                            "Skills section highlighting technical expertise",
                            "Smooth navigation and scrolling effects"
                        ]}
                        techUsed={[
                            "React.js for building the UI",
                            "Chakra UI for styling and components",
                            "React Router for navigation",
                            "GitHub Pages for hosting"
                        ]}
                        projectName="Personal Portfolio Website"
                        projectImage={portfolioImage}
                        projectDescriptionTop="
                            A modern, responsive portfolio website showcasing my projects and skills as a Software Developer and Data Analyst.
                        "
                        projectDescriptionBottom="
                            This website serves as a central hub for my professional online presence, featuring a sleek dark mode design
                            and smooth user experience.
                        "
                        projectLink="https://github.com/lee-cha-dev/portfolio-site"
                        projectLinkName="GitHub"
                        buttonStyle={blueGlowStyles}
                    />
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