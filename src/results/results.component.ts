import { Observable } from "rxjs";
import { SearchState } from "../search/search.state";
import { Recipe } from "../search/types";

export class ResultsComponent {
  private loading$: Observable<boolean>;
  private searchItems$: Observable<Recipe[] | undefined>;

  constructor(
    private resultsView: IResultsView,
    private searchState: SearchState
  ) {
    this.loading$ = this.searchState.loading$;
    this.searchItems$ = this.searchState.searchItems$;

    this.loading$.subscribe((loading) => {
      this.resultsView.setLoading(loading);
    });

    this.searchItems$.subscribe((items) => {
      this.resultsView.setRecipes(items);
    });
  }
}

export interface IResultsView {
  setRecipes(items: Recipe[] | undefined): void;
  setLoading(loading: boolean): void;
}
