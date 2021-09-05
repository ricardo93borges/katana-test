//import {isEntityNotFoundError} from '@loopback/repository';
import {isEntityNotFoundError} from '@loopback/repository';
import {expect} from '@loopback/testlab';
import {fail} from 'assert';
import {DeckController} from '../../../controllers';
import {DeckRepository} from '../../../repositories';
import {testdb} from '../../fixtures/datasources/testdb.datasource';
import {givenDeck, givenEmptyDatabase} from '../../helpers/database.helpers';

describe('DeckController (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('create()', () => {
    it('creates a deck', async () => {
      const controller = new DeckController(new DeckRepository(testdb));

      const requestBody = {shuffled: false, remaining: 0};
      const deck = await controller.create(requestBody);

      const found = await controller.open(deck.id!);

      expect(found.id).to.equal(deck.id);
      expect(found.cards?.length).to.equal(52);
      expect(found.shuffled).to.be.false();
    });
  });

  describe('open(id)', () => {
    it('retrieves details of the given deck', async () => {
      const deckId = 'deck-id';
      const deck = await givenDeck({id: deckId});
      const controller = new DeckController(new DeckRepository(testdb));

      const found = await controller.open(deck.id!);

      expect(found.id).to.equal(deckId);
      expect(found.cards?.length).to.equal(deck.cards?.length);
    });

    it('should not find a deck', async () => {
      const controller = new DeckController(new DeckRepository(testdb));

      try {
        await controller.open('wrong-id');
        fail('should have thrown an exception');
      } catch (err) {
        expect(isEntityNotFoundError(err)).to.be.true();
      }
    });
  });

  describe('draw(id, count)', () => {
    it('draws cards from a deck', async () => {
      const deckId = 'deck-id';
      const count = 1;
      const deck = await givenDeck({id: deckId});
      const controller = new DeckController(new DeckRepository(testdb));

      const drewCards = await controller.draw(deck.id!, count);

      expect(drewCards.cards.length).to.equal(count);
    });

    it('should not find a deck', async () => {
      const controller = new DeckController(new DeckRepository(testdb));

      try {
        await controller.draw('wrong-id', 1);
        fail('should have thrown an exception');
      } catch (err) {
        expect(isEntityNotFoundError(err)).to.be.true();
      }
    });
  });
});
