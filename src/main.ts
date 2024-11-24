const input = document.querySelector("input") as HTMLInputElement;

input.addEventListener("input", (e) => {
  const searchValue = (e.target as HTMLInputElement)!.value;

  console.log(searchValue);
});

function getRecipes(searchValue: string) {
  const params = new URLSearchParams();
  params.append("q", searchValue);

  return fetch(
    "https://dummyjson.com/recipes/search?" + params.toString()
  ).then((res) => res.json());
}
