//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
//------------------------------------------------------------< services >
import main_server from '../../../services/main_server';
//----------------------------------------------------------------< mock >
import genres from '../../../mock/genres.json';
//===============================================================[ CLASS ]
class GenresRequestStrategy implements IRequestStrategy<ITagResponse[]> {
  //-----------------------------------------------------------< methods >
  public async request() {
    const { data } = await main_server.get<ITagResponse[]>('genres');

    return data;
  }
}

export default GenresRequestStrategy;
