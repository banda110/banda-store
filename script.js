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
function addProduct() {
  const productName = document.getElementById("new-product-name").value;
  if (productName.trim() === "") {
    alert("يرجى كتابة اسم المنتج!");
    return;
  }

  // استرجاع المنتجات القديمة
  let products = JSON.parse(localStorage.getItem("products")) || [];
  
  // إضافة المنتج الجديد
  products.push({ name: productName });

  // حفظ المنتجات مرة ثانية
  localStorage.setItem("products", JSON.stringify(products));
  
  alert("تم إضافة المنتج بنجاح!");
  displayAdminProducts(); // تحديث عرض المنتجات
}

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