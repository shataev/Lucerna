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
(function () {
    var elem = document.querySelector('.product-img-slider');
    if(!elem) return;
    var scrollBtnUp = elem.querySelector('.button-up');
    var scrollBtnDown = elem.querySelector('.button-down');
    var smallImgArr = elem.querySelectorAll('.small-img');

    //Слайдер работает, если имеется больше 3х изображений в блоке
    if(smallImgArr.length > 3){
        var slider = elem.querySelector('.small-img-inner-box');
        var slideTopPosition = slider.style.top;
        var stepSlide = slider.offsetHeight/smallImgArr.length;


        //Если больше 3х избражений, то добавялем кноки вниз-вверх. Кнопка Вниз пока с нулевой прозрачностью
        scrollBtnUp.classList.add('is-visible');

        //Обработчики событий на кнопках
        scrollBtnDown.addEventListener('click', slideDown);
        scrollBtnUp.addEventListener('click', slideUp);

        function slideUp(){

            if(!scrollBtnDown.classList.contains('is-visible')){
                scrollBtnDown.classList.add('is-visible');
            }

            slideTopPosition -= stepSlide;
            slider.style.top = slideTopPosition +'px';

            if(( slider.offsetHeight + +slider.style.top.slice(0, -2)) <= stepSlide){
                scrollBtnUp.classList.remove('is-visible');
            }
        }

        function slideDown(){
            if(!scrollBtnUp.classList.contains('is-visible')){
                scrollBtnUp.classList.add('is-visible');
            }
            slideTopPosition += stepSlide;
            slider.style.top = slideTopPosition +'px';

            //Если блок с миниатюрами встал на прежнее место, то кнопка нижнего скролла скрывается
            if(+slider.style.top.slice(0, -2) == 0){
                scrollBtnDown.classList.remove('is-visible');
            }
        }
    }

    //Обработчик клика по миниатюре
    var mainImg = document.querySelector('.main-img');


    for (var i = 0; i < smallImgArr.length; i++){
        smallImgArr[i].addEventListener('click', function(e){
            var mainImgSrc = mainImg.src;
            var newSrc = mainImgSrc;
            mainImg.src = this.src;
            this.src = newSrc;


        })
    }

})();
(function(){
    var rangeBox = document.querySelector('.range-box');
    if(!rangeBox) return;
    var rangeRocker = document.querySelector('.range-rocker');
    var rangeRockerWidth = rangeRocker.offsetWidth;
    var rangeBoxWidth = rangeBox.clientWidth;
    var rightLimit = rangeBoxWidth - rangeRockerWidth;
    var maxSpan = document.querySelector('.max-value');

    //После загрузки страницы выставляем ползунок на позицию максимальной цены товара на странице. Для этого сначала
    // нужно получить значение максимальной цены

    var thumbsArr = document.querySelectorAll('.thumb');
    var thumbPriceMax = null;//Максимальная цена на страницы

    for (var i = 0; i < thumbsArr.length; i++){
        var thumbCurPrice = +thumbsArr[i].querySelector('.price-value').innerText;

        if(thumbPriceMax == null || thumbCurPrice > thumbPriceMax){
            thumbPriceMax = thumbCurPrice;
        }
    }

    //Если страница не содержит тумб с товарами(например, если это страница отдельного товара)
    if(thumbsArr.length == 0){
        thumbPriceMax = 0;
    }

    //Устанавливаем ползунок и значение максимальной цены
    maxSpan.innerText = thumbPriceMax;
    rangeRocker.style.left = (thumbPriceMax - thumbPriceMax%50)/50 + 'px';


    //Обработчики событий
    var handlers = function(){
        //Событие нажатия кнопки мыши над ползунком
        rangeRocker.addEventListener('mousedown', moveRocker);

        rangeRocker.addEventListener('ondragstart', function(){
            return false;
        });
    };

    //Вывод новой максимальной цены
    function changeMaxValue(arg){
        maxSpan.innerText = arg;
    }

    //Фунция скрывает товары, которые не подходят по фильтру ползунка
    function hideGoods(maxPrice){
        thumbsArr.forEach(function(item, i, arr){
            var thumbCurPrice = +thumbsArr[i].querySelector('.price-value').innerText;

            if(thumbCurPrice > maxPrice){
                thumbsArr[i].style.display = 'none';
            } else {
                thumbsArr[i].style.display = 'inline-block';
            }
        })
    }

    //drag-n-drop
    function moveRocker(){
        var startMouseX = event.pageX;
        var mouseWay = 0;
        var startX = +rangeRocker.style.left.slice(0, -2);//Число - положение левой границы ползунка

        //Событие движения мыши
        document.addEventListener('mousemove', moveFunc);

        //Событие отпускания кнопки мыши
        rangeRocker.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', moveFunc); //Снимаем обработчик с движения мыши
            rangeRocker.onmouseup = null;

            //Скрываем товары, которые не подходят по цене
            hideGoods(+rangeRocker.style.left.slice(0, -2)*50);
        });


        //Функция перемещения ползунка
        function moveFunc(){
            var endMouseX = event.pageX;
            var rockerWay = startX + mouseWay;

            //Ограничения перемещения
            if(rockerWay <= 0){
                rockerWay = 0;
            } else if(rockerWay >= rightLimit){
                rockerWay = rightLimit;
            }

            mouseWay = mouseWay + endMouseX - startMouseX;
            startMouseX = endMouseX; //Начало следующего движения равно концу предыдущего
            rangeRocker.style.left = rockerWay + 'px';

            changeMaxValue(rockerWay*50);
        }
    }

    handlers();
})();