import useThreeCanvas from './useThreeCanvas';
import cx from '../utils/cx';
import './WebGLCanvas.css';

/**
 * A decorative canvas driven by a scene factory (see useThreeCanvas).
 * Fades in once the first frame is drawn, and stays invisible if WebGL is
 * unavailable so the CSS behind it acts as the fallback.
 */
export default function WebGLCanvas({ createScene, className }) {
    const { canvasRef, status } = useThreeCanvas(createScene);

    return (
        <canvas
            ref={canvasRef}
            className={cx('webgl-canvas', `webgl-canvas--${status}`, className)}
            aria-hidden="true"
        />
    );
}
