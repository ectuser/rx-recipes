import { Observable } from "rxjs";
import { SearchState } from "./search.state";

export class SearchComponent {
  constructor(
    private searchView: ISearchView,
    private searchState: SearchState
  ) {
    const searchValue$ = this.searchView.getSearchValue();

    searchValue$.subscribe((value) => {
      this.searchState.setSearchValue(value);
    });
  }
}

export interface ISearchView {
  getSearchValue(): Observable<string>;
}
