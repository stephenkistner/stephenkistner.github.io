




var container, content, last;
var counter = [];

$( document ).ready(function() {
  refreshCounter();
  console.log(counter);
    $('#closeall').click(function() {
      $('body .popup').remove();
      refreshCounter();
    });

    $('#required').click(function() {
      $('#schedule').toggleClass("reveal");
      $( "#schedule" ).draggable({handle: '.label'});
    });

    $('#schedule .close-btn').click(function() {
      $('#schedule').toggleClass("reveal");
    });

    $('#more').click(addItem);

    function addItem() {


      buildContainer();

      //COMPUTE POSITION AND PLACE WINDOW
      itemWidth = Number($('#blankpopup').css('width').replace(/[^\d\.\-]/g, ''));
      itemHeight = Number($('#blankpopup').css('height').replace(/[^\d\.\-]/g, ''));

      var posx = (Math.random() * ($(document).width() - itemWidth)).toFixed();
      var posy = (Math.random() * ($(document).height() - itemHeight)).toFixed();

      $(container).css({'position': 'absolute', 'top': posy+'px', 'left': posx+'px', 'zIndex': '101'}).appendTo('body');
      windowActions();
    }

    // END DOC READY
   });


//################# LOADING CONTENT  #####################
  function refreshCounter() {
    for (i=0; i<=data.length; i++) {
      counter.push(i);
    }
  }

       function buildContainer() {
        var m = Math.floor(Math.random()*counter.length);
        console.log(m);
        var item = data[counter[m]];
        counter.splice(m,1);
        console.log(counter);
        //item = data[data.length-1];



        if (item.hasOwnProperty("author")) {
          if (item.hasOwnProperty("page")) {
            var page = ', p.' + item.page;
          }
          else {
            var page = '';
          }
          content = '<p class="quote">&ldquo;' + item.quote + '&rdquo;<br><span class="byline">&mdash; ' + item.author + ', <a target="_blank" href="' + item.link + '"><i>' + item.title + '</i></a>' + page +'</span></p>';
        }

        else if (item.hasOwnProperty("imgpath")) {
          var image = '<img src="img/' + item.imgpath + '">';
          var link = '<a target="_blank" href="' + item.link + '">' + image + '</a>';
          content = link;
        }
        else if (item.hasOwnProperty("list")) {

          var listName = '<p><b>' + item.listName + '</b></p>'
          var list = '<ul><li>' + item.list.join('</li><li>') + '</li></ul>';

          content = listName + list;
        }
        else if (item.hasOwnProperty("contents")) {
          if (item.contents.length < 80) {
            content = '<p class="big">'+item.contents+'</p>';
          }
          else {
            content = '<p>'+item.contents+'</p>';
          }
        }
        else {}

        if (item.hasOwnProperty("imgpath")) {
          container = '<div class="popup"><div class="content" style="display: flex; align-items: flex-start; justify-content: center;">'+content+'</div><p class="label">'+item.label+'</p><div class="close-btn"></div></div>';
        }
        else if (item.hasOwnProperty("website")) {
          //content = '<iframe width="100%" height="100%" src="'+ item.website + '"></iframe>';
          container = '<div class="popup"><iframe class="content" style="padding: 0" src="' + item.website + '"></iframe><p class="label">'+item.label+'</p><div class="close-btn"></div></div>';
        }
        else {
          container = '<div class="popup"><div class="content">'+content+'</div><p class="label">'+item.label+'</p><div class="close-btn"></div></div>';
        }

        if (counter.length == 0) {
          refreshCounter();
        }

       }


       function windowActions() {
         $( ".popup" ).draggable({handle: '.label'});
         $('div .close-btn').click(function(e){
           $(e.target).parent().remove();
         });
         $(".popup").click(function() {
           $(".popup").css("zIndex", 1);
           if (last){
             last.css("zIndex", 99);
           }
           $(this).css("zIndex", 100);
           last= $(this);
         });
       }
