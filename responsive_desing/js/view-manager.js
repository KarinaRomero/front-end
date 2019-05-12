/*console.log(menu);
      console.log(burguerButton);
      console.log(window.matchMedia('screen and (max-width:767px)'));*/
      const menu = document.querySelector('.menu');
      const burguerButton = document.querySelector('.burguer-button');
      const ipad = window.matchMedia('screen and (max-width:767px)');

      ipad.addListener(validation);
      function validation(event) {
        //console.log(event.matches);
        if(event.matches) {
          burguerButton.addEventListener('click', hideShow);
          console.log(event.matches);
        } else {
          burguerButton.removeEventListener('click', hideShow);
          console.log(event.matches);
        }
      }
      validation(ipad);
      function hideShow() {
        if(menu.classList.contains('is-active')){
          menu.classList.remove('is-active');
        } else {
          menu.classList.add('is-active');
        }
      }