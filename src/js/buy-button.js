(function(){
    var bb = document.querySelector(".product-buy-button-wrapper");
    var curCartPrice = document.querySelector('.common-cost-value');
    var curCartPriceValue = +curCartPrice.innerText;
    var curCartCount = document.querySelector('.count-items');
    var curCartCountValue = +curCartCount.innerText;

    //Конструктор объекта-товара
    function Product(elem){
        this.name = elem.querySelector('.product-name-heading').innerText;
        this.price = +elem.querySelector('.price-value').innerText;
    }

    if (bb){
        bb.addEventListener('click', addToCart);
        function addToCart(e){

            //Создаем объект товара, который хотят купить
            var elem = e.target.parentElement.parentElement;
            var product1 = new Product(elem);

            //Увеличиваем значение количества
            curCartCountValue++;
            curCartCount.innerText = curCartCountValue;

            //Увеличиваем значение стоимости
            curCartPriceValue += product1.price;
            curCartPrice.innerText = curCartPriceValue;
        }
    }
})();
