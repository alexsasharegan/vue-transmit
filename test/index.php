<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible"
          content="ie=edge">
    <title>Vue Dropzone Test</title>
    <script src="https://unpkg.com/vue"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script>
        <?= file_get_contents( __DIR__ . "/../dist/vue-transmit.js" ); ?>
    </script>
    <style>
        <?= file_get_contents( __DIR__ . "/../dist/vue-transmit.css" ); ?>
    </style>
</head>
<body>
    <div id="root">
        <vue-transmit v-bind="options">
            <div class="mx-auto" style="background-color:aliceblue; width:50vw; height:50vh;"></div>
        </vue-transmit>
    </div>
<script>
    Vue.use(VueTransmit)
    window.app = new Vue({
        el: '#root',
        data: {
            options: {
                acceptedFileTypes: ['image/*'],
                url: './upload.php'
            },
        }
    })
</script>
</body>

</html>
