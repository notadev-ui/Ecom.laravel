@extends('frontend.layouts.main')

@section('main-container')

<style> #shopify-section-header .megamenu {line-height: 1;} #shopify-section-header .megamenu a {font-size: 0.9em;} #shopify-section-header .site-nav__dropdown-link--second-level {font-size: 0.9em;} #shopify-section-header .h5 a {color: #ec688d;} #shopify-section-header .mobile-nav .appear-delay-2 a {color: #ec688d;} #shopify-section-header .mobile-nav .appear-delay-3 a {color: #9b006f;} </style></div><main class="main-content" id="MainContent">
    <div class="page-width page-width--tiny page-content">
<header class="section-header">
<h1 class="section-header__title text-center " style="color: #ec688d!important;">Register</h1>
</header>


<form method="POST" action="{{ route('store.register') }}">
@csrf
<label for="CustomerEmail">Name</label>
<input type="text" name="name" id="CustomerEmail" class="input-full" >
    @error('name')
        <div>{{ $message }}</div>
    @enderror


<label for="CustomerEmail">Email</label>
<input type="email" name="email" id="CustomerEmail" class="input-full" >
 @error('email')
        <div>{{ $message }}</div>
    @enderror
        
<label for="CustomerPassword">Password</label>
<input type="password" name="password" id="CustomerPassword" class="input-full" >
 @error('password')
        <div>{{ $message }}</div>
    @enderror
        
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" id="password_confirmation"  class="input-full" required>
        @error('password_confirmation')
            <div style="color: red;">{{ $message }}</div>
        @enderror

        

  <button type="submit" class="btn btn--full" style="background: #ec688d;
    color: white; margin-top: 20px;">
Register  </button>
</p>
<p><a href="{{route('user.login')}}" id="customer_register_link" class="text-center mb-3 pb-3" style="margin-left: 84px;">Already have an  account</a></p><input type="hidden" name="return_url" value="/account" /></form></div>

</div>
</form>
@endsection