<?php

namespace Modules\Parameters\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rule;
use Modules\Parameters\Entities\Finance\CostCenter;
use Modules\Parameters\Entities\Finance\CostCategory;
use Modules\Parameters\Entities\Finance\CostSubCategory;
use Modules\Parameters\Entities\Finance\Currency;
use Modules\Parameters\Entities\Finance\elementscost;
use Modules\Parameters\Entities\Finance\ExchangeRate;
use Modules\Parameters\Entities\Finance\FeeType;
use Modules\Parameters\Entities\Finance\PaymentInterval;
use Modules\Parameters\Entities\Finance\TransactionType;
use Modules\Parameters\Entities\Locations\Country;
use Modules\Parameters\Entities\Locations\Region;
use Modules\Parameters\Entities\Locations\District;
use Modules\Parameters\Entities\Locations\City;
use Modules\Parameters\Entities\PortalParameter;
use Illuminate\Support\Facades\DB;

class CommonParameterController extends BaseController
{
     public function __construct()
    {

        $this->invoker = [
//            "save-portalparameter" => function($request) {
//                $validator = $this->validateParameterRequest($request);
//
//                if($validator -> fails()){
//                    return response() -> json([
//                        "success" =>  false,
//                        "message" => "Form has errors",
//                        "errors" => $validator -> errors()
//                    ]);
//                }
//
//                return PortalParameter::saveData($request,
//                    "par_portal_parameters",
//                    $request->input('id'));
//            },
            "save-country" => function ($request) {
                $validator = $this->validateParameterRequest($request);

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }

                return Country::saveData($request,
                    "par_countries",
                    $request->input('id'));
            },
            "save-region" => function ($request) {
                $validator = $this->validateParameterRequest($request,
                    "country_id");

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return Region::saveData($request, 'par_regions',
                    $request->input('id'),
                    'country_id');
            },
            "save-district" => function ($request) {
                $validator = $this->validateParameterRequest($request, "region_id");

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return District::saveData($request, 'par_districts',
                    $request->input('id'),
                    'region_id');
            },
            "save-city" => function ($request) {
                $validator = $this->validateParameterRequest($request,
                    "district_id");

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return city::saveData($request, 'par_cities',
                    $request->input('id'),
                    'district_id');
            },
            "save-costcenter" => function ($request) {
                $validator = $this->validateParameterRequest($request);

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return CostCenter::saveData($request, "par_cost_centers", $request->input('id'));
            },
            "save-costcategory" => function ($request) {
                $validator = $this->validateParameterRequest($request);

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return CostCategory::saveData($request, 'par_cost_categories',
                    $request->input('id'),
                    'cost_center_id');
            },
            "save-costsubcategory" => function ($request) {
                $validator = $this->validateParameterRequest($request);
                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return CostSubCategory::saveData($request, 'par_cost_sub_categories',
                    $request->input('id'),
                    'cost_category_id');
            },
            "save-currency" => function ($request) {
                $validator = $this->validateParameterRequest($request);

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return Currency::saveData($request, "par_currencies", $request->input('id'));
            },
            "save-exchangerate" => function ($request) {
                $validator = null;
                if ($request->isMethod("PUT")) {
                    $validator = Validator::make($request->all(), [
                        "id" => "required|Integer",
                        "rate" => "required|Numeric",
                        "currency_id" => "required|Integer",
                        "description" => "sometimes|max:255"
                    ]);
                } else {
                    $validator = Validator::make($request->all(), [
                        "rate" => "required|Numeric",
                        "currency_id" => "required|Integer",
                        "description" => "sometimes|max:255"
                    ]);
                }

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return ExchangeRate::saveExchangeRate($request, $request->input('id'));
            },
            "save-feetype" => function ($request) {
                $validator = null;
                if ($request->isMethod("PUT")) {
                    $validator = Validator::make($request->all(), [
                        "id" => "required|Integer",
                        "name" => "required",
                        "gl_code" => "required"
                    ]);
                } else {
                    $validator = Validator::make($request->all(), [
                        "name" => "required",
                        "gl_code" => "required"
                    ]);
                }

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return FeeType::saveFeeType($request, $request->input('id'));
            },
            "save-transactiontype" => function ($request) {
                $validator = null;
                if ($request->isMethod("PUT")) {
                    $validator = Validator::make($request->all(), [
                        "id" => "required|Integer",
                        "t_code" => "required",
                        "description" => "sometimes|max:255",
                        "t_type" => [
                            "required",
                            Rule::in(["Debit", "Credit"])
                        ],
                        "output" => [
                            "required",
                            Rule::in(["None", "Receipt", "Debit Note", "Credit Note"])
                        ],
                        "system_invoice" => "sometimes|boolean",
                        "system_receipt" => "sometimes|boolean"
                    ]);
                } else {
                    $validator = Validator::make($request->all(), [
                        "t_code" => "required",
                        "description" => "sometimes|max:255",
                        "t_type" => [
                            "required",
                            Rule::in(["Debit", "Credit"])
                        ],
                        "output" => [
                            "required",
                            Rule::in(["None", "Receipt", "Debit None", "Credit None"])
                        ],
                        "system_invoice" => "sometimes|boolean",
                        "system_receipt" => "sometimes|boolean"
                    ]);
                }

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return TransactionType::saveTransactionType($request, $request->input('id'));
            },
            "save-paymentinterval" => function ($request) {
                $validator = null;
                if ($request->isMethod("PUT")) {
                    $validator = Validator::make($request->all(), [
                        "id" => "sometimes|Integer",
                        "name" => "sometimes",
                        "duration" => "sometimes|Integer",
                        "unit" => "sometimes|Integer",
                        "fixed" => "required|boolean",
                        "fixed_entry_point" => "sometimes",
                        "notification_time_interval" => "sometimes|Integer",
                        "notification_time_interval_unit" => "sometimes|Integer"
                    ]);
                } else {
                    $validator = Validator::make($request->all(), [
                        "name" => "sometimes",
                        "duration" => "sometimes|Integer",
                        "unit" => "sometimes|Integer",
                        "fixed" => "required|boolean",
                        "fixed_entry_point" => "sometimes",
                        "notification_time_interval" => "sometimes|Integer",
                        "notification_time_interval_unit" => "sometimes|Integer"
                    ]);
                }

                if ($validator->fails()) {
                    return response()->json([
                        "success" => false,
                        "message" => "Form has errors",
                        "errors" => $validator->errors()
                    ]);
                }
                return PaymentInterval::savePaymentInterval($request, $request->input('id'));
            },
            "get-portalparameters" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return PortalParameter::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-country" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return Country::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-region" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return Region::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-district" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return District::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-city" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return City::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-costcenter" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return CostCenter::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);

            },
            "get-costcategory" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return CostCategory::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-costsubcategory" => function ($start, $limit, $doRetrieveAll, $filter = null) {

