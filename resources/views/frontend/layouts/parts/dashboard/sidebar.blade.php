@php
    use Illuminate\Support\Facades\Route;
@endphp

<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
        <a href="{{ route('admin.dashboard') }}" class="app-brand-link">
            <span>
                <img src="{{ asset('/assets/dashboard/img/Logo.png') }}" alt="Logo" height="50px" width="100%">
            </span>
        </a>
        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
        <!-- Dashboard -->
        <li class="menu-item {{ request()->is('admin/dashboard') ? 'active' : '' }}">
            <a href="{{ route('admin.dashboard') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Dashboard">Dashboard</div>
            </a>
        </li>

        <!-- Products -->
        <li class="menu-item {{ request()->is('admin/product') ? 'active' : '' }}">
            <a href="{{ route('admin.product') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-package"></i>
                <div data-i18n="Products">Products</div>
            </a>
        </li>

        <!-- Categories -->
        <li class="menu-item {{ request()->is('admin/showAllCategory') ? 'active' : '' }}">
            <a href="{{ route('admin.showallcategory') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-category"></i>
                <div data-i18n="Categories">Categories</div>
            </a>
        </li>

        
        <li class="menu-item {{ request()->is('admin/showAllSubCategory') ? 'active' : '' }}">
            <a href="{{ route('admin.showAllSubCategory') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-category-alt"></i>
                <div data-i18n="Sub Categories">Sub Categories</div>
            </a>
        </li>

        <!-- Blogs -->
        <li class="menu-item {{ request()->is('admin/showBlog') ? 'active' : '' }}">
            <a href="{{ route('admin.showBlog') }}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-news"></i>
                <div data-i18n="Blogs">Blogs</div>
            </a>
        </li>
    </ul>
</aside>
<!-- / Menu -->
