import Build from './layouts/index';
import BuildPlatform from './layouts/platform';

// routes should only interface with layouts
// layouts will then interface with views which are smart components
// views will have many dumb components  (maybe other views?)
export default {
  path: 'build',
  component: Build,
  childRoutes: [{
    path: 'platform', component: BuildPlatform
  }
  // { path: 'messages/:id',
  //   onEnter: function (nextState, replaceState) {
  //     replaceState(null, '/messages/' + nextState.params.id)
  //   }
  // }
  ]
};
