import WebGLCanvas from './WebGLCanvas';
import createHeroScene from './scenes/heroScene';

export default function HeroCanvas() {
    return <WebGLCanvas createScene={createHeroScene} />;
}
