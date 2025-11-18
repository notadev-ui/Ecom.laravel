@extends('frontend.layouts.main')

@section('main-container')
<div class="container my-5">
    <div class="row">
        <div class="col-md-3">
            <!-- Sidebar Navigation -->
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-3">My Account</h5>
                    <div class="list-group">
                        <a href="{{ route('user.profile') }}" class="list-group-item list-group-item-action">
                            <i class="fas fa-user"></i> My Profile
                        </a>
                        <a href="{{ route('user.edit-profile') }}" class="list-group-item list-group-item-action active">
                            <i class="fas fa-edit"></i> Edit Profile
                        </a>
                        <a href="{{ route('user.orders') }}" class="list-group-item list-group-item-action">
                            <i class="fas fa-shopping-bag"></i> My Orders
                        </a>
                        <a href="{{ route('wishlist.index') }}" class="list-group-item list-group-item-action">
                            <i class="fas fa-heart"></i> My Wishlist
                        </a>
                        <form method="POST" action="{{ route('user.logout') }}" style="display:inline;">
                            @csrf
                            <button class="list-group-item list-group-item-action" type="submit">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-9">
            <!-- Edit Profile Form -->
            <div class="card">
                <div class="card-header" style="background-color: #a9d3abff; color: white;">
                    <h4 class="mb-0">Edit Profile</h4>
                </div>
                <div class="card-body">
                    @if ($errors->any())
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Whoops!</strong> There were some problems with your input.
                            <ul class="mb-0">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @endif

                    @if (session('success'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            {{ session('success') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('user.update-profile') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', Auth::user()->name) }}" required>
                            @error('name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', Auth::user()->email) }}" required>
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Member Since</label>
                            <input type="text" class="form-control" value="{{ Auth::user()->created_at->format('F d, Y') }}" disabled>
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary" style="background-color: #a9d3abff; border-color: #a9d3abff;">
                                <i class="fas fa-save"></i> Save Changes
                            </button>
                            <a href="{{ route('user.profile') }}" class="btn btn-secondary">
                                <i class="fas fa-times"></i> Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
