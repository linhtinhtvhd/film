import config from '~/config';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
import Movie from '~/pages/Movie';
import Tvshow from '~/pages/Tvshow';
import Contact from '~/pages/Contact';
import Watch from '~/pages/Watch';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search },
    { path: config.routes.mv, component: Movie },
    { path: config.routes.tv, component: Tvshow },
    { path: config.routes.movie, component: Watch, layout: 'Test' },
    { path: config.routes.tvshow, component: Watch, layout: 'Test' },
    { path: config.routes.contact, component: Contact },
];
const priviteRoutes = [];

export { priviteRoutes, publicRoutes };
