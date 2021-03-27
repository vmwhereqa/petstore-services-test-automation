import { deleteOrderId, orderId } from '../data';
import { doDelete, doGet, doPost } from '../lib/request';
import { getInventoryExpectation, getOrderExpectation } from '../reqRes/store/storeExpectations';
import { postOrderRequest } from '../reqRes/store/storeRequestJson';

describe('Validate store service', function () {
  const baseOperation = 'store';

  test('Verify get inventory function', async () => {
    const { statusCode, body } = await doGet(
      `${baseOperation}/inventory`,
    );

    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual(getInventoryExpectation);
  });

  test('Verify add new order function', async () => {
    const { statusCode } = await doPost(
      `${baseOperation}/order`, postOrderRequest,
    );

    expect(statusCode).toEqual(200);
  });
  test('Verify get order function', async () => {
    const { statusCode, body } = await doGet(
      `${baseOperation}/order/${orderId}`,
    );

    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual(getOrderExpectation);
  });

  test('Verify delete order function', async () => {
    const { statusCode } = await doDelete(
      `${baseOperation}/order/${deleteOrderId}`,
    );

    expect(statusCode).toEqual(200);
  });
});
