 // form open & close

 var form = document.querySelector('.form');
 //  var close_form = document.querySelector('#close_form');
 //  var body = document.querySelector('body')

 function add_product() {
     form.classList.add('active-form');

     var name = document.querySelector('.name').value = '';
     var new_price = document.querySelector('.new_price').value = '';
     var old_price = document.querySelector('.old_price').value = '';
     var des = document.querySelector('.des').value = '';
     var quantity = document.querySelector('.quantity').value = '';
     var img = document.querySelector('.img').value = '';
 }

 close_form.addEventListener('click', function() {
     form.classList.remove('active-form')
 })

 // cart open & close

 var cart = document.querySelector('.cart');
 var cart_icon = document.querySelector('.cart_icon');

 cart_icon.addEventListener('click', function() {
     cart.classList.add('active-cart');
 })

 var close_cart = document.querySelector('#close_cart');
 close_cart.addEventListener('click', function() {
     cart.classList.remove('active-cart')
 })

 var close = document.querySelector('.close');
 close.addEventListener('click', function() {
     cart.classList.remove('active-cart')
 })

 var products = [{
         name: 'Burger',
         new_price: 199,
         old_price: 299,
         des: 'A grilled beef patty on a bun is called a burger. Lunch at a fast food restaurant often consists of a burger and fries.',
         img: 'burger.jpg'
     },
     {
         name: 'Pizza',
         new_price: 499,
         old_price: 599,
         des: 'The authentic Italian-style pizza had a perfectly seasoned herbaceous tomato sauce and flavorful toppings.',
         img: 'pizza.jpg'
     },
     {
         name: 'Cake',
         new_price: 450,
         old_price: 500,
         des: 'A cake is a sweet food made by baking a mixture of flour, eggs, sugar, and fat in an oven.',
         img: 'cake.jpg'
     },
     {
         name: 'Pastry',
         new_price: 220,
         old_price: 300,
         des: 'Pastry chefs create and design pastries, such as pies, doughnuts, cookies, and croissants.',
         img: 'pastry.jpg'
     },
     {
         name: 'Kimchi',
         new_price: 220,
         old_price: 300,
         des: 'Kimchi is a traditional Korean dish whose components can vary but usually include some combination of vegetables, garlic and fish sauce.',
         img: 'kimchi.jpg'
     },
     {
         name: 'Coffee',
         new_price: 540,
         old_price: 600,
         des: 'A perfect blend of coffee, vanilla flavour, milk and cocoa powder. Finished with delicious chocolate whipped c',
         img: 'coffee.jpg'
     },
     {
         name: 'Pan Cake',
         new_price: 220,
         old_price: 280,
         des: 'A pancake is a thin, flat, circular piece of cooked batter made from milk, flour, and eggs. Pancakes are often rolled up or folded and eaten hot with a sweet or savoury filling inside.',
         img: 'pancake.jpg'
     },
     {
         name: 'Pani Puri',
         new_price: 90,
         old_price: 110,
         des: 'Gol gappa (also known as pani puri) is a popular bite-size chaat consisting of a hollow, crispy-fried puffed ball that is filled with potato',
         img: 'pani-puri.jpg'
     },
     {
         name: 'Frankie',
         new_price: 100,
         old_price: 120,
         des: 'A vegetarian frankie usually includes assorted toppings of veggie stir fry, legumes, paneer, cheese, potato tikki, veg cutlet, lentils kabab.',
         img: 'frankey.jpg'
     }
 ]


 var listCards = [];

 var data = JSON.stringify(products)
 localStorage.setItem('Products', data)

 // form-data-add
 function createData() {
     var data = JSON.stringify(products)
     localStorage.setItem('Products', data)

     var name = document.querySelector('.name').value;
     var new_price = document.querySelector('.new_price').value;
     var old_price = document.querySelector('.old_price').value;
     var des = document.querySelector('.des').value;
     var quantity = document.querySelector('.quantity').value;
     var img = document.querySelector('.img').files[0].name;

     var obj = {
         name: name,
         new_price: parseInt(new_price),
         old_price: parseInt(old_price),
         des: des,
         img: img,
     }
     products.push(obj);
     console.log(products)

     var data = JSON.stringify(products)
     localStorage.setItem('Products', data)

     var name = document.querySelector('.name').value = '';
     var new_price = document.querySelector('.new_price').value = '';
     var old_price = document.querySelector('.old_price').value = '';
     var des = document.querySelector('.des').value = '';
     var quantity = document.querySelector('.quantity').value = '';
     var img = document.querySelector('.img').value = '';
     alert('Product Added Successfully');
     viewData();
 }
 viewData();

 function viewData() {
     var data = localStorage.getItem('Products');
     var products = JSON.parse(data);

     var data = `<div style="width:1160px; margin:0 auto; z-index:-1; display:flex; flex-wrap:wrap;">`;

     // for(var i=0; i<products.length; i++){
     products.forEach((value, key) => {
         data += `<div class="food">`
         data += `<img src="img/${value.img}" class="p_img" />`
         data += `<div style="padding: 0 20px">`
         data += `<h2 style=" margin:15px 0;">${value.name}</h2>`
         data += `<div style=" display:flex; align-items:center; margin:10px 0">${value.new_price} / <del style="margin-left:5px;"> ${value.old_price} </del> </div>`
         data += `<p style="color:#575757">${value.des}</p>`
         data += `<button class="p_btn" onclick="add_to_cart(${key})">Add To Cart</button>`
         data += `</div></div>`
     })
     data += `</div>`
     document.getElementById('res').innerHTML = data;
 }

 function add_to_cart(key) {
     if (listCards[key] == null) {
         listCards[key] = JSON.parse(JSON.stringify(products[key]));
         listCards[key].quantity = 1;
     } else {
         alert('This product is alredy added')
     }
     reloadCart();
 }

 var listCard = document.querySelector('.listCard');
 let total = document.querySelector('.total');
 let quantity = document.querySelector('.quantity');

 function reloadCart() {
     listCard.innerHTML = '';
     var count = 0;
     var totalPrice = 0;

     var newDiv = `<div>`;

     listCards.forEach((value, key) => {
         totalPrice += value.new_price;
         count += value.quantity;

         if (value != null) {
             newDiv += `<li>
                <img src="img/${value.img}"/>
                <p>${value.name}</p>
                <p>${value.new_price+" Rs."}</p>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div></li>`;
         }
     })
     newDiv += `</div>`
     document.querySelector('.listCard').innerHTML = newDiv;

     total.innerHTML = totalPrice + " Rs.";
     quantity.innerHTML = count;
 }

 function changeQuantity(key, quantity) {
     if (quantity == 0) {
         delete listCards[key];
     } else {
         listCards[key].quantity = quantity;
         listCards[key].new_price = quantity * products[key].new_price;
     }
     reloadCart();
 }