                return CostSubCategory::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);

            },
            "get-currency" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return Currency::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);

            },
            "get-exchangerate" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return ExchangeRate::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "get-feetype" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return FeeType::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);

            },
            "get-transactiontype" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return TransactionType::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);

            },
            "get-paymentinterval" => function ($start, $limit, $doRetrieveAll, $filter = null) {
                return PaymentInterval::getData($start,
                    $limit,
                    $doRetrieveAll,
                    $filter != null ? $this->parseFilter($filter) : null);
            },
            "merge-country" => function ($request) {
                return Country::merge(
                    $request->input('mergeToId'),
                    "country_id",
                    "par_countries",
                    $request->input('ids'));
            },
            "merge-region" => function ($request) {
                return Region::merge(
                    $request->input('mergeToId'),
                    "region_id",
                    "par_regions",
                    $request->input('ids'));
            },
            "merge-district" => function ($request) {
                return District::merge(
                    $request->input('mergeToId'),
                    "district_id",
                    "par_districts",
                    $request->input('ids'));
            },
            "merge-city" => function ($request) {
                return City::merge(
                    $request->input('mergeToId'),
                    "city_id",
                    "par_cities",
                    $request->input('ids'));
            },
            "merge-costcenter" => function ($request) {
                return CostCenter::merge(
                    $request->input('mergeToId'),
                    "cost_center_id",
                    "par_cost_centers",
                    $request->input('ids'));
            },
            "merge-costcategory" => function ($request) {
                return CostCategory::merge(
                    $request->input('mergeToId'),
                    "cost_category_id",
                    "par_cost_categories",
                    $request->input('ids'));
            },
            "merge-costsubcategory" => function ($request) {
                return CostCategory::merge(
                    $request->input('mergeToId'),
                    "cost_sub_category_id",
                    "par_cost_sub_categories",
                    $request->input('ids'));
            },
            "merge-currency" => function ($request) {
                return Currency::merge(
                    $request->input('mergeToId'),
                    "currency_id",
                    "par_currencies",
                    $request->input('ids'));
            },
            "merge-exchangerate" => function ($request) {
                return Currency::merge(
                    $request->input('mergeToId'),
                    "exchange_rate_id",
                    "par_exchange_rates",
                    $request->input('ids'));
            },
            "merge-feetype" => function ($request) {
                return Currency::merge(
                    $request->input('mergeToId'),
                    "fee_type_id",
                    "par_fee_types",
                    $request->input('ids'));
            },
            "merge-transactiontype" => function ($request) {
                return Currency::merge(
                    $request->input('mergeToId'),
                    "transaction_type_id",
                    "par_transaction_types",
                    $request->input('ids'));
            },
            "merge-paymentinterval" => function ($request) {
                return Currency::merge(
                    $request->input('mergeToId'),
                    "payment_interval_id",
                    "par_payment_intervals",
                    $request->input('ids'));
            },
            "delete-country" => function ($id, $action) {
                return Country::deleteData('par_countries', $id, $action);
            },
            "delete-region" => function ($id, $action) {
                return Region::deleteData('par_regions', $id, $action);
            },
            "delete-district" => function ($id, $action) {
                return District::deleteData('par_districts', $id, $action);
            },
            "delete-city" => function ($id, $action) {
                return District::deleteData('par_cities', $id, $action);
            },
            "delete-costcenter" => function ($id, $action) {
                return CostCenter::deleteData('par_cost_centers', $id, $action);
            },
            "delete-costcategory" => function ($id, $action) {
                return CostCategory::deleteData('par_cost_categories', $id, $action);
            },
            "delete-costsubcategory" => function ($id, $action) {
                return CostCategory::deleteData('par_cost_sub_categories', $id, $action);
            },
            "delete-currency" => function ($id, $action) {
                return Currency::deleteData('par_currencies', $id, $action);
            },
            "delete-exchangerate" => function ($id, $action) {
                return Currency::deleteData('par_exchange_rates', $id, $action);
            },
            "delete-feetype" => function ($id, $action) {
                return Currency::deleteData('par_fee_types', $id, $action);
            },
            "delete-transactiontype" => function ($id, $action) {
                return Currency::deleteData('par_transaction_types', $id, $action);
            },
            "delete-paymentinterval" => function ($id, $action) {
                return Currency::deleteData('par_payment_intervals', $id, $action);
            }
        ];
    }

    //Added by KIP
    public function getCommonParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\Parameters\\Entities\\' . $model_name;
            if (isset($strict_mode) && $strict_mode == 1) {
                $results = $model::where('is_enabled', 1)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

      public function getCommonParamFromTable(Request $request)
    {
        $table_name = $request->input('table_name');
        $strict_mode = $request->input('strict_mode');
        $is_config = $request->input('is_config');
        $filters = $request->input('filters');
        $con = $request->input('con');
        $db_con = 'mysql';
        if (isset($con) && $con != '') {
            $db_con = $con;
        }
        $filters = (array)json_decode($filters);
        $filters=array_filter($filters);
        try {
            
            if($table_name == 'par_business_types' || $table_name == 'pms_program_details'){
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->join('par_sections as t2','t1.section_id','=','t2.id')
                        ->select('t1.*','t2.name as section_name');
            }
            else if($table_name == 'par_business_type_details'){
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->join('par_business_types as t3','t1.business_type_id','=','t3.id')
                        ->join('par_sections as t2','t3.section_id','=','t2.id')
                        ->select('t1.*','t3.section_id', 't2.name as section_name', 't3.name as business_type_name');
            }else if($table_name == 'par_countries'){
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_countriesregions as t3','t1.country_region_id','=','t3.id')
                        ->select('t1.*','t3.name as region_name');
            }else if ($table_name == 'par_directorate_emails') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_directorates as t3','t1.directorate_id','=','t3.id')
                        ->select('t1.*','t3.name as directorate_name');
            }
            else if ($table_name == 'par_pmsevaluation_decisions' || $table_name == 'par_pmstcmeeting_decisions' ) {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_pmssamples_stages as t3','t1.samples_nextstage_id','=','t3.id')
                        ->select('t1.*','t3.name as next_stage');
            }
             else if ($table_name == 'par_departments') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_directorates as t3','t1.directorate_id','=','t3.id')
                        ->select('t1.*','t3.name as directorate_name');
            }
            else if ($table_name == 'tra_organisation_information') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_zones as t3','t1.zone_id','=','t3.id')
                        ->select('t1.*','t3.name as zone');
            }else if ($table_name == 'par_appprocess_definations') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_date_options as t3','t1.date_option_id','=','t3.id')
                        ->select('t1.*','t3.name as date_option_name');
            }
            else if ($table_name == 'par_expirynotification_timespan' || $table_name == 'par_auditreport_config' || $table_name == 'par_service_types') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('modules as t3','t1.module_id','=','t3.id')
                        ->select('t1.*','t3.name as module_name');
            }
            else if ($table_name == 'par_inventorysection_levels') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_inventorystore_sections as t3','t1.store_section_id','=','t3.id')
                        ->select('t1.*','t3.name as section_name');
            }
            else if ($table_name == 'par_inventorystore_sections') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_inventory_stores as t3','t1.store_id','=','t3.id')
                        ->select('t1.*','t3.name as store_name');
            }
            else if ($table_name == 'element_costs') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('cost_elements as t3','t1.element_id','=','t3.id')
                        ->leftJoin('par_currencies as t4','t1.currency_id','=','t4.id')
                        ->select('t1.*','t3.name as name','t4.name as currency_name');

            } else if ($table_name == 'par_controldocument_masterlist') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_controldocument_types as t3','t1.controldocument_type_id','=','t3.id')
                        ->leftJoin('par_directorates as t4','t1.directorate_id','=','t4.id')
                        ->leftJoin('par_directorate_units as t5','t1.directorate_unit_id','=','t5.id')
                        ->leftJoin('refnumbers_formats as t6','t1.ref_format_id','=','t6.id')
                        ->select('t1.*','t3.name as controldocument_type_name','t1.id as controldoc_master_id','t1.name as control_document_name', 't1.code as document_no','t4.name as directorate_name','t5.name as directorate_unit_name','t6.name as ref_format');
            }
            else if ($table_name == 'par_directorate_units') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_directorates as t3','t1.directorate_id','=','t3.id')
                        ->select('t1.*','t3.name as directorate_name');
            }
            else if ($table_name == 'users') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->select(DB::raw("CONCAT_WS(' ',decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,t1.*"));
                $is_config = 1;
            }
             else if ($table_name == 'par_exchange_rates') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_currencies as t3','t1.currency_id','=','t3.id')
                        ->select('t1.*','t3.name as currency_name');
            }else if ($table_name == 'par_servicecharter_configurations') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('modules as t3','t1.module_id','=','t3.id')
                        ->leftJoin('par_service_types as t4','t1.service_type_id','=','t4.id')
                        ->select('t1.*','t3.name as module_name', 't4.name as service_type');
            }else if ($table_name == 'par_distributiondirective_units') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_document_directorate as t4','t1.document_directorate_id','=','t4.id')
                        ->select('t1.*', 't4.name as directorate_name');
            }else if ($table_name == 'tra_manufacturers_information') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_countries as t4','t1.country_id','=','t4.id')
                        ->leftJoin('par_regions as t5','t1.region_id','=','t5.id')
                        ->select('t1.*', 't4.name as country_name', 't5.name as region_name');
            }
