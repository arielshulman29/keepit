$.validator.addMethod("regex",
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    console.log(this.optional(element) , re.test(value));
                    return this.optional(element) || re.test(value);
                },"Please check your input.")
$(function () {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    console.log('here');
    $("form[name='register']").validate({
        // Specify validation rules
        rules: {
            username: {
                required: true,
                regex: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
                minlength: 5,
                maxlength: 20
            },
            email:{
                required:true,
                regex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            },
            password:{
                required:true,
                regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                minlength:8
            }
        },
        // Specify validation error messages
        messages: {
            username: "אנא הזינו שם משתמש באנגלית בעל 5 תווים לפחות",
            email: "אנא הזינו כתובת אימייל תקינה",
            password: "אנא הזינו סיסמא בעלת 8 תווים לפחות שתכלול אותיות באנגלית ומספרים"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
});