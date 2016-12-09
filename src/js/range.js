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