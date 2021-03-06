import httpMocks from 'node-mocks-http';
import UniversalCookiesManager from './UniversalCookiesManager';

// TODO Couldn't mock server correctly in a way that is compatible with how "cookies" works
//  Needs more tests (browser is properly tested, but not server)

/**
 * @group unit
 * @group utils
 */
describe(`utils/cookies/UniversalCookiesManager.ts`, () => {
  describe(`server`, () => {
    describe(`constructor`, () => {
      it(`should init correctly (req, res)`, async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const universalCookiesManager = new UniversalCookiesManager(req, res);

        // @ts-expect-error
        expect(universalCookiesManager.req).toBeDefined();
        // @ts-expect-error
        expect(universalCookiesManager.res).toBeDefined();
      });
    });
  });
});
