import { SearchState } from "../search/search.state";

export class HeaderComponent {
  constructor(
    private headerView: IHeaderView,
    private searchState: SearchState
  ) {}
}

export interface IHeaderView {
  setNumberOfRecipes(amount: number | undefined): void;
}
