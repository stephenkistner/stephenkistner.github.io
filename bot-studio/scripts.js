var scrollTop, scrollOrig = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

if (document.getElementById('postflow') !=null) {
  var posts = document.getElementById('postflow').children;
  var defaultPos = posts[0].offsetTop;
  var firstPostY = defaultPos - scrollTop;
}

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var topBar = document.getElementById('topbar');
var topHidden = false;


// INI
moveDate();
scaleCards();

// COOL SCROLL ACTIONS
window.onscroll = function (e) {
  scrollOrig = scrollTop;
  scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if (document.getElementById('intro') !=null) {
    fadeText();
  }

  if (Math.abs(scrollOrig - scrollTop) <= 5) {
    toggleTopbar();
  }
  scaleCards();
}

// UPDATE CONTENT ON RESIZE
window.onresize = function(e) {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  moveDate();
  scaleCards();
}


// ############## FUNCTIONS ##################

//Fade intro text when cards scroll above
function fadeText() {
  firstPostY = posts[0].offsetTop - scrollTop;
  var transVal = map_range(firstPostY, windowHeight*.3, defaultPos, .2, 1);
  document.getElementById('intro').style.opacity = transVal;
}

//Show and hide topbar on scroll
function toggleTopbar() {
  if (scrollTop > scrollOrig && scrollTop >= 65) {
    topBar.classList.add('slide');
  } else if (scrollTop < scrollOrig && scrollTop < 65) {
    topBar.classList.remove('slide');
  }
}

//Position byline date correctly on articles
function moveDate() {
  if (document.getElementById('article') !=null) {
    var dateElem = document.getElementById("byline-date");
    dateElem.style.marginRight = 0;
    var datePosOrig = dateElem.getBoundingClientRect();
    var contentPos = document.querySelector("#article > section:first-of-type > *:first-child").getBoundingClientRect();
    if (contentPos.left > 50) {
      var offset = datePosOrig.left - contentPos.left;
      dateElem.style.marginRight = offset + 3 + "px";
    }
  }
}


//Scale & translate Cards on entrance
function scaleCards() {
    if (windowWidth > 992 && document.getElementById('postflow') !==null) {
      for (i=0; i< posts.length; i++) {
          var yPos = posts[i].offsetTop - scrollTop;
          var scaleValue = 1;
          if (yPos > windowHeight*.6) {
            scaleValue = map_range(yPos, windowHeight*.6, windowHeight,1,.9);
          } else {
            scaleValue = map_range(yPos, 0, windowHeight*.6, 1.02,1);
          }
          if (0<yPos<windowHeight*.6) {

          }
          //var scaleValue = 1.1*Math.pow(yPos,-.0476);
          //var scaleValue = 1;
          var yOffset = map_range(yPos, windowHeight*.2, windowHeight, -100, 150);
          var xOffset = map_range(yPos,windowHeight*.5, windowHeight*1.1, 0, 75);
          if (i%2 !== 0) {
            xOffset = xOffset*-1;
          }
          //posts[i].style.transform = "scale(" + scaleValue + ") translateY(" + yOffset + "px) translateX(" + xOffset + "px)";
          posts[i].style.transform = "scale(" + scaleValue + ") translateY(" + yOffset + "px)";
      }
    }
    else if (document.getElementById('postflow') !==null) {
      for (i=0; i<posts.length; i++) {
        var yPos = posts[i].offsetTop - scrollTop;
        var yOffset = map_range(yPos, windowHeight*.4, windowHeight, 0, 50);
        var opac = map_range(yPos, windowHeight*.8, windowHeight, 1, 0);
        posts[i].style.transform = "translateY(" + yOffset + "px)";
        posts[i].style.opacity = opac;
      }
    }
}


// %%%%%%%%%%%% UTILITIES %%%%%%%%%%%%%%%%

//Translate a value in a range to another value in different range
function map_range(i,iL,iH,oL,oH, limit = true) {
  var newVal;
  if (limit) {
    i<iL?newVal=oL:i>iH?newVal=oH:newVal=(oL + (oH - oL) * (i - iL) / (iH - iL));
  } else {
    newVal=(oL + (oH - oL) * (i - iL) / (iH - iL));
  }
  return newVal;
}
// Get computed styles for element el
function getStyles(el) {
  return el.currentStyle || window.getComputedStyle(el);
}
