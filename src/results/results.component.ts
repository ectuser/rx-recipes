import { SearchState } from "../search/search.state";
import { Recipe } from "../search/types";

export class ResultsComponent {
  constructor(
    private resultsView: IResultsView,
    private searchState: SearchState
  ) {}
}

export interface IResultsView {
  setRecipes(items: Recipe[] | undefined): void;
  setLoading(loading: boolean): void;
}
