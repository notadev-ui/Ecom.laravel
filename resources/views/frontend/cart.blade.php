@extends('frontend.layouts.main')

@section('main-container')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        #shopify-section-header .megamenu {
            line-height: 1;
        }

        #shopify-section-header .megamenu a {
            font-size: 0.9em;
        }

        #shopify-section-header .site-nav__dropdown-link--second-level {
            font-size: 0.9em;
        }

        #shopify-section-header .h5 a {
            color: #a9d3abff;
        }

        #shopify-section-header .mobile-nav .appear-delay-2 a {
            color: #a9d3abff;
        }

        #shopify-section-header .mobile-nav .appear-delay-3 a {
            color: #9b006f;
        }
        .razorpay-payment-button {
            background:#a9d3abff; color:black;
        }
    </style>
    </div>
    <div class="container">
    <h1>Your Cart</h1>
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if (empty($cart))
        <p>Your cart is empty.</p>
    @else
       <table class="table table-bordered">
    <thead>
        <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th> <!-- New column for delete button -->
        </tr>
    </thead>
    <tbody>
        @foreach ($cart as $item)
            @php
                $total = $item['price'] * $item['quantity'];
            @endphp
            <tr>
                <td><img src="{{ asset('image/' . $item['image']) }}" style="height: 150px;width:200px;" alt="{{ $item['name'] }}"></td>
                <td>{{ $item['name'] }}</td>
                <td>₹{{ $item['price'] }}</td>
                <td>
                    <form action="{{ route('cart.update', $item['product_id']) }}" method="POST">
                        @csrf
                        @method('PATCH')
                        <button type="submit" name="action" value="decrease">-</button>
                        {{ $item['quantity'] }}
                        <button type="submit" name="action" value="increase">+</button>
                    </form>
                </td>
                <td>₹{{ $total }}</td>
                <td>
                    <form action="{{ route('cart.delete', $item['product_id']) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit"><i class="fa fa-trash-o btn btn-danger" aria-hidden="true"></i></button>
                        <a href="{{ route('product.view', $item['product_id']) }}" type="submit"><i class="fa fa-eye btn btn-primary" aria-hidden="true"></i></a>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

    @endif
    
     <div class="cart-view-total">
               <h4>Cart Totals</h4>
              <table class="table">
    <tbody>
        <tr>
            <th>Subtotal   -</th>
            <td></td>
        </tr>
        @php
            $grandTotal = 0;
        @endphp
        @foreach ($cart as $item)
            @php
                $total = $item['price'] * $item['quantity'];
                $grandTotal += $total;
            @endphp
        @endforeach
        <tr>
            <th>Total   -</th>
            <td>₹{{ $grandTotal }}</td>
        </tr>
    </tbody>
</table>
<div class="d-flex justify-content-center mt-4 mb-4">
    @auth
        @if($amount > 100)
            <div class="col-md-12">
            
             @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
        
          <!-- Dropdown for existing addresses -->
                   <h3>Select Address </h3>
            @if($addresses->count() > 0)
                <form id="paymentForm" action="{{ route('checkout.address') }}" method="GET">
                    @csrf
                    <div class="form-group">
                        <select name="address_id" class="form-control">
                            @foreach($addresses as $address)
                                <option value="{{ $address->id }}" name="address_id">
                                    {{ $address->fname }} {{ $address->lname }}, {{ $address->flat }}, {{ $address->area }}, {{ $address->town_city }}, {{ $address->state }} , {{ $address->pincode }},{{ $address->number }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <input type="submit" class="btn mt-4" style="background:#a9d3abff; color:black;"></a>
                </form>
            @endif
        
    <form action="{{ route('checkout.address.store') }}" method="POST">
                @csrf
        <h3 class="mt-5">Add Address</h3>

            <div class="row rowinput">
         
               <div class="col-md-6">
                  <p>First name</p>
                  <input type="text" name="fname" placeholder="First name">
               </div>
               <div class="col-md-6">
                  <p>Last Name</p>
                  <input type="text" name="lname" placeholder="Last name">
               </div>
           
            </div>
            
            <div class="row rowinput">
         
               <div class="col-md-6">
                  <p>Pincode</p>
                  <input type="text" name="Pincode" placeholder="Pincode">
               </div>
               <div class="col-md-6">
                  <p>Flat, House no., Building</p>
                  <input type="text" name="Flat" placeholder="Flat, House no., Building, Company, Apartment">
               </div>
           
            </div>
            
              
            <div class="row rowinput">
               <div class="col-md-6">
                  <p>Area, Street, Sector, Village</p>
                  <input type="text" name="Area" placeholder="Area, Street, Sector, Village">
               </div>
          
               <div class="col-md-6">
                  <p>Landmark</p>
                  <input type="text" name="Landmark" placeholder="Landmark">
               </div>
            </div>
            <div class="row rowinput">
               <div class="col-md-6">
                  <p>Town/City</p>
                  <input type="text" name="Town_city" placeholder="Town/City">
               </div>
               <div class="col-md-6">
                  <p>State</p>
                  <input type="text" name="State" placeholder="State">
               </div>
            </div>
            <div class="row rowinput">
               <div class="col-md-6">
                  <p>Number</p>
                  <input type="number" name="number" placeholder="Number">
               </div>
               
            </div>
            <button class="btn btn-sm btn-primary mt-3" style="background-color: #977935;border: 0px;">Add</button>
        </form>
        </div>
        @endif
    @else
        <a href="{{ route('user.login') }}" class="btn" style="background:#a9d3abff; color:black;">Login to Checkout</a>
    @endauth
</div>

             </div>
</div>
        
    @endsection
