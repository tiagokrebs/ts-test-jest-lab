import { UserCredentialsDataAccess } from './UserCredentialsDataAccess';
import { DataBase } from './DataBase';
import { Account } from '../model/AuthModel';


const insertMock = jest.fn();
const getByMock = jest.fn();

// Returning a callbacks instead of a factory because need a constructor
// this is a good way to inject mocks in consumer classes
jest.mock('./DataBase', () => {
    return {
        // insert some mocks here to have a mocked database
        DataBase: jest.fn().mockImplementation(() => { // calling the constructor
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
})

describe('UserCredentialsDataAccess test suite', () => {
    let sut: UserCredentialsDataAccess;

    const someAccount: Account = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    }

    const someId = '1234';

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        // since the mocked constructor was called we already can assert it here
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add user and return the id', async () => {
        insertMock.mockResolvedValue(someId);

        const result = await sut.addUser(someAccount);

        expect(result).toBe(someId);
    });

    test('should get user by id', async () => {
        getByMock.mockResolvedValue(someAccount);

        const result = await sut.getUserById(someId);

        expect(result).toEqual(someAccount);
        expect(getByMock).toHaveBeenCalledWith('id', someId);
    });

    test('should get user by name', async () => {
        getByMock.mockResolvedValue(someAccount);

        const result = await sut.getUserByUserName(someAccount.userName);

        expect(result).toEqual(someAccount);
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
    });

});