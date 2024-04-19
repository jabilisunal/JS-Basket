let allAddBtn = document.querySelectorAll(".btn-primary");

if (localStorage.getItem("basket") == null) {
  localStorage.setItem("basket", JSON.stringify([]));
}

allAddBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let Id = btn.parentElement.parentElement.getAttribute("data-id");
    let Name = btn.previousElementSibling.previousElementSibling.innerText;
    let Image = this.parentElement.previousElementSibling.getAttribute("src");

    if (localStorage.getItem("basket") == null) {
      localStorage.setItem("basket", JSON.stringify([]));
    }

    let basket = JSON.parse(localStorage.getItem("basket"));

    let existPro = basket.find((p) => p.id == Id);

    if (existPro === undefined) {
      basket.push({
        id: Id,
        count: 1,
        name: Name,
        image: Image,
      });
    } else {
      existPro.count++;
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  });
});

let basketcount = document.querySelector(".basketcount");

function getBasketCount() {
  if (localStorage.getItem("basket") != null) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basketcount.innerText = basket.length;
  }
}
getBasketCount();

let table = document.querySelector(".table");
let basket = JSON.parse(localStorage.getItem("basket"));

if (basket.length != 0) {
  for (const product of basket) {
    let tr = document.createElement("tr");

    let tdImg = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", product.image);
    img.setAttribute("width", "150px");
    tdImg.append(img);

    let tdName = document.createElement("td");
    tdName.innerText = product.name;

    let tdCount = document.createElement("td");
    tdCount.innerText = product.count;

    tr.append(tdImg, tdName, tdCount);
    table.lastElementChild.append(tr);
  }
} else {
  table.previousElementSibling.classList.remove("d-none");
}
