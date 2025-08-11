// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('portfolioUser'));
    
    // If user is logged in and on login/register page, redirect to portfolio
    if (user && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html') || window.location.pathname.includes('index.html'))) {
        window.location.href = 'portfolio.html';
    }
    
    // If user is not logged in and on portfolio page, redirect to login
    if (!user && window.location.pathname.includes('portfolio.html')) {
        window.location.href = 'login.html';
    }
    
    // If on portfolio page, display user info
    if (user && window.location.pathname.includes('portfolio.html')) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    }
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, you would verify credentials with a server
            // For demo, we'll check localStorage
            const users = JSON.parse(localStorage.getItem('portfolioUsers')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('portfolioUser', JSON.stringify(user));
                window.location.href = 'portfolio.html';
            } else {
                document.getElementById('loginError').textContent = 'Invalid email or password';
            }
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                document.getElementById('registerError').textContent = 'Passwords do not match';
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('portfolioUsers')) || [];
            
            if (users.some(u => u.email === email)) {
                document.getElementById('registerError').textContent = 'Email already registered';
                return;
            }
            
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('portfolioUsers', JSON.stringify(users));
            localStorage.setItem('portfolioUser', JSON.stringify(newUser));
            
            // Save to GitHub
            saveUserToGitHub(newUser);
            
            window.location.href = 'portfolio.html';
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('portfolioUser');
            window.location.href = 'login.html';
        });
    }
});
