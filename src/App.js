import './App.css';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import theme from "./theme";
import Projects from "./pages/Projects";

function App() {
    // This will be '/' in development and '/portfolio-site' in production if deployed to GitHub Pages
    const basename = process.env.PUBLIC_URL;

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter basename={basename}>
                <div className="App">
                    <div className="App-content">
                        <Routes>
                            <Route path="/" element={<Portfolio />} />
                            <Route path="/projects" element={<Projects />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
