import { asyncComponent } from 'react-async-component';

const NotFound = asyncComponent({
  name: 'NotFoundAsync',
  serverMode: 'resolve',
  resolve: () => import('./NotFound'),
});

export {NotFound};
