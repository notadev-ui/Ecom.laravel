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
                        <a href="{{ route('user.profile') }}" class="list-group-item list-group-item-action active">
                            <i class="fas fa-user"></i> My Profile
                        </a>
                        <a href="{{ route('user.edit-profile') }}" class="list-group-item list-group-item-action">
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
            <!-- Profile Information -->
            <div class="card mb-4">
                <div class="card-header" style="background-color: #a9d3abff; color: black;">
                    <h4 class="mb-0">Profile Information</h4>
                </div>
                <div class="card-body">
                    @if (session('success'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            {{ session('success') }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    @endif
                    
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-muted">Name</h6>
                            <p class="h5">{{ Auth::user()->name }}</p>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-muted">Email</h6>
                            <p class="h5">{{ Auth::user()->email }}</p>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-muted">Member Since</h6>
                            <p class="h5">{{ Auth::user()->created_at->format('F d, Y') }}</p>
                        </div>
                    </div>
                    
                    <a href="{{ route('user.edit-profile') }}" class="btn btn-primary" style="background-color: #a9d3abff; border-color: #a9d3abff;">
                        <i class="fas fa-edit"></i> Edit Profile
                    </a>
                </div>
            </div>

            <!-- Recent Orders -->
            <div class="card">
                <div class="card-header" style="background-color: #a9d3abff; color: white;">
                    <h4 class="mb-0">Recent Orders</h4>
                </div>
                <div class="card-body">
                    @if($orders->count() > 0)
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($orders->take(5) as $order)
                                        <tr>
                                            <td>#{{ $order->id }}</td>
                                            <td>{{ $order->created_at->format('M d, Y') }}</td>
                                            <td>₹{{ number_format($order->total_amount, 2) }}</td>
                                            <td>
                                                <span class="badge bg-info">{{ ucfirst($order->status ?? 'Pending') }}</span>
                                            </td>
                                            <td>
                                                <a href="{{ route('user.orders') }}" class="btn btn-sm btn-outline-primary">View Details</a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        <a href="{{ route('user.orders') }}" class="btn btn-link">View All Orders →</a>
                    @else
                        <p class="text-muted text-center py-4">
                            You haven't placed any orders yet.
                            <a href="{{ url('/jewelry') }}">Start Shopping</a>
                        </p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
