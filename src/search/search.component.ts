import { Observable } from "rxjs";
import { RecipesState } from "../recipes.state";

export class SearchComponent {
  constructor(
    private searchView: ISearchView,
    private recipesState: RecipesState
  ) {
    const searchValue$ = this.searchView.getSearchValue();

    searchValue$.subscribe((value) => {
      this.recipesState.setSearch(value);
    });
  }
}

export interface ISearchView {
  getSearchValue(): Observable<string>;
}
