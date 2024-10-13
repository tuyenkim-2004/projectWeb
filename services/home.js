// fetch('http://localhost:3000/new_arrivals')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (new_arrivals) {
//         const protList_1 = document.querySelector('.product_1');
//         // const protList_2 = document.querySelector('.product_2');
//         new_arrivals.forEach(product => {
//             // Tạo một phần tử div để chứa sản phẩm
//             const demo = document.createElement('div'); 
//             demo.classList.add('col-3');
//             demo.innerHTML = `
//                 <div class="card">
//                     <img class="card-img-top" src="${product.image}" alt="Card image" style="width:100%">
//                     <div class="card-body text-center">
//                         <h4 class="card-title" class="">${product.name}</h4>
//                         <p class="card-text">${product.price} VNĐ</p>
//                         <a href="#" class="btn btn-primary btn-order">Mua</a>
//                         <a href="#" class="btn btn-primary btn-shopping">
//                             <i class="bi bi-handbag-fill icon-shopping"></i>
//                         </a>
//                     </div>
//                 </div>
//             `;

//             // Thêm phần tử demo vào productList
//             protList_1.appendChild(demo);
//         });
        
//     })
//     .catch(function (error) {
//         console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
//     });



function fetchAndDisplayProducts(url, selector) {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(selector);
            products.forEach(product => {
                const demo = document.createElement('div'); 
                demo.classList.add('col-3');
                demo.innerHTML = `
                    <div class="card">

                        <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
                            <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
                        </a>
                        <div class="card-body text-center">
                            <h4 class="card-title">${product.name}</h4>
                            <p class="card-text">${product.price} VNĐ</p>
                            <a href="#" class="btn btn-primary btn-order">Mua</a>
                            <a href="#" class="btn btn-primary btn-shopping">
                                <i class="bi bi-handbag-fill icon-shopping"></i>
                            </a>
                        </div>
                    </div>
                `;
                productList.appendChild(demo);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        });
}

// Fetch và hiển thị sản phẩm mới về
fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1');
console.log (
fetchAndDisplayProducts('http://localhost:3000/new_arrivals', '.product_1')

)

// Fetch và hiển thị sản phẩm bán chạy
fetchAndDisplayProducts('http://localhost:3000/best_sellers', '.product_2');

// Fetch và hiển thị tất cả sản phẩm
fetchAndDisplayProducts('http://localhost:3000/products', '.products');


document.querySelectorAll('.category').forEach(function(category) {
    category.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
        const categoryId = this.dataset.categoryId;
        const elementMypham = document.querySelector('.mypham');
        elementMypham.style.display = 'none'; // Ẩn phần tử

        // Lấy dữ liệu từ db.json
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                // Lọc sản phẩm theo categoryId
                const filteredProducts = products.filter(product => product.categoryId == categoryId);
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    if (products.length === 0) {
        productList.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
        return; 
    }

    products.forEach(product => {
            const demo = document.createElement('div'); 
            demo.classList.add('col-3');
            demo.innerHTML = `
                <div class="card">
                        <a href="/projectWeb/page/product/productDetail/proDetail.html?id=${product.id}">
                            <img class="card-img-top" src="${product.image}" alt="${product.name} - Hình ảnh sản phẩm" style="width:100%">
                        </a>
                        <div class="card-body text-center">
                            <h4 class="card-title">${product.name}</h4>
                            <p class="card-text">${product.price} VNĐ</p>
                            <a href="#" class="btn btn-primary btn-order">Mua</a>
                            <a href="#" class="btn btn-primary btn-shopping">
                                <i class="bi bi-handbag-fill icon-shopping"></i>
                            </a>
                        </div>
                    </div>
            `;

            // Thêm phần tử demo vào productList
            productList.appendChild(demo);
    });
}


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Thay đổi thông tin trong data
        data.newProperty = 'New Value';

        // Gửi dữ liệu đã thay đổi trở lại máy chủ (nếu cần)
        return fetch('update-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    })
    .then(response => {
        if (response.ok) {
            console.log('Dữ liệu đã được cập nhật!');
        }
    })
    .catch(error => console.error('Có lỗi xảy ra:', error));q   