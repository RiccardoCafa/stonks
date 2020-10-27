import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { ITheme } from '../../typescript/database/Tables';

export default class IGDBTheme extends IGDBCall<ITheme[]> {
	protected idLowerLimit: number;

	protected idHigherLimit: number;

	protected idStep: number;

	protected onlySteam: boolean;

	protected identifier: string;

	constructor() {
		super();

		this.identifier = 'themes';

		this.idLowerLimit = 0;
		this.idHigherLimit = 200;

		this.onlySteam = false;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: ['name', 'slug'],
			limit: 500,
		};
	}

	protected async handleResponse(
		response: AxiosResponse<ITheme[]>
	): Promise<ITheme[]> {
		const { data } = response;

		return data;
	}

	protected handleRequestException(
		_error: AxiosError,
		_body: IIGDBRequestBody,
		bodyString: string,
		identifier: string
	): void {
		console.log(
			`[IGDB]: Error ocurred on request on endpoint "${identifier}" with body: ${bodyString}`
		);
	}
}
