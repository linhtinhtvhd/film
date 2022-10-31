import classNames from 'classnames/bind';
import styles from './ContactLayout.module.scss';
import Header from '../../layouts/DefaultLayout/Header';

const cx = classNames.bind(styles);

function ContactLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
        </div>
    );
}

export default ContactLayout;
