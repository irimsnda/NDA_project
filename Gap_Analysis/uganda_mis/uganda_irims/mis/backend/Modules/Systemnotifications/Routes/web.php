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

// Route::prefix('systemnotifications')->group(function() {
//     Route::get('/', 'SystemnotificationsController@index');
// });
use Modules\Systemnotifications\Http\Controllers\SystemnotificationsController;

Route::group(['prefix' => 'systemnotifications','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [SystemnotificationsController::class,'index']);
    Route::get('submitInvoiceNotifications',  [SystemnotificationsController::class,'submitInvoiceNotifications']);
    
    Route::get('submitReceiptNotifications',  [SystemnotificationsController::class,'submitReceiptNotifications']);
    
    Route::get('submitProductExpiryDueNotification',  [SystemnotificationsController::class,'submitProductExpiryDueNotification']);
});