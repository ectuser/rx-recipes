import { SearchState } from "./search.state";

export class SearchComponent {
  constructor(
    private searchView: ISearchView,
    private searchState: SearchState
  ) {}
}

export interface ISearchView {}
