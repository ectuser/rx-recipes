import { HeaderComponent } from "./header/header.component";
import { HeaderView } from "./header/header.view";
import { ResultsComponent } from "./results/results.component";
import { ResultsView } from "./results/results.view";
import { SearchComponent } from "./search/search.component";
import { SearchState } from "./search/search.state";
import { SearchView } from "./search/search.view";

const searchState = new SearchState();

const resultsView = new ResultsView();
const headerView = new HeaderView();
const searchView = new SearchView();

new SearchComponent(searchView, searchState);
new HeaderComponent(headerView, searchState);
new ResultsComponent(resultsView, searchState);
