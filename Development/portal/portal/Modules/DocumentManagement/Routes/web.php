<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('documentmanagement')->group(function() {
    Route::get('/', 'DocumentManagementController@index');
});


Route::group(['middleware' => 'api', 'prefix' => 'documentmanagement', 'namespace' => 'Modules\DocumentManagement\Http\Controllers'], function()
{
    Route::get('/', 'DocumentManagementController@index');
    
    Route::get('getApplicationDocploads', 'DocumentManagementController@getApplicationDocploads');
    Route::get('getUploadedApplicationDoc', 'DocumentManagementController@getUploadedApplicationDoc');
    
    
    Route::get('getDocumentRequirements', 'DocumentManagementController@getDocumentRequirements');
    Route::get('getProcessApplicationDocploads', 'DocumentManagementController@getProcessApplicationDocploads');

    
    Route::post('uploadApplicationDMSDocument', 'DocumentManagementController@uploadApplicationDMSDocument');
    Route::post('onApplicationDocumentDelete', 'DocumentManagementController@onApplicationDocumentDelete');
    Route::post('uploadApplicationDMSUnstructuredDocument', 'DocumentManagementController@uploadApplicationDMSUnstructuredDocument');
    
    Route::get('getApplicationDocumentDownloadurl', 'DocumentManagementController@getApplicationDocumentDownloadurl');

    Route::get('getApplicationDocumentPreviousVersions', 'DocumentManagementController@getApplicationDocumentPreviousVersions');
	Route::get('getUnstructuredApplicationDocploads', 'DocumentManagementController@getUnstructuredApplicationDocploads');
	Route::get('onLoadOnlineProductImagesUploads', 'DocumentManagementController@onLoadOnlineProductImagesUploads');
	Route::post('uploadProductImages', 'DocumentManagementController@uploadProductImages');
    Route::get('onLoadProductImagesRequirements', 'DocumentManagementController@onLoadProductImagesRequirements');
    
	Route::post('onDeleteProductImages', 'DocumentManagementController@onDeleteProductImages');
	Route::get('uploadLargeApplicationDocument', 'DocumentManagementController@uploadLargeApplicationDocument');
	Route::get('uploadFile', 'DocumentManagementController@resumableUpload');
	Route::post('uploadFile', 'DocumentManagementController@resumableUpload');
	
    Route::post('resumableuploadApplicationDocumentFile', 'DocumentManagementController@resumableuploadApplicationDocumentFile');
    Route::post('onsaveApplicationVariationsrequests', 'DocumentManagementController@onsaveApplicationVariationsrequests');
    
    Route::post('onunfitProductsUpload', 'DocumentManagementController@onunfitProductsUpload');
    Route::post('onunInvoiceProductsUpload', 'DocumentManagementController@onunInvoiceProductsUpload');
  
    
});

