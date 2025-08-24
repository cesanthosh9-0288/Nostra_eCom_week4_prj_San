// Get DOM elements
var searchBox = document.getElementById("searchBox");
var categoryFilters = document.querySelectorAll(".filter.category");
var brandFilters = document.querySelectorAll(".filter.brand");

function applySearchAndFilter() {
  var searchValue = searchBox.value.toLowerCase().trim();
  var products = document.querySelectorAll(".product");

  // Collect active categories
  var activeCategories = [];
  for (var i = 0; i < categoryFilters.length; i++) {
    if (categoryFilters[i].checked) {
      activeCategories.push(categoryFilters[i].parentElement.textContent.trim().toLowerCase());
    }
  }

  // Collect active brands
  var activeBrands = [];
  for (var i = 0; i < brandFilters.length; i++) {
    if (brandFilters[i].checked) {
      activeBrands.push(brandFilters[i].parentElement.textContent.trim().toLowerCase());
    }
  }

  for (var j = 0; j < products.length; j++) {
    var product = products[j];
    var title = product.querySelector("h3").textContent.toLowerCase();

    // --- Search condition ---
    var matchSearch = (searchValue === "") || (title.indexOf(searchValue) >= 0);

    // --- Category filter condition ---
    var matchCategory = (activeCategories.length === 0);
    for (var c = 0; c < activeCategories.length; c++) {
      if (product.classList.contains(activeCategories[c])) {
        matchCategory = true;
        break;
      }
    }

    // --- Brand filter condition ---
    var matchBrand = (activeBrands.length === 0);
    for (var b = 0; b < activeBrands.length; b++) {
      if (product.classList.contains(activeBrands[b])) {
        matchBrand = true;
        break;
      }
    }

    // --- Final display decision ---
    if (matchSearch && matchCategory && matchBrand) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  }
}

// Add event listeners
searchBox.addEventListener("keyup", applySearchAndFilter);
categoryFilters.forEach(function(f) { f.addEventListener("change", applySearchAndFilter); });
brandFilters.forEach(function(f) { f.addEventListener("change", applySearchAndFilter); });