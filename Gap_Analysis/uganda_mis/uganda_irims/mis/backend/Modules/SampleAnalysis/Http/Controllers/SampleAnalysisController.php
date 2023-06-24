<?php

namespace Modules\SampleAnalysis\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class SampleAnalysisController extends Controller
{
   /**
     * Display a listing of the resource.
     * @return Response
     */
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
                $this->first_name = \Auth::user()->first_name;
                $this->last_name = \Auth::user()->last_name;
                $this->user_fullnames = aes_decrypt($this->first_name) . ' ' . aes_decrypt($this->last_name);

                return $next($request);
            });
        }
    }
    public function updateSampleAnalysisCode(Request $req){
            $records = DB::statement("SELECT sample_code FROM tra_surveillance_sample_details t1 INNER JOIN tra_sampleanalysis_requests t2 ON t1.id = t2.missample_id");
            foreach($records as $rec){
                    $data = array('code_ref_no'=>$rec->sample_code);
                    $where = array('sample_id'=>$rec->limssample_id);
                    DB::connection('lims_db')->table('sample_applications')->where($where)->update($data);
            }
            echo "records Updatd successfully";
    }
    //sample analysis rquests
    public function getsampleanalysistestrequests(Request $req)
    {
        try {
            $application_code = $req->input('application_code');
            $sample_application_code = $req->input('sample_application_code');
            if (isset($sample_application_code) && is_numeric($sample_application_code)) {
                $sample_app_code = $sample_application_code;
            } else {
                $sample_app_code = $application_code;
            }
            $section_id = $req->input('section_id');
            $module_id = $req->input('module_id');
            $data = array();
            $qry = DB::table('tra_sampleanalysis_requests as t1')
                ->join('par_sampleanalysis_status as t2', 't1.status_id', '=', 't2.id')
                ->join('users as t3', 't1.requested_by', '=', 't3.id')
                ->leftJoin('par_survsample_analysis_types as t4', 't1.analysis_type_id', '=', 't4.id')
                ->select(DB::raw("t1.*, t2.name as sample_analysis_status,CONCAT_WS(' ',decrypt(t3.first_name),decrypt(t3.last_name)) as request_by,t4.name as analysis_type"))
                ->where(array('application_code' => $sample_app_code));
            $results = $qry->get();
            foreach ($results as $rec) {
                $sample_analysis_status = $rec->sample_analysis_status;
                $requeststatus_id = $rec->status_id;
                $limssample_id = $rec->limssample_id;
                $application_code = $rec->application_code;
                $misproduct_id = $rec->misproduct_id;
                $limsreference_no = $rec->limsreference_no;
                $status_id = $rec->status_id;
                $requested_on = $rec->requested_on;
                $request_by = $rec->request_by;
                $sample_received_on = !empty($rec->sample_received_on) ? $rec->sample_received_on : 'N/A';
                $sample_testapproval_date = !empty($rec->sample_testapproval_date) ? $rec->sample_testapproval_date : 'N/A';

                $record = DB::connection('lims_db')
                    ->table('sample_applications as t1')
                    ->join('samples as t2', 't1.sample_id', '=', 't2.id')
                    ->select(DB::raw("'$application_code' as application_code,'$misproduct_id' as misproduct_id, '$status_id' as status_id, '$requested_on' as requested_on,'$sample_analysis_status' as sample_analysis_status, '$sample_testapproval_date' as sample_testapproval_date, '$sample_received_on' as sample_received_on,'$requeststatus_id' as requeststatus_id, '$request_by' as request_by, 
                       t1.*, t2.*, t2.dosage_form as dosage_form_id,t2.product_form as product_form_id,t2.device_type_id,t2.classification as classification_id, t1.reference_no as laboratory_reference_no, t1.sample_id as limssample_id"))
                    ->where(array('t1.sample_id' => $limssample_id))
                    ->first();
                if (!is_null($record)) {
                    $record->analysis_type_id = $rec->analysis_type_id;
                    $record->analysis_type = $rec->analysis_type;
                    $record->tracking_status_id = $rec->status_id;
                    $data[] = $record;
                }
            }
            $res = array(
                'success' => true,
                'results' => $data,
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

    public function getCostSubCategoryParameter(Request $req)
    {
        try {
            $filters = $req->filters;
            $cost_category_id = $req->cost_category_id;
            $connection = DB::connection('lims_db');
            $table_name = $req->table_name . ' as t1';
            $qry = $connection->table($table_name)
                ->select('t1.*')
                ->where(array('cost_category_id' => $cost_category_id));
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

    public function getSampleAnalyisParameter(Request $req)
    {
        try {
            $filters = $req->filters;
            $has_filter = $req->has_filter;
            $connection = DB::connection('mysql');
           /* if ($has_filter == 1) {
                $table_name = $req->table_name . ' as t1';
                $qry = $connection->table($table_name)
                    ->leftJoin('sections as t2', 't1.section_id', '=', 't2.id')
                    ->select('t1.*', 't2.name as section_name');
                if ($filters != '') {
                    $filters = (array)json_decode($filters);
                    $results = $qry->where($filters);
                }
            } else {
               
            }
            */
             $table_name = $req->table_name . ' as t1';
                $qry = $connection->table($table_name)
                    ->select('t1.*');
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

    //function
    public function saveSampleAnalysisRequestdetails(Request $req)
    {
        try {
            $user_id = $this->user_id;
            $limssample_id = $req->input('limssample_id');
            $missample_id = $req->input('mis_sample_id');
            $analysis_type_id = $req->input('analysis_type_id');
            $module_id = $req->input('module_id');
            $laboratory_id = $req->input('laboratory_id');
            $application_code = $req->input('application_code');
            $sample_application_code = $req->input('sample_application_code');
            $workflow_stage_id = $req->input('workflow_stage_id');
            $applications_table = 'sample_applications';
            $samples_table = 'samples';
            if (isset($missample_id) && is_numeric($missample_id)) {
                $sample_app_code = $sample_application_code;
            } else {
                $sample_app_code = $application_code;
            }
            $sample_data = array(
                'device_type_id' => $req->input('device_type_id'),
                'sealpackcondition_id' => 1,
                'brand_name' => $req->input('brand_name'),
                'product_form' => $req->input('product_form_id'),
                'dosage_form' => $req->input('dosage_form_id'),
                'classification' => $req->input('classification_id'),
                'common_name' => $req->input('common_name'),
                'batchno' => $req->input('batchno'),
                'expirydate' => $req->input('expirydate'),
                'manufacturedate' => $req->input('manufacturedate'),
                'section_id' => $req->input('section_id'),
                'pack_size' => $req->input('pack_size'),
                'pack_unit_id' => $req->input('pack_unit_id'),
                'quantity' => $req->input('quantity'),
                'quantity_unit_id' => $req->input('quantity_unit_id'),
                'product_desc' => '',
                'product_strength' => $req->input('product_strength'),
                'productstrength_unit' => $req->input('productstrength_unit'),
                'dosage_form' => $req->input('dosage_form_id')
            );
            //save applicant to LIMS system 
            $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
            $application_details = getTableData($table_name, array('application_code' => $application_code));
            $zone_id = 2;
            if($application_details){
                $zone_id = $application_details->zone_id;
            }
           
            $mis_process_id = $application_details->process_id;
            $misproduct_id = $application_details->product_id;
            $app_data = array(
                'payment_mode_id' => $req->payment_mode_id,
                'requested_by' => strtoupper($req->user_name),
                'process_id' => $req->process_id,
                'mis_process_id' => $mis_process_id,
                'can_subcontract' => $req->can_subcontract,
                'code_ref_no' => $req->code_ref_no,
                'reason_for_analysis' => $req->reason_for_analysis,
                'other_analysis_reason' => $req->other_analysis_reason,
                'submission_date' => $req->submission_date,
                'reference_no' => $req->reference_no,
                'contact_person' => $this->user_fullnames,
                'section_id' => $req->section_id,
                'sample_category_id' => $req->sample_category_id,
                'zone_id' => $zone_id,
                'applicant_id' => 71,
                'sample_purpose' => $req->sample_purpose,
                'applicationtype_id' => 1
            );
            if ($laboratory_id < 1) {
                $laboratory_id = 1;
            }
            if (validateIsNumeric($limssample_id)) {
                //update the details
                $where_app = array('sample_id' => $limssample_id);
                $app_details = array();
                if (recordExists($applications_table, $where_app, 'lims_db')) {
                    $previous_data = getPreviousRecords($applications_table, $where_app, 'lims_db');
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    updateRecord($applications_table, $previous_data, $where_app, $app_details, $user_id, 'lims_db');
                }
                $reference_no = $previous_data[0]['reference_no'];
                $where_sample = array(
                    'id' => $limssample_id
                );
                $sample_data['dola'] = Carbon::now();
                $sample_data['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($samples_table, $where_sample, 'lims_db');
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($samples_table, $previous_data, $where_sample, $sample_data, $user_id, 'lims_db');
            } else {
                $trader_id = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'applicant_id');
                $applicant_id = getLIMSApplicantRecord($trader_id, $user_id);
                $sample_data['created_by'] = \Auth::user()->id;
                $sample_data['created_on'] = Carbon::now();
                $res = insertRecord('samples', $sample_data, $user_id, 'lims_db');
                $limssample_id = $res['record_id'];
                $reference_no = genLaboratoryReference_number($req->section_id, $zone_id, $req->sample_category_id, $laboratory_id, $req->device_type_id, $user_id,4);
                $app_data['created_on'] = Carbon::now();
                $app_data['created_by'] = $user_id;
                $app_data['status_id'] = 1;
                $app_data['reference_no'] = $reference_no;
                $app_data['laboratory_id'] = $laboratory_id;
                $app_data['sample_id'] = $limssample_id;
                $app_data['applicant_id'] = $applicant_id;
                $res = insertRecord('sample_applications', $app_data, $user_id, 'lims_db');
                if ($res['success'] == false) {
                    return response()->json($res);
                }
                $this->syncSampleActiveIngredientsToLims($missample_id, $limssample_id);
                //save in the interface table 
                $request_data = array(
                    'application_code' => $sample_app_code,
                    'analysis_type_id' => $analysis_type_id,
                    'limssample_id' => $limssample_id,
                    'misproduct_id' => $misproduct_id,
                    'missample_id' => $missample_id,
                    'limsreference_no' => $reference_no,
                    'status_id' => 1,
                    'requested_on' => Carbon::now(),
                    'requested_by' => $user_id,
                    'request_stage_id' => $workflow_stage_id,
                    'created_by' => $user_id,
                    'created_on' => Carbon::now(),
                    'module_id' => $module_id
                );
                $res = insertRecord('tra_sampleanalysis_requests', $request_data, $user_id);
            }
            if ($res['success']) {
                $res = array(
                    'success' => true,
                    'sample_id' => $limssample_id,
                    'laboratory_reference_no' => $reference_no,
                    'message' => 'Sample test Request saved successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $res['message']
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

    public function syncSampleActiveIngredientsToLims($pms_sample_id, $lims_sample_id)
    {
        $lims_db = DB::connection('lims_db');
        $qry = DB::table('tra_pmssample_ingredients')
            ->select(DB::raw("$lims_sample_id as sample_id,ingredient_id,specification_id as specificationtype_id,strength,si_unit_id"))
            ->where('sample_id', $pms_sample_id);
        $results = $qry->get();
        $results = convertStdClassObjToArray($results);
        $lims_db->table('activeingredients')
            ->insert($results);
    }

    public function getLimsSampleIngredients(Request $request)
    {
        try {
            $sample_id = $request->input('sample_id');
            $lims_db = DB::connection('lims_db');
            $qry = $lims_db->table('activeingredients as t1')
                ->join('ingredient as t2', 't1.ingredient_id', '=', 't2.id')
                ->join('specification_type as t3', 't1.specificationtype_id', '=', 't3.id')
                ->join('si_units as t4', 't1.si_unit_id', '=', 't4.id')
                ->select(DB::raw("t1.*,t2.name as ingredient,CONCAT(t1.strength,t4.name) as strength_txt"))
                ->where('t1.sample_id', $sample_id);
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

    public function onDeleteLabSampleOtherDetails(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where, 'lims_db');
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id, 'lims_db');
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

    public function getsampleanalysistestParameters(Request $req)
    {
        try {
            $limssample_id = $req->limssample_id;
            $data = array();
            $section_id = $req->section_id;
            $module_id = $req->module_id;

            $data = DB::connection('lims_db')->table('sample_test_request as t1')
                ->join('testparameters as t2', 't1.test_parameter_id', '=', 't2.id')
                ->select(DB::raw("t1.*, t2.name as test_parameter, t1.sample_id as limssampe_id"))
                ->where(array('sample_id' => $limssample_id))
                ->get();
            $res = array(
                'success' => true,
                'results' => $data,
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

    public function getsampleanalysistestAnalysisResults(Request $req)
    {
        try {
            $limssample_id = $req->limssample_id;
            $data = array();

            //$results = DB::connection('lims_db')->select(DB::raw("select  t5.is_accredited, t4.is_subcontructed, t6.name as recommendation, t5.specifications,t5.results,t5.analyst_remarks,t5.analysts_id, t1.id as id,t2.assignement_status,t2.sample_id,t2.is_subcontracted,t2.test_request_id,t2.test_submission_id,t2.test_priority,date_format(t2.expected_end_date,'%Y-%m-%d') as expected_end_date , t2.reference_no,t3.name as test_parameter,test_priority from sample_test_request t1 inner join sample_test_schedulesdata t2 on t1.id = t2.test_request_id inner join testparameters t3 on t1.test_parameter_id = t3.id inner join sample_test_assignments t4 on t1.id = t4.test_request_id inner join sample_analysis_results t5 on t1.id = t5.test_request_id left join complyrecommendation_status t6 on t5.analyst_remarks = t6.id left join accredited_testparameters t7 on t1.test_parameter_id = t7.test_parameter_id where t1.sample_id = '" . $limssample_id . "' and t1.pass_status = 1 group by t5.id"));

            $res = array(
                'success' => true,
                'results' => $data,
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

    public function getTestParametersDetails(Request $req)
    {
        try {
            $limssample_id = $req->limssample_id;
            $data = array();
            $section_id = $req->section_id;
            $sub_cat_id = $req->sub_cat_id;
            $cost_category_id = $req->cost_category_id;
            $where_statement = " ";
            if (is_numeric($sub_cat_id)) {
                $where_statement .= " and t2.sub_cat_id = $sub_cat_id ";
            }
            if (is_numeric($section_id)) {
                $where_statement .= "  and t1.section_id = $section_id ";
            }
            if (is_numeric($cost_category_id)) {
                $where_statement .= "  and t5.cost_category_id = $cost_category_id ";
            }

            $results = DB::connection('lims_db')->select(DB::raw("select t6.name as technique_name,t7.name as currency, t5.name as cost_sub_category, t2.id as parameter_costs_id,t1.id as test_parameter_id,CONCAT_WS('-',t1.name,t6.name) as test_parameter ,t2.cost,t2.currency_id, t4.section_id,t5.cost_category_id from testparameters t1 inner join parameter_costs t2 on t1.id = t2.parameter_id inner join cost_sub_categories t5 on t5.id = t2.sub_cat_id inner join cost_categories t4 on t4.id = t5.cost_category_id  left join analysis_techniques t6 on t2.technique_id = t6.id left join currency t7 on t2.currency_id = t7.id where 1 $where_statement"));

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

    public function getSampleanalysistestrequestsprocesses(Request $req)
    {
        try {
            $reference_no = $req->input('reference_no');
            $results = DB::connection('lims_db')
                ->select(DB::raw("select t5.reference_no as laboratory_reference_no, t6.brand_name as sample_name, isDone as is_done,t1.id, t1.date_submitted as submitted_on,t1.date_released,t1.reference_no,t2.name as current_stage,t3.name as applicant_name,IF(t1.altered_by = '', t4.FullName, t1.altered_by) as usr_to,t5.laboratory_no, t6.brand_name from submissions t1 inner join menus t2 on t1.destination_process = t2.id left join companies t3 on t1.applicant_id = t3.id left join users t4 on t1.usr_to = t4.usr_id left join sample_applications t5 on t1.reference_no = t5.reference_no left join samples t6 on t5.sample_id = t6.id  where t1.reference_no = '" . $reference_no . "'"));
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

    public function funcAddSampleTestParameters(Request $req)
    {
        try {

            $user_id = $this->user_id;
            $limssample_id = $req->limssample_id;
            $selected = $req->selected;
            $selected_ids = json_decode($selected);
            $table_name = 'sample_test_request';
            foreach ($selected_ids as $selected_id) {
                $record = DB::connection('lims_db')->table('parameter_costs')
                    ->where(array('id' => $selected_id))
                    ->first();
                if ($record) {

                    $where_app = array('parameter_costs_id' => $selected_id, 'sample_id' => $limssample_id);
                    $data = array('sample_id' => $limssample_id,
                        'parameter_costs_id' => $selected_id,
                        'parameter_cost' => $record->cost,
                        'test_parameter_id' => $record->parameter_id,

                        'quantity' => 1,
                        'currency_id' => $record->currency_id,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                    if (!recordExists($table_name, $where_app, 'lims_db')) {
                        $res = insertRecord($table_name, $data, $user_id, 'lims_db');

                    }

                }
            }
            $res = array(
                'success' => true,
                'message' => 'Sample Test Parameters Saved Successfully'
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

    public function funcSampleApplicationSubmissionWin(Request $req)
    {
        try {
            //get a value
            $user_id = $this->user_id;
            $limssample_id = $req->limssample_id;
            $application_code = $req->application_code;
            $remarks = $req->remarks;
            $table_name = 'submissions';
            //check if the sample test have been added
            if (recordExists('sample_test_request', array('sample_id' => $limssample_id), 'lims_db')) {
                $record = DB::connection('lims_db')->table('sample_applications as  t1')
                    ->join('samples as t2', 't1.sample_id', '=', 't2.id')
                    ->select('t1.*')
                    ->where(array('t1.sample_id' => $limssample_id))
                    ->first();
                if ($record) {
                    $section_id = $record->section_id;
                    $reference_no = $record->reference_no;
                    $applicant_id = $record->applicant_id;
                    $next_stage_id = getSingleRecordColValue('par_sampleanalysis_initprocess', array('section_id' => $section_id), 'stage_id', 'mysql');
                    $data = array(
                        'usr_from' => $user_id,
                        'urgency' => 1,
                        'remarks' => $remarks,
                        'applicant_id' => $applicant_id,
                        'host_process' => $next_stage_id,
                        'destination_process' => $next_stage_id,
                        'reference_no' => $reference_no,
                        'isRead' => 0,
                        'isDone' => 0,
                        'date_submitted' => Carbon::now(),
                        'isComplete' => 0,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );

                    insertRecord($table_name, $data, $user_id, 'lims_db');
                    //update the status 
                    $where_sample = array('limssample_id' => $limssample_id, 'application_code' => $application_code);
                    $previous_data = getPreviousRecords('tra_sampleanalysis_requests', $where_sample);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord('tra_sampleanalysis_requests', $previous_data, $where_sample, array('status_id' => 2, 'altered_by' => $user_id, 'dola' => Carbon::now()), $user_id);
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No sample application found!!'
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Enter Analysis Test Request Parameter to submit'
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
        return response()->json($res);
    }
    
    function get_Userto($hostProcess, $ref) {
        $record = DB::connection('lims_db')->table('submissions')
                ->where(array('reference_no'=>$ref, 'destination_process'=>$hostProcess,'isDone'=>0))
                ->first();
        $usr_from = '';
        if ($record) {
            $usr_from = $record -> usr_from;

        }
        else{
                $usr_from = '0';
        }
        return $usr_from;

    }

    function get_Nextstage($hostProcess, $section_id) {
        $record = DB::connection('lims_db')->table('process_accountreceivablestages')
                ->where(array('section_id'=>$section_id, 'account_stage'=>$hostProcess))
                ->select("process_to");
        $record2 = DB::connection('lims_db')->table('prereceiving_paymentstage')
                ->where(array('section_id'=>$section_id, 'payment_stage'=>$hostProcess))
                ->select("receiving_stage as process_to");
                $record2->union($record);
        $process_to = 0;
        $record2 = $record2->first();
        if ( $record2) {
            $process_to = $record2 -> process_to;
        }
        return $process_to;

    }
    function getPaymnetmodes($sample_id){
        
        $record = DB::connection('lims_db')->table('sample_invoicing_details')
                ->where(array('sample_id'=>$sample_id))
                ->first();
$payment_mode_id = 1;
        if($record){
            $payment_mode_id = $record->payment_mode_id;
            
        }
        return $payment_mode_id;
        
    }
    public function submitRegistrationToNextStage(Request $req) {
        try{
            $ref = $req->ref;
            $usr_id = $this->user_id;
            $hostProcess = $req->hostProcess;
            
            $record = DB::connection('lims_db')->table('sample_applications')
                    ->where(array('reference_no'=>$ref))
                    ->first();

            if ($record) {
                $row = $record;
                $applicant_id = $row -> applicant_id;
                $section_id = $row -> section_id;
                $sample_id = $row -> sample_id;
                $reference_no = $row -> reference_no;

                //get the next stage and the users to
                $usr_to = $this -> get_Userto($hostProcess, $reference_no);
                $next_stage = $this -> get_Nextstage($hostProcess, $section_id);

                $data = array('usr_to' => $usr_to, 'usr_from' => $usr_id, 'host_process' => $hostProcess, 'applicant_id' => $applicant_id, 'destination_process' => $next_stage, 'reference_no' => $reference_no, 'isRead' => 0, 'isDone' => 0, 'created_by' => 'Account Department', 'created_on' => date('Y-m-d H:i:s'), 'date_submitted' => date('Y-m-d H:i:s'));
                $payment_mode = $this->getPaymnetmodes($sample_id);
                                if($payment_mode== 2){
                                    $data['isDone'] = 1;
                                }
                DB::connection('lims_db')->table('submissions')->insert($data);
                $where = array('reference_no'=>$reference_no, 'destination_process'=>$hostProcess);
                $data = array('isDone' => 1, 'isRead' => 1, 'dola' => date('Y-m-d H:i:s'));
    
                DB::connection('lims_db')->table('submissions')->where($where)->update($data);
                $res = array('success' => true, 'message' => 'Submitted successfully');
                                
            }
            else{
                $res = array('success' => false, 'message' => 'Error occurred');
                
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
    public function prepareLabServicesSamplePaymentPanel(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry1 = DB::connection('lims_db')->table('sample_applications as t1')
                        ->join('companies as t2', 't1.applicant_id', 't2.id')
                        ->select(DB::raw("CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,t1.section_id,19 as module_id,'' as product_details,t1.applicant_id"))
                        ->first();
            $qry2 = DB::table('tra_application_invoices')->select('id as invoice_id', 'invoice_no')
            // ->where('application_code',$application_code)
            ->first();

            $invoice_id = '';
                $invoice_no = '';
            if($qry2){
                $invoice_id = $qry2->invoice_id;
                $invoice_no = $qry2->invoice_no;
            }
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $invoice_id);

            $results = array('applicant_details'=>$qry1->applicant_details,         'section_id'=>$qry1->section_id,
            'module_id'=>$qry1->module_id,
            'product_details'=>$qry1->product_details,
            'applicant_id'=>$qry1->applicant_id,
            'invoice_id'=>$invoice_id, 
            'invoice_no'=>$invoice_no );
           
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
}
