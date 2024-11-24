import { Observable } from "rxjs";
import { Recipe } from "../search/types";
import { RecipesState } from "../recipes.state";

export class ResultsComponent {
  private loading$: Observable<boolean>;
  private searchItems$: Observable<Recipe[] | undefined>;

  constructor(
    private resultsView: IResultsView,
    private recipesState: RecipesState
  ) {
    this.loading$ = this.recipesState.loading$;
    this.searchItems$ = this.recipesState.recipes$;

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
