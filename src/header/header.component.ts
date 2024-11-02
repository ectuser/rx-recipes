import { Observable } from "rxjs";
import { SearchState } from "../search/search.state";

export class HeaderComponent {
  private numberOfItems$: Observable<number | undefined>;

  constructor(
    private headerView: IHeaderView,
    private searchState: SearchState
  ) {
    this.numberOfItems$ = this.searchState.numberOfItems$;

    this.numberOfItems$.subscribe((amount) => {
      this.headerView.setNumberOfRecipes(amount);
    });
  }
}

export interface IHeaderView {
  setNumberOfRecipes(amount: number | undefined): void;
}
