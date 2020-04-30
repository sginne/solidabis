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
    $display.append('<b>Paras reitti:</b><br>');
    $.each(json_data,
      function (key,value){
        if (key==($wherefrom.val()+$whereto.val())){
          pathes=value;
        }
      }
    );
    pathes=sortOnKeys(pathes);
    $.each(pathes,
      function (key,value){
        $display.append('Time to travel: '+value[0]+'</br>');

        $.each(value[1],
          function(k1,v1){
            switch(v1[1]) {
              case 'vi':
                clr='green'
              break;
              case 'si':
                clr='blue'
              break;
              case 'pu':
                clr='red'
              break;
              case 'ke':
                clr='yellow'
              default:
                clr='black'
              };
              console.log(clr);
              $display.append(v1[0]);
          }
        );
        $display.append('<br>');
      });
}
