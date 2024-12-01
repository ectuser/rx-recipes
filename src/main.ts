import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
} from "rxjs";
import { ResultsView } from "./results.view";
import { fromFetch } from "rxjs/fetch";

const input = document.querySelector("input") as HTMLInputElement;
const resultsView = new ResultsView();

const searchValue$ = fromEvent(input, "input").pipe(
  map((e) => {
    const searchValue = (e.target as HTMLInputElement)!.value;

    return searchValue;
  }),
  startWith("")
);

const recipes$ = searchValue$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((searchValue) => {
    return getRecipes(searchValue);
  }),
  map((response) => response.recipes)
);

recipes$.subscribe((recipes) => {
  resultsView.setRecipes(recipes);
});

function getRecipes(searchValue: string) {
  const params = new URLSearchParams();
  params.append("q", searchValue);

  return fromFetch(
    "https://dummyjson.com/recipes/search?" + params.toString()
  ).pipe(switchMap((res) => res.json()));
}
