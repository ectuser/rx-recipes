import { fromEvent, map } from "rxjs";
import { ISearchView, SearchComponent } from "./search.component";
import { SearchState } from "./search.state";

export class SearchView implements ISearchView {
  private input: HTMLInputElement;

  constructor() {
    this.input = this.getInputElement();

    const searchState = SearchState.getInstance();
    new SearchComponent(this, searchState);
  }

  public getSearchValue() {
    return fromEvent(this.input, "input").pipe(
      map((e) => (e.target as HTMLInputElement)!.value)
    );
  }

  private getInputElement() {
    const input = document.querySelector("input");

    if (!input) {
      throw new Error("Element not found");
    }

    return input;
  }
}
