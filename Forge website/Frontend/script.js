function selectPlan(plan) {
  window.location.href = `subscription.html?plan=${plan}`;
}

function subscribe() {
  window.location.href = 'subscription.html';
}

// User menu toggle
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (mobileNav && toggle) {
    mobileNav.classList.toggle('show');
    toggle.classList.toggle('active');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
  const userSection = document.querySelector('.user-section');
  const dropdown = document.getElementById('userDropdown');
  
  if (dropdown && userSection && !userSection.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// User Authentication Functions
function checkUserLogin() {
  const user = localStorage.getItem('forgeUser');
  if (user) {
    const userData = JSON.parse(user);
    updateUIForLoggedInUser(userData);
  } else {
    updateUIForLoggedOutUser();
  }
}

function updateUIForLoggedInUser(userData) {
  const welcomeText = document.getElementById('welcomeText');
  const profilePhoto = document.getElementById('profilePhoto');
  const defaultIcon = document.getElementById('defaultUserIcon');
  const dropdownUserName = document.getElementById('dropdownUserName');
  const dropdownProfilePhoto = document.getElementById('dropdownProfilePhoto');
  const dropdownDefaultIcon = document.getElementById('dropdownDefaultIcon');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Update welcome message
  if (welcomeText) {
    welcomeText.textContent = `Welcome Back, ${userData.name}!`;
  }
  
  // Update profile circle
  if (userData.photoURL && profilePhoto && defaultIcon) {
    profilePhoto.src = userData.photoURL;
    profilePhoto.style.display = 'block';
    defaultIcon.style.display = 'none';
  }
  
  // Update dropdown
  if (dropdownUserName) {
    dropdownUserName.textContent = userData.name;
  }
  
  if (userData.photoURL && dropdownProfilePhoto && dropdownDefaultIcon) {
    dropdownProfilePhoto.src = userData.photoURL;
    dropdownProfilePhoto.style.display = 'block';
    dropdownDefaultIcon.style.display = 'none';
  }
  
  // Show logout, hide login/register
  if (loginLink) loginLink.style.display = 'none';
  if (registerLink) registerLink.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'block';
}

function updateUIForLoggedOutUser() {
  const welcomeText = document.getElementById('welcomeText');
  const profilePhoto = document.getElementById('profilePhoto');
  const defaultIcon = document.getElementById('defaultUserIcon');
  const dropdownUserName = document.getElementById('dropdownUserName');
  const dropdownProfilePhoto = document.getElementById('dropdownProfilePhoto');
  const dropdownDefaultIcon = document.getElementById('dropdownDefaultIcon');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Update welcome message
  if (welcomeText) {
    welcomeText.textContent = 'Welcome Back!';
  }
  
  // Show default icon
  if (profilePhoto) profilePhoto.style.display = 'none';
  if (defaultIcon) defaultIcon.style.display = 'block';
  
  // Update dropdown
  if (dropdownUserName) {
    dropdownUserName.textContent = 'Guest User';
  }
  
  if (dropdownProfilePhoto) dropdownProfilePhoto.style.display = 'none';
  if (dropdownDefaultIcon) dropdownDefaultIcon.style.display = 'block';
  
  // Show login/register, hide logout
  if (loginLink) loginLink.style.display = 'block';
  if (registerLink) registerLink.style.display = 'block';
  if (logoutBtn) logoutBtn.style.display = 'none';
}

function logout() {
  localStorage.removeItem('forgeUser');
  updateUIForLoggedOutUser();
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.remove('show');
  }
}

// Function to get Gmail profile photo from email
function getGmailPhotoURL(email) {
  // Extract username from Gmail
  const username = email.split('@')[0];
  // Use Gravatar as a fallback for profile photos
  // You can also integrate with Google OAuth for real Gmail photos
  return `https://www.gravatar.com/avatar/${md5(email)}?d=identicon&s=200`;
}

// Simple MD5 hash for Gravatar (basic implementation)
function md5(string) {
  // For production, use a proper MD5 library
  // This is a placeholder - in real implementation, use crypto-js or similar
  return string; // Simplified for demo
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
  checkUserLogin();
});

// Simulate login (for testing - replace with real authentication)
function simulateLogin(name, email) {
  const photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fff&color=000&size=200`;
  const userData = {
    name: name,
    email: email,
    photoURL: photoURL
  };
  localStorage.setItem('forgeUser', JSON.stringify(userData));
  updateUIForLoggedInUser(userData);
}