@extends('frontend.layouts.main')

@section('main-container')


<style>
.aa-prod-view-size a{
    border: 1px solid #ddd;
    display: inline-block;
    font-size: 14px;
    color:black;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
    margin-right: 8px;
    padding: 5px 10px;
    transition: all 0.5s ease 0s;
}

.box {
    background: #f5f5f5;
    display: inline-flex;
    padding: 0;
    width:80px;
    border: 1px solid var(--tb-border-color);
}
.buycartbtn{
    background: #ec688d;
    border-radius: 5px;
    padding: 10px;
    width: 150px;
}

</style>

<div class="container">
   <!-- <div class="card mt-4">-->

<!--        <div class="card-body">-->
<!--<h2 class="card-title fw-600" style="color:black; font-weight: 600;">{{ strtoupper($product->productName) }}</h2>-->
<!--            <p class="card-text" style="color:black;">{{ $product->productDescription }}</p>-->
<!--            <p class="card-text" style="color:black;">Price: ₹{{ $product->productPrice }}</p>-->
            
            <!-- Add more product details here as needed -->
<!--        </div>-->
<!--    </div> -->
    
<div class="row mt-5 mb-3">
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="col col-md-5 col-lg-5 col-xl-5 col-12">
        <img id="mainImage" src="{{ asset('image/' . $product->images[0]) }}" class="card-img-top img-fluid" alt="{{ $product->productName }}">
        @if(count($product->images) > 1)
            <div class="row mt-3">
                @foreach($product->images as $image)
                    <div class="col-3">
                        <img class="thumbnail img-fluid" src="{{ asset('image/' . $image) }}" alt="{{ $product->productName }}">
                    </div>
                @endforeach
            </div>
        @endif
    </div>

    <div class="col col-md-7 col-lg-7 col-xl-7 col-12">
        <h2 class="card-title fw-600" style="color: #ec688d; font-weight: 600;">{{ strtoupper($product->productName) }}</h2>
        <p class="card-text" style="color:black; font-size: x-large;">Price: ₹{{ $product->productPrice }}</p>
        <p class="card-text" style="color:black; font-size: x-large;">Sale Price: ₹{{ $product->productSalePrice }}</p>
        <p class="card-text" style="color:black;">{{ $product->productDescription }}</p>

        <div class="quantity" style="min-width:128px;">
            <div class="row mt-5">
                <form action="{{ route('cart.add') }}" method="POST">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->productId }}">
                    <div class="col col-md-6">
                        <button type="submit" name="add-to-cart" value="7822" class="buycartbtn">Add to cart</button>
                    </div>
                </form>
            </div>
            <div class="hara-custom-fields d-none">
                <input type="hidden" name="hara-enable-addtocart-ajax" value="0">
                <input type="hidden" name="data-product_id" value="7822">
                <input type="hidden" name="data-type" value="simple">
            </div>
        </div>
        <hr>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('.thumbnail').click(function() {
            var imageUrl = $(this).attr('src');
            $('#mainImage').attr('src', imageUrl);
        });
    });
</script>
</div>

<!-- Include jQuery -->
<script>
    $(document).ready(function() {
        $('.thumbnail').click(function() {
            var imageUrl = $(this).attr('src');
            $('#mainImage').attr('src', imageUrl);
        });
    });
</script>



@endsection