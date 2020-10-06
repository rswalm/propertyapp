var image_data;
$(document).ready(() => {

    $('form#productuploadForm').submit((e) => {
        e.preventDefault();

        var $form = $("#productuploadForm");
        console.log($form, '$form')
        var data = getFormData($form);
        data.img_url = image_data.img_url
        console.log(JSON.stringify(data), 'data');
        $.ajax({
            type: 'post',
            contentType: 'application/json',
            processData: false,
            cache: false,
            url: '/api/postProduct',
            data: JSON.stringify(data),
            success(data) {
                console.log('Item has been successfully posted!', data);
                alert('Ad has been posted successfully !!');
            },
            error() {
                console.log('Item has not been posted!');
                alert('Please refresh the page and try again later');
            },
        });
    });
});

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function previewFile() {
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        image_data = {
            img_url: reader.result,
        }
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}