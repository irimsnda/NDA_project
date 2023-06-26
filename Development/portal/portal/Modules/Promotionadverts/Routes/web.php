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

Route::prefix('promotionadverts')->group(function() {
    Route::get('/', 'PromotionadvertsController@index');
});

Route::group(['middleware' => 'auth:api','prefix' => 'promotionadverts'], function()
{
    

    Route::get('getPromotionalProductParticulars', 'PromotionadvertsController@getPromotionalProductParticulars');
    Route::post('savePromotionalAdvertapplication', 'PromotionadvertsController@savePromotionalAdvertapplication');

    Route::get('getPromotionAlderrApplication', 'PromotionadvertsController@getPromotionAlderrApplication');
    Route::get('getPromotionalAdvertDetails', 'PromotionadvertsController@getPromotionalAdvertDetails');
    Route::post('OnSavePromotionalProductParticulars', 'PromotionadvertsController@OnSavePromotionalProductParticulars');
    Route::post('onDeleteOtherApplicationsDetails', 'PromotionadvertsController@onDeleteOtherApplicationsDetails');
    Route::post('onSavepromotionalMaterialsDetails', 'PromotionadvertsController@onSavepromotionalMaterialsDetails');
    Route::get('getApppromMaterialsDetailData', 'PromotionadvertsController@getApppromMaterialsDetailData');
    Route::get('getApplicationsCounter', 'PromotionadvertsController@getApplicationsCounter');

    
});

