import { fromEvent, map } from "rxjs";
import { ISearchView, SearchComponent } from "./search.component";
import { RecipesState } from "../recipes.state";

export class SearchView implements ISearchView {
  private input: HTMLInputElement;

  constructor(private recipesState: RecipesState) {
    this.input = this.getInputElement();

    new SearchComponent(this, this.recipesState);
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
