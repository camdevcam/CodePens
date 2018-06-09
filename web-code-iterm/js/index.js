setTimeout(function(){ 
$('#one').addClass('show')
}, 400);

setTimeout(function(){ 
$('#two').addClass('show')
}, 1200);

setTimeout(function(){ 
$('#three').addClass('show')
}, 3000);

setTimeout(function(){ 
   $('#three').addClass('css-typing') 
}, 3000);

setTimeout(function(){ 
$('#four').addClass('show')
}, 4800);

setTimeout(function(){ 
$('#five').addClass('show')
}, 6600);

setTimeout(function(){ 
  $('#five').addClass('css-typing') 
}, 6600);

function ShowLocalDate(){
    var dNow = new Date();
    var localdate= (dNow.getMonth()+1) + '/' + dNow.getDate() + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    $('.date').html(localdate)
}
ShowLocalDate();