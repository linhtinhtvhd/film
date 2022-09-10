import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({ children, to, href, primary, transparent, onClick, clickWatch, ...passProps }) {
    let Comp = 'button';
    const props = {
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        transparent,
    });
    return (
        <Comp className={classes} {...props} onClick={clickWatch}>
            <span className={cx('tittle')}>{children}</span>
        </Comp>
    );
}

export default Button;
