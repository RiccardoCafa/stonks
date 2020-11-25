import React, { FC, useContext, useEffect, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
//--------------------------------------------------------------< styles >
import { ThemeContext } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';

import { Container, SearchBox, SearchResults, Chosen } from './styles';
//---------------------------------------------------------------< types >
interface SearchResponse {
  id: number;
  name: string;
  // slug: string;
}
//================================================================[ BODY ]
class SearchInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    const [options, setOptions] = useState<SearchResponse[]>([]);
    const [search, setSearch] = useState<string>('');
    const [chosen, setChosen] = useState<SearchResponse>();
    const [isChoosing, setIsChoosing] = useState<boolean>(false);
    // const [options, setOptions] = useStorageState<SearchResponse[]>(
    //   this.name + '-select',
    //   []
    // );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        // const { data } = await backend.get<SearchResponse[]>('game-engines');
        // console.log(data);
        setOptions([
          { id: 0, name: 'Ronin' },
          { id: 1, name: 'Unity 5' },
          { id: 2, name: 'Firebird Engine' },
          { id: 3, name: 'Duplicate 669' },
          { id: 4, name: 'Unity 2017' },
        ]);
        setLoaded(true);
      })();
    }, []);

    const searchOptions = () =>
      search.length < 1
        ? []
        : options.filter((option) =>
            option.name.toUpperCase().includes(search.toUpperCase())
          );

    if (loaded)
      return (
        <Container>
          {isChoosing || !chosen ? (
            <>
              <SearchBox
                colorPrimary={color}
                placeholder='Type something...'
                onChange={(e) => setSearch(e.target.value)}
              />
              {searchOptions().length ? (
                <SearchResults colorPrimary={color}>
                  {searchOptions().map((option) => (
                    <li
                      key={option.id}
                      onClick={() => {
                        setChosen(option);
                        setSearch('');
                        setIsChoosing(false);
                      }}
                    >
                      {option.name}
                    </li>
                  ))}
                </SearchResults>
              ) : null}
            </>
          ) : (
            <Chosen colorPrimary={color}>
              <FaTimes
                onClick={() => {
                  setChosen(undefined);
                  setIsChoosing(true);
                }}
              />
              <p>{chosen?.name}</p>
            </Chosen>
          )}
        </Container>
      );
    else
      return (
        <ContentLoader
          backgroundColor={background[2]}
          foregroundColor={foreground[2]}
          isLoading={true}
        >
          <p>... im loading ...</p>
        </ContentLoader>
      );
  };
}

export default SearchInput;
