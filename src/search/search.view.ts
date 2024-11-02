import { fromEvent, map } from "rxjs";
import { ISearchView } from "./search.component";

export class SearchView implements ISearchView {
  private input: HTMLInputElement;

  constructor() {
    this.input = this.getInputElement();
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
