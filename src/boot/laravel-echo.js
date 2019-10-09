import Echo from "laravel-echo"

window.Pusher = require('pusher-js')

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '2f6cf906c972925c0d1b',
    cluster: 'ap1',
    forceTLS: true
});
