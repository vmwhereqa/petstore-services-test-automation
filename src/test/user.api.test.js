import { deleteUser, getUser, updateUser } from '../data';
import {
  doDelete, doGet, doPost, doPut,
} from '../lib/request';
import { getUserExpectation } from '../reqRes/user/userExpectations';
import {
  createWithWishList, postUser, putUpdateuser, validUser,
} from '../reqRes/user/userRequestJson';

describe('Validate User API', () => {
  const baseOperation = 'user';

  test('Verify user creation function ', async () => {
    const { statusCode } = await doPost(`${baseOperation}`, postUser);
    expect(statusCode).toEqual(200);
  });

  test('Verify create users with list function', async () => {
    const { statusCode } = await doPost(`${baseOperation}/createWithList`, createWithWishList);
    expect(statusCode).toEqual(200);
  });

  test('Verify successful login', async () => {
    const { statusCode } = await doGet(`${baseOperation}/login`, validUser);
    expect(statusCode).toEqual(200);
  });

  test('Verify successful logout', async () => {
    const { statusCode } = await doGet(`${baseOperation}/logout`);
    expect(statusCode).toEqual(200);
  });

  test('Verify get user information', async () => {
    const { statusCode, body } = await doGet(`${baseOperation}/${getUser}`);
    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual(getUserExpectation);
  });

  test('Verify update user information', async () => {
    const { statusCode } = await doPut(`${baseOperation}/${updateUser}`, putUpdateuser);
    expect(statusCode).toEqual(200);
  });

  test('Verify delete user', async () => {
    const { statusCode } = await doDelete(`${baseOperation}/${deleteUser}`);
    expect(statusCode).toEqual(200);
  });
});
