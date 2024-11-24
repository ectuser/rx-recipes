import { HeaderView } from "./header/header.view";
import { PaginationView } from "./pagination/pagination.view";
import { RecipesState } from "./recipes.state";
import { ResultsView } from "./results/results.view";
import { SearchView } from "./search/search.view";

class RecipesSearchPage {
  constructor() {
    const state = new RecipesState();

    new ResultsView(state);
    new HeaderView(state);
    new SearchView(state);
    new PaginationView(state);
  }
}

new RecipesSearchPage();
