window.onload = function () {
    console.log("11111")
    var formData = $('#123').serializeArray();
    console.log("formData", formData)
    $('#123').submit(function() {
        // get all the inputs into an array.
        var $inputs = $('#123 :input');
    
        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });
        console.log("values", values)
    });

}