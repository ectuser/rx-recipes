import { Observable } from "rxjs";
import { RecipesState } from "../recipes.state";

export class HeaderComponent {
  private numberOfItems$: Observable<number | undefined>;

  constructor(
    private headerView: IHeaderView,
    private recipesState: RecipesState
  ) {
    this.numberOfItems$ = this.recipesState.numberOfRecipes$;

    this.numberOfItems$.subscribe((amount) => {
      this.headerView.setNumberOfRecipes(amount);
    });
  }
}

export interface IHeaderView {
  setNumberOfRecipes(amount: number | undefined): void;
}
