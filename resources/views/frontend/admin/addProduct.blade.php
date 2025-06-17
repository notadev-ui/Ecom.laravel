@extends('frontend.layouts.dashboard')
@section('title', 'product')

@section('content')


    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    @if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
    @endif

        <form action="{{ route('admin.product') }}" method="POST" enctype="multipart/form-data">
            @csrf
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-3">

        <div class="d-flex flex-column justify-content-center">
            <h4 class="mb-1 mt-3">Add a new Product</h4>
        </div>
        <div class="d-flex align-content-center flex-wrap gap-3">
            <a id="cancelButton" class="btn btn-label-danger" href="">Cancel</a>
            <button type="submit" class="btn btn-primary">Save</button>
        </div>
    </div>
  <div class="row">

        <div class="col-12 col-lg-12">
            <!-- case details -->
            <div class="card mb-4">
                <div class="card-header">

                    
                </div>
                <div class="card-body">
                    <div class="row mb-3">

                        <div class="col">
                            <label for="categoryId">Category</label>
                    <select name="categoryId" id="categoryId" class="category form-control">
                        @foreach ($categories as $category)
                            <option value="{{ $category->categoryId }}">{{ $category->categoryName }}</option>
                        @endforeach
                    </select>
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                <!--        <div class="col">-->
                            <!--    <label for="subCategoryId">Sub Category</label>-->
                <!--    <select name="subCategoryId" id="subCategoryId" class="form-control">-->
                        <!-- Options will be dynamically populated using JavaScript -->
                <!--    </select>-->
                <!--            <div class="invalid-feedback"></div>-->
                <!--            <div class="valid-feedback"></div>-->
                <!--        </div>-->

                    </div>

                 
                    <div class="row mb-3">
                        <div class="col">
                            <label for="subcategoryName">Product Name</label>
                    <input type="text" class="form-control" id="productName" name="productName" maxlength="5000">

                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                        <div class="col">
                            <label for="subcategoryName">Product Price</label>
                    <input type="text" class="form-control" id="productPrice" name="productPrice" maxlength="5000">
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                    </div>
                    <div class="row mb-3">
                    <!--    <div class="col">-->
                    <!--       <label for="subcategoryName">Product Sale Price</label>-->
                    <!--<input type="text" class="form-control" id="productSalePrice" name="productSalePrice" maxlength="5000">-->
                    <!--        <div class="invalid-feedback"></div>-->
                    <!--        <div class="valid-feedback"></div>-->
                    <!--    </div>-->

                        <div class="col">
                            <label for="subcategoryName">Product Description</label>
                    <input type="text" class="form-control" id="productDescription" name="productDescription" maxlength="500000">
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="col">
                          <label for="subcategoryName">Product Type</label>
                    <select name="productType" id="productType" class="product_type form-control">
                        <option value="latest">latest</option>
                        <option value="Popular">Popular</option>
                        <option value="Trending">Trending</option>
                    </select>
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                        <div class="col">
                           <label for="subcategoryName">Product Rating</label>
                    <input type="text" class="form-control" id="productRating" name="productRating" maxlength="5000">
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="image" class="col-form-label">Image</label>
                        <input type="file" class="form-control form-control-file validate not-empty" placeholder="" 
                          id="image" name="image[]"  multiple>
                        
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                        </div>

                    <!--    <div class="col">-->
                    <!--       <label for="subcategoryName">Product Rating</label>-->
                    <!--<input type="text" class="form-control" id="productRating" name="productRating" maxlength="5000">-->
                    <!--        <div class="invalid-feedback"></div>-->
                    <!--        <div class="valid-feedback"></div>-->
                    <!--    </div>-->

                    </div>
                   



                </div>
            </div>

        </div>


    </div>


         
        </form>


<script>
$(document).ready(function() {
    $('.category').select2();
});
$(document).ready(function() {
    $('.product_type').select2();
});
</script>



    @endsection
