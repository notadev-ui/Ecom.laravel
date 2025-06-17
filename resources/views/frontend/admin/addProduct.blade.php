@extends('frontend.layouts.dashboard')
@section('title', 'Product')

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
            <div class="card mb-4">
                <div class="card-body">
                    <div class="row mb-3">
                        <!-- Category -->
                        <div class="col">
                            <label for="categoryId">Category</label>
                            <select name="categoryId" id="categoryId" class="form-control">
                                <option value="">-- Select Category --</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->categoryId }}">{{ $category->categoryName }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Subcategory -->
                        <div class="col">
                            <label for="subcategoryId">Sub Category</label>
                            <select name="subcategoryId" id="subcategoryId" class="form-control">
                                <option value="">-- Select Subcategory --</option>
                            </select>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="row mb-3">
                        <div class="col">
                            <label for="productName">Product Name</label>
                            <input type="text" class="form-control" id="productName" name="productName">
                        </div>
                        <div class="col">
                            <label for="productPrice">Product Price</label>
                            <input type="text" class="form-control" id="productPrice" name="productPrice">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label for="productDescription">Product Description</label>
                            <input type="text" class="form-control" id="productDescription" name="productDescription">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label for="productType">Product Type</label>
                            <select name="productType" id="productType" class="form-control">
                                <option value="latest">Latest</option>
                                <option value="Popular">Popular</option>
                                <option value="Trending">Trending</option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="productRating">Product Rating</label>
                            <input type="text" class="form-control" id="productRating" name="productRating">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label for="image">Image</label>
                            <input type="file" class="form-control" name="image[]" multiple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</form>

<!-- jQuery CDN FIRST, then custom script -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
    $(document).ready(function () {
        $('#categoryId').on('change', function () {
            let categoryId = $(this).val();
            if (categoryId) {
                $.ajax({
                    url: "{{ url('/admin/get-subcategories') }}/" + categoryId,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $('#subcategoryId').empty().append('<option value="">-- Select Subcategory --</option>');
                        $.each(data, function (index, subcategory) {
                            $('#subcategoryId').append('<option value="' + subcategory.subcategoryId + '">' + subcategory.subcategoryName + '</option>');
                        });
                    },
                    error: function () {
                        alert("Something went wrong. Please check route or controller.");
                    }
                });
            } else {
                $('#subcategoryId').html('<option value="">-- Select Subcategory --</option>');
            }
        });
    });
</script>
@endsection
