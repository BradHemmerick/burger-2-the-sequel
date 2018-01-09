var undevouredDOM = $('#undevoured')
var devouredDOM = $('#devoured')

$.get("/api/burgers").then(res => {
  console.log(res)
    for(var i = 0; i < res.length; i++){
      if (res[i].devoured == false) {
        var div1 = $("<div>")
        var div2 = $("<div>")
        div1.attr({
          class: "col-xs-9 text-center"
        })
  
        div1.append($('<pre>').append(`${res[i].id}. ${res[i].name}`))
  
        div2.attr({
          class: "col-xs-3 text-center"
        })
        var form = $("<form>").attr({
          class: "button-size devour-form"
        })

        .append($("<br>"))

        .append($("<button id='notEaten' data-id='" + res[i].id + "' data-name='" + res[i].name +"'> Devour it!</button>").attr({
          type: "submit",
          class: "btn btn-success"
        }))

        div2.append(form)

        undevouredDOM.append(div1).append(div2)
      }else{
        devouredDOM.append($("<p>" + `${res[i].id}. ${res[i].name}` + "</p>").attr({
          class: "form-control",
          value: res[i].id,
          type: "text",
        }))
      }
    }
})


$("#undevoured").on("click", '#notEaten', function(event){
  event.preventDefault()
  var burger = {
    name: $(this).attr("data-name"),
    devoured: true,
    id: $(this).attr('data-id')
  }
  $.ajax({
    url: "api/burgers",
    type: "PUT",
    data: burger
  }).then(res => console.log(res))
  console.log(burger)
  location.reload()
})

$("text-enter-button").on("click", function (e) {
  e.preventDefault()

  var newburger = {
    name: $("#name").val().trim()
  }
  $.post('/api/burgers', newburger).then((res) => {
    console.log(res);
    location.reload()
  })
})