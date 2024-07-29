// $(document).ready(function(){
// $('#myTable').DataTable();
// } );


var total = 0 ;
$(document).ready(function() {
  $('#myTable').DataTable( {
   
    columnDefs: [ { type: 'date', 'targets': [2] } ],
    order: [[ 2, 'desc' ]],

    columnDefs: [
      {
        targets: 1,
        render: $.fn.dataTable.render.number(',', '.', 0, '$')
      }
    ],

      "footerCallback": function ( row, data, start, end, display ) {
          var api = this.api(), data;

          var intVal = function ( i ) {
              return typeof i === 'string' ?
                  i.replace(/[\$,]/g, '')*1 :
                  typeof i === 'number' ?
                      i : 0;
          };

          // Total over all pages
          total = api
              .column( 1 )
              .data()
              .reduce( function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0 );

          // Total over this page
          pageTotal = api
              .column( 1, { page: 'current'} )
              .data()
              .reduce( function (a, b) {
                  return intVal(a) + intVal(b);
              }, 0 );
        

          // Total filtered rows on the selected column (code part added)
          var sumCol4Filtered = display.map(el => data[el][1]).reduce((a, b) => intVal(a) + intVal(b), 0 );
        
          // Update footer
          // $( api.column( 1 ).footer() ).html(
          //     '$'+pageTotal +' ( $'+ total +' total) ($' + sumCol4Filtered +' filtered)'
          // );
          console.log(total);
      }
  } );
} );


$(document).ready(function() {
    var boxCount = 1;
    bdate.max = new Date().toISOString().split("T")[0];
  
    $('#form2').submit(function(e) {
      e.preventDefault();
      var bname = $("#bname").val();

    //   $(function(){
    //     var dtToday = new Date();
    
    //     var month = dtToday.getMonth() + 1;
    //     var day = dtToday.getDate();
    //     var year = dtToday.getFullYear();
    
    //     if(month < 10)
    //         month = '0' + month.toString();
    //     if(day < 10)
    //         day = '0' + day.toString();
    
    //     var maxDate = year + '-' + month + '-' + day;    
    //     $('#bdate').attr('max', maxDate);
    // });

      // var bdate = $("#bdate").val();

      var tempDate = new Date($("#bdate").val());
      var month = (tempDate.getMonth() + 1).toString().padStart(2, '0');
      var day = tempDate.getDate().toString().padStart(2, '0');
      var year = tempDate.getFullYear();
    var fDate = [ day,month , year].join('-');
    //   var tempDate = new Date($("#bdate").val());
    // var fDate = [ tempDate.getDate(),tempDate.getMonth() + 1, tempDate.getFullYear()].join('-');
      
      var bmsg= $("#bmsg").val() ;
  
      var boxHtml = 
      '<div class="d-flex ">'+
          '<div class="me-2">'+
              '<img src="https://source.unsplash.com/400x400/?person" alt="" srcset="" class="rounded-circle " height="60" width="60">'+
          '</div>'+
          '<div class="w-100">'+
              '<h4>'+ bname  +' ,<small class="fs-6 fw-normal ms-2 text-body-secondary">'+ fDate +'</small>'+'</h4>'+
              
              '<p class="w-75 text-body-secondary">' + bmsg + '</p>'+
          '</div>'+
      '</div>'+
      '<hr>';
    
  
      $('.hscrol').prepend(boxHtml);
      boxCount++;
      
    $("#bexampleModal").modal('hide');
    $('#form2')[0].reset();

    });

    $('.ctClose').on('click', function(e){
e.preventDefault();
$('#form2')[0].reset();

    });
  });





