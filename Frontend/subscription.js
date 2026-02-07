// Get plan from URL parameters
let currentPlan = 'daily';

function getSelectedPlan() {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan');
  currentPlan = plan || 'daily';
  return currentPlan;
}

// Display selected plan and highlight it
document.addEventListener('DOMContentLoaded', function() {
  getSelectedPlan();
  highlightSelectedPlan(currentPlan);
});

// Highlight the selected plan
function highlightSelectedPlan(plan) {
  // Remove active class from all plans
  document.querySelectorAll('.plan-option').forEach(option => {
    option.classList.remove('active');
  });
  
  // Add active class to selected plan
  const selectedOption = document.querySelector(`.plan-option[data-plan="${plan}"]`);
  if (selectedOption) {
    selectedOption.classList.add('active');
  }
}

// Change plan
function changePlan(plan) {
  currentPlan = plan;
  highlightSelectedPlan(plan);
}

// Payment method toggle
const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
const cardPayment = document.getElementById('cardPayment');
const cashPayment = document.getElementById('cashPayment');
const cardInputs = cardPayment.querySelectorAll('input');

paymentRadios.forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.value === 'card') {
      cardPayment.style.display = 'block';
      cashPayment.style.display = 'none';
      // Make card fields required
      cardInputs.forEach(input => input.required = true);
    } else {
      cardPayment.style.display = 'none';
      cashPayment.style.display = 'block';
      // Make card fields not required
      cardInputs.forEach(input => input.required = false);
    }
  });
});

// Format card number
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
  });
}

// Format expiry date
const expiryInput = document.getElementById('expiry');
if (expiryInput) {
  expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
  });
}

// Form submission
const form = document.getElementById('subscriptionForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const paymentMethod = formData.get('paymentMethod');
  
  const subscriptionData = {
    name: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    plan: currentPlan,
    paymentMethod: paymentMethod
  };
  
  if (paymentMethod === 'card') {
    subscriptionData.cardName = formData.get('cardName');
    subscriptionData.cardNumber = formData.get('cardNumber').replace(/\s/g, '');
    subscriptionData.expiry = formData.get('expiry');
    subscriptionData.cvv = formData.get('cvv');
  }
  
  // Send to backend
  fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      if (paymentMethod === 'cash') {
        alert('Subscription request received! We will contact you within 24 hours to arrange cash payment details.');
      } else {
        alert('Subscription successful! Welcome to FORGE.');
      }
      window.location.href = 'index.html';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});

// Go back to plans
function goBack() {
  window.location.href = 'index.html#plans';
}