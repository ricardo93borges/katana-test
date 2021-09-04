import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Deck} from '../models';
import {DeckRepository} from '../repositories';
import {DrewCardsDTO} from '../repositories/dto/drew-cards.dto';

export class DeckController {
  constructor(
    @repository(DeckRepository)
    public deckRepository: DeckRepository,
  ) {}

  @post('/decks')
  @response(200, {
    description: 'Deck model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deck)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {
            title: 'NewDeck',
            exclude: ['id'],
          }),
        },
      },
    })
    deck: Omit<Deck, 'id'>,
  ): Promise<Deck> {
    const suits = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES'];
    const cards = [];
    for (const suit of suits) {
      cards.push({suit, value: 'ACE', code: 'AS'});
      cards.push({suit, value: 'KING', code: 'KH'});
      cards.push({suit, value: 'QUEEN', code: 'QU'});
      cards.push({suit, value: 'JACK', code: 'JK'});

      for (let i = 2; i <= 10; i++) {
        cards.push({suit, value: i.toString(), code: `${suit.charAt(0)}${i}`});
      }
    }

    deck.cards = cards;
    deck.remaining = cards.length;

    return this.deckRepository.create(deck);
  }

  @get('/decks/{id}/open')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck, {includeRelations: true}),
      },
    },
  })
  async open(@param.path.string('id') id: string): Promise<Deck> {
    return this.deckRepository.findById(id);
  }

  @get('/decks/{id}/draw')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck, {includeRelations: true}),
      },
    },
  })
  async draw(
    @param.path.string('id') id: string,
    @param.query.number('count') count: number,
  ): Promise<DrewCardsDTO> {
    return this.deckRepository.draw(id, count);
  }
}
