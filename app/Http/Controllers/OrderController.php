<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\Filesystem;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        
        $orders = Order::get();

        if ($orders->count() > 0){
            return response()->json([
                "message" => "Orders found!",
                "orders" => $orders,
            ], 200);
        } else {
            return response()->json([
                "message" => "There is no Orders yet!",
            ], 200);
        }
    }

    /**
     * Insert from  json file
     *
     * @return \Illuminate\Http\Response
     */
    public function ordersFromJson()
    {

        $objects = Storage::json('/public/orders.json');

        foreach ($objects as $obj) {
            $order = new Order;
            
            $order->created_at = $obj['date'];
            $order->customer = $obj['customer'];
            $order->address1 = $obj['address1'];
            $order->city = $obj['city'];
            $order->postcode = $obj['postcode'];
            $order->country = $obj['country'];
            $order->amount = $obj['amount'];
            $order->status = $obj['status'];
            $order->deleted = $obj['deleted'];
            $order->updated_at = $obj['last_modified'];

            $order->save();
        }

    }


    /**
     * Cancel Order
     *
     * @return \Illuminate\Http\Response
     */
    public function cancelOrder($id)
    {

        if(Order::where('id', $id)->exists()) {
            $orderRemoved = Order::find($id);
            $orderRemoved->status = 'canceled';
            $orderRemoved->save();

            return response()->json([
              "message" => "Order Canceled!"
            ], 202);
          } else {
            return response()->json([
              "message" => "Order not found."
            ], 404);
          }

    }


    /**
     * Search Order by customer
     *
     * @return \Illuminate\Http\Response
     */
    public function searchOrder(Request $request)
    {

        // Get Orders by customer search
        if (Order::where('customer', 'like', $request->customer)->exists()) {

            $orders = Order::where('customer', 'like', $request->customer)->get();

            foreach ($orders as $order){
                $listOrder = Order::find($order->id);

                // Order list
                $orderListBySearch[] = $listOrder;
            }

            return response()->json([
                "message" => "Order(s) found!",
                "orderList" => $orderListBySearch,
            ], 200);
        } else {
            return response()->json([
                "message" => "There is no Order for this customer."
            ], 200);

        }

    }

}
