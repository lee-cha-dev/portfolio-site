import { Link } from 'react-router-dom';
import Icon from './Icon';
import useMagnetic from '../../hooks/useMagnetic';
import cx from '../../utils/cx';
import './Button.css';

const EXTERNAL_URL = /^(https?:)?\/\//;

/**
 * Renders a router <Link> when given `to`, an <a> when given `href`, and a
 * <button> otherwise. External links open in a new tab.
 *
 * @param {'primary' | 'outline' | 'ghost'} [props.variant='primary']
 * @param {string} [props.icon] Icon name, drawn after the label.
 * @param {boolean} [props.magnetic=false] Lean towards the pointer on hover.
 */
export default function Button({
    to,
    href,
    variant = 'primary',
    icon,
    magnetic = false,
    className,
    children,
    ...rest
}) {
    const ref = useMagnetic(magnetic);
    const classes = cx('button', `button--${variant}`, className);
    const content = (
        <>
            <span className="button__label">{children}</span>
            {icon && (
                <span className="button__icon">
                    <Icon name={icon} />
                </span>
            )}
        </>
    );

    if (to) {
        return (
            <Link ref={ref} to={to} className={classes} {...rest}>
                {content}
            </Link>
        );
    }

    if (href) {
        const externalProps = EXTERNAL_URL.test(href)
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : null;
        return (
            <a ref={ref} href={href} className={classes} {...externalProps} {...rest}>
                {content}
            </a>
        );
    }

    return (
        <button ref={ref} type="button" className={classes} {...rest}>
            {content}
        </button>
    );
}
