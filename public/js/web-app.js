// All Orders
function getAllOrders(){
    $("#table-title").html("Loading...");
    $("#table-results").html("");
    $("#table-trs").html("");

    $.ajax({
    url : 'orders',
    type : 'GET',

    dataType: 'json',
    success: function(data){
        console.log(data.orders);

        if (data.orders == null){
            $("#table-results").html("<div class='alert alert-warning'>Ops, there's nothing to show.</div>")
            $("#table-title").html("");
        } else {

            $("#table-trs").append("<th>#</th><th>Customer</th><th>Address 1</th><th>City</th><th>Post Code</th><th>Country</th><th>Amount</th><th>Status</th><th>Deleted</th><th>Actions</th>");

            for (var i=0; i < data.orders.length; i++) {

                var disabled;
                var color;

                if(data.orders[i].status != 'cancelled'){
                    disabled = '';
                    color = 'danger';
                } else {
                    disabled = "disabled='disabled'";
                    color = "secondary";
                }
                $("#table-results").append("<tr>"+
                                                    "<td>"+data.orders[i].id+""+
                                                    "<td>"+data.orders[i].customer+"</td>"+
                                                    "<td>"+data.orders[i].address1+"</td>"+
                                                    "<td>"+data.orders[i].city+"</td>"+
                                                    "<td>"+data.orders[i].postcode+"</td>"+
                                                    "<td>"+data.orders[i].country+"</td>"+
                                                    "<td>"+data.orders[i].amount+"</td>"+
                                                    "<td>"+data.orders[i].status+"</td>"+
                                                    "<td>"+data.orders[i].deleted+"</td>"+
                                                    "<td><button type='button' class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-"+color+" text-white' "+disabled+" onclick='cancelOrder("+data.orders[i].id+")'><i class='fa fa-cancel'></i></button></td>"+
                                                    "</tr>");
            }

            $("#table-title").html("");

        }

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}

function readJsonFile(){
    $.ajax({
    url : 'orders-from-json',
    type : 'GET',

    dataType: 'json',
    success: function(data){
        console.log(data);
        getAllOrders();
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        getAllOrders();
    }
    });

}


function cancelOrder(id){
    $.ajax({
    url : 'cancel-order/'+id,
    type : 'PUT',
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    dataType: 'json',
    success: function(data){
        console.log(data);
        getAllOrders();
        $("#message-span").html("<small><div class='alert alert-success'>"+data.message+"</div></small>");
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        getAllOrders();
    }
    });

}



// List by search
function getAllBySearch(){
    $("#table-title").html("Loading...");
    $("#table-results").html("");
    $("#table-trs").html("");

    $.ajax({
    url : 'search-order',
    type : 'GET',
    data: {
            "customer": $("#search-form").val()
        },
    dataType: 'json',
    success: function(data){
        console.log(data.orders);

        if (data.orders == null){
            $("#table-results").html("<div class='alert alert-warning'>Ops, there's nothing to show.</div>")
            $("#table-title").html("");
        } else {

            $("#table-trs").append("<th>#</th><th>Customer</th><th>Address 1</th><th>City</th><th>Post Code</th><th>Country</th><th>Amount</th><th>Status</th><th>Deleted</th><th>Actions</th>");

            for (var i=0; i < data.orders.length; i++) {

                var disabled;
                var color;

                if(data.orders[i].status != 'cancelled'){
                    disabled = '';
                    color = 'danger';
                } else {
                    disabled = "disabled='disabled'";
                    color = "secondary";
                }
                $("#table-results").append("<tr>"+
                                                    "<td>"+data.orders[i].id+""+
                                                    "<td>"+data.orders[i].customer+"</td>"+
                                                    "<td>"+data.orders[i].address1+"</td>"+
                                                    "<td>"+data.orders[i].city+"</td>"+
                                                    "<td>"+data.orders[i].postcode+"</td>"+
                                                    "<td>"+data.orders[i].country+"</td>"+
                                                    "<td>"+data.orders[i].amount+"</td>"+
                                                    "<td>"+data.orders[i].status+"</td>"+
                                                    "<td>"+data.orders[i].deleted+"</td>"+
                                                    "<td><button type='button' class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-"+color+" text-white' "+disabled+" onclick='cancelOrder("+data.orders[i].id+")'><i class='fa fa-cancel'></i></button></td>"+
                                                    "</tr>");
            }

            $("#table-title").html("");

        }

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
    }
    });

}