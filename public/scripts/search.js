const buscarBtn = document.getElementById("buscar-btn");
const inputSearch = document.getElementById("input-search");

function check() {
  let url = window.location.href;
  if (url === "http://localhost:8080/products") {
    buscarBtn.addEventListener("click", () => {
      const searchValue = inputSearch.value.trim();
      if (searchValue !== "") {
        window.location.href = `/products?title=${encodeURIComponent(searchValue)}`;
      }
    });
  }
}

check()