/* eslint-disable no-await-in-loop */
import GamePriceHelper from '../../helpers/Game/GamePriceHelper';
import GameTimeToBeatHelper from '../../helpers/Game/GameTimeToBeatHelper';
import GameAgeRatingHelper from '../../helpers/Game/GameAgeRatingHelper';
import GameGameEngineHelper from '../../helpers/Game/GameGameEngineHelper';

import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

class GameAdapter {
	public static async process(
		data: IGameRaw[]
	): Promise<IGameRaw[]> {
		const processedGames: IGameRaw[] = [];

		for (let i = 0; i < data.length; i += 1) {
			console.log(
				`Filling game price for game: ${data[i].name}`
			);
			const pricedGame = await GamePriceHelper.FillGamePrice(
				data[i]
			);

			const finalGame: IGameRaw = await GameTimeToBeatHelper.getInstance().fillTimeToBeats(
				pricedGame
			);

			finalGame.age_rating = await GameAgeRatingHelper.getPEGIAgeRating(
				finalGame
			);

			finalGame.id_game_engine = GameGameEngineHelper.selectGameEngine(
				finalGame
			);

			finalGame.hype = finalGame.hypes;

			processedGames.push(finalGame);
		}

		return processedGames;
	}
}

export default GameAdapter;