else if ($table_name == 'par_audited_tables') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_audit_table_types as t4','t1.table_type_id','=','t4.id')
                        ->select('t1.*', 't4.name as table_type');
            }
            else if ($table_name == 'par_default_currencies') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('par_currencies as t4','t1.currency_id','=','t4.id')
                        ->select('t4.*', 't1.id', 't4.id as currency_id');
            }
            else if ($table_name == 'par_formfield_designs') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('par_form_field_types as t5','t1.form_field_type_id','=','t5.id')
                        ->select('t1.*', 't5.name as field_type');
            }else if ($table_name == 'par_form_categories') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('modules as t4','t1.module_id','=','t4.id')
                        ->Join('sub_modules as t5','t1.sub_module_id','=','t5.id')
                        ->leftJoin('par_sections as t6','t1.section_id','=','t6.id')
                        ->leftJoin('par_prodclass_categories as t7','t1.prodclass_category_id','=','t7.id')
                        ->select('t1.*', 't4.name as module_name', 't5.name as sub_module_name', 't6.name as section_name', 't7.name as prodclass_category_name');
            }else if ($table_name == 'par_formtype_fields') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('par_formfield_designs as t4','t1.field_id','=','t4.id')
                        ->select('t1.*', 't4.label as field_name', 't4.label');
                //order
                $qry->orderBy('order_no', 'ASC');
            }else if ($table_name == 'tra_otherstates_productgmpinspections' || $table_name == 'tra_otherstates_productregistrations') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('par_countries as t4','t1.country_id','t4.id')
                        ->Join('par_recognisedassessments_ctrregions as t5','t1.recognisedassessments_ctrregion_id','t5.id')
                        ->select('t1.*', 't4.name as country', 't5.name as recognisedassessments_ctrregion');
               
            }else if ($table_name == 'tra_productreg_clinicalresearchsdetails') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_clinical_researchorganisations as t2','t1.clinical_researchorganisation_id','t2.id')
                        ->select('t1.*', 't2.name as clinical_researchorganisation');
            }
            else if ($table_name == 'registered_premises') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->join('tra_premises as t2','t1.tra_premise_id','t2.id')
                        ->select('t1.*', 't2.name');
            } else if ($table_name == 'par_controlleddrugsconv_factorsconfig') {
                $qry = DB::connection($db_con)
                        ->table('par_controlleddrugsconv_factorsconfig as t1')
                        ->leftJoin('par_controlleddrugs_types as t2','t1.controlleddrugs_type_id','t2.id')
                        ->leftJoin('par_controlled_drugssubstances as t3','t1.controlled_drugssubstances_id','t3.id')
                        ->leftJoin('par_controlleddrugs_basesalts as t4','t1.controlleddrugs_basesalt_id','t4.id')
                        ->select('t1.*', 't2.name as controlleddrugs_type', 't3.name as controlled_drugssubstances', 't4.name as controlleddrugs_basesalt');
            }else if ($table_name == 'par_controlleddrugsannual_ceilingconfig') {
                $qry = DB::connection($db_con)
                        ->table('par_controlleddrugsannual_ceilingconfig as t1')
                        ->join('par_controlleddrugs_types as t2','t1.controlleddrugs_type_id','t2.id')
                        ->join('par_controlled_drugssubstances as t3','t1.controlled_drugssubstances_id','t3.id')
                       
                        ->select('t1.*', 't2.name as controlleddrugs_type', 't3.name as controlled_drugssubstances');
            }else if ($table_name == 'par_checklist_categories') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->leftJoin('par_checklist_category_groups as t2','t1.category_group_id','t2.id')
                        ->select('t1.*', 't2.name as category_group');
            }else if ($table_name == 'tra_applicationinvoicedata_queries' || $table_name == 'wb_applicationinvoicedata_queries') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->join('modules as t4','t1.module_id','=','t4.id')
                        ->leftJoin('sub_modules as t5','t1.sub_module_id','=','t5.id')
                        ->leftJoin('par_sections as t6','t1.section_id','=','t6.id')
                        ->select('t1.*', 't4.name as module_name', 't5.name as sub_module_name', 't6.name as section_name');
            } else{
                $qry = DB::connection($db_con)->table($table_name.' as t1');
            }
             if($table_name =='par_sections'){
                //$qry->whereIn('id',[1,3,2,4,5,6,12,15,]);
            }
            if (count((array)$filters) > 0) {
                if($table_name == 'par_countries'){
                    if(isset($filters['id'])){
                        $id = $filters['id'];
                        $qry->where(array('t1.id'=>$id));
                    }
                    if(isset($filters['is_local'])){
                        $qry->where('is_local', 1);
                    }
                }
                else if($table_name == 'par_product_subcategories' && isset($filters['prodclass_category_id'])){
                    $qry->leftJoin('par_prodclass_subcategories as t2','t1.id', 't2.product_subcategory_id')
                        ->select('t1.*')
                        ->where('t2.prodclass_category_id', $filters['prodclass_category_id']);
                }else if($table_name == 'par_classifications' && isset($filters['prodclass_category_id'])){
                    $qry->leftJoin('par_prodcat_classifications as t2','t1.id', 't2.classification_id')
                        ->select('t1.*')
                        ->where('t2.prodclass_category_id', $filters['prodclass_category_id']);
                }else{
                    $qry->where($filters);
                }
            }
            if (count((array)$filters) > 0) {
                if($table_name == 'par_countries'){
                    $id = $filters['id'];
                    $qry->where(array('t1.id'=>$id));
                }else{
                    $qry->where($filters);
                }


            }
           // $qry->where('t1.is_enabled',1);
           if(!validateIsnumeric($is_config)){
                $qry->where('t1.is_enabled', 1);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }
    public function getelementcost(request $request){
         $table_name = $request->input('table_name');
         $cost_sub_category_id = $request->input('sub_category_id');
         $fee_type_id = $request->input('fee_type_id');
         $section_id = $request->input('section_id');
         $element_id = $request->input('element_id');
        try {
            $qry = DB::table('tra_element_costs as t1')
                ->LeftJoin('par_cost_elements as t2', 't1.element_id', 't2.id')
                ->LeftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                ->LeftJoin('par_cost_sub_categories as t5', 't1.sub_cat_id', 't5.id')
                ->LeftJoin('par_fee_types as t6', 't1.feetype_id', 't6.id')
                ->LeftJoin('par_cost_categories as a7','t1.cost_category_id','a7.id')
                ->LeftJoin('par_confirmations as t8', 't1.formula','t8.flag')
                ->LeftJoin('par_confirmations as t9','t1.optional','t9.flag')
                ->LeftJoin('par_gl_accounts as t10','t1.gl_code_id','t10.id')
                
                ->LeftJoin('par_sections as t11','a7.section_id','t11.id')
                ->LeftJoin('par_cost_types as t12','t1.cost_type_id','t12.id')
                ->select('t1.*', 't1.id as element_costs_id','t11.name as section_name','t4.name as currency_name', 'a7.section_id', 't4.id as currency_id', 't2.name as element', 
                    't4.name as currency', 't5.name as sub_category','t6.name as feetype','a7.name as category', 't8.name as formulaflag', 't9.name as optionalflag','t10.name as glcode','t12.name as cost_type',
                    DB::raw("concat(t6.name,' ',a7.name,' ',t5.name,' ',t2.name, ' ',if(cost >0,cost,formula_rate),' ',t4.name) as element_desc"));
                    
         
              if(validateIsNumeric($cost_sub_category_id)){
                $qry->where('t5.id',$cost_sub_category_id);
              }
              if(validateIsNumeric($section_id)){
                $qry->where('a7.section_id',$section_id);
              }
              if(validateIsNumeric($fee_type_id)){
                $qry->where('t1.feetype_id',$fee_type_id);
              }
               if(validateIsNumeric($element_id)){
                $qry->where('t1.element_id',$element_id);
              }
              $qry->orderBy('t1.id','DESC');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    public function getelementcos12t(request $request){
         $fee_type_id = $request->input('fee_type_id');
         $cost_category_id = $request->input('cost_category_id');
         $sub_cat_id = $request->input('sub_cat_id');
         $cost_item_id = $request->input('cost_item_id');
         $application_feetype_id = $request->input('applicationfee_types_id');
         $currency_id = $request->input('currency_id');
      //   {feetype}: {category} : {sub_category} {element} {cost_type} {costs} {currency_name}&nbsp;</div></tpl>';
        try {
            $qry = DB::table('tra_element_costs as t1')
                ->LeftJoin('par_cost_elements as t2', 't1.element_id', 't2.id')
                ->LeftJoin('par_cost_sub_categories as t5', 't1.sub_cat_id', 't5.id')
                ->LeftJoin('par_fee_types as t6', 't1.feetype_id', 't6.id')
                ->LeftJoin('par_cost_categories as a7','t5.cost_category_id','a7.id')
                ->LeftJoin('par_confirmations as t8', 't1.formula','t8.flag')
                ->LeftJoin('par_gl_accounts as t10','t1.gl_code_id','t10.id')
                ->LeftJoin('par_currencies as t11','t1.currency_id','t11.id')
                ->LeftJoin('par_applicationfee_types as t12','t1.application_feetype_id','t12.id')
                ->select('t1.*', 't1.id as element_costs_id','t11.name as currency_name', 't2.name as element', 't5.name as sub_category','t6.name as feetype','a7.name as category', 't8.name as formulaflag','t10.name as glcode','t12.name as cost_type',DB::raw("concat(t6.name,' ',a7.name,' ',t5.name,' ',t2.name, ' ',if(costs >0,costs,formula_rate),' ',if(t1.currency_id >0,t11.name, 'Is Formular Rate')) as element_desc") );
            if(validateIsNumeric($fee_type_id)){
                $qry->where('t1.fee_type_id',$fee_type_id);
              }
            if(validateIsNumeric($cost_category_id)){
                $qry->where('t5.cost_category_id',$cost_category_id);
              }
            if(validateIsNumeric($sub_cat_id)){
                $qry->where('t1.sub_cat_id',$sub_cat_id);
              }
            if(validateIsNumeric($cost_item_id)){
                $qry->where('t1.element_id',$cost_item_id);
              }
            if(validateIsNumeric($application_feetype_id)){
                $qry->where('t1.application_feetype_id',$application_feetype_id);
              }
           
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
     public function getRetentionChargeConfig(Request $req)
    {
        try{
            $qry = DB::table('tra_retentioncharge_config as t1')
               ->leftJoin('par_sections as t2', 't1.section_id', 't2.id')
               ->leftJoin('par_prodclass_categories as t3', 't1.prodclass_category_id', 't3.id')
               ->leftJoin('par_classifications as t4', 't1.classification_id', 't4.id')
               ->leftJoin('par_product_types as t5', 't1.product_type_id', 't5.id')
               ->leftJoin('element_costs as t6', 't1.element_costs_id', 't6.id')
               ->leftJoin('par_fee_types as t7', 't1.fee_type_id', 't7.id')
               ->leftJoin('par_currencies as t8', 't6.currency_id', 't8.id')
               ->leftJoin('par_device_types as t9', 't1.device_type_id', 't9.id')
               ->select('t1.*','t2.name as section_name','t9.name as device_type', 't3.name as prodclass_category', 't4.name as classification_name','t5.name as product_type', 't6.cost as element_cost', 't7.name as fee_type', DB::raw("CONCAT_WS(' ', t8.name,t6.cost) as element_cost"));
            $results = $qry->get();
            $res = array(
                        'success' => true,
                        'results' => $results,
                        'message' => returnMessage($results)
                    );    
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);

    }

        public function getglaccounts(request $request){
         $cost_sub_category_id = $request->input('sub_category_id');
        try {
            $qry = DB::table('par_gl_accounts as t1')
                ->select('t1.*');
              if(isset($cost_sub_category_id)){
                $qry->where('t5.id',$cost_sub_category_id);
              }
              //by
              $qry->orderBy('id','DESC');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    
    }
    public function getAgeAnalysisDaysSpanParam(request $request){
       $qry= DB::table('par_ageanalysisdays_span as t1')
             ->LeftJoin('modules as t2', 't1.module_id','t2.id')
             ->select('t1.*','t2.name as module');

         $qry->orderBy('id','DESC');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is welhhl'
            );

         return json_encode($res);


    }

public function getcostCategories(Request $request){
        $filters = $request->filter;
        
       $qry= DB::table('par_cost_categories as t1')
             ->LeftJoin('par_fee_types as t2', 't1.fee_type_id','t2.id')
             ->LeftJoin('par_sections as t3','t1.section_id','t3.id')
             ->select('t1.*','t2.name as fee_type_name','t3.name as section_name');

         $qry->orderBy('t1.id','DESC');
         if ($filters != '') {
            $filters = (array)json_decode($filters);
            if(validateIsNumeric($filters['section_id'])){
                 $results = $qry->where($filters);
            }
            else{
                unset($filters['section_id']);
                 $results = $qry->where($filters);
            }
           
        }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message' => 'All is well'
            );

         return json_encode($res);


    }
    public function getcostSubCategories(Request $request){
        $filters = $request->filter;
       $qry= DB::table('par_cost_sub_categories as t1')
             ->LeftJoin('par_sections as t2', 't1.section_id','t2.id')
             ->LeftJoin('par_cost_categories as t4', 't1.cost_category_id','t4.id')
             ->LeftJoin('par_fee_types as t3', 't1.fee_type_id','t3.id')
             ->select('t1.*','t2.name as section_name','t3.name as fee_type_name','t4.name as cost_category_name');

         $qry->orderBy('t1.id','DESC');
         if ($filters != '') {
            $filters = (array)json_decode($filters);
            $results = $qry->where($filters);
        }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message' => 'All is well'
            );

         return json_encode($res);


    }
   public function getProductTypes(Request $request){

           $qry= DB::table('par_product_types as t1')
                 ->LeftJoin('par_cost_sub_categories as t2', 't1.cost_subcategory_id','t2.id')
                 ->select('t1.*','t2.name as cost_subcategory_name');

             $qry->orderBy('t1.id','DESC');
                $results = $qry->get();
                $res = array(
                    'success' => true,
                    'results' => $results,
                    'message' => 'All is well'
                );

             return json_encode($res);


        }
  public function getBankBranches(Request $request){

           $qry= DB::table('par_bankbranches as t1')
                 ->LeftJoin('par_banks as t2', 't1.bank_id','t2.id')
                 ->select('t1.*','t2.name as bank_name');

             $qry->orderBy('t1.id','DESC');
                $results = $qry->get();
                $res = array(
                    'success' => true,
                    'results' => $results,
                    'message' => 'All is well'
                );

             return json_encode($res);


        }

 public function getCountriesByStateRegions(Request $request){

           $qry= DB::table('par_countries as t1')
                 ->select('t1.*');

             $qry->orderBy('t1.id','DESC');
                $results = $qry->get();
                $res = array(
                    'success' => true,
                    'results' => $results,
                    'message' => 'All is well'
                );

             return json_encode($res);


        }
  public function getOrgBankAccounts(Request $request){

       $qry= DB::table('tra_orgbank_accounts as t1')
             ->LeftJoin('par_banks as t2', 't1.bank_id','t2.id')
             ->LeftJoin('par_bankbranches as t3', 't1.branch_id','t3.id')
             ->LeftJoin('par_banks as t4', 't1.intermediate_bank_id','t4.id')
             ->LeftJoin('par_currencies as t5', 't1.currency_id','t5.id')
             ->select('t1.*','t2.name as bank_name','t3.name as branch_name','t4.name as intermediate_bank','t5.name as currency');

         $qry->orderBy('t1.id','DESC');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

         return json_encode($res);


    }

  public function getDeviceTypes(Request $request){

       $qry= DB::table('par_device_types as t1')
             ->LeftJoin('par_cost_types as t2', 't1.cost_type_id','t2.id')
             ->LeftJoin('par_sections as t3','t1.section_id','t3.id')
             ->select('t1.*','t2.name as cost_type_name','t3.name as section_name');

         $qry->orderBy('t1.id','DESC');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message' => 'All is well'
            );

         return json_encode($res);


    }

    public function saveCommonParameter(Request $req)
        {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();

            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['_dc']);
            unset($post_data['id']);
            
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $res = insertRecord($table_name, $table_data, $user_id);
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    function deleteParameters(Request $req){
        $table_name=$req->table_name;
        $id=$req->id;
        $action=$req->action;
        return Currency::deleteData($table_name, $id, $action);
    }

    function getDirectorateNotificationsConfig(Request $req){
        $qry=DB::table('tra_directorate_notifications as t1')
            ->leftJoin('par_directorates as t2','t1.directorate_id','t2.id')
            ->leftJoin('par_notification_categories as t3','t1.notification_category_id','t3.id')
            ->leftJoin('modules as t4','t1.module_id','t4.id')
            ->leftJoin('par_sections as t5','t1.section_id','t5.id')
            ->select('t1.*','t2.name as directorate_name','t3.name as notification_category_name','t4.name as module_name','t5.name as section_name');

        $results = $qry->get();

         foreach ($results as $result) {
              $emailArray=json_decode($result->email_addresses);
              $emails=implode(',', $emailArray);
              $result->email_addresses=$emails;
         }

        $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        return json_encode($res);

    }
    function getDepartmentalNotificationsConfig(Request $req){
        $qry=DB::table('tra_departmental_notifications as t1')
            ->leftJoin('par_departments as t2','t1.department_id','t2.id')
            ->leftJoin('par_notification_categories as t3','t1.notification_category_id','t3.id')
            ->leftJoin('modules as t4','t1.module_id','t4.id')
            ->leftJoin('par_sections as t5','t1.section_id','t5.id')
            ->select('t1.*','t2.name as department_name','t3.name as notification_category_name','t4.name as module_name','t5.name as section_name');
        $results = $qry->get();
         foreach ($results as $result) {
              $groupArray=json_decode($result->group_ids);
              $groups=$this->getStringFromTable($groupArray,'par_groups', 'name');
              $result->group_ids=$groups;
         }
       
        $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        return json_encode($res);

    }
    public function getStringFromTable($IDarrays, $table, $field){
        $qry=DB::table($table)
            ->whereIn('id',$IDarrays)
            ->select($field);

        $results=$qry->get();
        $res=array();
        foreach ($results as $result) {
            $res[]=$result->$field;
        }
            $string=implode(',', $res);


     return $string;
    }
    public function getUserGroupsdetails(Request $req){
        try{
            $user_id = $req->user_id;
            $qry = DB::table('tra_user_group as t1')
                        ->join('par_groups as t2','t1.group_id','=','t2.id')
                        ->select('t2.*')
                        ->where('user_id',$user_id);
                        $results = $qry->get();
                        $res = array(
                            'success' => true,
                            'results' => $results,
                            'message' => returnMessage($results)
                        );        
           
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);  


    }

}