$(document).ready(function () {

    var t = $('#myTable').DataTable();
    var counter = 1;
  date.max = new Date().toISOString().split("T")[0];

    
    $('#form1').on('submit', function (e) {
      e.preventDefault();
      var name = $("#name").val();
    var subject = $("#subject").val();
    
    // var date = $("#date").val();
//     $('#date').datepicker({
//       format: "dd/mm/yyyy",
//       autoclose: true,
//       orientation: "top",
//       endDate: "today"

// });

// if(month < 10)
//         month = '0' + month.toString();
//     if(day < 10)
//         day = '0' + day.toString();

var tempDate = new Date($("#date").val());
var month = (tempDate.getMonth() + 1).toString().padStart(2, '0');
var day = tempDate.getDate().toString().padStart(2, '0');
var year = tempDate.getFullYear();
var fDate = [month, day, year].join('/');
// var tempDate = new Date($("#date").val());
// var fDate = [tempDate.getMonth() + 1, tempDate.getDate(), tempDate.getFullYear()].join('/');
    
    // if(subject<0){
    //   subject=0;
    // }
        t.row.add([
          name,subject,fDate
        ]).draw(false);
         counter++;
    $("#exampleModal").modal('hide');
      
    $('#form1')[0].reset();


    });

    $('.dtClose').on('click', function(e){
      e.preventDefault();
      $('#form1')[0].reset();
      
          });
    
});

$(document).ready(function() {
  const opts = {
    angle: 0,
    lineWidth: 0.5,
    radiusScale: 1,
    animationSpeed: 32,
    pointer: {
      length: 0.66,
      strokeWidth: 0.04,
      color: '#000000'
    },
    limitMax: false,
    limitMin: false,
    colorStart: '#6FADCF',
    colorStop: '#8FC0DA',
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true,
    staticLabels: {
      font: '10px sans-serif',
      labels: [0, 20000, 40000, 60000, 80000, 100000],
      color: '#000000',
      fractionDigits: 0
    },
    staticZones: [
      {strokeStyle: "rgb(255,0,0)", min: 0, max: 20000},
      {strokeStyle: "rgb(200,100,0)", min:  20000, max: 40000},
      {strokeStyle: "rgb(150,150,0)", min:  40000, max:  60000},
      {strokeStyle: "rgb(100,200,0)", min:  60000, max:  80000},
      {strokeStyle: "rgb(0,255,0)", min:  80000, max:  100000}
    ]
  };
  const target = $('#preview')[0];
  const gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 100000;
  gauge.setMinValue(0);
  gauge.set(0);
  


  function updateReadings() {
    if(total > gauge.maxValue){
      total= gauge.maxValue ;
    };
    gauge.set(total);
    
    
  }

  
  updateReadings();
  setInterval(function() {
    updateReadings();
  }, 1 * 1000);
});


 
  $(document).ready(function(){
     
function updateVariableValue() {
  myVariable = total;
  var formattedValue = myVariable.toLocaleString();
  $("#dval").text(formattedValue);

  setTimeout(updateVariableValue, 1000);
}



updateVariableValue();

// $(myVariable).toLocalString();
// myVariable.toLocalString(en);
// myVariable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// $().each(function(){
//   $(this).html(commaSeparateNumber($(this).html()));
// });

    // var dval;
    // function updateReadings() {
    // };
    
    //  dval =
    // '<p class="text-center display-6">'+ '$'+total +'</p>' ;
    // $('canvas').after(dval);

    
    // setInterval(function() {
    //   updateReadings();
    // }, 1 * 1000);
    // updateReadings();



    // $('.dval').textContnet= $+`$(total)`;

  });

  // $(document).ready(function(){

  //   function updateReadings() {

  //     $(dval).val();
  //     };
  //     updateReadings();
  //     setInterval(function() {
  //     	updateReadings();
  //     }, 1 * 1000);
  // });


//   $(document).ready(function () {

//   const gaugeElement = document.querySelector(".gauge");

//   function setGaugeValue(gauge, value) {
//     if (value < 0 || value > 1) {
//       return;
//     }
  
//     gauge.querySelector(".gauge__fill").style.transform = `rotate(${
//       value / 2
//     }turn)`;
//     gauge.querySelector(".gauge__cover").textContent = `${Math.round(
//       value * 100
//     )}%`;
//   }
  
//   setGaugeValue(gaugeElement, 0.3);
// });
  
// $
// var $datepicker = $('#datepicker');
// $datepicker.datepicker();
// $datepicker.datepicker('setDate', new Date());

// $(document).ready(function(){
//   $(function() {
//     $( "#bdate" ).datepicker({  maxDate: new Date() });
//   });
// });