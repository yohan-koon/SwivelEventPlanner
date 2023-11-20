import {
    userSlice,
    initialState,
    signInAction,
    signInSuccessAction,
    signInFailedAction,
} from '../slice';

describe('userSlice', () => {
    it('should handle initial state', () => {
        expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    describe('signInAction', () => {
        it('should handle signInAction', () => {
            const actual = userSlice.reducer(
                initialState,
                signInAction({ email: '', password: '' }),
            );
            expect(actual.signIn.loading).toEqual('loading');
            expect(actual.signIn.error).toEqual(null);
        });

        it('should handle signInSuccessAction', () => {
            const actual = userSlice.reducer(initialState, signInSuccessAction());
            expect(actual.signIn.loading).toEqual('succeeded');
        });

        it('should handle signInFailedAction', () => {
            const actual = userSlice.reducer(initialState, signInFailedAction('error'));
            expect(actual.signIn.loading).toEqual('failed');
            expect(actual.signIn.error).toEqual('error');
        });
    });
});
