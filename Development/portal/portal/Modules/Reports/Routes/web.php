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

Route::prefix('reports')->group(function() {
    Route::get('/', 'ReportsController@index');
});

Route::group(['middleware' => 'web', 'prefix' => 'reports'], function()
{
    Route::get('generateReport','ReportsController@generateReport');
    Route::get('generateApplicationInvoice','ReportsController@generateApplicationInvoice');
    Route::get('generateApplicationReceipt','ReportsController@generateApplicationReceipt');
    Route::get('generatePremiseCertificate','ReportsController@generatePremiseCertificate');
    Route::get('generatePremisePermit','ReportsController@generatePremisePermit');

    
    Route::get('generateProductRegCertificate','ReportsController@generateProductRegCertificate');
    Route::get('generateProductsApplicationRpt','ReportsController@generateProductsApplicationRpt');
    Route::get('generateProductRejectionLetter','ReportsController@generateProductRejectionLetter');
    Route::get('generateApplicationReceipts','ReportsController@generateApplicationReceipts');
    Route::get('generateRetentionStatements','ReportsController@generateRetentionStatements');
    Route::get('onExportRegisteredproducts','ReportsController@onExportRegisteredproducts');
    Route::get('generateProductApplicationReport','ReportsController@generateProductApplicationReport');
    Route::get('generateProductsNotificationRpt','ReportsController@generateProductsNotificationRpt');
    
});
