const passwordField = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show_password');

showPasswordCheckbox.addEventListener('change', function() {
  if (this.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
});
