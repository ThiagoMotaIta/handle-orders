<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer',
        'address1',
        'city',
        'postcode',
        'country',
        'amount',
        'status',
        'deleted',
    ];
}
