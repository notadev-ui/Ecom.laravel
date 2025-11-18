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
                        <a href="{{ route('user.edit-profile') }}" class="list-group-item list-group-item-action">
                            <i class="fas fa-edit"></i> Edit Profile
                        </a>
                        <a href="{{ route('user.orders') }}" class="list-group-item list-group-item-action active">
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
            <!-- Orders List -->
            <div class="card">
                <div class="card-header" style="background-color: #a9d3abff; color: white;">
                    <h4 class="mb-0">My Orders</h4>
                </div>
                <div class="card-body">
                    @if($orders->count() > 0)
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead style="background-color: #f5f5f5;">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($orders as $order)
                                        <tr>
                                            <td><strong>#{{ $order->id }}</strong></td>
                                            <td>{{ $order->created_at->format('M d, Y') }}</td>
                                            <td>
                                                @php
                                                    $itemCount = $order->orderItems()->count() ?? 0;
                                                @endphp
                                                {{ $itemCount }} item{{ $itemCount != 1 ? 's' : '' }}
                                            </td>
                                            <td><strong>₹{{ number_format($order->total_amount ?? 0, 2) }}</strong></td>
                                            <td>
                                                @php
                                                    $statusClass = match($order->status ?? 'pending') {
                                                        'completed' => 'bg-success',
                                                        'processing' => 'bg-info',
                                                        'shipped' => 'bg-primary',
                                                        'cancelled' => 'bg-danger',
                                                        default => 'bg-warning'
                                                    };
                                                @endphp
                                                <span class="badge {{ $statusClass }}">
                                                    {{ ucfirst($order->status ?? 'Pending') }}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#order-{{ $order->id }}">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6">
                                                <div class="collapse" id="order-{{ $order->id }}">
                                                    <div class="card card-body">
                                                        <h6>Order Items:</h6>
                                                        <div class="table-responsive">
                                                            <table class="table table-sm mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Product</th>
                                                                        <th>Quantity</th>
                                                                        <th>Price</th>
                                                                        <th>Subtotal</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($order->orderItems as $item)
                                                                        <tr>
                                                                            <td>{{ $item->product->productName ?? 'N/A' }}</td>
                                                                            <td>{{ $item->quantity }}</td>
                                                                            <td>₹{{ number_format($item->price ?? 0, 2) }}</td>
                                                                            <td>₹{{ number_format(($item->quantity * $item->price) ?? 0, 2) }}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="4" class="text-center text-muted">No items in this order</td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        @if($orders->hasPages())
                            <div class="d-flex justify-content-center mt-4">
                                {{ $orders->links() }}
                            </div>
                        @endif
                    @else
                        <div class="text-center py-5">
                            <i class="fas fa-inbox" style="font-size: 3rem; color: #ddd;"></i>
                            <p class="text-muted mt-3">You haven't placed any orders yet.</p>
                            <a href="{{ url('/jewelry') }}" class="btn btn-primary" style="background-color: #a9d3abff; border-color: #a9d3abff;">
                                <i class="fas fa-shopping-bag"></i> Start Shopping
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
