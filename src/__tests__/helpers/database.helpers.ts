import {Card, Deck} from '../../models';
import {DeckRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  await new DeckRepository(testdb).deleteAll();
}

export function givenCardData(data?: Partial<Card>) {
  const objData = Object.assign(
    {
      value: 'ACE',
      suit: 'SPADES',
      code: 'AS',
    },
    data,
  );

  return new Card(objData);
}

export function givenDeckData(data?: Partial<Deck>) {
  const objData = Object.assign(
    {
      id: '5de1fc22-1a34-424d-9862-2bac204c7425',
      shuffled: false,
      remaining: 1,
      cards: [givenCardData()],
    },
    data,
  );

  return new Deck(objData);
}

export async function givenDeck(data?: Partial<Deck>) {
  return new DeckRepository(testdb).create(givenDeckData(data));
}
