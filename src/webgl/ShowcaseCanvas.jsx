import { useEffect } from 'react';
import useThreeCanvas from './useThreeCanvas';
import createShowcaseScene from './scenes/showcaseScene';
import cx from '../utils/cx';
import './WebGLCanvas.css';

/**
 * Shows `images[active]`, transitioning with a shader whenever `active`
 * changes. `images` must be a stable array of URLs.
 */
export default function ShowcaseCanvas({ images, active }) {
    const { canvasRef, sceneRef, status } = useThreeCanvas(createShowcaseScene);

    useEffect(() => {
        if (status === 'ready') sceneRef.current?.setImages(images);
    }, [status, images, sceneRef]);

    useEffect(() => {
        if (status === 'ready') sceneRef.current?.setActive(active);
    }, [status, active, sceneRef]);

    return (
        <canvas
            ref={canvasRef}
            className={cx('webgl-canvas', `webgl-canvas--${status}`)}
            aria-hidden="true"
        />
    );
}
