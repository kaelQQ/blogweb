document.addEventListener('DOMContentLoaded', function() {
    // Get sidebar elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const collapseSidebar = document.getElementById('collapseSidebar');
    
    // Set initial state based on window size
    function setInitialState() {
        if (window.innerWidth >= 1024) {
            // On desktop, show sidebar by default
            sidebar.style.transform = 'translateX(0)';
            // Check if sidebar should be collapsed
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                document.body.classList.add('sidebar-collapsed');
            } else {
                sidebar.classList.remove('collapsed');
                document.body.classList.remove('sidebar-collapsed');
            }
        } else {
            // On mobile, hide sidebar by default
            sidebar.style.transform = 'translateX(-100%)';
            sidebar.classList.remove('collapsed');
            document.body.classList.remove('sidebar-collapsed');
        }
    }
    
    // Set initial state
    setInitialState();
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 1024) {
            // Desktop view
            sidebar.style.transform = 'translateX(0)';
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            // Restore collapsed state from localStorage
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                document.body.classList.add('sidebar-collapsed');
            } else {
                sidebar.classList.remove('collapsed');
                document.body.classList.remove('sidebar-collapsed');
            }
        } else {
            // Mobile view
            if (!sidebar.classList.contains('active')) {
                sidebar.style.transform = 'translateX(-100%)';
            }
            sidebar.classList.remove('collapsed');
            document.body.classList.remove('sidebar-collapsed');
        }
    }
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Toggle sidebar when clicking the hamburger menu (mobile)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                sidebar.style.transform = 'translateX(0)';
                document.body.classList.add('sidebar-open');
            } else {
                sidebar.style.transform = 'translateX(-100%)';
                document.body.classList.remove('sidebar-open');
            }
        });
    }
    
    // Close sidebar when clicking the close button (mobile)
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebar.style.transform = 'translateX(-100%)';
            document.body.classList.remove('sidebar-open');
        });
    }
    
    // Toggle collapse/expand sidebar (desktop)
    if (collapseSidebar) {
        collapseSidebar.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCollapsing = !sidebar.classList.contains('collapsed');
            
            if (isCollapsing) {
                sidebar.classList.add('collapsed');
                document.body.classList.add('sidebar-collapsed');
            } else {
                sidebar.classList.remove('collapsed');
                document.body.classList.remove('sidebar-collapsed');
            }
            
            // Save state to localStorage
            localStorage.setItem('sidebarCollapsed', isCollapsing);
        });
    }
    
    // Close sidebar when clicking outside of it (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && 
            !sidebar.contains(e.target) && 
            e.target !== sidebarToggle && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });
    
    // Close sidebar when a link is clicked (for mobile)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 1024) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
});
