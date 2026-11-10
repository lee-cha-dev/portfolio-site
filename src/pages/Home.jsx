import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import About from '../components/home/About';
import FeaturedWork from '../components/home/FeaturedWork';
import Capabilities from '../components/home/Capabilities';
import Experience from '../components/home/Experience';
import Contact from '../components/home/Contact';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
    useDocumentTitle();

    return (
        <>
            <Hero />
            <Marquee />
            <About />
            <FeaturedWork />
            <Capabilities />
            <Experience />
            <Contact />
        </>
    );
}
