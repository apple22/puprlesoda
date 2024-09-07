'use strict';

/* 모달팝업 */
var startPop = function() {
  var winW = $(window).width();
  if (winW > 1024) {
  $('.start_pop').draggable({
    handle: '.modal-header',
    containment: 'html'
  });
  $('.start_pop__slider').draggable({
    handle: '.modal-header',
    containment: 'html'
  });
  }
}

/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function(){
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}

$(document).on('mouseover', function () {
  magnificPop.init();
});


var wowJS = new WOW().init(); 

//wowrap
var wowrap = $('.wowrap');
$(wowrap).each(function () {
  $(this)
    .find('.wow')
    .each(function (index) {
      var eq = index / 8 + 's';
      $(this).attr('data-wow-delay', eq);
    });
  $(this)
    .find('.animated')
    .each(function (index) {
      var eq = index * 250;
      $(this).attr('data-id', 'delay-' + eq);
    });
});


$(document).ready(function(){
  $(document).on('click','.popup-link, .ham-btn',function(){
    $('body').addClass('body-fixed');
  })
  $(document).on('click','.mfp-close, .mobile-nav-close',function(){
    $('body').removeClass('body-fixed');
  })
  // ESC 키 눌렀을 때 팝업이 열려있는 경우
  $(document).keyup(function(e) {
    if (e.key === "Escape" && $.magnificPopup.instance.isOpen) {
      $.magnificPopup.close();
      $('body').removeClass('body-fixed'); // ESC 키 눌렀을 때 body-fixed 클래스 제거
    }
  });
  $(document).on('click', '.top-btn', function(){
    var $btn = $(this);
      if ($(window).scrollTop() == 0) {
          return false; // 페이지가 이미 상단에 있으면 클릭 비활성화
      }
      $('html, body').animate({scrollTop : 0}, 800);
      $btn.prop('disabled', true); // 버튼 비활성화
      setTimeout(function(){
          $btn.prop('disabled', false); // 0.5초 후 버튼 활성화
      }, 500);
      return false;
  });
  checkScroll(); // 페이지가 로드될 때 스크롤 위치를 확인하고 클래스 추가

  $(window).scroll(function(){
    checkScroll(); // 스크롤 시에도 스크롤 위치를 확인하고 클래스 추가
  });

  function checkScroll() {
    var curr = $(window).scrollTop();

    if(curr > 50){
      $('.header').addClass('scrolled');
    } else {
      $('.header').removeClass('scrolled');
    }
  }
});
$(document).ready(function() {
  $(document).on('click', '.ham-btn',function() {
      $(this).addClass('active');
      $('.sitemap').addClass('active');
      $('body').addClass('body-fixed');
  });
  $(document).on('click', '.close-sitemap',function() {
    $('.ham-btn').removeClass('active');
    $('.sitemap').removeClass('active');
    $('body').removeClass('body-fixed');
  });
  $(document).on('click', '.select-lang',function() {
    $(this).toggleClass('active');
    $(this).children('ul').slideToggle();
  });
});

function activateMenuAndBreadcrumb(P_dp1, P_dp2) {
  var breadcrumb = $('.breadcrumb');

  // 1. 기존 breadcrumb li 요소 유지
  var existingItems = breadcrumb.find('li');

  // 2. breadcrumb의 기존 항목 제거
  breadcrumb.find('li').not(':first').remove(); // 첫 번째 항목(홈 아이콘)을 제외한 나머지 항목 제거

  // 3. depth-1에 따른 breadcrumb 항목 추가
  $('.depth-1').each(function() {
      if ($(this).data('dp1') == P_dp1) {
          var $this = $(this);

          // 1. depth-1-tit에 active 클래스 추가
          $this.find('.depth-1-tit').addClass('active');

          // 2. depth-1의 해당 li에 active 클래스 추가
          var dp2Html = '';
          $this.find('li').each(function() {
              if ($(this).data('dp2') == P_dp2) {
                  $(this).find('a').addClass('active');
                  dp2Html = $(this).find('a').html(); // P_dp2에 해당하는 HTML 저장
              }
          });

          // 3. 해당 depth-1의 ul 요소를 sub-nav에 복사
          var subNavContent = $this.find('ul').clone();
          $('.sub-nav, .util-wrap nav').empty().append(subNavContent);

          // 4. breadcrumb에 경로 추가
          var dp1Html = $this.find('.depth-1-tit').html(); // P_dp1에 해당하는 HTML
          breadcrumb.append('<li>' + dp1Html + '</li>');

          if (dp2Html) {
              breadcrumb.append('<li>' + dp2Html + '</li>');
          }

          // 종료
          return false; // each 루프를 멈추기 위해 false 반환
      }
  });

  /* sitemap gnb 복사 */
  const gnbClone = $('.header .gnb').clone();
  gnbClone.appendTo('.sitemap .list-bx')
}

$(document).ready(function() {
  // split-txt 클래스가 있는 요소가 있는지 확인
  if ($('.split-txt.tit').length > 0) {
    // h2 요소의 텍스트 내용을 가져온다.
    var text = $('.split-txt.tit').html();

    // <br> 태그를 유지하면서 각 문자를 span 태그로 감싼다.
    var newText = '';
    var insideTag = false;

    for (var i = 0; i < text.length; i++) {
        if (text[i] === '<') {
            // 태그가 시작될 때, insideTag 플래그를 true로 설정
            insideTag = true;
        }
        
        if (insideTag) {
            // 태그 내에서는 그냥 추가
            newText += text[i];
        } else if (text[i].trim() !== '') {
            // 태그 밖에서는 공백이 아닌 문자를 span으로 감싼다.
            newText += '<span>' + text[i] + '</span>';
        } else {
            // 공백 문자는 그대로 추가하지 않음.
            newText += ' ';
        }

        if (text[i] === '>') {
            // 태그가 종료될 때, insideTag 플래그를 false로 설정
            insideTag = false;
        }
    }

    // 변경된 내용을 h2 요소에 다시 적용한다.
    $('.split-txt.tit').html(newText);
  }
  

/* 애니메이션 효과 적용 */
(function() {
  var elements = [];
  var elementTopPositions = [];
  var elementCount = $('.ani-effect').length;

  var scrollTop;
  var windowHeight = $(window).height();

  // 페이지가 완전히 로드된 후 스크립트 실행
  $(window).on('load', function() {
    // 초기화 및 요소 위치 계산
    for (var i = 0; i < elementCount; i++) {
      elements[i] = $('.ani-effect').eq(i);
      elementTopPositions[i] = elements[i].offset().top;
    }

    // 스크롤과 리사이즈 이벤트 핸들러
    $(window).on('scroll resize', function() {
      scrollTop = $(this).scrollTop();
      var viewGuide = scrollTop + windowHeight / 1.3;

      // 요소가 화면에 보이면 'on' 클래스 추가
      for (var i = 0; i < elementCount; i++) {
        if (!elements[i].hasClass('effect-on') && viewGuide >= elementTopPositions[i]) {
          elements[i].addClass('effect-on');
        }
      }
    });

    // 처음 로드될 때 한 번 스크롤 이벤트를 트리거해서 요소를 확인
    $(window).trigger('scroll');
  });
})();
});

$(document).ready(function(){
  /* 개수 단순 복사 */
  $('[data-copy]').each(function() {
    var $element = $(this);
    var copyCount = parseInt($element.data('copy'), 10);

    for (var i = 1; i < copyCount; i++) {
        var $clone = $element.clone();
        $clone.attr("data-copy","")
        $element.after($clone);  // 원래 요소 바로 뒤에 복사된 요소 추가
    }
});
});