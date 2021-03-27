import got from 'got';
import FormData from 'form-data';
import fs from 'fs';
import * as pathNode from 'path';
import logMessage from '../logger';

const getURL = (path) => `${process.env.BASE_URL}/${path}`;

const request = async (url, options) => {
  let response;
  logMessage(url);
  logMessage(options.method);
  logMessage(options);
  try {
    response = await got(url, options);
    logMessage(response.statusCode);
    logMessage(response.body);
    return response;
  } catch (error) {
    if (!error.response.statusCode) {
      throw error;
    }
    logMessage(error.response.body);
    return error.response;
  }
};

const doGet = async (path, searchParams = {}) => {
  const response = await request(getURL(path), { method: 'GET', searchParams });
  return response;
};

const doPost = async (path, body = {}) => {
  const response = await request(getURL(path), { method: 'POST', json: body });
  return response;
};

const doPostWithParams = async (path, searchParams = {}) => {
  const response = await request(getURL(path), { method: 'POST', searchParams });
  return response;
};

const doPut = async (path, body = {}) => {
  const res = await request(getURL(path), { method: 'PUT', json: body });
  return res;
};

const doDelete = async (path) => {
  const res = await request(getURL(path), { method: 'DELETE' });
  return res;
};

const uploadImage = async (path, imageName) => {
  const form = new FormData();
  const file = pathNode.join(__dirname, '..', '..', 'data', 'photos', `${imageName}.jpeg`);
  form.append('my_file', fs.createReadStream(file));
  const res = await (request(`${getURL(path)}/uploadImage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: form,
  }));

  return res;
};

export {
  doGet, doPost, doPut, doDelete, doPostWithParams, uploadImage,
};
