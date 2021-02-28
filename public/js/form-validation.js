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
    $("form[name='contactmail']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: "required",
            city: "required",
            tel: {
                required: true,
                regex: /^\d{10}$/ ,
                minlength: 10,
                maxlength: 15
            }
        },
        // Specify validation error messages
        messages: {
            name: "אנא הזינו את שמך המלא",
            tel: "אנא הזינו טלפון נייד תקין",
            city: "אנא הזינו שם עיר"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
});