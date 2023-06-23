const buscarBtn = document.getElementById("buscar-btn");
const inputSearch = document.getElementById("input-search");

buscarBtn.addEventListener("click", () => {
  const searchValue = inputSearch.value.trim();
  if (searchValue !== "") {
    window.location.href = `/products?title=${encodeURIComponent(searchValue)}`;
  }
});
