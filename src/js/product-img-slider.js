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