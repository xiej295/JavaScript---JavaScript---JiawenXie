var base_url = "https://fonts.googleapis.com/css?family=";

var $families = $("#families"),
    $weights = $("#weights"),
    $italic = $("#italic"),
    $output = $("#output");

var output_url;

$families.keyup(createUrl);
$weights.keyup(createUrl);
$italic.change(createUrl);

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
