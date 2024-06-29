import './App.css';
import {ChakraProvider} from "@chakra-ui/react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import theme from "./theme";
import Projects from "./pages/Projects";

function App() {
  return (
      <ChakraProvider theme={theme}>
          <HashRouter>
              <div className="App">
                  <div className="App-content">
                      <Routes>
                          <Route path="/" element={<Portfolio />} />
                          <Route path="/projects" element={<Projects />} />
                      </Routes>
                  </div>
              </div>
          </HashRouter>
      </ChakraProvider>
  );
}

export default App;
