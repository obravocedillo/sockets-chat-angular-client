import { createRandomString } from '../utils/fns';

describe('Utilities functions testing', () => {
    it('createRandomString should create multiple random strings', () => {
        const firstRandomString = createRandomString(4);
        const secondRandomString = createRandomString(4);

        expect(firstRandomString).not.toEqual(secondRandomString);
    })

    it('createRandomString should create random string with the desired length', () => {
        const firstRandomString: string = createRandomString(4);
        const secondRandomString: string = createRandomString(5);
        const thirdRandomString: string = createRandomString(8);

        expect(firstRandomString.length).toEqual(4);
        expect(secondRandomString.length).toEqual(5);
        expect(thirdRandomString.length).toEqual(8);
    })

    it('createRandomString should create random strings with numbers and letter', () => {
        const firstRandomString: string = createRandomString(4);
        const secondRandomString: string = createRandomString(5);
        const thirdRandomString: string = createRandomString(8);

        const numberCharactersPatt = new RegExp("^[A-Za-z0-9]+$");

        expect(numberCharactersPatt.exec(firstRandomString)).toBeTruthy();
        expect(numberCharactersPatt.exec(secondRandomString)).toBeTruthy();
        expect(numberCharactersPatt.exec(thirdRandomString)).toBeTruthy();
    })

})