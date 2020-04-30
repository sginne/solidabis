var json_data;
var pathes;
var jqxhr = $.getJSON( "generated.json", function() {
  console.log( "success" );
})
  .done(function(data) {
    var $wherefrom=$("#from");
    var $whereto=$("#to");
    json_data=data;
    $.each(data.stops,function (index,value){
      $whereto.append($('<option value></option>').val(value).text('Pysäkki '+value));
      $wherefrom.append($('<option value></option>').val(value).text('Pysäkki '+value));
    });
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

  function sortOnKeys(dict) {

      var sorted = [];
      for(var key in dict) {
          sorted[sorted.length] = key;
      }
      sorted.sort();

      var tempDict = {};
      for(var i = 0; i < sorted.length; i++) {
          tempDict[sorted[i]] = dict[sorted[i]];
      }

      return tempDict;
  }

function update()
{
    var $display=$("#display");
    var $wherefrom=$("#from");
    var $whereto=$("#to");
    $display.text('');
    $display.append('<b>Possible path from fastest to slowest:</b><hr><br>');
    $.each(json_data,
      function (key,value){
        if (key==($wherefrom.val()+$whereto.val())){
          pathes=value;
        }
      }
    );
    pathes=sortOnKeys(pathes);
    if(Object.keys(pathes).length==0){
      $display.append('<b><i>No routes for given destination</i></b><hr><br>')
    };

    $.each(pathes,
      function (key,value){
        $display.append('Time to travel: '+value[0]+'</br>');

        $.each(value[1],
          function(k1,v1){
            switch(v1[1]) {
              case 'vi':
                clr='Lime'
              break;
              case 'si':
                clr='Aqua'
              break;
              case 'pu':
                clr='Coral'
              break;
              case 'ke':
                clr='yellow'
              default:
                clr='black'
              };
              $display.append('<font style="background-color:'+clr+'">'+v1[0]+'</font>');

          }
        );
        $display.append('<hr><br>');
      });
  $display.append('<b>End of possible routes</b>');
  pathes={};
}
