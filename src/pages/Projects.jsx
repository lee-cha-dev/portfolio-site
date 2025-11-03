import React, {useEffect, useState} from 'react';
import {
    Box,
    VStack,
    Heading,
    Button,
    Container,
    Flex,
    Divider, IconButton
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronUpIcon} from '@chakra-ui/icons';
import ollamaImage from "../images/ollama.png";
import tscImage from "../images/tsc.png";
import portfolioImage from "../images/portfolio.png";
import reformatitImage from "../images/reformatit.png";
import amiHourlyImage from "../images/AMIHourly.png";
import devTrackerImage from "../images/DevTracker.jpg";
import depositReviewImage from "../images/DepositFile.png";
import omsUploadImage from "../images/OMSUpload.png";
import trafficLightImage from "../images/TrafficLight.png";
import gridDefinitionImage from "../images/GridDefinition.png";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
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
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                        leftIcon={<ChevronLeftIcon/>}
                        variant="ghost"
                        color="#64FFDA"
                        _hover={{bg: 'whiteAlpha.200'}}
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

                    {/* FECC Corporate Projects Section */}
                    <Heading
                        as="h2"
                        fontSize={["2xl", "3xl", "4xl"]}
                        color="#B794F4"
                        textAlign="center"
                        marginBottom={8}
                        marginTop={4}
                    >
                        Professional Work @ FECC
                    </Heading>

                    {/* Analytics GridDefinition */}
                    <Project
                        keyFeatures={[
                            "Custom React data grid replacing KendoUI across entire platform",
                            "Advanced filtering with multiple operators per column",
                            "Tri-state sorting and drag-and-drop column reordering",
                            "In-line editing with change tracking and batch save/cancel",
                            "Hierarchical grouping with group-level calculations",
                            "Built-in Excel export using SheetJS",
                            "Full light/dark theme support"
                        ]}
                        techUsed={[
                            "React (Hooks: useState, useEffect, useRef)",
                            "JavaScript (ES6+)",
                            "CSS3 (Custom properties, Flexbox, Grid)",
                            "SheetJS (XLSX export)"
                        ]}
                        projectImage={gridDefinitionImage}
                        projectName="Analytics GridDefinition"
                        projectDescriptionTop=
                        "
                            A comprehensive, custom-built React data grid component serving as the foundational UI
                            for all reports across FECC's analytics platform. Architected with modular React Hooks
                            for maintainability and reusability.
                        "
                        projectDescriptionBottom="
                            This component replaced KendoUI dependencies and became the standard data presentation
                            layer for Daily Traffic Light, AMI Hourly, and OMS modules. Features responsive design,
                            conditional row coloring, and advanced pagination.
                        "
                        context="Standardize data presentation across FECC analytics to remove Kendo dependency and unify UX."
                        implementation="Custom grid with multi-operator filters, tri-state sort, drag-reorder, inline edit with batch save/cancel, grouping, export, and dark/light theming."
                        impact="Became the shared UI foundation for all dashboards; improved consistency and performance across the suite."
                        notes={[
                            "Column-level filter operators mirror analyst workflows.",
                            "Theme and density preferences persist per user."
                        ]}
                        complianceNote="Screenshots obfuscate production data. All source code and data are proprietary to FECC."
                        buttonStyle={blueGlowStyles}
                    />

                    <Divider my={10} borderColor="whiteAlpha.300"/>

                    {/* Daily Traffic Light Dashboard */}
                    <Project
                        keyFeatures={[
                            "Real-time monitoring of 80+ daily reports across departments",
                            "Interactive traffic-light status cards (Green/Red indicators)",
                            "Dynamic filtering by status and search by report name",
                            "Centralized configuration via single config file",
                            "High-performance COUNT(*) endpoints for instant status",
                            "Click-through navigation to full report data grids",
                            "Role-based security via SAML2"
                        ]}
                        techUsed={[
                            "Frontend: React, KendoReact, JavaScript",
                            "Backend: Java, Spring Boot, Spring Data JPA",
                            "Database: Oracle",
                            "Security: Spring Security with SAML2"
                        ]}
                        projectImage={trafficLightImage}
                        projectName="Daily Traffic Light Dashboard"
                        projectDescriptionTop="
                            A centralized operations monitoring dashboard providing at-a-glance status overview
                            for over 80 daily reports across MIS, Member Services, and Tax/CIS auditing departments.
                        "
                        projectDescriptionBottom="
                            The system uses lightweight backend endpoints that execute COUNT(*) queries rather than
                            fetching full datasets, ensuring sub-second response times. Server-side logic analyzes
                            multiple data points for complex reports.
                        "
                        context="Give leadership and analysts an instant, unified view of report health without loading full datasets."
                        implementation="Ultra-light COUNT(*) endpoints via Spring Boot against Oracle; React grid handles search, filter, thresholds, and drill-through."
                        impact="Replaced manual Excel checks; reduced daily verification from hours to seconds for 80+ reports."
                        notes={[
                            "Executive traffic-light summary enables rapid triage.",
                            "Configuration-driven; new checks added without redeploy."
                        ]}
                        complianceNote="Screenshots obfuscate production data. All source code and data are proprietary to FECC."
                        buttonStyle={blueGlowStyles}
                    />

                    <Divider my={10} borderColor="whiteAlpha.300"/>

                    {/* AMI Hourly Meter Data Dashboard */}
                    <Project
                        keyFeatures={[
                            "Multi-source data federation (Oracle Aclara/CIS + PostgreSQL)",
                            "Dynamic meter conversion ratio calculation and management",
                            "Interactive charts for hourly usage patterns (Recharts)",
                            "KPI grid for peak/min hours and solar detection",
                            "Data quality metrics and anomaly detection",
                            "Advanced SQL with CTEs for 24-hour aggregations",
                            "Light/dark theme with full component adaptation"
                        ]}
                        techUsed={[
                            "Frontend: React, Recharts, Lucide React, CSS3",
                            "Backend: Java, Spring Boot, Spring Data JPA",
                            "Databases: Oracle (Aclara/CIS), PostgreSQL",
                            "Security: Spring Security with SAML2"
                        ]}
                        projectImage={amiHourlyImage}
                        projectName="AMI Hourly Meter Data Dashboard"
                        projectDescriptionTop="
                            An engineering analytics interface for Aclara AMI data, providing comprehensive analysis
                            of hourly energy consumption with solar capacity enrichment and anomaly visibility.
                        "
                        projectDescriptionBottom="
                            Features backend federation across Oracle/Postgres, derived KPIs, conversion-ratio logic,
                            and 24-hour CTE aggregations. Visualizes trends with React + Recharts for rapid insights.
                        "
                        context="Deliver hourly consumption analytics with solar enrichment and anomaly visibility across AMI."
                        implementation="Federated reads across Oracle/Postgres; derived KPIs and ratio validation; React + Recharts visualization; 24-hour CTE aggregations."
                        impact="Unified tool for solar analysis and anomaly trends; enabled earlier detection of enrichment and data-quality issues."
                        notes={[
                            "MeterRatioAnalyzer validates ratios across meter types/models.",
                            "Theme and density adapt across components."
                        ]}
                        complianceNote="Screenshots obfuscate production data. All source code and data are proprietary to FECC."
                        buttonStyle={blueGlowStyles}
                    />

                    <Divider my={10} borderColor="whiteAlpha.300"/>

                    {/* OMS File Upload & Model Management */}
                    <Project
                        keyFeatures={[
                            "Asynchronous processing of large .std model files",
                            "Real-time upload status with elapsed timer",
                            "Transactional purge-before-ingestion for data integrity",
                            "Parsing into 10+ repositories (Transformers, Sources, etc.)",
                            "Role-based edit restriction by user email",
                            "Tabbed interface for categorized model components",
                            "In-grid editing with save/cancel"
                        ]}
                        techUsed={[
                            "Frontend: React, KendoReact (Dialog, TabStrip, DropDownList)",
                            "Backend: Java, Spring Boot, CompletableFuture (async)",
                            "Spring Data JPA, SLF4J logging"
                        ]}
                        projectImage={omsUploadImage}
                        projectName="OMS Model Management"
                        projectDescriptionTop="
                            A full-stack workflow for managing complex Outage Model System (OMS) data, enabling
                            engineering staff to upload, validate, and manage massive .std model files asynchronously.
                        "
                        projectDescriptionBottom="
                            Uses CompletableFuture for non-blocking background processing with detailed error reporting.
                            Handles transactional purges, comprehensive parsing across repositories, and role-gated access.
                        "
                        context="Streamline ingestion and maintenance of OMS .std models for Operations."
                        implementation="Asynchronous .std parsing with real-time status; transactional purge-before-ingest; role-gated edits; tabbed views across 10+ repositories."
                        impact="Removed manual upload bottlenecks; enabled auditable, UI-driven model management across multiple repositories."
                        notes={[
                            "CompletableFuture for non-blocking background tasks.",
                            "In-grid editing with save/cancel reduces context switching."
                        ]}
                        complianceNote="Screenshots obfuscate production data. All source code and data are proprietary to FECC."
                        buttonStyle={blueGlowStyles}
                    />

                    <Divider my={10} borderColor="whiteAlpha.300"/>

                    {/* Deposit Review File Upload */}
                    <Project
                        keyFeatures={[
                            "Multi-threaded PDF to 300 DPI TIFF conversion (Apache PDFBox)",
                            "Automated metadata extraction from PDF text",
                            "Dual processing queues (Warning IN / Deposit IN)",
                            "Network fileshare scanning and automatic cleanup",
                            "ZIP archive creation with TIFFs and metadata",
                            "Real-time progress indicators and notifications",
                            "ExecutorService with CompletableFuture for parallelism"
                        ]}
                        techUsed={[
                            "Frontend: React, KendoReact (Buttons, Layout, Notification)",
                            "Backend: Java, Spring Boot, Apache PDFBox",
                            "Multi-threading: ExecutorService, CompletableFuture"
                        ]}
                        projectImage={depositReviewImage}
                        projectName="MIS Deposit Review Automation"
                        projectDescriptionTop="
                            An automation module for processing and archiving Additional Deposit and Warning Letter PDFs,
                            converting them to imaging-compliant TIFF format with extracted metadata.
                        "
                        projectDescriptionBottom="
                            Replaced manual PDF conversion workflows with high-throughput parallel processing. Includes
                            robust error handling, file lifecycle management, and externalized Spring Boot configuration.
                        "
                        context="Automate imaging workflows for Additional Deposit and Warning Letter PDFs."
                        implementation="Parallel PDF→TIFF @300 DPI using PDFBox; metadata extraction; dual queues; ZIP packaging; robust error handling and cleanup."
                        impact="Cut manual processing time from hours to minutes; improved consistency and reliability of imaging outputs."
                        notes={[
                            "ExecutorService + CompletableFuture for throughput.",
                            "Externalized configuration via Spring Boot properties."
                        ]}
                        complianceNote="Screenshots obfuscate production data. All source code and data are proprietary to FECC."
                        buttonStyle={blueGlowStyles}
                    />

                    <Divider my={10} borderColor="whiteAlpha.300"/>

                    <Heading
                        as="h2"
                        fontSize={["2xl", "3xl", "4xl"]}
                        color="#B794F4"
                        textAlign="center"
                        marginBottom={8}
                        marginTop={4}
                    >
                        Personal Projects
                    </Heading>

                    {/* DevTracker here */}
                    <Project
                        keyFeatures={[
                            "Local-first, offline-capable desktop application built with Electron",
                            "React-based multi-view interface: Dashboard, Projects list, and Individual Project view",
                            "Full CRUD for projects, tasks, and notes (modals for add/edit/delete)",
                            "Dynamic filtering and sorting of projects and tasks by status, priority, and creation date",
                            "File attachment management with upload, download, delete, and reveal-in-folder",
                            "Aggregated project statistics (active, completed, overdue) via SQLite queries",
                            "Secure preload bridge exposing window.db and window.files APIs to frontend"
                        ]}
                        techUsed={[
                            "Frontend: React (Hooks), Lucide React, Vite",
                            "Backend: Electron (Main Process), Node.js",
                            "Database: SQLite (better-sqlite3)",
                            "Bridge: Electron contextBridge + ipcMain/ipcRenderer",
                            "Build Tool: Vite"
                        ]}
                        projectImage={devTrackerImage}
                        projectName="DevTracker"
                        projectDescriptionTop="
                            DevTracker is a local-first, offline-capable desktop project management
                            application built for developers. It provides a simple, fast, and private
                            way to manage projects, tasks, notes, and files, ensuring full data
                            ownership and offline functionality.
                        "
                        projectDescriptionBottom="
                            The application runs as a standalone Electron app with a React frontend
                            and local SQLite database. A secure preload bridge connects the frontend
                            to backend logic, allowing full CRUD operations, file management, and
                            statistical aggregation—all stored locally for maximum privacy.
                        "
                        context="Provide a developer-focused project management tool that works completely offline and ensures full data ownership."
                        implementation="Built with Electron and React; uses better-sqlite3 for local persistence, secure contextBridge APIs, and a unified state-driven React UI."
                        impact="Offers a self-contained alternative to online PM tools; allows full local management of projects, tasks, and files without third-party dependencies."
                        notes={[
                            "Dashboard aggregates project statistics in real-time from SQLite.",
                            "ProjectDashboard.jsx handles all views, modals, and local state.",
                            "index.cjs preload script safely exposes backend APIs to React."
                        ]}
                        complianceNote="All data and storage are local to the user’s machine. No network connectivity or external APIs are required."
                        projectLink="https://github.com/lee-cha-dev/dev-tracker"
                        projectLinkName="GitHub"
                        buttonStyle={blueGlowStyles}
                    />

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
                    <Divider my={10} borderColor="whiteAlpha.300"/>

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
                    <Divider my={10} borderColor="whiteAlpha.300"/>

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
                        projectLink="https://github.com/lee-cha-dev/reformatit-frontend"
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
                    <Divider my={10} borderColor="whiteAlpha.300"/>

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
                            A modern, responsive portfolio website showcasing my projects and skills as a Software Developer.
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
                    icon={<ChevronUpIcon/>}
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