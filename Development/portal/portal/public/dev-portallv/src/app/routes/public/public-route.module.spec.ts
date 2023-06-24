import { PublicRouteModule } from './public-route.module';

describe('PublicRouteModule', () => {
  let publicRouteModule: PublicRouteModule;

  beforeEach(() => {
    publicRouteModule = new PublicRouteModule();
  });

  it('should create an instance', () => {
    expect(publicRouteModule).toBeTruthy();
  });
});
