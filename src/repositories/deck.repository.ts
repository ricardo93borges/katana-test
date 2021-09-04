import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Card, Deck, DeckRelations} from '../models';
import {DrewCardsDTO} from './dto/drew-cards.dto';

export class DeckRepository extends DefaultCrudRepository<
  Deck,
  typeof Deck.prototype.id,
  DeckRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Deck, dataSource);
  }

  async draw(id: string, count: number): Promise<DrewCardsDTO> {
    const deck = await this.findById(id);

    let cards: Card[] = [];

    if (deck.cards && deck.cards.length > 0) {
      cards = deck.cards?.splice(0, count);

      deck.remaining = deck.cards.length;

      await this.save(deck);
    }

    return {
      cards: cards,
    };
  }
}
