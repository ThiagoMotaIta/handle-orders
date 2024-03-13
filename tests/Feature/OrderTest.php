<?php

use App\Models\Order;

test('orders can be listed', function () {
    $order = Order::get();
    $response = $this
        ->get('/orders');

    $response->assertOk();
});

test('orders can be searched by customer', function () {
    $response = $this->get('/search-order', [
        'customer' => 'Yen',
    ]);
    $response->assertOk();
});
