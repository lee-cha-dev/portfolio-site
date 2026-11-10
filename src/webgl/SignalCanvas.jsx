import WebGLCanvas from './WebGLCanvas';
import createSignalScene from './scenes/signalScene';

export default function SignalCanvas() {
    return <WebGLCanvas createScene={createSignalScene} />;
}
