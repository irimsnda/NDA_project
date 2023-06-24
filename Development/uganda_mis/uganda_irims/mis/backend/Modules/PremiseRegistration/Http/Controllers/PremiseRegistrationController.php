<?php

namespace Modules\PremiseRegistration\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

Builder::macro('firstOrFail', function () {
    if ($record = $this->first()) {
        return $record;
    }
    return '';
});

class PremiseRegistrationController extends Controller
{
    protected $user_id;

    public function __construct(Request $req)
    {
        $is_mobile = $req->input('is_mobile');
        if (is_numeric($is_mobile) && $is_mobile > 0) {
            $this->user_id = $req->input('user_id');
        } else {
            $this->middleware(function ($request, $next) {
                if (!\Auth::check()) {
                    $res = array(
                        'success' => false,
                        'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
                    );
                    echo json_encode($res);
                    exit();
                }
                $this->user_id = \Auth::user()->id;
                return $next($request);
            });
        }
    }

    public function index()
    {
        return view('premiseregistration::index');
    }
public function getAllPremisesList(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $region_id = $request->input('region_id');
        $section_id = $request->input('section_id');
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
                $limit = $request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'region_name' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'district_name' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $qry = DB::table('tra_premises as t1')
                ->leftJoin('registered_premises as t0', 't0.tra_premise_id', '=', 't1.id')
                ->leftJoin('tra_premises_applications as t6', 't6.premise_id', '=', 't1.id')
                ->leftJoin('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftJoin('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('par_regions as t4', 't1.region_id', '=', 't4.id')
                ->leftJoin('par_districts as t5', 't1.district_id', '=', 't5.id')
                ->select('t0.id as main_registered_id', 't1.id as premise_id', 't1.id as manufacturing_site_id', 't1.*', 't2.permit_no', 't3.name as applicant_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no',
                    't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address','t4.name as region_name', 't5.name as district_name',
                    't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($premise_id)) {
                $qry->where('t1.id', $premise_id);
            }if (validateIsNumeric($region_id)) {
                $qry->where('t1.region_id', $region_id);
            }
           // $results = $qry->get();

            $totalCount  = $qry->count();
                $records = $qry->skip($start*$limit)->take($limit)->orderBy('t1.id','desc')->get();
                $res = array('success'=>true,
                                'results'=>$records,
                                'totalCount'=>$totalCount
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
public function funcAddNewPremisesDetails(Request $request){
        try{

            $user_id = $this->user_id;
            $premise_params = array(
                'name' => $request->input('name'),
                'section_id' => $request->input('section_id'),
                'country_id' => $request->input('country_id'),
                'region_id' => $request->input('region_id'),

                'district_id' => $request->input('district_id'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'physical_address' => $request->input('physical_address'),
                'postal_address' => $request->input('postal_address'),
                'business_scale_id' => $request->input('business_scale_id'),
                'business_type_id' => $request->input('business_type_id'),
                'premise_type_id' => $request->input('premise_type_id'),
                'vehicle_reg_no' => $request->input('vehicle_reg_no')

            );
            $premise_table = 'tra_premises';

            $check = DB::table($premise_table)
                        ->where(array('name' => $request->input('name'),'physical_address' => $request->input('physical_address')))
                        ->count();
            if($check ==0){
                $res = insertRecord($premise_table, $premise_params, $user_id);
            }
            else{
                $res = array('success'=>false, 'message'=>'Premises details already exists, search in the premises list details');
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
        return \response()->json($res);
    }
    public function savePremiseRegCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }

            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
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

    public function savePremiseOtherDetails(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $is_temporal = $post_data['is_temporal'];
            $premise_id = $post_data['premise_id'];
            $business_type_id = $post_data['business_type_id'];
            $business_type_detail_id = $post_data['business_type_detail_id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $where2 = array(
                'premise_id' => $premise_id,
                'business_type_id' => $business_type_id,
                'business_type_detail_id' => $business_type_detail_id
            );
            if (DB::table($table_name)
                    ->where($where2)
                    ->count() > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'This combination already exists!!'
                );
                return \response()->json($res);
            };
            $portal_premise_id = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'portal_id');
            $portal_db = DB::connection('portal_db');
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
                    //update portal
                    if ($is_temporal < 1) {
                        unset($table_data['premise_id']);
                        $portal_id = $previous_data[0]['portal_id'];
                        $portal_db->table('wb_premises_otherdetails')
                            ->where('id', $portal_id)
                            ->update($table_data);
                    }
                }
            } else {
                //insert portal
                $premise_id = $table_data['premise_id'];
                unset($table_data['premise_id']);
                if ($is_temporal < 1) {
                    $table_data['premise_id'] = $portal_premise_id;
                    $portal_id = $portal_db->table('wb_premises_otherdetails')
                        ->insertGetId($table_data);
                    $table_data['portal_id'] = $portal_id;
                }
                $table_data['premise_id'] = $premise_id;
                //$table_data['portal_id'] = $portal_id;
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

    public function savePremisePersonnelQualifications(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $personnel_id = $post_data['personnel_id'];
            $study_field_id = $post_data['study_field_id'];
            $qualification_id = $post_data['qualification_id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            $table_data = $post_data;
            $table_data_p = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $where2 = array(
                'personnel_id' => $personnel_id,
                'study_field_id' => $study_field_id,
                'qualification_id' => $qualification_id
            );
            /*$portal_personnel_id = getSingleRecordColValue('tra_personnel_information', array('id' => $personnel_id), 'portal_id');
            $portal_db = DB::connection('portal_db');*/
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords($table_name, $where);
                    if ($prev_data['success'] == false) {
                        return $prev_data;
                    }
                    $previous_data = $prev_data['results'];
                    //portal
                    /*unset($table_data_p['personnel_id']);
                    $portal_id = $previous_data[0]['portal_id'];
                    if (isset($portal_id) && $portal_id != '') {//update
                        $table_data_p['mis_altered_by'] = $user_id;
                        $table_data_p['mis_dola'] = Carbon::now();
                        $portal_db->table('wb_personnel_qualifications')
                            ->where('id', $portal_id)
                            ->update($table_data_p);
                    } else {//insert
                        $table_data_p['mis_created_by'] = $user_id;
                        $table_data_p['mis_created_on'] = Carbon::now();
                        $table_data['personnel_id'] = $portal_personnel_id;
                        $portal_id = $portal_db->table('wb_personnel_qualifications')
                            ->insertGetId($table_data_p);
                    }
                    $table_data['portal_id'] = $portal_id;*/
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                //check existence of this combination
                if (DB::table($table_name)
                        ->where($where2)
                        ->count() > 0) {
                    $res = array(
                        'success' => false,
                        'message' => 'This combination already exists!!'
                    );
                    return \response()->json($res);
                };
                //insert portal
                /*unset($table_data_p['personnel_id']);
                $table_data_p['personnel_id'] = $portal_personnel_id;
                $table_data_p['mis_created_by'] = $user_id;
                $table_data_p['mis_created_on'] = Carbon::now();
                $portal_id = $portal_db->table('wb_personnel_qualifications')
                    ->insertGetId($table_data_p);*/
                //insert mis
                //$table_data['portal_id'] = $portal_id;
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
    
    public function saveLegalityofStockprdRemarks(Request $req)
    {
            $table_name = 'tra_premlegalityofstocked_products';
           $application_id = $req->application_id;
           $has_illegal_stock = $req->has_illegal_stock;
           $legalitystock_remarks = $req->legalitystock_remarks;
            $where = array(
                'application_id' => $application_id
            );
            $table_data = array(
                'has_illegal_stock' => $has_illegal_stock,
                'application_id' => $application_id,
                'legalitystock_remarks' => $legalitystock_remarks
            );
            $res = $this->savePremisesUniformDetails($where,$table_data,$table_name);
           
         return response()->json($res);
    }
    public function savePremIllegalStockedProducts(Request $req)
    {
            $table_name = 'tra_premillegalstocked_products';
           $application_id = $req->application_id;
           $id = $req->id;
           $brand_name = $req->brand_name;
           $common_name_id = $req->common_name_id;
           $manufacturer_id = $req->manufacturer_id;
           $quantity = $req->quantity;
           $packaging_units_id = $req->packaging_units_id;
           $value = $req->value;
           $currency_id = $req->currency_id;
           $legalitystock_remarks = $req->legalitystock_remarks;
           
            $where = array(
                'id' => $id
            );
            $table_data = array(
                'brand_name' => $brand_name,
                'common_name_id' => $common_name_id,
                'manufacturer_id' => $manufacturer_id,
                'quantity' => $quantity,
                'packaging_units_id' => $packaging_units_id,
                'value' => $value,
                'currency_id' => $currency_id,
                'application_id' => $application_id,
                'type_ofstockillegalities_id'=>$req->type_ofstockillegalities_id,
                'legalitystock_remarks' => $legalitystock_remarks
            );
            $res = $this->savePremisesUniformDetails($where,$table_data,$table_name);
           
             return response()->json($res);
    }
    public function getPremisesIllegalPrdStockDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $results = DB::table('tra_premillegalstocked_products as t1')
                                ->leftJoin('par_common_names as t2', 't1.common_name_id','t2.id')
                                ->leftJoin('tra_manufacturers_information as t3', 't1.manufacturer_id','t3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id','t4.id')
                                ->leftJoin('par_packaging_units as t5', 't1.packaging_units_id','t5.id')
                                ->leftJoin('par_type_ofstockillegalities as t6', 't1.type_ofstockillegalities_id','t6.id')
                                ->select('t1.*','t6.name as type_of_illegality', 't2.name as common_name', 't3.name as manufacturer_name', 't4.name as currency_name', 't5.name as packaging_units')
                                ->where(array('application_id'=>$application_id))
                                ->get();

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
        return response()->json($res);
    }
    function savePremisesUniformDetails($where,$table_data,$table_name){
            try{
                $user_id = \Auth::user()->id;
            
                if (recordExists($table_name, $where)) {
                    
                        $table_data['dola'] = Carbon::now();
                        $table_data['altered_by'] = $user_id;
                        $prev_data = getPreviousRecords($table_name, $where);
                        if ($prev_data['success'] == false) {
                            return $prev_data;
                        }
                        $previous_data = $prev_data['results'];
                    
                        $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
                else {
                
                    $table_data['created_on'] = Carbon::now();
                    $table_data['created_by'] = $user_id;
                    
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
         return $res;

    }
    public function deletePremiseRegRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function softDeletePremiseRegRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = softDeleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function undoPremiseRegSoftDeletes(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = undoSoftDeletes($table_name, $previous_data, $where, $user_id);
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

    public function getApplicantsList(Request $request)
    {
        $applicant_id = $request->input('applicant_id');
        $applicantType = $request->input('applicantType');
        try {
            $qry = DB::table('wb_trader_account as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->join('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.tin_no',
                    't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                    't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone',
                    't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name',
                    't1.id as ltr_id', 't1.name as ltr_name', 't1.country_id as ltr_country_id', 't1.region_id as ltr_region_id', 't1.district_id as ltr_district_id',
                    't1.physical_address as ltr_physical_address', 't1.postal_address as ltr_postal_address',
                    't1.telephone_no as ltr_telephone', 't1.fax as ltr_fax', 't1.email as ltr_email', 't1.website as ltr_website');

            if (isset($applicant_id) && $applicant_id != '') {
                $qry->where('t1.id', $applicant_id);
            }
            if (isset($applicantType) && $applicantType != 'local') {
                $qry->where('t1.country_id', 36);
            }
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

    public function getPremisesList(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $region_id = $request->input('region_id');
        $section_id = $request->input('section_id');
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
                $limit = $request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'region_name' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'district_name' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }

        try {
            $qry = DB::table('registered_premises as t0')
                ->join('tra_premises as t1', 't0.tra_premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't1.permit_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_contact_person', '=', 't3.id')
                ->leftJoin('par_regions as t4', 't1.region_id', '=', 't4.id')
                ->leftJoin('par_regions as t5', 't1.district_id', '=', 't5.id')
                ->select('t0.id as main_registered_id', 't1.id as premise_id', 't1.id as manufacturing_site_id', 't1.*', 't2.permit_no', 't3.name as applicant_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no',
                    't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address','t4.name as region_name', 't5.name as district_name',
                    't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website')
                ->whereIn('t0.validity_status_id', array(2, 4));
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($premise_id)) {
                $qry->where('t1.id', $premise_id);
            }if (validateIsNumeric($region_id)) {
                $qry->where('t1.region_id', $region_id);
            }
           // $results = $qry->get();

            $totalCount  = $qry->count();
                $records = $qry->skip($start*$limit)->take($limit)->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
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

    public function getPremiseContactPersonDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        try {
            $qry = DB::table('tra_premises as t1')
                ->leftJoin('tra_personnel_information as t2', 't1.contact_person_id', '=', 't2.id')
                ->select('t2.*', 't1.applicant_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date')
                ->where('t1.id', $premise_id);
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results
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

    public function getPremiseApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"))
                ->where('t1.is_dismissed', '<>', 1);
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t7.current_stage', $assigned_stages)->where(array('t7.isDone'=>0));
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            $qry->where('t7.isDone', 0);
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

    public function getDismissedPremiseApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('tra_dismissed_applications as t11')
                ->join('tra_premises_applications as t1', 't11.application_code', '=', 't1.application_code')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_applicationdismissal_reasons as t6', 't11.dismissal_reason_id', '=', 't6.id')
                ->join('sub_modules as t7', 't1.sub_module_id', '=', 't7.id')
                ->join('users as t8', 't11.dismissal_by', '=', 't8.id')
                ->select(DB::raw("t1.*, t2.name as premise_name, t3.name as applicant_name, t4.name as application_status,
                    t7.name as sub_module_name,t1.id as active_application_id,t5.name as workflow_stage,t6.name as dismissal_reason,
                    t11.dismissal_date,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as author"));
            if (validateIsNumeric($section_id)) {
                $qry->where('t11.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t11.sub_module_id', $sub_module_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('par_regions as t8', 't2.region_id', '=', 't8.id')
                ->leftJoin('par_districts as t9', 't2.district_id', '=', 't9.id')
                ->select('t1.*', 't1.application_code','t8.name as region_name', 't9.name as district_name', 't2.physical_address', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status',
                    't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id')
                ->where(array('current_stage'=>$workflow_stage, 'isDone'=>0))
                ->orderBy('t7.id', 'desc');//'t1.workflow_stage_id', $workflow_stage
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

    public function getManagerApplicationsRenewalGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                 ->leftjoin('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->select('t1.*', 't2.target_id as premise_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status')
                ->where(array('t8.current_stage'=>$workflow_stage, 'isDone'=>0));
                
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

    public function getManagerReviewApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $recommendation_id = $request->input('recommendation_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('tra_premiseinspection_applications as t6', function ($join) {
                    $join->on('t1.application_code', '=', 't6.application_code');
                    //->where('t6.status', '=', 1);
                })
                ->leftjoin('par_premiseinspection_recommendations as t7', 't6.recommendation_id', '=', 't7.id')
                ->leftjoin('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->leftjoin('par_regions as t9', 't2.region_id', '=', 't9.id')
                ->leftjoin('par_districts as t10', 't2.district_id', '=', 't10.id')
                ->select('t1.*', 't1.application_code', 't2.name as premise_name','t9.name as region_name', 't10.name as district_name', 't2.physical_address', 't3.name as applicant_name', 't4.name as application_status',
                    't5.decision_id', 't1.id as active_application_id', 't7.name as inspect_recomm')
                ->where(array('t8.current_stage'=>$workflow_stage, 'isDone'=>0));
                
            if (validateIsNumeric($recommendation_id)) {
                $qry->where('t6.recommendation_id', $recommendation_id);
            }
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

    public function getManagerInspectionApplications(Request $request)
    {
        $table_name = 'tra_premises_applications';
        $workflow_stage = $request->input('workflow_stage_id');
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_premiseinspection_applications as t7', function ($join) use ($inspection_id) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->where('t7.inspection_id', $inspection_id);
                })
                ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
                ->whereNotIn('t1.application_code', function ($query) use ($table_name, $workflow_stage, $inspection_id) {
                    $query->select(DB::raw('t8.application_code'))
                        ->from('tra_premiseinspection_applications as t8')
                        ->join($table_name . ' as t9', 't8.application_code', '=', 't9.application_code')
                        ->join('tra_premise_inspection_details as t10', 't8.inspection_id', '=', 't10.id')
                        ->where('t9.workflow_stage_id', $workflow_stage)
                        ->where('t8.inspection_id', '<>', $inspection_id)
                        ->where('t10.status', 1);
                })
                
                ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')
                 ->leftJoin('tra_submissions as t13', 't1.application_code', '=', 't13.application_code')
                
                ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
                ->select('t1.*','t2.physical_address','t11.name as region_name','t12.name as district_name', 't2.name as premise_name', 't2.business_type_id', 't3.name as applicant_name', 't4.name as application_status',
                    't10.name as business_type', 't7.inspection_id', 't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id')
                ->where(array('t13.current_stage'=>$workflow_stage,'isDone'=>0) );
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
    public function getPremisesinspectionschedulingDetails(Request $request)
    {
        $table_name = 'tra_premises_applications';
        $workflow_stage = $request->input('workflow_stage_id');
        $inspection_id = $request->input('inspection_id');
        $results = array();
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_premiseinspection_applications as t7', function ($join) use ($inspection_id) {
                    $join->on('t1.application_code', '=', 't7.application_code');
                })
                ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
                ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')
                
                ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
                ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')
                
                ->leftJoin('par_premiseinspection_recommendations as t15', 't7.recommendation_id', '=', 't15.id')
                ->leftJoin('tra_premlegalityofstocked_products as t16', 't16.application_id', '=', 't1.id')
                ->select('t1.*','t2.physical_address','t11.name as region_name','t12.name as district_name', 't2.name as premise_name', 't2.business_type_id', 't3.name as applicant_name', 't4.name as application_status','t7.actual_start_date','t7.actual_end_date','t16.has_illegal_stock','t16.legalitystock_remarks',
                    't10.name as business_type','t7.id as app_inspection_id', 't7.inspection_id','t7.recommendation_id','t14.name as inspection_type','t15.name as inspection_recommendation',  't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id')
                ->where(array('t7.inspection_id'=>$inspection_id))->groupBy('t1.id');
                if(validateIsNumeric($inspection_id)){
                    $results = $qry->get();
                }//,'t1.workflow_stage_id'=>$workflow_stage
           
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
    public function getPremisesinspectionreviewrecomdetails(Request $request)
    {
        $table_name = 'tra_premises_applications';
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
               
                ->leftJoin('tra_premiseinspection_applications as t7', 't7.application_code', '=', 't1.application_code')
                ->leftJoin('par_premiseinspection_recommendations as t6', 't7.approval_recommendation_id', '=', 't6.id')
                
                ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
                ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')
                
                ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
                ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')
                
                ->leftJoin('par_premiseinspection_recommendations as t15', 't7.recommendation_id', '=', 't15.id')
                ->select('t1.*','t2.physical_address','t11.name as region_name','t12.name as district_name', 't2.name as premise_name', 't2.business_type_id', 't3.name as applicant_name', 't4.name as application_status','t7.approval_remarks','t7.actual_start_date','t7.actual_end_date',
                    't10.name as business_type','t7.id as app_inspection_id', 't7.inspection_id','t7.approval_recommendation_id','t14.name as inspection_type','t15.name as inspection_recommendation',  't6.name as approval_status','t1.id as active_application_id')
                ->where(array('t1.workflow_stage_id'=>$workflow_stage));
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
    public function getPremisesApprovedinspectiondetails(Request $req)
    {
        $table_name = 'tra_premises_applications';
        $section_id = $req->input('section_id');
        $inspection_recommendation_id = $req->input('inspection_recommendation_id');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');

        $inspected_from = $req->input('inspected_from');
        $inspected_to = $req->input('inspected_to');
        $inspection_type_id = $req->input('inspection_type_id');
        $approval_recommendation_id = $req->input('approval_recommendation_id');
        $section_id = $req->input('section_id');


        $approved_from_date = $req->input('approved_from_date');
        $approved_to_date = $req->input('approved_to_date');
        
        try {
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'premise_name' :
                                $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'region_name' :
                                $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'district_name' :
                                $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                break;  
                                case 'physical_address' :
                                $whereClauses[] = "t2.physical_address like '%" . ($filter->value) . "%'";
                                break; 
                                case 'applicant_name' :
                                $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
           
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
               
                ->join('tra_premiseinspection_applications as t7', 't7.application_code', '=', 't1.application_code')
                ->join('par_premiseinspection_recommendations as t6', 't7.approval_recommendation_id', '=', 't6.id')
                
                ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
                ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')
                
                ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
                ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')
                
                ->leftJoin('par_premiseinspection_recommendations as t15', 't7.recommendation_id', '=', 't15.id')
                ->select('t1.*','t2.physical_address','t11.name as region_name','t12.name as district_name', 't2.name as premise_name', 't2.business_type_id', 't3.name as applicant_name', 't4.name as application_status','t7.approval_remarks','t7.actual_start_date','t7.actual_end_date',
                    't10.name as business_type','t7.id as app_inspection_id', 't7.inspection_id','t7.approval_recommendation_id','t14.name as inspection_type','t15.name as inspection_recommendation',  't6.name as approval_status','t1.id as active_application_id');

                    if(validateIsNumeric($inspection_type_id)){
                            
                        $qry->where(array('t7.inspection_type_id'=>$inspection_type_id));

                    }if(validateIsNumeric($inspection_recommendation_id)){
        
                        $qry->where(array('t7.recommendation_id'=>$inspection_recommendation_id));
                    }if(validateIsNumeric($section_id)){
        
                        $qry->where(array('t1.section_id'=>$section_id));
                    }if(validateIsNumeric($approval_recommendation_id)){
        
                        $qry->where(array('t7.approval_recommendation_id'=>$approval_recommendation_id));
                    }
                    // /the inspected
                    if($inspected_from != '' || $inspected_to){
                        $qry->whereRAW(" actual_start_date BETWEEN '".$inspected_from."' and '".$inspected_to."' ");
                        $qry->whereRAW(" actual_end_date BETWEEN '".$inspected_from."' and '".$inspected_to."' ");
                    }
                    if($approved_from_date != ''){
                        $qry->whereRAW(" approval_date >= '".$approved_from_date."' ");
                    }if($approved_to_date != ''){
                        $qry->whereRAW(" approval_date <= '".$approved_to_date."' ");
                    }

                    if ($filter_string != '') {

                        $qry->whereRAW($filter_string);
                    }
                    if(validateIsNumeric( $section_id)){

                        $qry->where('t1.section_id',$section_id);
                    }      
                                $count = $qry->get()->count();
                                $records = $qry->skip($start)->take($limit)->get();

                    $res = array(
                    'success' => true,
                    'results' => $records,
                    'totals' => $count,
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
    

    
    public function getPremisesInspectionRecommendationDetails(Request $request)
    {
        $table_name = 'tra_premiseinspection_applications';
        $app_inspection_id = $request->input('app_inspection_id');
        $premise_id = $request->input('premise_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises_applications as t2', 't1.application_code','t2.application_code')
                ->leftJoin('tra_premlegalityofstocked_products as t3', 't2.id', 't3.application_id')
                ->select('t1.*','t3.has_illegal_stock','t3.legalitystock_remarks', 't1.id as record_id')->where(array('t1.id'=>$app_inspection_id,'t1.premise_id'=>$premise_id));

            $results = $qry->first();
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
    
    public function getPremiseApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->leftJoin('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->join('tra_submissions as t9', 't1.application_code', '=', 't9.application_code')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't2.init_premise_id', 't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.decision_id', 't5.id as recommendation_id', 't6.name as recommendation')
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0));
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


     public function getDrugShopApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->leftJoin('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->join('tra_submissions as t9', 't1.application_code', '=', 't9.application_code')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't2.init_premise_id', 't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.decision_id', 't5.id as recommendation_id', 't6.name as recommendation')
                ->where(array('t9.current_stage'=>$workflow_stage,'t1.module_id'=>29,'isDone'=>0));
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


    public function getPremiseWithdrawalApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->leftJoin('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->join('tra_submissions as t9', 't1.application_code', '=', 't9.application_code')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't2.init_premise_id', 't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.decision_id', 't5.id as recommendation_id', 't6.name as recommendation')
                ->where(array('t9.current_stage'=> $workflow_stage, 'isDone'=>0));
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->withdrawal_reasons = _withdrawalReasons($result->application_code);
            }
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

    public function getPremiseOtherDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $is_temporal = $request->input('is_temporal');
        try {
            $qry = DB::table('tra_premises_otherdetails as t1')
                ->join('par_business_types as t2', 't1.business_type_id', '=', 't2.id')
                ->join('par_business_type_details as t3', 't1.business_type_detail_id', '=', 't3.id')
                ->select('t1.*', 't2.name as business_type', 't3.name as business_type_detail')
                ->where('t1.premise_id', $premise_id);
            if (isset($is_temporal) && $is_temporal == 1) {

            } else {
                $qry->where(function ($query) {
                    $query->where('t1.is_temporal', 0)
                        ->orWhereNull('t1.is_temporal');
                });
            }
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

    public function getPremisePersonnelDetails(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                $results = $this->getOnlineAppPremisePersonnelDetails($request);
            } else {
                $results = $this->getMISPremisePersonnelDetails($request);
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getMISPremisePersonnelDetails(Request $request)
    {

        $premise_id = $request->input('premise_id');

         $qry = DB::table('tra_premises_personnel as t1')
            // ->leftjoin('tra_personnel_information as t2', 't1.personnel_id', '=', 't2.id')
            ->leftjoin('par_personnel_qualifications as t5', 't1.qualification_id', '=', 't5.id')
            ->join('par_personnel_positions as t6', 't1.position_id', '=', 't6.id')
            ->select(DB::raw("t1.*, t1.personnel_name as name,t5.name as qualification,t1.study_field,t6.name as position,t1.professional_board"))
            ->where('t1.premise_id', $premise_id);

        $results = $qry->get();
        return $results;
    }

    public function getOnlineAppPremisePersonnelDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_premises_personnel as t1')
            ->select('t1.*')
            ->where('premise_id', $premise_id);
        $results = $qry->get();
        foreach ($results as $key => $result) {
            $personnel_details = getTableData('tra_personnel_information', array('id' => $result->personnel_id));
            if (!is_null($personnel_details)) {
                $results[$key]->name = $personnel_details->name;
                $results[$key]->telephone_no = $personnel_details->telephone_no;
                $results[$key]->email_address = $personnel_details->email_address;
                $results[$key]->postal_address = $personnel_details->postal_address;
            }
            $results[$key]->study_field = getSingleRecordColValue('par_personnel_studyfield', array('id' => $result->study_field_id), 'name');
            $results[$key]->position = getSingleRecordColValue('par_personnel_positions', array('id' => $result->position_id), 'name');;
            $results[$key]->qualification = getSingleRecordColValue('par_personnel_qualifications', array('id' => $result->qualification_id), 'name');;
        }
        return $results;
    }

    public function getPremisePersonnelQualifications(Request $request)
    {
        $personnel_id = $request->input('personnel_id');
        try {
            $qry = DB::table('tra_personnel_qualifications as t1')
                ->join('par_personnel_qualifications as t2', 't1.qualification_id', '=', 't2.id')
                ->join('par_personnel_studyfield as t3', 't1.study_field_id', '=', 't3.id')
                ->select(DB::raw("t1.*, t3.name as study_field,t2.name as qualification,
                CONCAT(CONCAT_WS(' - ',t3.name,t2.name),' (',t1.institution,')') as qualification_combined"))
                ->where('t1.personnel_id', $personnel_id);
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

    public function getQueryPrevResponses(Request $request)
    {
        $query_id = $request->input('query_id');
        try {
            $qry = DB::table('checklistitems_queryresponses as t1')
                ->where('query_id', $query_id)
                ->where('t1.id', '<>', DB::raw("(SELECT MAX(id) FROM checklistitems_queryresponses WHERE query_id=$query_id)"))
                ->orderBy('id', 'ASC');
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

    public function removeApplicationPaymentDetails(Request $request)
    {
        $item_ids = $request->input();
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $invoice_id = $request->input('invoice_id');
        $user_id = $this->user_id;
        unset($item_ids['application_id']);
        unset($item_ids['application_code']);
        unset($item_ids['invoice_id']);
        try {
            $res = array();
            DB::transaction(function () use ($item_ids, $user_id, &$res, $application_id, $application_code, $invoice_id) {
                $qry = DB::table('tra_payments as t1')
                    ->whereIn('id', $item_ids);
                //log records
                $records = $qry->select(DB::raw("t1.*,$user_id as deleted_by,NOW() as deleted_at"))
                    ->get();
                $records = convertStdClassObjToArray($records);
                DB::table('tra_payments_deletion_log')
                    ->insert($records);
                DB::table('tra_payments')
                    ->whereIn('id', $item_ids)
                    ->delete();
                $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $invoice_id);
                $balance = $payment_details['running_balance'];
                $invoice_amount = $payment_details['invoice_amount'];
                $res = array(
                    'success' => true,
                    'balance' => $balance,
                    'invoice_amount' => $invoice_amount,
                    'message' => 'Selected payment details removed successfully!!'
                );
            }, 5);
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

    public function getPremApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        $premise_id = $request->input('premise_id');
        try {
            $application_details = DB::table('tra_premises_applications')
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered fetching application details!!'
                );
                return \response()->json($res);
            }
            $qryApplicant = DB::table('wb_trader_account as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.tin_no',
                    't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                    't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone',
                    't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name')
                ->where('t1.id', $applicant_id);
            $applicantDetails = $qryApplicant->first();

            $qryPremise = DB::table('tra_premises as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select('t1.name as premise_name', 't1.id as premise_id', 't1.*')
                ->where('t1.id', $premise_id);
            $premiseDetails = $qryPremise->first();

            $qryContact = DB::table('tra_premises as t1')
                ->leftJoin('tra_personnel_information as t2', 't1.contact_person_id', '=', 't2.id')
                ->select('t2.*', 't2.name as contact_name', 't2.postal_address as contact_postal_address', 't2.telephone_no as contact_telephone_no', 't2.email_address as contact_email_address',
                    't1.applicant_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date')
                ->where('t1.id', $premise_id);
            $contactDetails = $qryContact->first();

            $res = array(
                'success' => true,
                'applicant_details' => $applicantDetails,
                'premise_details' => $premiseDetails,
                'contact_details' => $contactDetails,
                'message' => 'Records fetched successfully'
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

    public function getApplicationEvaluationTemplate(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            $results = getTableData('evaluation_templates', $where);
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

    public function getOnlineApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $application_status = $request->input('application_status');
        try {
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_premises_applications as t1')
                ->join('wb_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('wb_rejection_remarks as t5', function ($query) {
                    $query->on('t1.application_code', '=', 't5.application_code')
                        ->whereRaw('t5.id IN (select MAX(a2.id) from wb_rejection_remarks as a2 group by a2.id)');
                })
                ->leftJoin('par_onlineapps_rejectionreasons as t6', 't5.reason_id', '=', 't6.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code', 't2.name as premise_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.status_type_id', 't4.name as application_status', 't4.is_manager_query', 't6.name as rejection_reason', 't5.remark as rejection_remark', 't5.created_on as rejection_date')
                ->whereIn('application_status_id', array(2, 13, 15, 17, 23, 24));
            if (isset($application_status) && is_numeric($application_status)) {
                $qry->where('application_status_id', $application_status);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            $subModulesData = getParameterItems('sub_modules', '', '');
            foreach ($results as $key => $result) {
                $results[$key]->sub_module_name = returnParamFromArray($subModulesData, $result->sub_module_id);
            }
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

    public function getOnlineAppPremiseOtherDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_premises_otherdetails as t1')
                ->where('premise_id', $premise_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->business_type = getSingleRecordColValue('par_business_types', array('id' => $result->business_type_id), 'name');
                $results[$key]->business_type_detail = getSingleRecordColValue('par_business_type_details', array('id' => $result->business_type_detail_id), 'name');
            }
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

    public function getOnlineAppPremisePersonnelDetails1(Request $request)
    {
        $premise_id = $request->input('premise_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_premises_personnel as t1')
                ->where('premise_id', $premise_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $personnel_details = DB::table('tra_personnel_information')
                    ->where('id', $result->personnel_id)
                    ->first();
                $qualification_details = DB::table('tra_personnel_qualifications as t1')
                    ->join('par_personnel_qualifications as t2', 't1.qualification_id', '=', 't2.id')
                    ->join('par_personnel_studyfield as t3', 't1.study_field_id', '=', 't3.id')
                    ->where('t1.id', $result->personnel_qualification_id)
                    ->select(DB::raw("CONCAT(CONCAT_WS(' - ',t3.name,t3.name),' (',t1.institution,')') as qualification_combined"))
                    ->first();
                if (!is_null($personnel_details)) {
                    $results[$key]->id = $personnel_details->id;
                    $results[$key]->name = $personnel_details->name;
                    $results[$key]->telephone_no = $personnel_details->telephone_no;
                    $results[$key]->email_address = $personnel_details->email_address;
                    $results[$key]->postal_address = $personnel_details->postal_address;
                }
                if (!is_null($qualification_details)) {
                    $results[$key]->qualification_combined = $qualification_details->qualification_combined;
                }
            }

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

    public function updateOnlineApplicationQueryResponse(Request $request)
    {
        $portal_application_id = $request->input('application_id');
        $comment = $request->input('comment');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //Prev application details
            $prev_app_details = DB::table('tra_premises_applications')
                ->where('portal_id', $portal_application_id)
                ->first();
            if (is_null($prev_app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching previous MIS application details, consult System Admin!!'
                );
                return \response()->json($res);
            }
            $application_id = $prev_app_details->id;
            $process_id = $prev_app_details->process_id;
            $premise_id = $prev_app_details->premise_id;
            $applicant_id = $prev_app_details->applicant_id;
            $application_code = $prev_app_details->application_code;
            $module_id = $prev_app_details->module_id;
            $sub_module_id = $prev_app_details->sub_module_id;
            $section_id = $prev_app_details->section_id;
            $ref_no = $prev_app_details->reference_no;
            $app_status_id = 4;
            //process details
            $where = array(
                'id' => $process_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where);
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                );
                return \response()->json($res);
            }
            //workflow details
            $where2 = array(
                'id' => $process_details->workflow_id,
                'stage_status' => 1
            );
            $workflow_details = getTableData('wf_workflow_stages', $where2);
            if (is_null($workflow_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                );
                return \response()->json($res);
            }

            $portal_db = DB::connection('portal_db');
            $portal_details = $portal_db->table('wb_premises_applications as t1')
                ->where('id', $portal_application_id)
                ->first();
            if (is_null($portal_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return \response()->json($res);
            }
            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $portal_details->trader_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return \response()->json($res);
            }
            //premise details
            $premise_details = $portal_db->table('wb_premises as t1')
                ->select(DB::raw("t1.*,t1.id as portal_id,$user_id as altered_by,NOW() as dola"))
                ->where('id', $portal_details->premise_id)
                ->first();
            if (is_null($premise_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting premise details, consult System Admin!!'
                );
                return \response()->json($res);
            }
            //update premise main details
            $where_premise = array(
                'id' => $premise_id
            );
            $premise_data = convertStdClassObjToArray($premise_details);
            unset($premise_data['id']);
            unset($premise_data['mis_dola']);
            unset($premise_data['mis_altered_by']);
            $prev_data = getPreviousRecords('tra_premises', $where_premise);
            if ($prev_data['success'] == false) {
                DB::rollBack();
                return \response()->json($prev_data);
            }
            $premise_update = updateRecord('tra_premises', $prev_data['results'], $where_premise, $premise_data, $user_id);
            //update premise other details
            $premise_otherdetails = $portal_db->table('wb_premises_otherdetails')
                ->where('premise_id', $portal_details->premise_id)
                ->select(DB::raw("id as portal_id,$premise_id as premise_id,business_type_id,business_type_detail_id,$user_id as created_by"))
                ->get();
            $premise_otherdetails = convertStdClassObjToArray($premise_otherdetails);
            unset($premise_otherdetails['id']);
            $where_premise2 = array(
                'premise_id' => $premise_id
            );
            DB::table('tra_premises_otherdetails')
                ->where($where_premise2)
                ->delete();
            DB::table('tra_premises_otherdetails')
                ->insert($premise_otherdetails);
            //application update
            $app_update = array(
                'premise_id' => $premise_id,
                'zone_id' => $portal_details->zone_id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id
            );
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
            $where_app = array(
                'id' => $application_id
            );
            $prev_data = getPreviousRecords('tra_premises_applications', $where_app);
            if ($prev_data['success'] == false) {
                DB::rollBack();
                return \response()->json($prev_data);
            }
            $application_update = updateRecord('tra_premises_applications', $prev_data['results'], $where_app, $app_update, $user_id);
            if ($application_update['success'] == false) {
                DB::rollBack();
                return \response()->json($application_update);
            }
            //print_r($application_update);
            $portal_db->table('wb_premises_applications')
                ->where('id', $portal_application_id)
                ->update(array('application_status_id' => 3));
            $details = array(
                'application_id' => $application_id,
                'application_code' => $application_code,
                'reference_no' => $ref_no,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'premise_id' => $premise_id,
                'applicant_id' => $applicant_id
            );
            //submissions
            $submission_params = array(
                'application_id' => $application_id,
                'process_id' => $process_details->id,
                'application_code' => $application_code,
                'reference_no' => $ref_no,
                'usr_from' => $user_id,
                'usr_to' => $user_id,
                'previous_stage' => $workflow_details->id,
                'current_stage' => $workflow_details->id,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $app_status_id,
                'urgency' => 1,
                'applicant_id' => $applicant_id,
                'remarks' => $comment,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            DB::table('tra_submissions')
                ->insert($submission_params);
            DB::commit();
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
            );
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function rejectOnlineApplicationDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $portal_db->table('wb_premises_applications')
                ->where('id', $application_id)
                ->update(array('application_status_id' => 4));
            $res = array(
                'success' => true,
                'message' => 'Application reversed successfully to the Portal!!'
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

    public function deleteApplicationInvoice(Request $request)
    {
        $invoice_id = $request->input('invoice_id');
        $user_id = $this->user_id;
        $res = array();
        try {
            DB::transaction(function () use ($invoice_id, $user_id, &$res) {
                $table_name = 'tra_application_invoices';
                $where = array(
                    'id' => $invoice_id
                );
                $res = getPreviousRecords($table_name, $where);
                if ($res['success'] == true) {
                    $data = $res['results'];
                    DB::table('tra_invoice_details')
                        ->where('invoice_id', $invoice_id)
                        ->delete();
                    $res = deleteRecord($table_name, $data, $where, $user_id);
                }
            }, 5);
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

    public function savePremisePersonnelDetails(Request $request)
    {
        $personnel_id = $request->input('id');
        $trader_id = $request->input('trader_id');
        $user_id = $this->user_id;
        $personnel_data = array(
            'name' => $request->input('name'),
            'trader_id' => $trader_id,
            'postal_address' => $request->input('postal_address'),
            'telephone_no' => $request->input('telephone_no'),
            'email_address' => $request->input('email_address'),
            'registration_no' => $request->input('registration_no'),
            'registration_date' => $request->input('registration_date'),
            'qualification_id' => $request->input('qualification_id'),
            'country_id' => $request->input('country_id'),
            'region_id' => $request->input('region_id'),
            'district_id' => $request->input('district_id')
        );
        /*$portal_personnel_data = array(
            'name' => $request->input('name'),
            'registration_no' => $request->input('registration_no'),
            'postal_address' => $request->input('postal_address'),
            'telephone_no' => $request->input('telephone_no'),
            'email_address' => $request->input('email_address')
        );*/
        try {
            /*$portal_db = DB::connection('portal_db');
            $portal_trader_id = getSingleRecordColValue('wb_trader_account', array('id' => $trader_id), 'portal_id');*/
            if (isset($personnel_id) && $personnel_id != '') {
                $personnel_data['dola'] = Carbon::now();
                $personnel_data['altered_by'] = $user_id;
                $prev_data = getPreviousRecords('tra_personnel_information', array('id' => $personnel_id));
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                //portal
                /*$portal_id = $prev_data['results'][0]['portal_id'];
                if (isset($portal_id) && $portal_id != '') {//update portal
                    $portal_personnel_data['mis_dola'] = Carbon::now();
                    $portal_personnel_data['mis_altered_by'] = $user_id;
                    $portal_db->table('wb_personnel_information')
                        ->where('id', $portal_id)
                        ->update($portal_personnel_data);
                } else {//insert portal
                    $portal_personnel_data['trader_id'] = $portal_trader_id;
                    $portal_personnel_data['mis_created_on'] = Carbon::now();
                    $portal_personnel_data['mis_created_by'] = $user_id;
                    $portal_id = $portal_db->table('wb_personnel_information')
                        ->insertGetId($portal_personnel_data);
                }*/
                //mis
                //$personnel_data['portal_id'] = $portal_id;
                $res = updateRecord('tra_personnel_information', $prev_data['results'], array('id' => $personnel_id), $personnel_data, $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
            } else {
                $personnel_data['created_on'] = Carbon::now();
                $personnel_data['created_by'] = $user_id;
                //portal
                /*$portal_personnel_data['trader_id'] = $portal_trader_id;
                $portal_personnel_data['mis_created_on'] = Carbon::now();
                $portal_personnel_data['mis_created_by'] = $user_id;
                $portal_id = $portal_db->table('wb_personnel_information')
                    ->insertGetId($portal_personnel_data);*/
                //mis
                //$personnel_data['portal_id'] = $portal_id;
                $res = insertRecord('tra_personnel_information', $personnel_data, $user_id);
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
        return \response()->json($res);
    }

     public function saveClnPremisePersonnelLinkageDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $position_id = $request->input('position_id');
        $id = $request->input('id');
        $trader_id = $request->input('trader_id');
        $personnel_id = $request->input('personnel_id');
        $user_id = $this->user_id;
        try {
            /*----------------------------------------------------
                check to ensure each personnel belong to a single registrant
            ------------------------------------------------------*/
            $check = DB::table('tra_premises_personnel as t1')
                        ->leftJoin('tra_premises as t2', 't1.premise_id', 't2.id')
                        ->where('personnel_id', $personnel_id)
                        ->whereNotIn('t2.applicant_id', [$trader_id])
                        ->count();
            if($check > 0){
                $res = array(
                    'success' => false,
                    'message' => 'Personnel is already responsible for a different outlet of another owner!!'
                );
                return \response()->json($res);
            }
            
            //MIS ammended
            $where = array(
                'id' => $id
            );



            $link_data = array(
                'qualification_id' => $request->input('qualification_id'),
                'position_id' => $position_id,
                'datacleanup_request_id' => $datacleanup_request_id,
                'registration_no' => $request->input('registration_no'),
                'study_field' => $request->input('study_field'),
                'institution' => $request->input('institution'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
            );
            $qry = DB::table('tra_premises_personnel')
                ->where($where);
            $count = $qry->count();
            if (validateIsNumeric($app_id)) {

                $link_data['dola'] = Carbon::now();
                $link_data['altered_by'] = $user_id;
                $prev_data = getPreviousRecords('tra_premises_personnel', $where);
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                $res = updateRecord('tra_premises_personnel', $prev_data['results'], $where, $link_data, $user_id);


            } else {

                $link_data['premise_id'] = $premise_id;
                $link_data['personnel_id'] = $personnel_id;
                $link_data['created_on'] = Carbon::now();
                $link_data['created_by'] = $user_id;
                $res = insertRecord('tra_premises_personnel', $link_data, $user_id);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function savePremisePersonnelLinkageDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $position_id = $request->input('position_id');
        $id = $request->input('id');
        $trader_id = $request->input('trader_id');
        $personnel_id = $request->input('personnel_id');
        $user_id = $this->user_id;
        try {
            /*----------------------------------------------------
                check to ensure each personnel belong to a single registrant
            ------------------------------------------------------*/
            $check = DB::table('tra_premises_personnel as t1')
                        ->leftJoin('tra_premises as t2', 't1.premise_id', 't2.id')
                        ->leftJoin('tra_premises_applications as t3', 't3.premise_id', 't2.id')
                        ->where('personnel_id', $personnel_id)
                        ->whereNotIn('t3.applicant_id', [$trader_id])
                        ->count();
            if($check > 0){
                $res = array(
                    'success' => false,
                    'message' => 'Personnel is already responsible for a different outlet of another owner!!'
                );
                return \response()->json($res);
            }
            
            //MIS ammended
            $where = array(
                'id' => $id
            );



            $link_data = array(
                'qualification_id' => $request->input('qualification_id'),
                'personnel_name' => $request->input('personnel_name'),
                'telephone_no' => $request->input('telephone_no'),
                'email_address' => $request->input('email_address'),
                'position_id' => $position_id,
                'registration_no' => $request->input('registration_no'),
                'study_field' => $request->input('study_field'),
                'institution' => $request->input('institution'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
            );
            $qry = DB::table('tra_premises_personnel')
                ->where($where);
            $count = $qry->count();
            if (validateIsNumeric($id)) {

                $link_data['dola'] = Carbon::now();
                $link_data['altered_by'] = $user_id;
                $prev_data = getPreviousRecords('tra_premises_personnel', $where);
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                $res = updateRecord('tra_premises_personnel', $prev_data['results'], $where, $link_data, $user_id);


            } else {

                $link_data['premise_id'] = $premise_id;
                $link_data['personnel_id'] = $personnel_id;
                $link_data['created_on'] = Carbon::now();
                $link_data['created_by'] = $user_id;
                $res = insertRecord('tra_premises_personnel', $link_data, $user_id);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function deletePersonnelQualification(Request $request)
    {
        $id = $request->input('id');
        $user_id = $this->user_id;
        $where = array(
            'id' => $id
        );
        try {
            $prev_data = getPreviousRecords('tra_personnel_qualifications', $where);
            if ($prev_data['success'] == false) {
                return \response()->json($prev_data);
            }
            $portal_id = $prev_data['results'][0]['portal_id'];
            $res = deleteRecord('tra_personnel_qualifications', $prev_data['results'], $where, $user_id);
            if (isset($portal_id) && $portal_id != '') {
                $portal_db = Db::connection('portal_db');
                $portal_db->table('wb_personnel_qualifications')
                    ->where('id', $portal_id)
                    ->delete();
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
        return \response()->json($res);
    }

    public function uploadPersonnelDocument(Request $request)
    {
        $params = array(
            'personnel_id' => $request->input('personnel_id'),
            'name' => $request->input('name'),
            'description' => $request->input('description')
        );
        $table_name = 'tra_personnel_docs';
        $folder = '\resources\uploads';
        $user_id = $this->user_id;
        $res = uploadFile($request, $params, $table_name, $folder, $user_id);
        return \response()->json($res);
    }

    public function getPersonnelDocuments(Request $request)
    {
        $personnel_id = $request->input('personnel_id');
        try {
            $where = array(
                'personnel_id' => $personnel_id
            );
            $results = DB::table('tra_personnel_docs')
                ->where($where)
                ->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
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

    public function getTraderPersonnel(Request $request)
    {
        $trader_id = $request->input('trader_id');
        try {
            $where = array(
                'trader_id' => $trader_id
            );
            $results = DB::table('tra_personnel_information as t1')
                ->leftjoin('par_personnel_qualifications as t2', 't1.qualification_id', '=', 't2.id')
                ->leftjoin('par_countries as t3', 't1.country_id', '=', 't3.id')
                ->leftjoin('par_regions as t4', 't1.region_id', '=', 't4.id')
                ->leftjoin('par_districts as t5', 't1.district_id', '=', 't5.id')
                ->select('t1.id', 't1.id as contact_person_id', 't1.name as contact_name', 't1.postal_address as contact_postal_address',
                    't1.telephone_no as contact_telephone_no', 't1.email_address as contact_email_address',
                    't1.id as contact_person_id', 't1.id as superintendent_id', 't1.*','t2.name as qualification','t3.name as country','t4.name as region','t5.name as district','t1.name as supervisor_name','t1.telephone_no as supervisor_telephone_no','t1.email_address as supervisor_email_address','t1.registration_no as supervisor_registration_no','t1.registration_date as supervisor_registration_date','t1.qualification_id as supervisor_qualification_id','t1.country_id as supervisor_country_id','t1.region_id as supervisor_region_id','t1.district_id as supervisor_district_id')
                ->where($where)
                ->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
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

    public function getInspectionDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table('tra_premiseinspection_applications as t1')
                ->join('tra_premise_inspection_details as t2', 't1.inspection_id', '=', 't2.id')
                ->select('t1.id as record_id', 't2.*','t1.*')
                ->where(array('t1.application_code' => $application_code, 't2.status' => 1));
            $results = $qry->first();
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

    public function getInspectionInspectors(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table('tra_premiseinspection_inspectors as t1')
                ->join('users as t2', 't1.inspector_id', '=', 't2.id')
                ->join('par_inspectors_roles as t3', 't1.role_id', '=', 't3.id')
                ->where('t1.inspection_id', $inspection_id)
                ->select(DB::raw("t1.*,CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as inspector_name,t3.name as inspector_role"));
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

    public function getInspectorsList(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table('users as t1')
                ->whereNotIn('t1.id', function ($query) use ($inspection_id) {
                    $query->select(DB::raw('t2.inspector_id'))
                        ->from('inspection_inspectors as t2')
                        ->where('t2.inspection_id', $inspection_id);
                })
                ->select(DB::raw("t1.id,decrypt(t1.email) as email_address,
                CONCAT_WS(' ',decrypt(t1.first_name),decrypt(t1.last_name)) as inspector_name"));
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

    public function saveInspectionInspectors(Request $request)
    {
        $selected = $request->input('selected');
        $selected = json_decode($selected);
        $inspection_id = $request->input('inspection_id');
        $inspector_id = $request->input('inspector_id');
        $inspector_role_id = $request->input('role_id');
        try {
            /*$insert_params = convertStdClassObjToArray($selected);
            DB::table('inspection_inspectors')
                ->insert($insert_params);*/
            $params = array(
                'inspection_id' => $inspection_id,
                'inspector_id' => $inspector_id,
                'role_id' => $inspector_role_id
            );
            if (DB::table('tra_premiseinspection_inspectors')->where($params)->count() > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'Inspector already added!!'
                );
                return \response()->json($res);
            }
            $where = array(
                'inspection_id' => $inspection_id,
                'inspector_id' => $inspector_id
            );
            if (DB::table('tra_premiseinspection_inspectors')->where($where)->count() > 0) {
                DB::table('tra_premiseinspection_inspectors')
                    ->where($where)
                    ->update($params);
            } else {
                DB::table('tra_premiseinspection_inspectors')
                    ->insert($params);
            }
            //only one lead inspector
            if ($inspector_role_id == 2) {
                DB::table('tra_premiseinspection_inspectors')
                    ->where('inspection_id', $inspection_id)
                    ->where('inspector_id', '<>', $inspector_id)
                    ->where('role_id', 2)
                    ->update(array('role_id' => 1));
            }
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function removeInspectionInspectors(Request $request)
    {
        $selected = $request->input('selected');
        $selected = json_decode($selected);
        try {
            DB::table('inspection_inspectors')
                ->whereIn('id', $selected)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function saveNewReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $premise_id = $request->input('premise_id');
        $applicant_id = $request->input('applicant_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $application_region_id = $request->input('application_region_id');
        $region_id = $request->input('region_id');
        //$zone_id = $request->input('zone_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');

        $applicant_contact_person = $request->input('applicant_contact_person');
        $contact_person_id = $request->input('contact_person_id');
        $contact_person_startdate = $request->input('contact_person_startdate');
        $contact_person_enddate = $request->input('contact_person_enddate');
        $premise_type_id = $request->input('premise_type_id');
        $vehicle_reg_no = $request->input('vehicle_reg_no');
       
        // $investment_capital = $request->input('investment_capital');
        //$investment_capital_currency_id = $request->input('investment_capital_currency_id');
        $zone_id = getZoneIdFromRegion($region_id);

        $user_id = $this->user_id;
        $premise_params = array(
            'name' => $request->input('name'),
            //'applicant_id' => $applicant_id,
            'section_id' => $section_id,
            'country_id' => $request->input('country_id'),
            'region_id' => $region_id,
            'district_id' => $request->input('district_id'),
            'street' => $request->input('street'),
            'telephone' => $request->input('telephone'),
            'fax' => $request->input('fax'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'physical_address' => $request->input('physical_address'),
            'postal_address' => $request->input('postal_address'),
            'business_scale_id' => $request->input('business_scale_id'),
            'business_type_id' => $request->input('business_type_id'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude'),
            'contact_person_id' => $contact_person_id,
            'contact_person_startdate' => $contact_person_startdate,
            'contact_person_enddate' => $contact_person_enddate,
            'premise_type_id' => $premise_type_id,
            'vehicle_reg_no' => $vehicle_reg_no,
            'company_registration_no' => $request->input('company_registration_no'),
            'tpin_no' => $request->input('tpin_no'),
            'registration_date' => $request->input('registration_date'),
            'product_classification_id' => $request->input('product_classification_id'),
           // 'investment_capital' => $investment_capital,
            //'investment_capital_currency_id' => $investment_capital_currency_id,
            'domestic_registration_code' => $request->input('domestic_registration_code'),
            'managing_director_email' => $request->input('managing_director_email'),
            'managing_director' => $request->input('managing_director'),
            'managing_director_telepone' => $request->input('managing_director_telepone'),
            'sector_id' => $request->input('sector_id'),
            'cell_id' => $request->input('cell_id'), 
            'applicant_contact_person' => $applicant_contact_person,
            'had_offence' => $request->input('had_offence'),
            'offence' => $request->input('offence'),
            'had_cancelled_application' => $request->input('had_cancelled_application'),
            'cancelling_reason' => $request->input('cancelling_reason'),
            'is_workinotherinstitutions' => $request->input('is_workinotherinstitutions'),
            'working_inotherinstitutions' => $request->input('working_inotherinstitutions'),
            'has_otherlicense' => $request->input('has_otherlicense'),
            'applicant_type_id' => $request->input('applicant_type_id'),
            'is_onbehalf' => $request->input('is_onbehalf')

            
        );
        try {
            $premise_table = 'tra_premises';
            $applications_table = 'tra_premises_applications';

            $where_premise = array(
                'id' => $premise_id
            );
            $where_app = array(
                'id' => $application_id
            );
           // $portal_applicant_id = getSingleRecordColValue('wb_trader_account', array('id' => $applicant_id), 'portal_id');
            if (isset($application_id) && $application_id != "") {//Edit
                //Application_edit
                $application_params = array(
                    //'applicant_id' => $applicant_id,
                    'application_region_id' => $application_region_id,
                    'zone_id' => $zone_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);


                    if ($app_res['success'] == false) {
                        return $app_res;
                    }
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $tracking_no = $app_details[0]['tracking_no'];//$app_details->reference_no;
                //Premise_edit
                if (recordExists($premise_table, $where_premise)) {
                    $premise_params['dola'] = Carbon::now();
                    $premise_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($premise_table, $where_premise);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($premise_table, $previous_data, $where_premise, $premise_params, $user_id);
                    //update portal also
                    unset($premise_params['created_by']);
                    unset($premise_params['created_on']);
                    unset($premise_params['dola']);
                    unset($premise_params['altered_by']);
                    $premise_params['mis_dola'] = Carbon::now();
                    $premise_params['mis_altered_by'] = $user_id;
                   // $premise_params['applicant_id'] = $portal_applicant_id;
                    $portal_premise_id = getSingleRecordColValue('tra_premises', $where_premise, 'portal_id');
                    $portal_db = DB::connection('portal_db');
                    $portal_db->table('wb_premises')
                        ->where('id', $portal_premise_id)
                        ->update($premise_params);
                }
            } else {//Create
                //Premise_create
                $prem_res = insertRecord($premise_table, $premise_params, $user_id);
                if ($prem_res['success'] == false) {
                    return \response()->json($prem_res);
                }
                $premise_id = $prem_res['record_id'];
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code
                );
                $view_id = generateApplicationViewID();
                //$ref_number = generatePremiseRefNumber(1, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'view_id' => $view_id,
                    'module_id' => $module_id,'applicant_id' => $applicant_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'application_region_id' => $application_region_id,
                    'zone_id' => $zone_id,
                    'premise_id' => $premise_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'tracking_no' => $tracking_no,
                    'application_status_id' => $application_status->status_id
                );
                
                $res = insertRecord($applications_table, $application_params, $user_id);
                
                $application_id = $res['record_id'];

                //insert registration table
                $reg_params = array(
                    'tra_premise_id' => $premise_id,
                    'created_by' => $user_id
                );
                createInitialRegistrationRecord('registered_premises', $applications_table, $reg_params, $application_id, 'reg_premise_id');
                //DMS
              //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);
                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'tracking_no' => $tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => $applicant_id,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['premise_id'] = $premise_id;
            $res['tracking_no'] = $tracking_no;
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

     public function getPremiseProprietorsDetails(Request $req){
        try{
            $premise_id = $req->premise_id;
            $manufacturing_site_id = $req->manufacturing_site_id;
            $qry = DB::table('tra_premises_proprietors as t1')
                ->leftJoin('par_countries as t2', 't1.nationality_id', 't2.id')
                ->leftJoin('par_gender as t3', 't1.sex_id', 't3.id')
                ->leftJoin('par_identification_types as t4', 't1.identification_type_id', 't4.id')
                ->select('t1.*', 't2.name as nationality', 't3.name as gender', 't4.name as identification_type');
            if(validateIsNumeric($premise_id)){
               $qry->where('premise_id', $premise_id);
            }
            if(validateIsNumeric($manufacturing_site_id)){
                $qry->where('manufacturing_site_id', $manufacturing_site_id);
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

    public function saveRenewalReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $premise_id = $request->input('premise_id');
        $applicant_id = $request->input('applicant_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $user_id = $this->user_id;
       $premise_params = array(
            'name' => $request->input('name'),
            'section_id' => $section_id,
            'country_id' => $request->input('country_id'),
            'region_id' => $region_id,
            'district_id' => $request->input('district_id'),
            'street' => $request->input('street'),
            'telephone' => $request->input('telephone'),
            'fax' => $request->input('fax'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'physical_address' => $request->input('physical_address'),
            'postal_address' => $request->input('postal_address'),
            'business_scale_id' => $request->input('business_scale_id'),
            'business_type_id' => $request->input('business_type_id'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude'),
            'contact_person_id' => $request->input('contact_person_id'),
            'contact_person_startdate' => $request->input('contact_person_startdate'),
            'contact_person_enddate' => $request->input('contact_person_enddate'),
            'premise_type_id' => $request->input('premise_type_id'),
            'vehicle_reg_no' => $request->input('vehicle_reg_no'),
            'investment_capital' => $request->input('investment_capital'),
            'investment_capital_currency_id' => $request->input('investment_capital_currency_id'),
            
            'domestic_registration_code' => $request->input('domestic_registration_code'),
            'managing_director_email' => $request->input('managing_director_email'),
            'managing_director' => $request->input('managing_director'),
            'managing_director_telepone' => $request->input('managing_director_telepone'),
            'sector' => $request->input('sector'),
            'cell' => $request->input('cell'),
            
            'applicant_contact_person' => $request->input('applicant_contact_person')
        );
        try {
            $premise_table = 'tra_premises';
            $applications_table = 'tra_premises_applications';

            $where_premise = array(
                'id' => $premise_id
            );
            $where_app = array(
                'id' => $application_id
            );
            $target_premise_params = getTableData($premise_table, $where_premise);
            if (is_null($target_premise_params)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching target premise details!!'
                );
                return \response()->json($res);
            }
            $permit_id = $target_premise_params->permit_id;
            $premise_params['is_temporal'] = 1;
            $premise_params['target_id'] = $premise_id;
            $premise_params['permit_id'] = $permit_id;
            $premise_params['premise_reg_no'] = $target_premise_params->premise_reg_no;
            $premise_params['certificate_issue_date'] = $target_premise_params->certificate_issue_date;
            $premise_params['portal_id'] = $target_premise_params->portal_id;

            if (isset($application_id) && $application_id != "") {//Edit
                //Application_edit
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'zone_id' => $zone_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;
                $temporal_premise_id = $app_details[0]['premise_id'];
                $where_temp_premise = array(
                    'id' => $temporal_premise_id
                );
                //Premise_edit
                $premise_params['dola'] = Carbon::now();
                $premise_params['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($premise_table, $where_temp_premise);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($premise_table, $previous_data, $where_temp_premise, $premise_params, $user_id);
            } else {//Create
                //Premise_create
                $prem_res = insertRecord($premise_table, $premise_params, $user_id);
                if ($prem_res['success'] == false) {
                    return \response()->json($prem_res);
                }
                $temporal_premise_id = $prem_res['record_id'];
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code
                );
                $view_id = generateApplicationViewID();
                $ref_number = generatePremiseRefNumber(7, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'view_id' => $view_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'zone_id' => $zone_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'premise_id' => $temporal_premise_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'reference_no' => $ref_number,
                    'application_status_id' => $application_status->status_id
                );
                $res = insertRecord($applications_table, $application_params, $user_id);
                $application_id = $res['record_id'];
                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_number,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => $applicant_id,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['premise_id'] = $premise_id;
            $res['temporal_premise_id'] = $temporal_premise_id;
            $res['ref_no'] = $ref_number;
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

    public function saveRenewalAlterationReceivingBaseDetails(Request $request)
    {
        try {
            $res = array();
            DB::transaction(function () use ($request, &$res) {
                $application_id = $request->input('application_id');
                $init_premise_id = $request->input('premise_id');
                $registered_id = $request->input('main_registered_id');
                $applicant_id = $request->input('applicant_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $region_id = $request->input('region_id');
                $section_id = $request->input('section_id');
                $module_id = $request->input('module_id');
                $sub_module_id = $request->input('sub_module_id');
                $premise_type_id = $request->input('premise_type_id');
                $user_id = $this->user_id;
                $zone_id = getZoneIdFromRegion($region_id);
                if (!is_numeric($registered_id)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered validating your POST data, try again!!'
                    );
                    return \response()->json($res);
                }
                $premise_params = array(
                    'name' => $request->input('name'),
                    'applicant_id' => $applicant_id,
                    'registered_id' => $registered_id,
                    'section_id' => $section_id,
                    'premise_type_id' => $premise_type_id,
                    'country_id' => $request->input('country_id'),
                    'region_id' => $region_id,
                    'district_id' => $request->input('district_id'),
                    'street' => $request->input('street'),
                    'telephone' => $request->input('telephone'),
                    'fax' => $request->input('fax'),
                    'email' => $request->input('email'),
                    'website' => $request->input('website'),
                    'physical_address' => $request->input('physical_address'),
                    'postal_address' => $request->input('postal_address'),
                    'business_scale_id' => $request->input('business_scale_id'),
                    'longitude' => $request->input('longitude'),
                    'latitude' => $request->input('latitude')
                );
                if ($premise_type_id == 2) {
                    $premise_params['vehicle_reg_no'] = $request->input('vehicle_reg_no');
                }
                $premise_table = 'tra_premises';
                $applications_table = 'tra_premises_applications';

                $where_premise = array(
                    'id' => $init_premise_id
                );
                $where_app = array(
                    'id' => $application_id
                );
                $portal_applicant_id = getSingleRecordColValue('wb_trader_account', array('id' => $applicant_id), 'portal_id');
                if (isset($application_id) && $application_id != "") {//Edit
                    $premise_id = $init_premise_id;
                    //Application_edit
                    $application_params = array(
                        'applicant_id' => $applicant_id,
                        'zone_id' => $zone_id,
                        'reg_premise_id' => $registered_id
                    );
                    $app_details = array();
                    if (recordExists($applications_table, $where_app)) {
                        //$app_details = getTableData($applications_table, $where_app);
                        $app_details = getPreviousRecords($applications_table, $where_app);
                        if ($app_details['success'] == false) {
                            return $app_details;
                        }
                        $app_details = $app_details['results'];
                        $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                        if ($app_res['success'] == false) {
                            return $app_res;
                        }
                    }
                    $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                    $tracking_no = $app_details[0]['tracking_no'];//$app_details->reference_no;
                    //Premise_edit
                    if (recordExists($premise_table, $where_premise)) {
                        $premise_params['dola'] = Carbon::now();
                        $premise_params['altered_by'] = $user_id;
                        $previous_data = getPreviousRecords($premise_table, $where_premise);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $res = updateRecord($premise_table, $previous_data, $where_premise, $premise_params, $user_id);
                        //update portal also
                        unset($premise_params['created_by']);
                        unset($premise_params['created_on']);
                        unset($premise_params['dola']);
                        unset($premise_params['altered_by']);
                        $premise_params['mis_dola'] = Carbon::now();
                        $premise_params['mis_altered_by'] = $user_id;
                        $premise_params['applicant_id'] = $portal_applicant_id;
                        $portal_premise_id = getSingleRecordColValue('tra_premises', $where_premise, 'portal_id');
                        $portal_db = DB::connection('portal_db');
                        $portal_db->table('wb_premises')
                            ->where('id', $portal_premise_id)
                            ->update($premise_params);
                    }
                } else {//Create
                    $anyOngoingApps = checkForOngoingApplications($registered_id, $applications_table, 'reg_premise_id', $process_id);
                    if ($anyOngoingApps['exists'] == true) {
                        $res = array(
                            'success' => false,
                            'message' => 'There is an ongoing application of the same nature on the selected Premise with tracking number ' . $anyOngoingApps['tracking_no']
                        );
                        return \response()->json($res);
                    }
                    $init_premise_params = getTableData($premise_table, $where_premise);
                    if (is_null($init_premise_params)) {
                        $res = array(
                            'success' => false,
                            'message' => 'Problem encountered while fetching target premise details!!'
                        );
                        return \response()->json($res);
                    }
                    /*  $premise_params['permit_id'] = $init_premise_params->permit_id;
                      $premise_params['premise_reg_no'] = $init_premise_params->premise_reg_no;
                      $premise_params['certificate_issue_date'] = $init_premise_params->certificate_issue_date;
                      $premise_params['portal_id'] = $init_premise_params->portal_id;*/
                    //Premise_create
                    $premise_params = $init_premise_params;
                    $premise_params = convertStdClassObjToArray($premise_params);
                    $premise_params['init_premise_id'] = $init_premise_id;
                    $premise_params['created_on'] = Carbon::now();
                    $premise_params['created_by'] = $user_id;
                    unset($premise_params['id']);
                    $prem_res = insertRecord($premise_table, $premise_params, $user_id);
                    if ($prem_res['success'] == false) {
                        echo json_encode($prem_res);
                        exit();
                    }
                    $premise_id = $prem_res['record_id'];
                    //copy premise personnel details and business details
                    $init_personnelDetails = DB::table('tra_premises_personnel as t1')
                        ->select(DB::raw("t1.personnel_id,t1.temp_premise_id,t1.position_id,t1.qualification_id,t1.registration_no,
                           t1.study_field_id,t1.institution,t1.start_date,t1.end_date,t1.status_id,t1.portal_id,t1.is_temporal,
                           $user_id as created_by,t1.premise_id as init_premise_id,$premise_id as premise_id"))
                        ->where('premise_id', $init_premise_id)
                        ->get();
                    $init_personnelDetails = convertStdClassObjToArray($init_personnelDetails);
                    $init_businessDetails = DB::table('tra_premises_otherdetails as t2')
                        ->select(DB::raw("t2.temp_premise_id,t2.business_type_id,t2.business_type_detail_id,t2.portal_id,t2.is_temporal,
                    $user_id as created_by,t2.premise_id as init_premise_id,$premise_id as premise_id"))
                        ->where('premise_id', $init_premise_id)
                        ->get();
                    $init_businessDetails = convertStdClassObjToArray($init_businessDetails);
                    DB::table('tra_premises_personnel')
                        ->insert($init_personnelDetails);
                    DB::table('tra_premises_otherdetails')
                        ->insert($init_businessDetails);
                    //Application_create
                    $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code
                    );
                    $view_id = generateApplicationViewID();
                    //$ref_number = generatePremiseRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                    $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                    if ($tracking_details['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    $tracking_no = $tracking_details['tracking_no'];
                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                    $application_params = array(
                        'applicant_id' => $applicant_id,
                        'view_id' => $view_id,
                        'module_id' => $module_id,
                        'reg_premise_id' => $registered_id,
                        'sub_module_id' => $sub_module_id,
                        'section_id' => $section_id,
                        'application_code' => $application_code,
                        'zone_id' => $zone_id,
                        'premise_id' => $premise_id,
                        'process_id' => $process_id,
                        'workflow_stage_id' => $workflow_stage_id,
                        'tracking_no' => $tracking_no,
                        'application_status_id' => $application_status->status_id
                    );
                    $res = insertRecord($applications_table, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    $application_id = $res['record_id'];
                    //DMS
                    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);
                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $application_id,
                        'view_id' => $view_id,
                        'process_id' => $process_id,
                        'application_code' => $application_code,
                        'tracking_no' => $tracking_no,
                        'usr_from' => $user_id,
                        'usr_to' => $user_id,
                        'previous_stage' => $workflow_stage_id,
                        'current_stage' => $workflow_stage_id,
                        'module_id' => $module_id,
                        'sub_module_id' => $sub_module_id,
                        'section_id' => $section_id,
                        'application_status_id' => $application_status->status_id,
                        'urgency' => 1,
                        'applicant_id' => $applicant_id,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                    DB::table('tra_submissions')
                        ->insert($submission_params);
                }
                $res['record_id'] = $application_id;
                $res['application_code'] = $application_code;
                $res['premise_id'] = $premise_id;
                $res['tracking_no'] = $tracking_no;
            }, 5);
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

    public function prepareNewPremiseReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $mainQry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->where('t1.id', $application_id);

            $qry = clone $mainQry;
            $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->leftJoin('tra_approval_recommendations as t5', 't2.permit_id', '=', 't5.id')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                    't3.name as applicant_name', 't3.contact_person', 't1.reg_premise_id as main_registered_id',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.id as invoice_id', 't4.invoice_no', 't5.permit_no');
            $results = $qry->first();

            $qry2 = clone $mainQry;
            $qry2->leftJoin('tra_personnel_information as t3', 't2.contact_person_id', '=', 't3.id')
                ->select('t3.*', 't2.applicant_contact_person', 't2.contact_person_startdate as start_date', 't2.contact_person_enddate as end_date');
            $contactPersonDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'contactPersonDetails' => $contactPersonDetails,
                'message' => 'Records fetched successfully'
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

    public function prepareRenewalPremiseReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $mainQry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->where('t1.id', $application_id);

            $qry = clone $mainQry;
            $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->join('tra_approval_recommendations as t5', 't2.permit_id', '=', 't5.id')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.id as invoice_id', 't4.invoice_no', 't2.id as temporal_premise_id', 't2.target_id as premise_id', 't5.permit_no')
                ->where('t1.id', $application_id);
            $results = $qry->first();

            $qry2 = clone $mainQry;
            $qry2->leftJoin('tra_personnel_information as t3', 't2.contact_person_id', '=', 't3.id')
                ->select('t3.*', 't2.applicant_contact_person', 't2.contact_person_startdate as start_date', 't2.contact_person_enddate as end_date');
            $contactPersonDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'contactPersonDetails' => $contactPersonDetails,
                'message' => 'Records fetched successfully'
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

    public function prepareNewPremiseInvoicingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->join('tra_premises as t4', 't1.premise_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t1.premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                    t3.isLocked,t3.paying_currency_id,t1.paying_currency_id as app_paying_currency_id, t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details,t1.is_fast_track"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            if (!validateIsNumeric($results->paying_currency_id)) {
                $results->paying_currency_id = $results->app_paying_currency_id;
            }
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

    public function prepareRenewalPremiseInvoicingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->join('tra_premises as t4', 't1.premise_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t4.target_id as premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                        t3.paying_currency_id,t1.paying_currency_id as app_paying_currency_id, t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            if (!validateIsNumeric($results->paying_currency_id)) {
                $results->paying_currency_id = $results->app_paying_currency_id;
            }
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

    public function prepareNewPremisePaymentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->join('tra_premises as t4', 't1.premise_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t1.premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details"))
                ->where('t1.application_code', $application_code);
            
            $results = $qry->first();
            
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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

    public function prepareRenewalPremisePaymentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->join('tra_premises as t4', 't1.premise_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t4.target_id as premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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

    public function prepareNewPremiseManagerInspectionStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_premiseinspection_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->join('tra_premise_inspection_details as t3', 't2.inspection_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
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

    public function prepareNewPremiseEvaluationStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->join('tra_premises as t3', 't1.premise_id', '=', 't3.id')
                ->leftJoin('tra_premiseinspection_applications as t4', 't1.application_code', '=', 't4.application_code')
                ->leftJoin('tra_premise_inspection_details as t5', 't4.inspection_id', '=', 't5.id')
                ->select(DB::raw("t1.applicant_id, t5.id as inspection_id,t1.premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,t5.start_date,t5.end_date,t5.inspection_type_id,t5.description,
                t1.section_id,t1.module_id,CONCAT_WS(',',t3.name,t3.postal_address) as premise_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            $applicant_id = $results->applicant_id;
            
            $premise_id = $results->premise_id;
            $qryApplicant = DB::table('wb_trader_account as t1')
                ->leftJoin('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.tpin_no',
                    't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                    't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone',
                    't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name')
                ->where('t1.id', $applicant_id);
            $applicantDetails = $qryApplicant->first();
            
            $qryPremise = DB::table('tra_premises as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->leftJoin('tra_premises_applications as t5', 't1.id', '=', 't5.premise_id')
                ->leftJoin('tra_application_offlineprepayments as t6', 't5.application_code', '=', 't6.application_code')
                ->select('t1.name as premise_name', 't1.id as premise_id', 't1.*', 't5.investment_capital','t1.premise_type_id')
                ->where('t1.id', $premise_id);
            $premiseDetails = $qryPremise->first();

            $qryContact = DB::table('tra_premises as t1')
                ->leftJoin('tra_personnel_information as t2', 't1.contact_person_id', '=', 't2.id')
                ->select('t2.*', 't2.name as contact_name', 't2.postal_address as contact_postal_address', 't2.telephone_no as contact_telephone_no', 't2.email_address as contact_email_address',
                    't1.applicant_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date')
                ->where('t1.id', $premise_id);
            $contactDetails = $qryContact->first();
            
            $qry = DB::table('tra_premiseinspection_applications as t1')
                ->leftJoin('tra_premise_inspection_details as t2', 't1.inspection_id', '=', 't2.id')
                ->select('t1.id as record_id','t1.*')
                ->where(array('t1.application_code' => $application_code));
            $inspection_details = $qry->first();
            
            $res = array(
                'success' => true,
                'applicant_details' => $applicantDetails,
                'premise_details' => $premiseDetails,
                'contact_details' => $contactDetails,
                'inspection_details'=>$inspection_details,
                'results' => $results,
                'message' => 'Records fetched successfully'
            );
           
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function prepareRenewalPremiseEvaluationStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->join('tra_premises as t3', 't1.premise_id', '=', 't3.id')
                ->select(DB::raw("t1.applicant_id,t3.target_id as premise_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,
                t1.section_id,t1.module_id,CONCAT_WS(',',t3.name,t3.postal_address) as premise_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
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

    public function getOnlineApplicationQueries(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {

            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('tra_online_queries as t1')
                ->join('wb_query_statuses as t2', 't1.status_id', '=', 't2.id')
                ->select('t1.*', 't2.name as query_status')
                ->where($where);

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

    public function saveOnlineQueries(Request $request)
    {
        $post_data = $request->input();
        $id = $post_data['id'];
        try {
            unset($post_data['sub_module_id']);
            unset($post_data['module_id']);
            $portal_db = DB::connection('portal_db');
            if (isset($id) && $id != '') {
                unset($post_data['id']);
                $post_data['mis_dola'] = Carbon::now();
                $post_data['mis_altered_by'] = $this->user_id;
                $portal_db->table('tra_online_queries')
                    ->where('id', $id)
                    ->update($post_data);
            } else {
                $post_data['mis_created_on'] = Carbon::now();
                $post_data['mis_created_by'] = $this->user_id;
                $portal_db->table('tra_online_queries')
                    ->insert($post_data);
            }
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function onOnlineApplicationActionQueries(Request $req)
    {

        $record_id = $req->input('record_id');
        $application_code = $req->input('application_code');
        $status_id = $req->input('status_id');

        try {
            $data = array('status_id' => $status_id, 'mis_dola' => Carbon::now(),
                'mis_created_by' => \Auth::user()->id);

            DB::connection('portal_db')->table('tra_online_queries')
                ->where(array('application_code' => $application_code, 'id' => $record_id))
                ->update($data);

            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function onDeleteOnlineApplicationQueries(Request $req)
    {

        $record_id = $req->input('record_id');
        $application_code = $req->input('application_code');
        $status_id = $req->input('status_id');

        try {
            if ($status_id == 1) {
                DB::connection('portal_db')->table('tra_online_queries')
                    ->where(array('application_code' => $application_code, 'id' => $record_id))
                    ->delete();


                $res = array(
                    'success' => true,
                    'message' => 'Request executed successfully!!'
                );
            } else {

                $res = array(
                    'success' => true,
                    'message' => 'You can only delete open queries!!'
                );

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
        return \response()->json($res);
    }

    public function uploadApplicationFile(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $description = $req->input('description');
        $user_id = $this->user_id;
        $res = array();
        try {
            if ($req->hasFile('uploaded_doc')) {
                $file = $req->file('uploaded_doc');
                $origFileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getClientSize();
                $folder = '\resources\uploads';
                $destination = getcwd() . $folder;
                $savedName = str_random(5) . time() . '.' . $extension;
                $file->move($destination, $savedName);
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'initial_filename' => $origFileName,
                    'savedname' => $savedName,
                    'filesize' => formatBytes($fileSize),
                    'filetype' => $extension,
                    'server_filepath' => $destination,
                    'server_folder' => $folder,
                    'description' => $description,
                    'created_on' => Carbon::now(),
                    'created_by' => \Auth::user()->id
                );
                $res = insertRecord('tra_premiseapplications_uploads', $params, $user_id);
                if ($res['success'] == true) {
                    $res = array(
                        'success' => true,
                        'message' => 'File uploaded successfully!!'
                    );
                }
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

    public function syncAlterationAmendmentFormParts(Request $request)
    {
        $selected = $request->input('selected');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $form_id = $request->input('form_id');
        $selected_ids = json_decode($selected);
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            DB::transaction(function () use ($selected_ids, $application_id, $application_code, $form_id, $where) {
                $params = array();
                foreach ($selected_ids as $selected_id) {
                    $params[] = array(
                        'application_id' => $application_id,
                        'application_code' => $application_code,
                        'form_id' => $form_id,
                        'field_id' => $selected_id,
                        'created_by' => $this->user_id
                    );
                }
                DB::table('tra_alt_formparts_amendments')
                    ->where($where)
                    ->delete();
                DB::table('tra_alt_formparts_amendments')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Request synced successfully!!'
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

    public function syncAlterationAmendmentOtherParts(Request $request)
    {
        $selected = $request->input('selected');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $selected_ids = json_decode($selected);
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            DB::transaction(function () use ($selected_ids, $application_id, $application_code, $where) {
                $params = array();
                foreach ($selected_ids as $selected_id) {
                    $params[] = array(
                        'application_id' => $application_id,
                        'application_code' => $application_code,
                        'part_id' => $selected_id,
                        'created_by' => $this->user_id
                    );
                }
                DB::table('tra_alt_otherparts_amendments')
                    ->where($where)
                    ->delete();
                DB::table('tra_alt_otherparts_amendments')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Request synced successfully!!'
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

    public function getPremiseComparisonDetails(Request $request)
    {
        $premise_id = $request->input('premise_id');
        $init_premise_id = $request->input('init_premise_id');
        try {
            $qry1 = DB::table('tra_premises as t1')
                ->select('t1.*', 't1.id as premise_id')
                ->where('id', $premise_id);
            $qry2 = DB::table('tra_premises as t2')
                ->select('t2.*', 't2.id as premise_id')
                ->where('id', $init_premise_id);
            $amendedDetails = $qry1->first();
            $initialDetails = $qry2->first();
            $res = array(
                'success' => true,
                'amendedDetails' => $amendedDetails,
                'initialDetails' => $initialDetails,
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

    public function getApplicationUploadedDocs(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $workflow_stage_id = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('tra_premiseapplications_uploads as t1')
                ->leftJoin('wf_workflow_stages as t2', 't1.workflow_stage_id', '=', 't2.id')
                ->select('t1.*', 't2.name as stage_name')
                ->where('t1.application_id', $application_id)
                ->where('t1.application_code', $application_code);
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
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
        return response()->json($res);
    }

    public function saveNewAuditingChecklistDetails(Request $request)
    {
        $screening_details = $request->input('screening_details');
        $screening_details = json_decode($screening_details);
        $table_name = 'checklistitems_responses';
        $user_id = $this->user_id;
        try {
            foreach ($screening_details as $screening_detail) {
                $item_resp_id = $screening_detail->item_resp_id;
                if (isset($item_resp_id) && $item_resp_id != '') {
                    $where = array(
                        'id' => $item_resp_id
                    );
                    $update_params = array(
                        'auditor_comment' => $screening_detail->auditor_comment,
                        'audit_created_on' => Carbon::now(),
                        'audit_created_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                }
            }
            $res = array(
                'success' => true,
                'message' => 'Auditing details saved successfully!!'
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

    public function prepareNewOnlineReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_premises_applications as t1')
                ->leftJoin('wb_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->leftJoin('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.name as app_status')
                ->where('t1.id', $application_id);
                
            $results = $qry->first();
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
            $qry2 = DB::table('tra_personnel_information')
                ->where('id', $results->contact_person_id);
            $contactPersonDetails = $qry2->first();
            if (!is_null($contactPersonDetails)) {
                $contactPersonDetails->start_date = $results->contact_person_startdate;
                $contactPersonDetails->end_date = $results->contact_person_enddate;
                $contactPersonDetails->applicant_contact_person = $results->applicant_contact_person;
            } else {
                $contactPersonDetails = (object)array(
                    'start_date' => $results->contact_person_startdate,
                    'end_date' => $results->contact_person_enddate,
                    'applicant_contact_person' => $results->applicant_contact_person
                );
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'contactPersonDetails' => $contactPersonDetails,
                'message' => 'Records fetched successfully'
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

    public function getPremiseCompareDetails(Request $request)
    {
        $portal_application_id = $request->input('portal_application_id');
        $mis_application_id = $request->input('mis_application_id');
        try {
            $portalDetails = $this->getPortalPremiseDetails($portal_application_id);
            $misDetails = $this->getMisPremiseDetails($mis_application_id);
            $res = array(
                'success' => true,
                'portalResults' => $portalDetails['results'],
                'portalContactPersonDetails' => $portalDetails['contactPersonDetails'],
                'misResults' => $misDetails['results'],
                'misContactPersonDetails' => $misDetails['contactPersonDetails'],
                'message' => 'Details fetched successfully!!'
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

    public function getPortalPremiseDetails($application_id)
    {
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_premises_applications as t1')
            ->join('wb_premises as t2', 't1.premise_id', '=', 't2.id')
            ->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
            ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
            ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                't2.*', 't4.name as app_status')
            ->where('t1.id', $application_id);
        $results = $qry->first();

        $qry2 = DB::table('tra_personnel_information as t3')
            ->select('t3.*', 't3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address')
            ->where('id', $results->contact_person_id);
        $contactPersonDetails = $qry2->first();
        if (!is_null($contactPersonDetails)) {
            $contactPersonDetails->start_date = $results->contact_person_startdate;
            $contactPersonDetails->end_date = $results->contact_person_enddate;
            $contactPersonDetails->applicant_contact_person = $results->applicant_contact_person;
        } else {
            $contactPersonDetails = (object)array(
                'start_date' => $results->contact_person_startdate,
                'end_date' => $results->contact_person_enddate,
                'applicant_contact_person' => $results->applicant_contact_person
            );
        }
        $res = array(
            'results' => $results,
            'contactPersonDetails' => $contactPersonDetails
        );
        return $res;
    }

    public function getMisPremiseDetails($application_id)
    {
        $sharedQry = DB::table('tra_premises_applications as t1')
            ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
            ->where('t1.id', $application_id);

        $qry = clone $sharedQry;
        $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
            ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                't2.*', 't4.name as app_status');
        $results = $qry->first();

        $qry2 = clone $sharedQry;
        $qry2->leftJoin('tra_personnel_information as t3', 't2.contact_person_id', '=', 't3.id')
            ->select('t3.*', 't3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address',
                't2.applicant_contact_person', 't2.contact_person_startdate as start_date', 't2.contact_person_enddate as end_date')
            ->where('t3.id', $results->contact_person_id);
        $contactPersonDetails = $qry2->first();

        $res = array(
            'results' => $results,
            'contactPersonDetails' => $contactPersonDetails
        );
        return $res;
    }
    public function savePremiseScheduleInspectionDetails(Request $request){
        
        $id = $request->input('id');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $inspection_type = $request->input('inspection_type_id');
        $inspection_desc = $request->input('description');
      
        $user_id = $this->user_id;
        try {
            $params = array(
                'start_date' => $start_date,
                'end_date' => $end_date,
                'inspection_type_id' => $inspection_type,
                'description' => $inspection_desc
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('tra_premise_inspection_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('tra_premise_inspection_details', $params, $user_id);
                $id = $insert_res['record_id'];
            }
            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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
    public function savePremiseInspectionDetails(Request $request)
    {
        $id = $request->input('id');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $inspection_type = $request->input('inspection_type_id');
        $inspection_desc = $request->input('description');
        $selected = $request->input('selected');
        $selected_codes = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = array(
                'start_date' => $start_date,
                'end_date' => $end_date,
                'inspection_type_id' => $inspection_type,
                'description' => $inspection_desc
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('tra_premise_inspection_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('tra_premise_inspection_details', $params, $user_id);
                $id = $insert_res['record_id'];
            }
            $params2 = array();
            foreach ($selected_codes as $selected_code) {
                $application_code = $selected_code->application_code;
                $premise_id = $selected_code->premise_id;
                
                $params2[] = array(
                    'inspection_id' => $id,
                    'premise_id' => $premise_id,
                    'application_code' => $application_code,
                    'created_by' => $this->user_id
                );
            }
            DB::table('tra_premiseinspection_applications')
                ->where('inspection_id', $id)
                ->delete();
            DB::table('tra_premiseinspection_applications')
                ->insert($params2);
            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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

    public function savePremiseCancellationReason(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $reason_id = $request->input('reason_id');
            $remark = $request->input('remark');
            $id = $request->input('id');
            $user_id = $this->user_id;
            $table_name = 'tra_premise_cancellationreasons';
            $where1 = array(
                'application_code' => $application_code,
                'reason_id' => $reason_id
            );
            $params = array(
                'application_code' => $application_code,
                'reason_id' => $reason_id,
                'remark' => $remark
            );
            if (validateIsNumeric($id)) {
                $where2 = array(
                    'id' => $id
                );
                $params['dola'] = Carbon::now();
                $params['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($table_name, $where2);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where2, $params, $user_id);
            } else {
                if (recordExists('tra_premise_cancellationreasons', $where1)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Already added!!'
                    );
                    return \response()->json($res);
                }
                $params['created_on'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord($table_name, $params, $user_id);
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
        return \response()->json($res);
    }

    public function getPremiseCancellationReasons(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table('tra_premise_cancellationreasons as t1')
                ->join('par_premise_cancellationreasons as t2', 't1.reason_id', '=', 't2.id')
                ->select('t1.*', 't2.name as reason')
                ->where('t1.application_code', $application_code);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function savePremiseInspectionRecommendation(Request $request)
    {
        try {
            $record_id = $request->input('record_id');
            $table_name = 'tra_premiseinspection_applications';
            $where = array(
                'id' => $record_id
            );
            $params = array(
                'application_code' => $request->input('application_code'),
                'premise_id' => $request->input('premise_id'),
                'actual_start_date' => $request->input('actual_start_date'),
                'actual_end_date' => $request->input('actual_end_date'),
                'recommendation_id' => $request->input('recommendation_id'),
                'inspection_type_id' => $request->input('inspection_type_id'),
                'remarks' => $request->input('remarks'),
                'premise_name' => $request->input('premise_name'),
                'tpin_no' => $request->input('tpin_no'),
                'company_registration_no' => $request->input('company_registration_no'),
                'registration_date' => $request->input('registration_date'),
                'business_type_id' => $request->input('business_type_id'),
                'business_scale_id' => $request->input('business_scale_id'),
                'business_scale_id' => $request->input('business_scale_id'),
                'product_classification_id' => $request->input('product_classification_id'),
                'premise_state' => $request->input('premise_state'),
                'premise_size' => $request->input('premise_size'),
                'proposed_changes' => $request->input('proposed_changes')

                
            );
            if(validateIsNumeric($record_id)){
            DB::table($table_name)
                ->where($where)
                ->update($params);
            $res = array(
                'success' => true,
                'message' => 'Details saved successfully!!'
            );
        }else{
          DB::table($table_name)
          ->insert($params); 
          $res = array(
                'success' => true,
                'message' => 'Details saved successfully!!'
            ); 
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
        return \response()->json($res);
    }


    public function linkRegisteredPremisestoInpection(Request $req){
        $module_id = $req->module_id;
        $sub_module_id = $req->sub_module_id;
        $inspection_id = $req->inspection_id;
        
        $process_id = $req->process_id;
        $section_id = $req->section_id;
        $application_id = '';
        $workflow_stage_id = $req->workflow_stage_id;
        $selected_premises = $req->input('selected');
        
        $selected_premises = json_decode($selected_premises);
        $user_id = $this->user_id;
        $applications_table = 'tra_premises_applications';
        try {
            $insert_params = array();
            foreach ($selected_premises as $prem_data) {
               
                $premise_id = $prem_data->premise_id;
                $main_registered_id = $prem_data->main_registered_id;
                $rec = DB::table('tra_premiseinspection_applications')
                            ->where(array('premise_id'=>$premise_id, 'id'=>$inspection_id))
                            ->first();

                if(!$rec) {
                    $premises_app = DB::table($applications_table)
                                ->where(array('premise_id'=>$premise_id))
                                ->first();
                    if($premises_app){
                        //save premises applications
                        //the details 

                        $applicant_id = $premises_app->applicant_id;
                        $identification_no = getSingleRecordColValue('wb_trader_account', array('id'=>$applicant_id), 'identification_no');
                        $portal_trader_id = getSingleRecordColValue('wb_trader_account', array('identification_no'=>$identification_no), 'id','portal_db');

                        $application_code = generateApplicationCode($sub_module_id, $applications_table);
                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                        $view_id = generateApplicationViewID();
                        
                        $application_details = array(
                            'applicant_id' => $applicant_id,
                            'view_id' => $view_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_code' => $application_code,
                            'zone_id' => $premises_app->zone_id,
                            'premise_id' => $premise_id,
                            'process_id' => $process_id,
                            
                            'reg_premise_id'=>$main_registered_id,
                            'workflow_stage_id' => $workflow_stage_id,
                            'application_status_id' => 1
                        );
                        $application_insert = insertRecord('tra_premises_applications', $application_details, $user_id);
                        
                        //save details in the Online Portal $portal_trader_id 

                        $application_id = $application_insert['record_id'];
                        $reference_no = $premises_app->reference_no;
                        $codes_array = array('ref_no'=>$reference_no);
                        
                        $refno_details = generateApplicationRefNumber($application_id, $applications_table, $sub_module_id, 1, $codes_array, $process_id, $premises_app->zone_id, $user_id);
                        if ($refno_details['success'] == false) {
                            echo json_encode($refno_details);
                            exit();
                        }
                        $reference_no = $refno_details['ref_no'];

                        $submission_params = array(
                            'application_id' => $application_id,
                            'view_id' => $view_id,
                            'process_id' => $process_id,
                            'application_code' => $application_code,
                            'reference_no' => $reference_no,
                            'usr_from' => $user_id,
                            'usr_to' => $user_id,
                            'previous_stage' => $workflow_stage_id,
                            'current_stage' => $workflow_stage_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_status_id' => $application_status->status_id,
                            'urgency' => 1,
                            'applicant_id' => $applicant_id,
                            'remarks' => 'Initial save of the application',
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        DB::table('tra_submissions')
                            ->insert($submission_params);
                        
                        //save te premises details 

                        $application_details = array(
                            'trader_id' => $portal_trader_id,
                            'reference_no' => $reference_no,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_code' => $application_code,
                            'zone_id' => $premises_app->zone_id,
                            'premise_id' => $premises_app->portal_id,
                            'process_id' => $process_id,
                            'application_status_id' => 33
                        );
                        insertRecord('wb_premises_applications', $application_details, $user_id, 'portal_db');
                        
                        $params2[] = array(
                            'inspection_id' => $inspection_id,
                            'premise_id' => $premise_id,
                            'application_code' => $application_code,
                            'created_by' => $this->user_id
                        );
                    }
                    
                } 
            }
            if (count($params2) > 0) {
                DB::table('tra_premiseinspection_applications')
                ->insert($params2);
            }
            $res = array(
                'success' => true,
                'application_id'=>$application_id,
                'message' => 'Premises Inspection details saved successfully!!'
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
    //function 
    public function getPremisesInspectionDetails(Request $request){

        try {
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $user_id = $this->user_id;
            $assigned_groups = getUserGroups($user_id);
            $is_super = belongsToSuperGroup($assigned_groups);
            try {
                $assigned_stages = getAssignedProcessStages($user_id, $module_id);
                $qry = DB::table('tra_premises_applications as t1')
                    ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                    ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                    ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                    ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                    ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                    ->join('tra_submissions as t7', function ($join) {
                        $join->on('t1.application_code', '=', 't7.application_code')
                             ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                    })
                    ->join('users as t8', 't7.usr_from', '=', 't8.id')
                    ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                    ->leftJoin('tra_premiseinspection_applications as t10', 't1.application_code','=', 't10.application_code')
                    ->leftJoin('tra_premise_inspection_details as t11', 't11.id','=', 't10.inspection_id')
                    ->leftJoin('par_inspection_types as t12', 't11.inspection_type_id','=', 't12.id')
                    ->join('par_regions as t13', 't2.region_id','=', 't13.id')
                    ->select(DB::raw("t11.description as inspection_description,t12.name as inspection_type,t13.name as region_name,   t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                        t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                        t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                        t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                        t2.*, t1.*,
                        CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"))
                        ->where(array('t1.sub_module_id'=>50));

                $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
                if (isset($section_id) && $section_id != '') {
                    $qry->where('t1.section_id', $section_id);
                }
                
                $qry->where('t7.isDone', 0);
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
    public function getPremisesAppList(Request $request)
    {
        $start = $request->start;
        $limit = $request->limit;
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
        $limit = $request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t2.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t8.permit_no like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        $qry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftjoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftjoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftjoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftjoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftjoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->leftjoin('tra_approval_recommendations as t8', 't1.application_code', 't8.application_code')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,t8.permit_no"));
        if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
        if(validateIsNumeric($start) && validateIsNumeric($limit)){
            $totalCount  = $qry->count();
                $records = $qry->skip($start)->take($limit)->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
                            );
        }else{
            $totalCount  = $qry->count();
                $records = $qry->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
                            );
        }
       return \response()->json($res);
    }
    public function saveAppliationEditionBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $premise_id = $request->input('premise_id');
        $applicant_id = $request->input('applicant_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $application_region_id = $request->input('application_region_id');
        $region_id = $request->input('region_id');
        //$zone_id = $request->input('zone_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');

        $applicant_contact_person = $request->input('applicant_contact_person');
        $contact_person_id = $request->input('contact_person_id');
        $contact_person_startdate = $request->input('contact_person_startdate');
        $contact_person_enddate = $request->input('contact_person_enddate');
        $premise_type_id = $request->input('premise_type_id');
        $vehicle_reg_no = $request->input('vehicle_reg_no');
        //$investment_capital = $request->input('investment_capital');
        //$investment_capital_currency_id = $request->input('investment_capital_currency_id');

        
        
        $zone_id = getZoneIdFromRegion($region_id);

        $user_id = $this->user_id;
        $premise_params = array(
            'name' => $request->input('name'),
            'section_id' => $section_id,
            'country_id' => $request->input('country_id'),
            'region_id' => $region_id,
            'district_id' => $request->input('district_id'),
            'street' => $request->input('street'),
            'telephone' => $request->input('telephone'),
            'fax' => $request->input('fax'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'physical_address' => $request->input('physical_address'),
            'postal_address' => $request->input('postal_address'),
            'business_scale_id' => $request->input('business_scale_id'),
            'business_type_id' => $request->input('business_type_id'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude'),
            'contact_person_id' => $contact_person_id,
            'contact_person_startdate' => $contact_person_startdate,
            'contact_person_enddate' => $contact_person_enddate,
            'premise_type_id' => $premise_type_id,
            'vehicle_reg_no' => $vehicle_reg_no,
            'applicant_contact_person' => $applicant_contact_person,
            //'investment_capital' => $investment_capital,
           // 'investment_capital_currency_id' => $investment_capital_currency_id
        );
        try {
            $premise_table = 'tra_premises';
            $applications_table = 'tra_premises_applications';

            $where_premise = array(
                'id' => $premise_id
            );
            $where_app = array(
                'id' => $application_id
            );
            $portal_applicant_id = getSingleRecordColValue('wb_trader_account', array('id' => $applicant_id), 'portal_id');
            if (isset($application_id) && $application_id != "") {//Edit
                //Application_edit
                $application_params = array(
                    'application_region_id' => $application_region_id,
                    'zone_id' => $zone_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                   
                    $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($app_res['success'] == false) {
                        return $app_res;
                    }
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $tracking_no = $app_details[0]['tracking_no'];//$app_details->reference_no;
                //Premise_edit
                if (recordExists($premise_table, $where_premise)) {
                    $premise_params['dola'] = Carbon::now();
                    $premise_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($premise_table, $where_premise);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($premise_table, $previous_data, $where_premise, $premise_params, $user_id);
                    //update portal also
                    unset($premise_params['created_by']);
                    unset($premise_params['created_on']);
                    unset($premise_params['dola']);
                    unset($premise_params['altered_by']);
                    $premise_params['mis_dola'] = Carbon::now();
                    $premise_params['mis_altered_by'] = $user_id;
                   
                    $portal_premise_id = getSingleRecordColValue('tra_premises', $where_premise, 'portal_id');
                    $portal_db = DB::connection('portal_db');
                    $portal_db->table('wb_premises')
                        ->where('id', $portal_premise_id)
                        ->update($premise_params);
                }
            } 
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['premise_id'] = $premise_id;
            $res['tracking_no'] = $tracking_no;
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
    public function savePrecheckingecommendationDetails(Request $req){
        try {$user_id = $this->user_id;
            $application_code = $req->input('application_code');
            $recommendation_id = $req->input('recommendation_id');
             $where2 = array(
                    'application_code' => $application_code
                );
            $table_name = 'tra_prechecking_recommendations';
            $params = array('application_code'=>$application_code, 'recommendation_id'=>$recommendation_id);
            $record = DB::table($table_name)->where( $where2)->first();
            if ($record) {
               
                $params['dola'] = Carbon::now();
                $params['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($table_name, $where2);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where2, $params, $user_id);
            } else {
                
                $params['created_on'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord($table_name, $params, $user_id);
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
        return \response()->json($res);
    }
      public function getPremiseRegistrationMeetingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table('tra_premises_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tra_premises as t7', 't1.premise_id', '=', 't7.id')
                ->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
                ->leftJoin('tra_applications_comments as t10', function ($join) {
                    $join->on('t1.application_code', '=', 't10.application_code')
                        ->where('t10.is_current', 1)
                        ->where('t10.comment_type_id', 2);
                })
                ->leftJoin('par_evaluation_recommendations as t11', 't10.recommendation_id', '=', 't11.id')
                ->leftJoin('tra_applications_comments as t12', function ($join) {
                    $join->on('t1.application_code', '=', 't12.application_code')
                        ->where('t12.is_current', 1)
                        ->where('t12.comment_type_id', 3);
                })
                ->leftJoin('par_evaluation_recommendations as t13', 't12.recommendation_id', '=', 't13.id')
                ->leftJoin('par_regions as t15', 't7.region_id', '=', 't15.id')
                ->leftJoin('tra_premiseinspection_applications as t16', 't7.id', '=', 't16.premise_id')
                ->leftJoin('par_premiseinspection_recommendations as t17', 't16.recommendation_id', '=', 't17.id')
                ->leftJoin('tra_submissions as t14',  't1.application_code', '=', 't14.application_code')
                ->select('t1.*', 't7.name as premise_name','t7.physical_address','t3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id','t15.name as region_name','t17.name as evaluator_recommendation',
                   't7.premise_type_id', 't13.name as auditor_recommendation')
                ->where(array('t14.current_stage'=>$workflow_stage, 'isDone'=>0) );
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
    public function saveTCMeetingDetails(Request $request)
    {
        $id = $request->input('meeting_id');
        $application_code = $request->input('application_code');
        $meeting_name = $request->input('meeting_name');
        $meeting_desc = $request->input('meeting_desc');
        $date_requested = $request->input('date_requested');
        
        $meeting_time = $request->input('meeting_time');
        
        $meeting_venue = $request->input('meeting_venue');
        
        $module_id = $request->input('module_id');
        
        $sub_module_id = $request->input('sub_module_id');
        
        $section_id = $request->input('section_id');
        $selected = $request->input('selected');
        $selected_codes = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = array(
                'meeting_name' => $meeting_name,
                'meeting_desc' => $meeting_desc,
                'meeting_time' => $meeting_time,
                'meeting_venue' => $meeting_venue,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'meeting_venue' => $meeting_venue,
                'date_requested' => $date_requested
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('tc_meeting_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('tc_meeting_details', $params, $user_id);
                $id = $insert_res['record_id'];
                $app_meeting = array(
                    'application_code' => $application_code,
                    'meeting_id' => $id,
                    'created_by' => $user_id
                );
                insertRecord('tc_meeting_applications', $app_meeting, $user_id);
            }
            $params2 = array();
            foreach ($selected_codes as $selected_code) {
                DB::table('tc_meeting_applications')
                ->where('application_code', $selected_code)
                ->delete();
                $params2[] = array(
                    'meeting_id' => $id,
                    'application_code' => $selected_code,
                    'created_by' => $this->user_id
                );
            }
            DB::table('tc_meeting_applications')
                ->where('meeting_id', $id)
                ->delete();
            DB::table('tc_meeting_applications')
                ->insert($params2);

            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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
    public function preparePremiseRegMeetingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $meeting_id = $request->input('meeting_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
        if($table_name == 'tra_premise_applications'){
                $table_name = 'tra_premises_applications';
        }
        if(validateIsNumeric($module_id)){
            $table_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'table_name');
        }
        
        try {
            
            if(validateIsNumeric($meeting_id)){
                $qry = DB::table('tc_meeting_details as t3')
                ->select(DB::raw("t3.*"));
                $qry->where('t3.id', $meeting_id);
            }else{
                $qry = DB::table('tra_premises_applications as t1')
                ->leftJoin('tc_meeting_applications as t2', function ($join) use ($application_code) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->leftJoin('tc_meeting_details as t3', 't2.meeting_id', '=', 't3.id')
                ->select(DB::raw("t1.*,t3.*"));
                $qry->where('t1.application_code', $application_code);
            }

            $results = $qry->first();
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
    //export
    public function ExportMeetingReport(Request $req){
        $meeting_id=$req->id;
          
//product application details
        $ExportMeetingDetails = new Spreadsheet();
        $sheet = $ExportMeetingDetails->getActiveSheet();
        $ExportMeetingDetails->getActiveSheet()->setTitle('Meeting Export');
//get all data 
       $meetingDetails=DB::table('tc_meeting_details')
                        ->select('meeting_name','meeting_desc','date_requested')
                       ->where('id',$meeting_id)
                       ->get()->toArray();
      $meetingDetails=$this->prepareArrayOfArrays((array)$meetingDetails);

        $participantDetails=DB::table('tc_meeting_participants')
                            ->where('meeting_id',$meeting_id)
                            ->select('participant_name','phone','email')
                            ->get()->toArray();
      $participantDetails=$this->prepareArrayOfArrays((array)$participantDetails);
        
       $ApplicationDetails=DB::table('tc_meeting_applications as t1')
             ->leftJoin('tra_premises_applications as t4','t1.application_code','t4.application_code')
             ->leftJoin('tra_premises as t6','t4.premise_id','t6.id')
             ->leftJoin('wb_trader_account as t8','t4.applicant_id','t8.id')
             ->leftJoin('par_system_statuses as t9','t4.application_status_id','t9.id')
             ->select(DB::raw('t4.reference_no,t6.name,t8.name as applicant_name,t9.name as status'))
             ->where('t1.meeting_id',$meeting_id)
             ->get()->toArray();

             //reoder to pair
             $final_Array=[];
             $array=$this->prepareArrayOfArrays((array)$ApplicationDetails);
              foreach ($array as $key => $value) {
                      foreach ($value as $key => $value2) {
                          $final_Array[]=[$key,$value2];
                      }
                      $final_Array[]=['',''];
                  }
      
      $ApplicationDetails=$final_Array;
        

        $cell=2;
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:C1')
              ->getCell('A1')
              ->setValue('Meeting Details');
        $sheet->getStyle('A1:C1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);
        $sheet->getColumnDimension('C')->setAutoSize(true);
        $sheet->getStyle('B1:B17')
                 ->getNumberFormat()
                ->setFormatCode('0');
//header
        $sheet->getCell('A2')->setValue('Name');
        $sheet->getCell('B2')->setValue('Description');
        $sheet->getCell('C2')->setValue('Date Requested');
        $sheet->getStyle('A2:C2')->applyFromArray($SubstyleArray);
        $cell++;

//loop data while writting
       $sheet->fromArray( $meetingDetails, null,  "A".$cell  );
//jump one row
        $cell=count($meetingDetails)+$cell+1;


 //second heading
        $sheet->mergeCells("A".$cell.":C".$cell)
              ->getCell("A".$cell)
              ->setValue('Perticipants');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($styleArray);
            $cell++;

//header
        $sheet->getCell("A".$cell)->setValue('Name');
        $sheet->getCell("B".$cell)->setValue('Phone No');
        $sheet->getCell("C".$cell)->setValue('Email');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($SubstyleArray);
        $cell++;
//write array data to sheet
        $sheet->fromArray( $participantDetails, null,  "A".$cell  );

//jump one row
        $cell=count($participantDetails)+$cell+1;


//third heading
        $sheet->mergeCells("A".$cell.":C".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Details');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($styleArray);
            $cell++;
           $initialcell=$cell;
//write array data to sheet
        $sheet->fromArray( $ApplicationDetails, null,  "A".$cell  );

//jump one row
        $cell=count($ApplicationDetails)+$cell+1;
$sheet->getStyle("A".$initialcell.":A".$cell)->applyFromArray($SubstyleArray);


       



          $writer = new Xlsx($ExportMeetingDetails);

            ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
$response =  array(
   'name' => "meeting.Xlsx", //no extention needed
   'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
);

        return $response;

        

    }
     public function prepareArrayOfArrays(array $array){
        $clean_Array=[];

        //ensure the inner array is array not collection 
      foreach ($array as $key => $value) {
          $clean_Array[]=(array)$value;
      }
    
       return $clean_Array;

    }
    public function getPremiseTcReviewMeetingApplications(Request $req)
    {
        // $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $meeting_id = $req->input('meeting_id');

        try {
            $qry = DB::table('tra_premises_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_premises as t7', 't1.premise_id', '=', 't7.id')
                ->leftJoin('tc_meeting_applications as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('tra_evaluation_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('tra_auditing_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->leftJoin('wf_workflow_actions as t13', 't11.recommendation_id', '=', 't13.id')
                ->leftJoin('tra_approval_recommendations as t16', 't1.application_code', 't16.application_code')
                ->leftJoin('par_approval_decisions as t17', 't16.decision_id', '=', 't17.id')
                ->leftJoin('tra_premiseinspection_applications as t18', 't7.id', '=', 't18.premise_id')
                ->leftJoin('par_premiseinspection_recommendations as t19', 't18.recommendation_id', '=', 't19.id')
                ->leftJoin('tra_submissions as t20', 't1.application_code', '=', 't20.application_code')
                ->leftJoin('par_regions as t21', 't7.region_id', '=', 't21.id')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id','t7.physical_address','t21.name as region_name', 't7.name as premise_name', 't19.name as evaluator_recommendation', 't13.name as auditor_recommendation', 't15.name as tc_recomm', 't16.decision_id', 't14.id as recomm_id', 't14.comments','t17.name as approval_recommendation')
                ->leftJoin('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id');

                
                $qry->where(array('t20.current_stage' => $workflow_stage, 'isDone'=>0));
                if(validateIsNumeric($meeting_id)){
                    $qry->where(array('t9.meeting_id' => $meeting_id));
                }
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

    } public function getPremiseTypes(Request $req)
    {
        try{
            $table_name = $req->table_name;
            $sub_module_id = $req->sub_module_id;

            $qry = DB::table('par_premises_types as t2')
                    ->select('t2.*');
            if(validateIsNumeric($sub_module_id)){
               // $qry->where('t1.sub_module_id', $sub_module_id);
            }
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



    public function getDrugShopApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"))
                ->where('t1.is_dismissed', '<>', 1);
                  $qry->where('t1.module_id', 29);
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t7.current_stage', $assigned_stages)->where(array('t7.isDone'=>0));
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            $qry->where('t7.isDone', 0);
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


     public function getPremisesApprovedAppList(Request $request)
    {
        $start = $request->start;
        $limit = $request->limit;
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
        $application_status_id =6;
        $position_id=1;
        $limit = 100;//$request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t2.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t8.permit_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'reference_no' :
                            $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }

        $qry = DB::table('tra_premises_applications as t1')
                ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftjoin('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
                ->leftjoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftjoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftjoin('tra_approval_recommendations as t8', 't1.application_code', 't8.application_code')
                 ->leftjoin('par_regions as t9', 't2.region_id', 't9.id')
                 ->leftjoin('par_districts as t10', 't2.district_id', 't10.id')
                 ->leftjoin('par_zones as t11', 't1.zone_id', 't11.id')
                 ->leftjoin('tra_premises_personnel as t12', 't1.premise_id', '=', 't12.premise_id')
                 ->leftjoin('tra_personnel_information as t13', 't12.personnel_id', '=', 't13.id')
                 ->leftjoin('par_personnel_positions as t14', 't12.position_id','t14.id')
                ->select(DB::raw("DISTINCT t1.id as active_application_id, t1.application_code, t1.module_id, t1.sub_module_id, t1.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tpin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,t8.permit_no,t8.expiry_date,t8.approval_date,t9.name as region_name, t10.name as district_name, t1.reference_no, t1.tracking_no, t11.name as zone_name,t12.personnel_id,t13.name as responsible_person")) 

                ->whereRAW("t12.position_id = ".$position_id);




        if(validateIsNumeric($application_status_id)){
              $qry->where('t1.application_status_id', $application_status_id);
             }
        if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
        if(validateIsNumeric($limit)){
            $totalCount  = $qry->count();
                $records = $qry->skip($start)->take($limit)->orderBy('t1.date_added', 'desc')->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
                            );
        }else{
            $totalCount  = $qry->count();
                $records = $qry->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
                            );
        }
       return \response()->json($res);
    }
}
