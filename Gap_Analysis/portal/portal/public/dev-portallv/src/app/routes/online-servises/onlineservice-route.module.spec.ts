import { OnlineserviceRouteModule } from './onlineservice-route.module';

describe('OnlineserviceRouteModule', () => {
  let onlineserviceRouteModule: OnlineserviceRouteModule;

  beforeEach(() => {
    onlineserviceRouteModule = new OnlineserviceRouteModule();
  });

  it('should create an instance', () => {
    expect(onlineserviceRouteModule).toBeTruthy();
  });
});
