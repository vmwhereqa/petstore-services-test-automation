import got from 'got';
import logMessage from '../logger';

const getURL = (operation) => `${process.env.BASE_URL}/${operation}`;

const request = async (requestFn) => {
  let response;
  try {
    response = await requestFn;
  } catch (error) {
    
    response = await error.response;
    console.log(error);
    logMessage(error);
    if (!error.response.statusCode) {
      throw error;
    }
  }
  logMessage(response.statusCode);
  logMessage(response.body);
  return response;
};

export const doGet = async (operation, queryParams = {}) => {
  const res = await request(got.get(getURL(operation), { searchParams: queryParams }));
  return res;
};

export const doPost = async (operation, body = {}) => {
  const res = await request(got.post(getURL(operation), { json: body }));
  return res;
};

export const doPostFormData = async (operation, form = {}) => {
 const res = await request(got.post(getURL(operation), { body: form }));

  const res = await request(got({ method: 'POST', body: form }));
  console.log(`vinod${res}`);
  return res;
};

export const doPut = async (operation, body) => {
  const res = await request(got.put(getURL(operation), { json: body }));
  return res;
};

export const doDelete = async (operation, body) => {
  const res = await request(got.delete(getURL(operation), { json: body }));
  return res;
};
