/**
 * @jest-environment jsdom
 */

import { UserSemiPersistentSession } from '../userSession/types/UserSemiPersistentSession';
import { deleteAllCookies } from './cookies';
import UniversalCookiesManager from './UniversalCookiesManager';

/**
 * @group unit
 * @group utils
 */
describe(`utils/cookies/UniversalCookiesManager.ts`, () => {
  describe(`browser`, () => {
    beforeEach(() => {
      deleteAllCookies(); // Reset cookies between each test to avoid "overflow"
    });

    describe(`constructor`, () => {
      it(`should init correctly (no arg)`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();

        // @ts-expect-error
        expect(universalCookiesManager.req).toEqual(undefined);
        // @ts-expect-error
        expect(universalCookiesManager.res).toEqual(undefined);
      });
    });

    describe(`replaceUserData`, () => {
      it(`should write the user data to a "user" cookie`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();
        universalCookiesManager.replaceUserData({
          id: 'user-1',
          deviceId: 'device-1',
        });

        expect(document.cookie).toEqual('user={"id":"user-1","deviceId":"device-1"}');
      });
    });

    describe(`initUserData`, () => {
      it(`should init the user and return it`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();
        const userSession: UserSemiPersistentSession = universalCookiesManager.initUserData();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(`user={"id":"${userSession.id}","deviceId":"${userSession.deviceId}"}`);
      });
    });

    describe(`getUserData`, () => {
      it(`should automatically init the user data when the cookie doesn't exist`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();
        const userSession: UserSemiPersistentSession = universalCookiesManager.getUserData();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(`user={"id":"${userSession.id}","deviceId":"${userSession.deviceId}"}`);
      });

      it(`should return the existing user data when they already exist`, async () => {
        document.cookie = 'user={"id":"user-2","deviceId":"device-2"}';

        const universalCookiesManager = new UniversalCookiesManager();
        const userSession: UserSemiPersistentSession = universalCookiesManager.getUserData();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(`user={"id":"user-2","deviceId":"device-2"}`);
      });
    });

    describe(`patchUserData`, () => {
      it(`should patch only given properties and left other unchanged`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();
        const userSession: UserSemiPersistentSession = universalCookiesManager.getUserData();
        universalCookiesManager.patchUserData({
          persona: 'persona-1',
        });

        const userSessionPatched: UserSemiPersistentSession = universalCookiesManager.getUserData();

        expect(userSessionPatched.id).toBeDefined();
        expect(userSessionPatched.deviceId).toBeDefined();
        // @ts-expect-error
        expect(document.cookie).toEqual(`user={"id":"${userSessionPatched.id}","deviceId":"${userSessionPatched.deviceId}","persona":"${userSessionPatched.persona}"}`);
      });
    });

    describe(`setLanguage`, () => {
      it(`should change the language cookie`, async () => {
        const universalCookiesManager = new UniversalCookiesManager();
        universalCookiesManager.setLanguage('fr');
        expect(document.cookie).toEqual(`i18next=fr`);

        universalCookiesManager.setLanguage('en');
        expect(document.cookie).toEqual(`i18next=en`);
      });
    });
  });
});
