class SplitLine{
	constructor(el) {
		this.el = el;
		this.el.classList.add('text--idle');
		this.classes = {
			word: 'splitText__word',
			line: 'splitText__line'
		}
		this.initialState = this.el.innerHTML;
		this.init();
	}

	init(){
		this.addSpans();
		this.animate();
	}

	addSpans() {
		let text = this.el.textContent.split(' ');
		let textHtml = '';
		for (let i = 0; i < text.length; i++) {
			let space = i == text.length - 1 ? '' : '&#160;';

			textHtml += `<span class="${this.classes.word} ${this.classes.word}--idle" data-content="${text[i]}">${space}</span>`;

		}
		this.el.innerHTML = textHtml;
	}

	animate() {
		let divs = this.el.querySelectorAll('.' + this.classes.word);
		let delay = 0;
		let i = 0;
		let timer;
		this.el.classList.remove('text--idle');
		timer = window.setInterval(() => {
			divs[i].classList.remove(this.classes.word + '--idle');
			i++;
			if (i >= divs.length) {
				window.clearTimeout(timer);
				window.setTimeout(this.resetState.bind(this), 1000);
			}
		},50);
	}


	resetState() {
		this.el.innerHTML = this.initialState;
	}
}

new SplitLine(document.querySelector('.text'));









var base_url = "https://fonts.googleapis.com/css?family=";
var base_textImg = "img<";
var end_textImg = ">";

var $families = $("#families"),
    $weights = $("#weights"),
    $italic = $("#italic"),
    $width = $("#width"),
    $height = $("#height"),
		$border = $("#border"),
		$borderRadius = $("#borderRadius"),
		$opacity = $("#opacity"),
    $output = $("#output"),
    $output2 = $("#output2");

var output_url;
var output_Img;

var textImge_Output;

$families.keyup(createUrl);
$weights.keyup(createUrl);
$italic.change(createUrl);
$width.keyup(createImg);
$height.keyup(createImg);
$border.keyup(createImg);
$borderRadius.keyup(createImg);
$opacity.keyup(createImg);

function createImg() {
  var textimg = "";
  if($width.val()){
    var width = getWidth($width.val());
  }
  if($height.val()){
    var height = getHeight($height.val());
  }
	if($border.val()){
    var border = getBorder($border.val());
  }
	if($borderRadius.val()){
    var borderRadius = getBorderRadius($borderRadius.val());
  }
	if($opacity.val()){
    var opacity = getOpacity($opacity.val());
  }

  var wid_strings = [];
  for(var j = width.length; j > 0; j--) {
    var wid = width[j - 1];
    wid_strings.push(wid);
  }

  var hei_strings = [];
  for(var k = height.length; k > 0; k--) {
    var hei = height[k - 1];
    hei_strings.push(hei);
  }

	var bor_strings = [];
  for(var l = border.length; l > 0; l--) {
    var bor = border[l - 1];
    bor_strings.push(bor);
  }

	var bod_strings = [];
  for(var m = borderRadius.length; m > 0; m--) {
    var bod = borderRadius[m - 1];
    bod_strings.push(bod);
  }

	var opa_strings = [];
  for(var n = opacity.length; n > 0; n--) {
    var opa = opacity[n - 1];
    opa_strings.push(opa);
  }

  textimg += "Width:" + wid_strings + ";";
  textimg += "Height:" + hei_strings + ";";
	textimg += "Border:" + bor_strings + ";";
	textimg += "Border-Radius:" + bod_strings + ";";
	textimg += "Opacity:" + opa_strings + ";";
  console.log(textimg);

	textImge_Output = base_textImg + textimg + end_textImg;

  $output2.val(textImge_Output);
}

function createUrl() {
  var url = "";
  if($families.val()) {
    url += base_url;
    var families = getFamilies($families.val());
    var weights = getWeights($weights.val(), $italic.is(":checked"));
    var fam_strings = [];
    for(var i = families.length; i > 0; i--) {
      var fam = families[i - 1];
      if(weights) fam += ":";
      fam += weights;
      fam_strings.push(fam);
    }
    url += fam_strings.join("|");
    $output.val("<link href=\""+url+"\" rel=\"stylesheet\" type=\"text/css\">");
    //return url;
    //console.log(url);
    output_url = url;
    console.log(output_url);


  }
}

function getWidth(width) {
  return width
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getHeight(height) {
  return height
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getBorder(border) {
  return border
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getBorderRadius(borderRadius) {
  return borderRadius
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getOpacity(opacity) {
  return opacity
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getFamilies(families) {
  return families
            .replace(/ /g, "+") // all spaces into +
            .replace(/\+?,\+?/g, ",") // remove + on either side of ,
            .replace(/ ?,$/g, "") // remove trailing ,
            .replace(/\+$/g, "") // remove trailing +
            .split(",") // split ,
            .sort(); // sort
}

function getWeights(weights, italic) {
  var ws = weights.replace(/ /g, "").replace(/,$/g, "").split(",").sort();
  var string = [];
  $.each(ws, function(i, weight) {
    var w = weight;
    if(ws.length === 1 && !italic && w === "400") {
    } else {
      string.push(w);
    }
    if(italic) string.push(weight + "italic");
  });
  return string.join(",");
}

function clickFunction() {
  window.location = output_url;
  //console.log(generated_url);
}
