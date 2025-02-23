import { DataBase } from './DataBase';
import * as IdGenerator from './IdGenerator';

type someTypeWithId = {
    id: string,
    name: string,
    color: string
}

describe('DataBase test suite', () => {

    let sut: DataBase<someTypeWithId>;

    const fakeId = '1234';

    const someObject = {
        id: '',
        name: 'someName',
        color: 'green'
    }

    const someOtherObject = {
        id: '',
        name: 'someName',
        color: 'green'
    }

    beforeEach(() => {
        sut = new DataBase<someTypeWithId>();

        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
    });

    test('should return id after insert', async () => {
        const result = await sut.insert({
            id: ''
        } as any);
    });

    test('should get element after insert', async () => {
        const id = await sut.insert(someObject);
        const result = await sut.getBy('id', id);

        expect(result).toBe(someObject);
    });

    test('should find all elements whit the same properties', async () => {
        await sut.insert(someObject);
        await sut.insert(someOtherObject);
        const expected = [someObject, someOtherObject]; 

        const result = await sut.findAllBy('color', 'green');

        expect(result).toEqual(expected);
    });

    test('should change color on object', async () => {
        const id = await sut.insert(someObject);
        const expectedColor = 'blue';

        await sut.update(id, 'color', expectedColor);
        const object = await sut.getBy('id', id);

        expect(object.color).toBe(expectedColor);
    });

    test('should delete on object', async () => {
        const id = await sut.insert(someObject);

        await sut.delete(id);
        const result = await sut.getBy('id', id);

        expect(result).toBeUndefined();
    });

    test('should get all elements', async () => {
        await sut.insert(someObject);
        await sut.insert(someOtherObject);
        const expected = [someObject, someOtherObject]; 

        const result = await sut.getAllElements();

        expect(result).toEqual(expected);
    });


});