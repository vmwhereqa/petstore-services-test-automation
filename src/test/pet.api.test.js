import {
  deletePetId,
  petArray,
  petTags,
  uploadPetId,
  uploadPetImageName,
  validPetStatus,
} from '../data';
import {
  doPost,
  doPut,
  doGet,
  doPostWithParams,
  doDelete,
  uploadImage,
} from '../lib/request';

import {
  putPetRequest,
  postPetRequest,
  availablePetExpectation,
  soldPetExpectation,
  pendingPetExpectation,
  putPetExpectation,
  postPetExpectation,
  tag1PetExpectation,
  tag2PetExpectation,
  tag3PetExpectation,
  id1Expectation,
  id2Expectation,
  id3Expectation,
} from '../reqRes';

describe('Validate pet service', function () {
  const baseOperation = 'pet';

  describe('Validate get pet by status', function () {
    validPetStatus.forEach((statusVal) => {
      test(`Verify find pet by valid status = ${statusVal}`, async () => {
        const { statusCode, body } = await doGet(
          `${baseOperation}/findByStatus`,
          {
            status: statusVal,
          },
        );

        expect(statusCode).toEqual(200);

        if (statusVal === 'available') {
          expect(JSON.parse(body)).toEqual(availablePetExpectation);
        }

        if (statusVal === 'pending') {
          expect(JSON.parse(body)).toEqual(pendingPetExpectation);
        }

        if (statusVal === 'sold') {
          expect(JSON.parse(body)).toEqual(soldPetExpectation);
        }
      });
    });
  });

  describe('Validate get pet by tag', function () {
    petTags.forEach((tag) => {
      test(`Verify find pet by tag = ${tag}`, async () => {
        const { statusCode, body } = await doGet(
          `${baseOperation}/findByTags`,
          {
            tags: tag,
          },
        );

        expect(statusCode).toEqual(200);

        if (tag === 'tag1') {
          expect(JSON.parse(body)).toEqual(tag1PetExpectation);
        }

        if (tag === 'pending') {
          expect(JSON.parse(body)).toEqual(tag2PetExpectation);
        }

        if (tag === 'sold') {
          expect(JSON.parse(body)).toEqual(tag3PetExpectation);
        }
      });
    });
  });

  describe('Validate get pet by id', function () {
    const ids = ['1', '2', '3'];
    ids.forEach((id) => {
      test(`Verify find pet by id = ${id}`, async () => {
        const { statusCode, body } = await doGet(`${baseOperation}/${id}`);

        expect(statusCode).toEqual(200);

        if (id === '1') {
          expect(JSON.parse(body)).toEqual(id1Expectation);
        }

        if (id === '2') {
          expect(JSON.parse(body)).toEqual(id2Expectation);
        }

        if (id === '3') {
          expect(JSON.parse(body)).toEqual(id3Expectation);
        }
      });
    });
  });

  test('Verify put pets', async () => {
    const { statusCode, body } = await doPut(baseOperation, putPetRequest);
    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual(putPetExpectation);
  });

  test('Verify post pets', async () => {
    const { statusCode, body } = await doPost(baseOperation, postPetRequest);
    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual(postPetExpectation);
  });

  describe('Validate updating a pet using form data', function () {
    petArray.forEach((pet) => {
      test('Verify update pet', async () => {
        const { id, name, status } = pet;
        const { statusCode } = await doPostWithParams(
          `${baseOperation}/${id}`,
          { name, status },
        );
        expect(statusCode).toEqual(200);
      });
    });
  });

  test('Verify deleting a pet', async () => {
    const { statusCode } = await doDelete(`${baseOperation}/${deletePetId}`);
    expect(statusCode).toEqual(200);
  });

  test('Verify upload image of pet', async () => {
    const { statusCode } = await uploadImage(
      `${baseOperation}/${uploadPetId}`,
      uploadPetImageName,
    );
    expect(statusCode).toEqual(200);
  });
});
