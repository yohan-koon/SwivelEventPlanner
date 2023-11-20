import * as organizersService from '../../../services/jsonplaceholder/organizerService';
import {runSaga} from 'redux-saga';
import {getOrganizersSaga} from '../sagas';
import {getOrganizersAction, getOrganizersFailedAction, getOrganizersSuccessAction} from '../slice';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Organizers Saga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load organizers upon success', async () => {
    const dispatchedActions: Array<any> = [];
    const fakeOrganizers = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    ];

    const spy = jest.spyOn(organizersService, 'fetchOrganizers');
    spy.mockImplementation(() => Promise.resolve(fakeOrganizers));

    const fakeStore = {
      dispatch: (action: any) => dispatchedActions.push(action),
    };

    await runSaga(
      fakeStore,
      getOrganizersSaga as any,
      getOrganizersAction,
    ).toPromise();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions).toContainEqual(getOrganizersSuccessAction(fakeOrganizers));
  });

  it('should handle error when API is throwing error', async () => {
    const dispatchedActions: Array<any> = [];

    const spy = jest.spyOn(organizersService, 'fetchOrganizers');
    spy.mockImplementation(() => Promise.reject(new Error('Organizations not found')));

    const fakeStore = {
      dispatch: (action: any) => dispatchedActions.push(action),
    };

    await runSaga(
      fakeStore,
      getOrganizersSaga as any,
      getOrganizersAction,
    ).toPromise();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions).toContainEqual(getOrganizersFailedAction('Organizations not found'));
  });
});
