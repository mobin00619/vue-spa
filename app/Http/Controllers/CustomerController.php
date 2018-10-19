<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\CreateCustomerRequest;

class CustomerController extends Controller
{

    public function all()
    {
        $customer = Customer::all();
        return response()->json([
            "customers" => $customer,
        ], 200);
    }
    public function get($id)
    {
        $customer = Customer::find($id);
        return response()->json([
            "customer" => $customer,
        ], 200);

    }
    public function create(CreateCustomerRequest $request)
    {
        $customer = Customer::create($request->only(["name", "email", "phone", "website"]));
        return response()->json([
            "customers" => $customer,
        ], 200);
    }
}
