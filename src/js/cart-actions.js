;(function () {
    //Проверка, является ли стар
    var shop = document.querySelector('.cart-page');
    if(!shop) return;

    //Удаление товара из корзины, изменение его количества и суммы

    var curCartPrice = document.querySelector('.common-cost-value');
    var curCartPriceValue = +curCartPrice.innerText;
    var curCartCount = document.querySelector('.count-items');
    var curCartCountValue = +curCartCount.innerText;

    var totalPrice = document.querySelector('.total-price-count');
    var totalPriceValue = +totalPrice.innerText;

    //Удаление
    var delButtons = document.querySelectorAll('.product-delete-btn');

    delButtons.forEach(function(item, i, arr){
        item.addEventListener('click', deleteProduct);
    });

    function Product(elem){
        this.product = elem.parentElement.parentElement;
        this.price = +this.product.querySelector('.price-value').innerText;
        this.cost = +this.product.querySelector('.cost-value').innerText;
        this.count = +this.product.querySelector('.count-value').innerText;

        this.hide = function(){
            this.product.style.display = 'none';
        };
    }

    function deleteProduct(e){
        var delProd = new Product(e.target);

        delProd.hide();
        lessCartPrice(delProd.cost);

        //Обновляем кол-во товара на значке корзины
        curCartCount.innerText = curCartCountValue - delProd.count;
        curCartCountValue = curCartCount.innerText;

    }

    function lessCartPrice(price){
        //Обновляем стоимость на значке корзины
        curCartPrice.innerText = curCartPriceValue - price;
        curCartPriceValue = +curCartPrice.innerText;

        //Обновляем Итого
        totalPrice.innerText = totalPriceValue - price;
        totalPriceValue = +totalPrice.innerText;
    }

    function moreCartPrice(price){
        //Обновляем стоимость на значке корзины
        curCartPrice.innerText = curCartPriceValue + price;
        curCartPriceValue = +curCartPrice.innerText;

        //Обновляем Итого
        totalPrice.innerText = totalPriceValue + price;
        totalPriceValue = +totalPrice.innerText;
    }

    //Изменение количества и суммы при нажатии на стрелки"влево" "вправо"
    var buttonLeft = document.querySelectorAll('.count-button.left-arrow');
    var buttonRight = document.querySelectorAll('.count-button.right-arrow');

    //Стрелка меньше
    buttonLeft.forEach(function(item, i, arr){
        item.addEventListener('click', function(e){
            var prod = new Product(e.target);
            if (prod.count > 0){
                prod.count--;
                prod.product.querySelector('.cost-value').innerText -= prod.price;
                prod.product.querySelector('.count-value').innerText =  prod.count;

                lessCartPrice(prod.price);
                curCartCountValue--;
                curCartCount.innerText = curCartCountValue;
            }
        })
    });

    //Стрелка больше
    buttonRight.forEach(function(item, i, arr){
        item.addEventListener('click', function(e){
            var prod = new Product(e.target);
            prod.count++;
            prod.product.querySelector('.cost-value').innerText = prod.cost + prod.price;
            prod.product.querySelector('.count-value').innerText =  prod.count;

            moreCartPrice(prod.price);
            curCartCountValue++;
            curCartCount.innerText = curCartCountValue;
            console.log(curCartCountValue);
        })
    })
})();