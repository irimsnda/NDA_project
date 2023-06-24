<?php

return [
    'encrypt_key' => env('encrypt_key', 'kPJks1MrdXE03n8H'),
    'invoice_due_days' => env('INVOICE_DUE_DAYS', 7),
    'trackref_code' => env('TRACKREF_CODE', 'TRC'),
    'approval_lag_days' => env('APPROVAL_LAG_DAYS', 7),
    'signs_path' => env('SIGNS_PATH', '/resources/images/signs/'),

    'sys' => [
        'system_name' => env('SYSTEM_NAME'),
        'organisation_name' => env('ORGANISATION_NAME'),
        'iso_cert' => env('ISO_CERT'),
        'ministry_name' => env('MINISTRY_NAME'),
        'system_version' => env('SYSTEM_VERSION')
    ],

    'api' => [
        'mis_client_id' => env('MIS_CLIENT_ID', 4),
        'mis_app_client_id' => env('MIS_APP_CLIENT_ID', 3),
        'external_api_client_id' => env('EXTERNAL_API_CLIENT_ID', 5)
    ],
    'gepg' => [
        'systemid' => env('SYSTEMID', 4),
        'spcode' => env('SPCODE', 3),
        'subspcode' => env('SUBSPCODE', 5),
        'gepgurl' => env('GEPGURL', 5),
        'gepg_port' => env('GEPGURL', 5)
    ],
    'dms' => [
        'dms_adminusr' => env('DMS_ADMINUSR', 'admin'),
        'dms_adminpassword' => env('DMS_ADMINPASSWORD', 'admin'),
        'dms_url' => env('DMS_URL', 'http://localhost:9090/alfresco/'),
        'dms_approotsite' => env('DMS_APPROOTSITE', 'tfda-imis'),
        'dms_approotsitecontainer' => env('DMS_APPROOTSITECONTAINER', 'tfda-imis'),
        'dms_approotsitecontainernode' => env('DMS_APPROOTSITECONTAINERNODE', 'documentLibrary'),
        'dms_approotsite_id' => env('DMS_APPROOTSITE_ID', 2),
        'doc_rootupload' => env('DOC_ROOTUPLOAD', '/public/resources/upload/'),
        'upload_directory' => env('UPLOAD_DIRECTORY'),
        'upload_url' => env('UPLOAD_URL'),
        'system_uploaddirectory' => env('SYSTEM_UPLOADDIRECTORY'),
        'system_uploadurl'=> env('SYSTEM_UPLOADURL'),
    ],

    'jasper' => [
        'jasper_server_url' => env('JASPER_SERVER_URL', 'http://10.0.0.12:8080/jasperserver'),
        'jasper_server_username' => env('JASPER_SERVER_USERNAME', 'jasperadmin'),
        'jasper_server_password' => env('JASPER_SERVER_PASSWORD', 'jasperadmin'),
        'reports_baseurl' => env('REPORTS_BASEURL', 'jasperadmin'),

        
    ]

];
