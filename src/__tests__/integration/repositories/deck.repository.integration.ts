import {expect} from '@loopback/testlab';
import {DeckRepository} from '../../../repositories';
import {testdb} from '../../fixtures/datasources/testdb.datasource';
import {
  givenCardData,
  givenDeck,
  givenEmptyDatabase,
} from '../../helpers/database.helpers';

describe('DeckRepository (integration)', () => {
  beforeEach(givenEmptyDatabase);

  describe('draw(id, count)', () => {
    it('draws one card from a deck', async () => {
      const repository = new DeckRepository(testdb);
      let deck = await givenDeck();

      const count = 1;
      const remaining = deck.remaining;

      const drewCards = await repository.draw(deck.id!, count);

      deck = await repository.findById(deck.id);

      expect(drewCards.cards.length).to.equal(count);
      expect(deck.remaining).to.equal(remaining - count);
    });

    it('draws two cards from a deck', async () => {
      const repository = new DeckRepository(testdb);
      let deck = await givenDeck({
        cards: [givenCardData(), givenCardData(), givenCardData()],
      });

      const count = 2;
      const remaining = deck.remaining;

      const drewCards = await repository.draw(deck.id!, count);

      deck = await repository.findById(deck.id);

      expect(drewCards.cards.length).to.equal(count);
      expect(deck.remaining).to.equal(remaining - count);
    });
  });
});
