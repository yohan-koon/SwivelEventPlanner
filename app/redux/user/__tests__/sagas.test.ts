import { runSaga } from 'redux-saga';
import * as authService from '../../../services/firebase/authService';
import { signInAction, signInFailedAction, signInSuccessAction } from '../slice';
import { signInSaga } from '../sagas';
import { UserCredential } from 'firebase/auth';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('user sagas', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle error when firebase auth throwing error', async () => {
        const dispatchedActions: Array<any> = [];

        const spy = jest.spyOn(authService, 'loginWithEmailAndPassword');
        spy.mockImplementation((email: string, password: string) =>
            Promise.reject(new Error('User credentials are invalid')),
        );

        const fakeStore = {
            dispatch: (action: any) => dispatchedActions.push(action),
        };

        const signInAction = {
            type: 'users/signInAction',
            payload: {
                email: 'demo@gmail.com',
                password: 'Abc@1234',
            },
        };

        await runSaga(
            fakeStore,
            signInSaga as any,
            signInAction
        ).toPromise();
        expect(spy).toHaveBeenCalledWith('demo@gmail.com', 'Abc@1234');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(dispatchedActions.length).toEqual(1);
        expect(dispatchedActions).toContainEqual(
            signInFailedAction('User credentials are invalid'),
        );
    });

    it('should handle success when firebase auth returns user credentials', async () => {
        const dispatchedActions: Array<any> = [];

        const fakeUserCredential = {
            user: {
                uid: '123',
                email: 'demo@gmail.com',
            },
        } as UserCredential;

        const spy = jest.spyOn(authService, 'loginWithEmailAndPassword');
        spy.mockImplementation((email: string, password: string) => Promise.resolve(fakeUserCredential));

        const fakeStore = {
            dispatch: (action: any) => dispatchedActions.push(action),
        };

        const signInAction = {
            type: 'users/signInAction',
            payload: {
                email: 'demo@gmail.com',
                password: 'Abc@1234',
            },
        };

        await runSaga(
            fakeStore,
            signInSaga as any,
            signInAction
        ).toPromise();
        expect(spy).toHaveBeenCalledWith('demo@gmail.com', 'Abc@1234');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(dispatchedActions.length).toEqual(1);
        expect(dispatchedActions).toContainEqual(signInSuccessAction(),);
    });
});
