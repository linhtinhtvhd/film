import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import image from '../../img';
import { FaMapMarkerAlt, FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);
function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div className={cx('logo')}>
                        <a href={'https://www.facebook.com/linhtinhtvhd/'}>
                            <img className={cx('logo-img')} src={image.facebook} alt="facebook" />
                        </a>
                        <a href="https://www.facebook.com/linhtinhtvhd/">
                            <img className={cx('logo-img')} src={image.instar} alt="instar" />
                        </a>
                        <a href="https://www.facebook.com/linhtinhtvhd/">
                            <img className={cx('logo-img')} src={image.google} alt="google" />
                        </a>
                        <a href="https://www.facebook.com/linhtinhtvhd/">
                            {' '}
                            <img className={cx('logo-img')} src={image.twiter} alt="twiter" />
                        </a>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('left-side')}>
                            <div className={cx('address', 'details')}>
                                <FaMapMarkerAlt className={cx('icon')} />
                                <div className={cx('topic')}>Address</div>
                                <div className={cx('text-one')}>Ha Noi, Mi Dinh</div>
                                <div className={cx('text-two')}>Nam Tu Liem 06</div>
                            </div>
                            <div className={cx('phone', 'details')}>
                                <FaPhoneAlt className={cx('icon')} />
                                <div className={cx('topic')}>Phone</div>
                                <div className={cx('text-one')}>+0098 9893 5647</div>
                                <div className={cx('text-two')}>+0096 3434 5678</div>
                            </div>
                            <div className={cx('email', 'details')}>
                                <FaRegEnvelope className={cx('icon')} />
                                <div className={cx('topic')}>Email</div>
                                <div className={cx('text-one')}>codinglab@gmail.com</div>
                                <div className={cx('text-two')}>info.codinglab@gmail.com</div>
                            </div>
                        </div>
                        <div className={cx('right-side')}>
                            <div className={cx('topic-text')}>Send us a message</div>
                            <p>
                                If you have any work from me or any types of quries related to my tutorial, you can send
                                me message from here. It's my pleasure to help you.
                            </p>
                            <form>
                                <div className={cx('input-box')}>
                                    <input type={'text'} placeholder="Enter your name" />
                                </div>
                                <div className={cx('input-box')}>
                                    <input type="email" placeholder="Enter your email" />
                                </div>
                                <div className={cx('input-box')}>
                                    <input type="text" placeholder="Enter your message" />
                                </div>
                                <div className={cx('button')}>
                                    <input type="button" value="Send Now" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
