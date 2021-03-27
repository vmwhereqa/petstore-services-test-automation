import {
  doGet, doPost, doPostFormData, doPut,
} from '../lib/request';
import {
  putPetRequest,
  postPetRequest,
  availablePetExpectation,
  soldPetExpectation,
  pendingPetExpectation,
  putPetExpectation,
  postPetExpectation,
  putPetInvalidRequest,
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
    const status = ['available', 'pending', 'sold'];
    const invalidStatus = 'outOfStock';

    status.forEach((statusVal) => {
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

    test('Verify find pet by invalid status', async () => {
      const { statusCode } = await doGet(
        `${baseOperation}/findByStatus`,
        {
          status: invalidStatus,
        },
      );

      expect(statusCode).toEqual(400);
    });
  });

  describe('Validate get pet by tag', function () {
    const tags = ['tag1', 'tag2', 'tag3'];
    tags.forEach((tag) => {
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
        const { statusCode, body } = await doGet(
          `${baseOperation}/${id}`,
        );

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
  describe('Validate edit pet details action', function () {
    test('Verify put pets', async () => {
      const { statusCode, body } = await doPut(baseOperation, putPetRequest);
      expect(statusCode).toEqual(200);
      expect(JSON.parse(body)).toEqual(putPetExpectation);
    });

    test('Verify when invalid pet id is sent', async () => {
      const { statusCode } = await doPut(
        baseOperation,
        putPetInvalidRequest,
      );

      expect(statusCode).toEqual(404);
    });
  });

  describe('Validate add new pet action', function () {
    test('Verify post pets', async () => {
      const { statusCode, body } = await doPost(baseOperation, postPetRequest);
      expect(statusCode).toEqual(200);
      expect(JSON.parse(body)).toEqual(postPetExpectation);
    });
  });

  describe.only('Validate updating a pet using form data', function () {
    const petArray = [
      {
        id: '7',
        name: 'fox',
        status: 'pending',
      },
      {
        id: '8',
        name: 'whale',
        status: 'sold',
      },
      {
        id: '9',
        name: 'goldFish',
        status: 'available',
      },
    ];

    petArray.forEach((pet) => {
      test('Verify update pet', function () {
        const { id, name, status } = pet;
        // const { statusCode } = doPostFormData(`${baseOperation}/${id}?name=${name}&status=${status}`);
        const { statusCode } = doPostFormData(`${baseOperation}/${id}`, {
          name,
          status,
        });
        console.log(statusCode);
        // expect(statusCode).toEqual(200);
      });
    });
  });
});
