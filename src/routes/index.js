import config from '../config';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Movie from '../pages/Movie';
import Tvshow from '../pages/Tvshow';
import Contact from '../pages/Contact';
import Watch from '../pages/Watch';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Explore from '../pages/Explore';
import MvTvLayout from '../layouts/MvTvLayout';
import WatchLayout from '../layouts/WatchLayout';
import ExploreLayout from '../layouts/ExploreLayout';
import SearchLayout from '../layouts/SearchLayout';
import LoginLayout from '../layouts/LoginLayout';
import SignUpLayout from '../layouts/SignUpLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import ContactLayout from '../layouts/ContactLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile, layout: ProfileLayout },
    { path: config.routes.search, component: Search, layout: SearchLayout },
    { path: config.routes.mv, component: Movie, layout: MvTvLayout },
    { path: config.routes.tv, component: Tvshow, layout: MvTvLayout },
    { path: config.routes.movie, component: Watch, layout: WatchLayout },
    { path: config.routes.tvshow, component: Watch, layout: WatchLayout },
    { path: config.routes.contact, component: Contact, layout: ContactLayout },
    { path: config.routes.explore, component: Explore, layout: ExploreLayout },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.signup, component: SignUp, layout: SignUpLayout },
];
const priviteRoutes = [];

export { priviteRoutes, publicRoutes };
