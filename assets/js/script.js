const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmY1YjJjNmEwZDAwMTg0OTVlNmIiLCJpYXQiOjE3MDIxNTY2MzMsImV4cCI6MTcwMzM2NjIzM30.QUoLJuH4ov9hsWhHfRy0eM1-w3U6J86utBlyj8Z6mY4";

class Prodotti {
  constructor(_name, _description, _brand, _imageUrl, _price, _id) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = Number(_price);
    this.id = _id;
  }
}

const playStation5 = new Prodotti(
  "PlayStation ™ 5",
  "Better, faster, stronger.",
  "SONY",
  "https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/11/PS5-Review-8-scaled.jpg",
  "399"
);

const iPhone15Pro = new Prodotti(
  "iPhone 15 Pro",
  "The best iPhone ever made.",
  "Apple",
  "https://media.ldlc.com/r1600/ld/products/00/06/06/41/LD0006064109.jpg",
  "1199"
);

const flipperzero = new Prodotti(
  "Flipper Zero",
  "Hacking into something new.",
  "Russian Devs",
  "https://lab401.com/cdn/shop/products/Flipper-Zero---Silicon-Cover---Front_1024x1024@2x.png?v=1654133560",
  "299"
);

const rtx4090 = new Prodotti(
  "NVIDIA GeForce RTX 4090",
  "Turn your PC into a spaceship.",
  "NVIDIA",
  "https://m.media-amazon.com/images/I/51c1zFDNVmL._AC_UF1000,1000_QL80_.jpg",
  "1799"
);

const arrayProdotti = [playStation5, iPhone15Pro, flipperzero, rtx4090];

async function addProduct(product) {
  try {
    console.log("Sending request with payload:", JSON.stringify(product));

    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Product added:", data);
  } catch (error) {
    console.error("Error in addProduct:", error);
  }
}

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Fetched products:", data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const title = document.createElement("h2");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description;

  const brand = document.createElement("p");
  brand.textContent = "Brand: " + product.brand;

  const price = document.createElement("p");
  price.textContent = "Price: $" + product.price;

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(brand);
  card.appendChild(description);
  card.appendChild(price);

  return card;
}

const container = document.getElementById("products-container");

async function initialize() {
  // Use Promise.all to wait for all API requests to complete before proceeding
  await Promise.all(arrayProdotti.map(addProduct));

  // Fetch products after adding them
  fetchProducts();

  // Display product cards
  arrayProdotti.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Call the initialize function when the page loads
initialize();
