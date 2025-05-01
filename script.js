// بيانات الأدمن
const adminUsername = "bnda";
const adminPassword = "01032715994Ali";

// التحقق من تسجيل دخول الأدمن
function login() {
  const username = document.getElementById("admin-user").value;
  const password = document.getElementById("admin-pass").value;

  if (username === adminUsername && password === adminPassword) {
    alert("تم تسجيل الدخول بنجاح!");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
  }
}

// إضافة منتج جديد بواسطة الأدمن
// البيانات الخاصة بالمنتجات (مخزنة في LocalStorage للمثال)
let products = JSON.parse(localStorage.getItem("products")) || [];

// عرض المنتجات في لوحة التحكم
function displayAdminProducts() {
  const productsList = document.getElementById("admin-products-list");
  productsList.innerHTML = "";

  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${product.name}</strong><br>
      <img src="${product.image}" alt="${product.name}" style="width: 100px;"><br>
      <p>${product.description}</p>
      <p>السعر: ${product.price} جنيه</p>
      <button onclick="editProduct(${index})">تعديل</button>
      <button onclick="deleteProduct(${index})">حذف</button>
      <button onclick="toggleProductVisibility(${index})">${product.isVisible ? 'إخفاء' : 'إظهار'}</button>
    `;
    productsList.appendChild(li);
  });
}

// إضافة منتج جديد
document.getElementById("add-product-btn").addEventListener("click", function() {
  const name = prompt("اسم المنتج:");
  const description = prompt("وصف المنتج:");
  const price = prompt("السعر:");
  const image = prompt("رابط صورة المنتج:");

  const newProduct = { name, description, price, image, isVisible: true };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  displayAdminProducts();
});

// تعديل المنتج
function editProduct(index) {
  const name = prompt("اسم المنتج:", products[index].name);
  const description = prompt("وصف المنتج:", products[index].description);
  const price = prompt("السعر:", products[index].price);
  const image = prompt("رابط صورة المنتج:", products[index].image);

  products[index] = { name, description, price, image, isVisible: products[index].isVisible };
  localStorage.setItem("products", JSON.stringify(products));

  displayAdminProducts();
}

// حذف المنتج
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  displayAdminProducts();
}

// إخفاء أو إظهار المنتج
function toggleProductVisibility(index) {
  products[index].isVisible = !products[index].isVisible;
  localStorage.setItem("products", JSON.stringify(products));

  displayAdminProducts();
}

// توليد كود تخفيض
document.getElementById("generate-discount-code-btn").addEventListener("click", function() {
  const code = prompt("أدخل كود التخفيض:");
  const discount = prompt("أدخل نسبة التخفيض (%):");
  alert(`تم إنشاء كود التخفيض: ${code} بخصم ${discount}%`);
});

// تحميل المنتجات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function() {
  displayAdminProducts();
});

// عرض المنتجات في صفحة الأدمن
function displayAdminProducts() {
  const productsList = document.getElementById("admin-products-list");
  if (!productsList) return; // إذا كنا مش بصفحة الأدمن لا تعمل

  productsList.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products")) || [];
  
  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}: ${product.name}`;
    productsList.appendChild(li);
  });
}
function displayProducts() {
  const productsSection = document.getElementById("products");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  productsSection.innerHTML = "";
  products.forEach((product) => {
    if (product.isVisible) {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>السعر: ${product.price} جنيه</p>
        <button>إضافة إلى العربة</button>
      `;
      productsSection.appendChild(div);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  displayProducts();
});
// عرض المنتجات في صفحة products.html
function displayProducts() {
  const productsSection = document.getElementById("products");
  if (!productsSection) return; // إذا مش في صفحة المنتجات لا تعمل

  const products = JSON.parse(localStorage.getItem("products")) || [];

  productsSection.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.textContent = product.name;
    div.onclick = () => {
      localStorage.setItem("currentProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    };
    productsSection.appendChild(div);
  });
}

// عرض تفاصيل منتج واحد
function displayProductDetail() {
  const productDetail = document.getElementById("product-detail");
  const productName = document.getElementById("product-name");
  if (!productDetail || !productName) return; // إذا مش بصفحة تفاصيل منتج لا تعمل

  const product = JSON.parse(localStorage.getItem("currentProduct"));
  if (product) {
    productName.textContent = product.name;
  }
}

// عند تحميل أي صفحة نفذ المناسب
document.addEventListener("DOMContentLoaded", function() {
  displayAdminProducts();
  displayProducts();
  displayProductDetail();
});
