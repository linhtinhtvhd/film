import config from '~/config';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
import Movie from '~/pages/Movie';
import Tvshow from '~/pages/Tvshow';
import Contact from '~/pages/Contact';
import Watch from '~/pages/Watch';
import Explore from '~/pages/Explore';
import MvTvLayout from '~/layouts/MvTvLayout';
import WatchLayout from '~/layouts/WatchLayout';
import ExploreLayout from '~/layouts/ExploreLayout';
import SearchLayout from '~/layouts/SearchLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search, layout: SearchLayout },
    { path: config.routes.mv, component: Movie, layout: MvTvLayout },
    { path: config.routes.tv, component: Tvshow, layout: MvTvLayout },
    { path: config.routes.movie, component: Watch, layout: WatchLayout },
    { path: config.routes.tvshow, component: Watch, layout: WatchLayout },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.explore, component: Explore, layout: ExploreLayout },
];
const priviteRoutes = [];

export { priviteRoutes, publicRoutes };
