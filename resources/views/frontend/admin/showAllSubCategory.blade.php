@include('frontend.admin.sidebar')

<section class="home-section">
@include('frontend.admin.navbar')
    <div class="home-content">
        <div class="container mt-4">

            @if (session('message'))
                <div class="alert alert-success">
                    {{ session('message') }}
                </div>
            @endif


            <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sub Category Name</th>
                            <th>Category Name </th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($subcategory as $data)
                        <tr>
                            <td>{{ $data->subcategoryId   }}</td>
                            <td>{{ $data->subcategoryName }}</td>
                            <td>{{ $data->category->categoryName ?? 'N/A' }}</td>
                            <td><a href="{{ route('admin.updateShowSubCategory', ['id' => $data->subcategoryId]) }}" class="btn btn-primary btn-sm">Update</a></td>
                            <td><a href="{{ route('admin.deleteSubCategory', ['id' => $data->subcategoryId]) }}" class="btn btn-danger btn-sm">Delete</a></td>
                        </tr>
                        @endforeach
                    </tbody>
            </table>
        </div>
    </div>
</section>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function() {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
</script>

</body>

</html>