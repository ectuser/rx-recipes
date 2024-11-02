import { Observable } from "rxjs";
import { SearchState } from "./search.state";

export class SearchComponent {
  constructor(
    private searchView: ISearchView,
    private searchState: SearchState
  ) {
    const searchValue$ = this.searchView.getSearchValue();

    this.searchState.connectSource(searchValue$);
  }
}

export interface ISearchView {
  getSearchValue(): Observable<string>;
}
