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

use Modules\Parameters\Http\Controllers\ParametersController;
use Modules\Parameters\Http\Controllers\OrganizationParameterController;
use Modules\Parameters\Http\Controllers\CommonParameterController;
use Modules\Parameters\Http\Controllers\BaseController;
use Modules\Parameters\Http\Controllers\PremiseRegistrationController;

Route::group(['middleware' => ['web'], 'prefix' => 'parameters'], function(){

    Route::post('/{entity}', [CommonParameterController::class,'saveParameter']);
    Route::put('/{entity}', [CommonParameterController::class,'saveParameter']);
    Route::put('{entity}/merge', [CommonParameterController::class,'merge']);
    Route::get('/{entity}', [CommonParameterController::class,'getParameters']);
     Route::delete('/{entity}/{id}/{action}', [CommonParameterController::class,'deleteParameter'])
        -> where(
            [
                'id' => '[0-9]+',
                'action' => 'actual|soft|enable'
            ]
        );
});
Route::group(['middleware' => ['web'], 'prefix' => 'premiseregistration/parameter'], function(){

    Route::post('/{entity}', [PremiseRegistrationController::class,'saveParameter']);
    Route::put('/{entity}', [PremiseRegistrationController::class,'saveParameter']);
    Route::put('{entity}/merge', [PremiseRegistrationController::class,'merge']);
    Route::get('/{entity}', [PremiseRegistrationController::class,'getParameters']);
    Route::delete('/{entity}/{id}/{action}', [PremiseRegistrationController::class,'deleteParameter'])
        -> where(
            [
                'id' => '[0-9]+',
                'action' => 'actual|soft|enable'
            ]
        );
});

Route::group(['middleware' => ['web'], 'prefix' => 'organization/parameters'], function(){

    Route::post('/{entity}', [OrganizationParameter::class,'saveParameter']);
    Route::put('/{entity}', [OrganizationParameter::class,'saveParameter']);
    Route::put('{entity}/merge', [OrganizationParameter::class,'merge']);
    Route::get('/{entity}', [OrganizationParameter::class,'getParameters']);
    Route::delete('/{entity}/{id}/{action}', [OrganizationParameter::class,'deleteParameter'])
        -> where(
            [
                'id' => '[0-9]+',
                'action' => 'actual|soft|enable'
            ]
        );
});



Route::group(['middleware' => ['web'], 'prefix' => 'commonparam'], function(){
    //model_name:model_name, as a parameter
    Route::get('getCommonParamFromModel', [CommonParameterController::class,'getCommonParamFromModel']);
    Route::get('getCommonParamFromTable', [CommonParameterController::class,'getCommonParamFromTable']);
    Route::get('deleteParameters', [CommonParameterController::class,'deleteParameters']);


    Route::get('getelementcost',[CommonParameterController::class,'getelementcost']);
    Route::get('getcostCategories',[CommonParameterController::class,'getcostCategories']);
    Route::get('getcostSubCategories',[CommonParameterController::class,'getcostSubCategories']);
    Route::get('getProductTypes',[CommonParameterController::class,'getProductTypes']);
    Route::get('getOrgBankAccounts',[CommonParameterController::class,'getOrgBankAccounts']);
    Route::get('getBankBranches',[CommonParameterController::class,'getBankBranches']);
    
    Route::get('getDeviceTypes',[CommonParameterController::class,'getDeviceTypes']);
    Route::get('getglaccounts',[CommonParameterController::class,'getglaccounts']);
    Route::get('getAgeAnalysisDaysSpanParam',[CommonParameterController::class,'getAgeAnalysisDaysSpanParam']);
    Route::get('saveCommonParameter',[CommonParameterController::class,'saveCommonParameter']);
    Route::get('getUserGroupsdetails',[CommonParameterController::class,'getUserGroupsdetails']);
    Route::get('getCountriesByStateRegions',[CommonParameterController::class,'getCountriesByStateRegions']);

    
    //notification configurations
    Route::get('getDirectorateNotificationsConfig',[CommonParameterController::class,'getDirectorateNotificationsConfig']);
    Route::get('getDepartmentalNotificationsConfig',[CommonParameterController::class,'getDepartmentalNotificationsConfig']);
   
});
