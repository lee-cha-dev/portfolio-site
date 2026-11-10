import useInView from '../../hooks/useInView';
import cx from '../../utils/cx';

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. `delay` (1-5) staggers siblings in 80ms steps.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -8% 0px' });

    return (
        <Tag
            ref={ref}
            className={cx(
                'reveal',
                delay > 0 && `reveal--delay-${delay}`,
                inView && 'is-visible',
                className
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
}
