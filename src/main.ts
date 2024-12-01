import { ResultsView } from "./results.view";

const input = document.querySelector("input") as HTMLInputElement;
const resultsView = new ResultsView();

input.addEventListener("input", (e) => {
  const searchValue = (e.target as HTMLInputElement)!.value;

  console.log(searchValue);
});

getRecipes("").then((response) => {
  console.log(response.recipes);

  resultsView.setRecipes(response.recipes);
});

function getRecipes(searchValue: string) {
  const params = new URLSearchParams();
  params.append("q", searchValue);

  return fetch(
    "https://dummyjson.com/recipes/search?" + params.toString()
  ).then((res) => res.json());
}
