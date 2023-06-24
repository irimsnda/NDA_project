<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allow_methods' => [
            'POST',
            'GET',
            'OPTIONS',
            'PUT',
            'PATCH',
            'DELETE',
        ],

    'allow_origins' => [
            '*',
        ],

    'allow_headers' => [
            'Content-Type',
            'X-Auth-Token',
            'Origin',
            'Authorization',
        ],

     'expose_headers' => [
            'Cache-Control',
            'Content-Language',
            'Content-Type',
            'Expires',
            'Last-Modified',
            'Pragma',
        ],
    'forbidden_response' => [
            'message' => 'Forbidden (cors).',
            'status' => 403,
        ],


    'max_age' => 60 * 60 * 24,

    'supports_credentials' => false,

];
