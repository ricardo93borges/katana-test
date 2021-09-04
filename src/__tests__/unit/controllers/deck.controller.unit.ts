import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {fail} from 'assert';
import {DeckController} from '../../../controllers';
import {DeckRepository} from '../../../repositories';
import {givenCardData, givenDeckData} from '../../helpers/database.helpers';

describe('DeckController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<DeckRepository>;
  beforeEach(givenStubbedRepository);

  function givenStubbedRepository() {
    repository = createStubInstance(DeckRepository);
  }

  describe('create()', () => {
    it('should create a deck', async () => {
      const controller = new DeckController(repository);

      const requestBody = givenDeckData();
      repository.stubs.create.resolves(givenDeckData());

      await controller.create(requestBody);

      sinon.assert.calledWithMatch(repository.stubs.create, {remaining: 52});
    });

    it('should throw an exception', async () => {
      const controller = new DeckController(repository);

      const requestBody = givenDeckData();

      const error = new Error('some error');
      repository.stubs.create.throws(error);

      try {
        await controller.create(requestBody);
        fail('should have thrown an exception');
      } catch (err) {
        expect(err).to.eql(error);
      }
    });
  });

  describe('open()', () => {
    it('should retrieve details of a deck', async () => {
      const controller = new DeckController(repository);
      const deckId = 'deck-id';

      repository.stubs.findById.resolves(givenDeckData({id: deckId}));

      const response = await controller.open(deckId);

      sinon.assert.calledWithMatch(repository.stubs.findById, '');
      expect(response).to.eql(givenDeckData({id: deckId}));
    });

    it('should throw an exception', async () => {
      const controller = new DeckController(repository);

      const error = new Error('some error');
      repository.stubs.findById.throws(error);

      try {
        await controller.open('');
        fail('should have thrown an exception');
      } catch (err) {
        expect(err).to.eql(error);
      }
    });
  });

  describe('draw()', () => {
    it('should create a deck', async () => {
      const controller = new DeckController(repository);

      const id = 'id';
      const count = 2;
      repository.stubs.draw.resolves({cards: [givenCardData()]});

      await controller.draw(id, count);

      sinon.assert.calledWithMatch(repository.stubs.draw, id, count);
    });

    it('should throw an exception', async () => {
      const controller = new DeckController(repository);

      const error = new Error('some error');

      repository.stubs.draw.throws(error);

      try {
        await controller.draw('id', 2);
        fail('should have thrown an exception');
      } catch (err) {
        expect(err).to.eql(error);
      }
    });
  });
});
