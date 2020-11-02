/* eslint-disable no-await-in-loop */
import IGDBKeyword from '../../calls/IGDBKeyword';

import KeywordModel from '../../../models/KeywordModel';

import { IKeyword } from '../../../typescript/database/Tables';

class KeywordHelper {
	call!: IGDBKeyword;

	constructor() {
		this.call = new IGDBKeyword();
	}

	public async callData(): Promise<void> {
		let data: IKeyword[];

		do {
			data = await this.call.call();

			data.forEach(async (gameEngine) => {
				const alreadyExist = await KeywordModel.findByPk(
					gameEngine.id
				);

				if (!alreadyExist) {
					await KeywordModel.create(gameEngine)
						.then(() => {
							console.log(`${gameEngine} added to database`);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${gameEngine} on database...`
							);

							console.log(err);
						});
				}
			});
		} while (data.length !== 0);
	}
}

export default KeywordHelper;
