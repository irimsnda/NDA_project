import { OnlineServicesModule } from './online-services.module';

describe('OnlineServicesModule', () => {
  let onlineServicesModule: OnlineServicesModule;

  beforeEach(() => {
    onlineServicesModule = new OnlineServicesModule();
  });

  it('should create an instance', () => {
    expect(onlineServicesModule).toBeTruthy();
  });
});
