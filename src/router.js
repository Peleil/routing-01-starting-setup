import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages//TeamsList.vue';
import UsersList from './pages//UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages//NotFound.vue';
import TeamsFooter from './pages//TeamsFooter.vue';
import UsersFooter from './pages//UsersFooter.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { needAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      // alias: '/',
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(_, _2, next) {
        next(true);
      },
    },

    {
      path: '/:notFound(.*)',
      // redirect: '/',
      component: NotFound,
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (_, _2, next) {
  // if (to.name === 'team-members') {
  //   next();
  // }
  // next({ name: 'team-members', params: { teamId: 't2' } });
  next();
});

export default router;
