<?php

namespace Modules\SampleInventory\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SampleInventoryController extends Controller
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

    function getReceivedSampleInventory(Request $req){
        $filters = $req->filter;
        $item_type=$req->item_type;
        $module_id=$req->module_id;
        $item_status_id=$req->item_status_id;
        $received_by=$req->received_by;
        $store_id=$req->store_id;
        $store_section_id=$req->store_section_id;
        $section_level_id=$req->section_level_id;

        $qry = DB::table('tra_inventory_inflows as t')
               ->leftJoin('tra_sample_inventory as tt','t.inventory_id','tt.id')
               ->leftJoin('tra_sample_information as t1','tt.sample_id','t1.id')
               ->leftJoin('tra_product_information as t2','t1.product_id','t2.id')
               ->leftJoin('par_si_units as t3','tt.unit_id','t3.id')
               ->leftJoin('par_sample_status as t4','t.item_status_id','t4.id')
               ->leftJoin('par_common_names as t5','tt.common_name_id','t5.id')
               ->leftJoin('par_classifications as t6','tt.classification_id','t6.id')
               ->leftJoin('users as t7','t.created_by','t7.id')
               ->leftJoin('par_sections as t8','tt.section_id','t8.id')
               ->leftJoin('par_sampleitem_types as t9','tt.item_type_id','t9.id')
               ->leftJoin('users as t10','t.submitted_by','t10.id')
               ->leftJoin('modules as t11','tt.module_id','t11.id')
               ->leftJoin('par_inventory_stores as t12','t.store_id','t12.id')
               ->leftJoin('par_inventorysection_levels as t13','t.section_level_id','t13.id')
               ->leftJoin('par_inventorystore_sections as t14','t.store_section_id','t14.id')
               ->select('t.*','t2.brand_name','t3.name as unit_name','t4.name as item_status_name','t5.name as common_name','t6.name as classification_name','tt.reference_no','tt.item_reference_no','t8.name as section_name','t9.name as item_type','t11.name as application_type','t12.name as store_name','t13.name as section_level_name','t14.name as store_section_name',DB::raw("CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as received_by,CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by"))
               ->orderBy('t.id', 'Desc');

        if(validateIsNumeric($item_type)){
            $qry->where('t.item_type_id',$item_type);
        }
        if(validateIsNumeric($module_id)){
            $qry->where('t.module_id',$module_id);
        }
        if(validateIsNumeric($received_by)){
            $qry->where('t.created_by',$received_by);
        }
        if(validateIsNumeric($store_id)){
            $qry->where('t.store_id',$store_id);
        }
        if(validateIsNumeric($store_section_id)){
            $qry->where('t.store_section_id',$store_section_id);
        }
        if(validateIsNumeric($section_level_id)){
            $qry->where('t.section_level_id',$section_level_id);
        }
         if(validateIsNumeric($item_status_id)){
            $qry->where('t.item_status_id',$item_status_id);
        }

         $filters = (array)json_decode($filters);
         $whereClauses = array();
         $filter_string = '';
                if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'file_no' :
                                    $whereClauses[] = "t.file_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'item_reference_no' :
                                    $whereClauses[] = "t.item_reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'batch_no' :
                                    $whereClauses[] = "t.batch_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'brand_name' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

        $limit = $req->input('limit');
        $start = $req->input('start');

        if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
         }
        else{
              $results=$qry->get();
             }
         $res = array(
                      'success' => true,
                      'results' => $results,
                      'message' => 'All is well'
                  );

        return $res;
    }
    public function getSampledProductList(Request $req){
        $qry = DB::table('tra_sample_information as t1')
                ->join('tra_product_information as t2','t1.product_id','t2.id')
                ->leftJoin('par_common_names as t3','t2.common_name_id','t3.id')
                ->join('tra_product_applications as t7','t2.id','t7.product_id')
                ->leftJoin('par_sections as t4','t7.section_id','t4.id')
                ->leftJoin('par_classifications as t5','t2.classification_id','t5.id')
                ->leftJoin('tra_sample_inventory as t6','t1.id','t6.sample_id')
                ->select('t1.id as sample_id','t2.common_name_id','t7.section_id','t2.classification_id','t7.application_code','t7.reference_no','t2.brand_name','t3.name as common_name','t4.name as section_name','t6.id as inventory_id','t5.name as classification_name','t7.module_id')
                ->orderBy('t1.id', 'Desc');
        $res  = array(
            'success'=>true,
            'results'=>$qry->get(),
            'message'=>'All is well'
        );

    return $res;
    }

public function getConfigFormDetails(Request $req){
    $sample_item_type_id=$req->sample_item_type_id;
    $res = DB::table('par_itemtype_formconfig')
            ->where('sample_item_type_id',$sample_item_type_id)
            ->where('is_enabled',1)
            ->orderBy('order_no')
            ->get();

    return $res;
}

 public function getIssuedSampleInventory(Request $req){
    $filters = $req->filter;
        $item_type=$req->item_type;
        $module_id=$req->module_id;
        $issued_to=$req->issued_to;
        $approved_by=$req->approved_by;
        $section_level_id=$req->section_level_id;

        $qry = DB::table('tra_inventory_outflows as t')
               ->leftJoin('tra_sample_inventory as t1','t.inventory_id','t1.id')
               ->leftJoin('par_sampleitem_types as t9','t1.item_type_id','t9.id')
               ->leftJoin('users as t10','t.issued_to','t10.id')
               ->leftJoin('modules as t11','t1.module_id','t11.id')
               ->select('t.*','t1.reference_no','t1.item_reference_no','t9.name as item_type','t11.name as application_type',DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as requested_by"))
               ->orderBy('t.id', 'Desc');

        if(validateIsNumeric($item_type)){
            $qry->where('t1.item_type_id',$item_type);
        }
        if(validateIsNumeric($module_id)){
            $qry->where('t1.module_id',$module_id);
        }
        if(validateIsNumeric($issued_to)){
            $qry->where('t.issued_to',$issued_to);
        }
        if(validateIsNumeric($approved_by)){
            $qry->where('t5.approved_by',$approved_by);
        }

         $filters = (array)json_decode($filters);
         $whereClauses = array();
         $filter_string = '';
                if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'file_no' :
                                    $whereClauses[] = "t1.file_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'item_reference_no' :
                                    $whereClauses[] = "t1.item_reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'batch_no' :
                                    $whereClauses[] = "t1.batch_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'brand_name' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'issued_to' :
                                    $whereClauses[] = "t.issued_to like '%" . ($filter->value) . "%'";
                                    break;
                                case 'approved_on' :
                                    $whereClauses[] = "date_format(t5.approval_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'issued_on' :
                                    $whereClauses[] = "date_format(t.issued_on, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

        $limit = $req->input('limit');
        $start = $req->input('start');

        if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
         }
        else{
              $results=$qry->get();
             }
         $res = array(
                      'success' => true,
                      'results' => $results,
                      'message' => 'All is well'
                  );

        return $res;
 }
  function getInventoryDashboard(Request $req){
        $filters = $req->filter;
        $item_type=$req->item_type;
        $module_id=$req->module_id;

        $qry = DB::table('tra_sample_inventory as t')
               ->leftJoin('tra_sample_information as t1','t.sample_id','t1.id')
               ->leftJoin('tra_product_information as t2','t1.product_id','t2.id')
               ->leftJoin('par_si_units as t3','t.unit_id','t3.id')
               ->leftJoin('par_common_names as t5','t.common_name_id','t5.id')
               ->leftJoin('par_classifications as t6','t.classification_id','t6.id')
               ->leftJoin('par_sections as t8','t.section_id','t8.id')
               ->leftJoin('par_sampleitem_types as t9','t.item_type_id','t9.id')
               ->leftJoin('modules as t11','t.module_id','t11.id')
               ->select('t.*','t2.brand_name','t3.name as quantity_units','t5.name as common_name','t6.name as classification_name','t.reference_no','t8.name as section_name','t9.name as item_type','t11.name as application_type')
               ->orderBy('t.id', 'Desc');

        if(validateIsNumeric($item_type)){
            $qry->where('t.item_type_id',$item_type);
        }
        if(validateIsNumeric($module_id)){
            $qry->where('t.module_id',$module_id);
        }
       

         $filters = (array)json_decode($filters);
         $whereClauses = array();
         $filter_string = '';
                if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'file_no' :
                                    $whereClauses[] = "t.file_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'item_reference_no' :
                                    $whereClauses[] = "t.item_reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'batch_no' :
                                    $whereClauses[] = "t.batch_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'brand_name' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

        $limit = $req->input('limit');
        $start = $req->input('start');

        if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
         }
        else{
              $results=$qry->get();
             }

        foreach ($results as $result) {
            $inventory_id=$result->id;
            $total = $this->getTotalInventoryItems($inventory_id);
            $issued = $this->getTotalIssuedItems($inventory_id);
            $rem = $total - $issued;
            $result->quantity_received= $total;
            $result->issued_quantity= $issued;
            $result->remaining_quantity= $rem;
        }

         $res = array(
                      'success' => true,
                      'results' => $results,
                      'message' => 'All is well'
                  );

        return $res;
    }
 function getTotalInventoryItems($inventory_id){
    $qry = DB::table('tra_inventory_inflows')
            ->select("quantity")
            ->where('inventory_id',$inventory_id)
            ->get();
    $total = 0;
    foreach ($qry as $tot) {
       $total = $tot->quantity+$total;
    }
    return $total;
 }
 function getTotalIssuedItems($inventory_id){
    $qry = DB::table('tra_inventory_outflows')
            ->select('quantity_issued')
            ->where('inventory_id',$inventory_id)
            ->get();
    $total = 0;
    foreach ($qry as $tot) {
       $total = $tot->quantity_issued+$total;
    }
    return $total;
 }

  public function saveInventoryItemData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $main_table = "tra_sample_inventory";
            $insert_table = "tra_inventory_inflows";

            $sample_id = $post_data['sample_id'];
            $inventory_id = $post_data['inventory_id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['inventory_id']);
            unset($post_data['table_name']);
            
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
//else if its not an update
            //else {
                $main_data = array();
                $inflow_data = array();

                //check if entry exist
                $where_record = array(
                'application_code' => $table_data['application_code'],
                'item_type_id' => $table_data['item_type_id']
                );
                if(!recordExists($main_table, $where_record)){

                    $main_data['created_on']=$table_data['created_on'];
                    $main_data['created_by']=$table_data['created_by'];
                    $main_data['sample_id']=$table_data['sample_id'];
                    $main_data['application_code']=$table_data['application_code'];
                    $main_data['reference_no']=$table_data['reference_no'];
                    $main_data['item_type_id']=$table_data['item_type_id'];
                    $main_data['item_reference_no']=$table_data['application_code'].$table_data['item_type_id'];
                    $main_data['module_id']=$table_data['module_id'];
                    $main_data['common_name_id']=$table_data['common_name_id'];
                    $main_data['section_id']=$table_data['section_id'];
                    $main_data['classification_id']=$table_data['classification_id'];
                    $main_data['storage_condition_id']=$table_data['storage_condition_id'];
                    $main_data['unit_id']=$table_data['unit_id'];

                $res = insertRecord($main_table, $main_data, $user_id);

               if($res['success']){

                    $inventory_id = $res['record_id'];

               }else{
                    $res = array(
                        'success' => false,
                        'message' => $res
                     );
                return $res;
               }
            }else{
                $units = $table_data['unit_id'];
                $item_reference_no = $table_data['application_code'].$table_data['item_type_id'];

                $saved_units = DB::table('tra_sample_inventory')->where('item_reference_no',$item_reference_no)->select('unit_id')->first();
                if($units != $saved_units->unit_id){
                    $unit_name = DB::table('par_si_units')->where('id',$saved_units->unit_id)->select('name')->first();
                   $res = array(
                        'success' => false,
                        'message' => "sorry please provide items in ".$unit_name->name." Units as the already stored"
                     );
                return $res;
                }
            }

                    //add an entry to inflow
                    unset($table_data['sample_id']);
                    unset($table_data['application_code']);
                    unset($table_data['reference_no']);
                    unset($table_data['item_type_id']);
                    unset($table_data['module_id']);
                    unset($table_data['common_name_id']);
                    unset($table_data['section_id']);
                    unset($table_data['classification_id']);
                    unset($table_data['storage_condition_id']);
                    unset($table_data['unit_id']);

                    //add inventory id
                    $table_data['inventory_id']=$inventory_id;

                    $res = insertRecord($insert_table, $table_data, $user_id);

            //}
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

    function getStockInflowInventory(Request $req){

        $item_reference_no = $req->item_reference_no;

         $res = DB::table('tra_inventory_inflows as t1')
                ->leftJoin('tra_sample_inventory as t2','t1.inventory_id','t2.id')
                ->leftJoin('par_inventorystore_sections as t3','t1.store_section_id','t3.id')
                ->leftJoin('par_inventorysection_levels as t4','t1.section_level_id','t4.id')
                ->leftJoin('par_inventory_stores as t5','t1.store_id','t5.id')
                ->leftJoin('users as t6','t1.created_by','t6.id')
                ->where('item_reference_no',$item_reference_no)

                ->select('t1.*','t2.reference_no','t2.item_reference_no','t3.name as store_section','t4.name as section_level','t5.name as store_name',DB::raw("CONCAT_WS(' ',decrypt(t6.first_name),decrypt(t6.last_name)) as received_by"))
                ->orderBy('t1.id', 'Desc')
                ->get();

        return $res;
    }
    function getStockOutflowInventory(Request $req){
         $item_reference_no = $req->item_reference_no;
         $res = DB::table('tra_inventory_outflows as t1')
                ->leftJoin('tra_sample_inventory as t2','t1.inventory_id','t2.id')
                ->leftJoin('users as t6','t1.created_by','t6.id')
                ->leftJoin('users as t7','t1.issued_to','t7.id')
                ->where('item_reference_no',$item_reference_no)

                ->select('t1.*','t2.reference_no','t2.item_reference_no',DB::raw("CONCAT_WS(' ',decrypt(t6.first_name),decrypt(t6.last_name)) as issued_by,CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as issued_to"))
                ->orderBy('t1.id', 'Desc')
                ->get();

        return $res;
    }

public function doSubmitInventoryIssueFormDetails(Request $req){
    try{
            $user_id = \Auth::user()->id;
            $post_data = $req->all();

            $item_reference_no = $post_data['item_reference_no'];
            $insert_table = $post_data['table_name'];
            //inventory id
            $inventory_id_col = DB::table('tra_sample_inventory')->where('item_reference_no',$item_reference_no)->select('id')->first();
            $inventory_id = $inventory_id_col->id;
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['item_reference_no']);
            unset($post_data['remaining_quantity']);
            unset($post_data['table_name']);
            
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $table_data['inventory_id'] = $inventory_id;

            $res = insertRecord($insert_table, $table_data, $user_id);

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

 function getrequestedItems(Request $req){
        $filters = $req->filter;
        $item_type=$req->item_type;
        $module_id=$req->module_id;

        $qry = DB::table('tra_inventory_requests as t0')
               ->join('tra_sample_inventory as t','t0.inventory_id','t.id')
               ->leftJoin('tra_sample_information as t1','t.sample_id','t1.id')
               ->leftJoin('tra_product_information as t2','t1.product_id','t2.id')
               ->leftJoin('users as t4','t0.requested_by','t4.id')
               ->leftJoin('par_common_names as t5','t.common_name_id','t5.id')
               ->leftJoin('par_classifications as t6','t.classification_id','t6.id')
               ->leftJoin('par_sections as t8','t.section_id','t8.id')
               ->leftJoin('par_sampleitem_types as t9','t.item_type_id','t9.id')
               ->leftJoin('modules as t11','t.module_id','t11.id')
               ->where('t0.request_issue_status_id',1)
               ->Orwhere('t0.request_issue_status_id',2)
               ->select('t0.*','t2.brand_name','t5.name as common_name','t6.name as classification_name','t.reference_no','t.item_reference_no','t8.name as section_name','t9.name as item_type','t11.name as application_type',DB::raw("CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as requested_by"))
               ->orderBy('t0.id', 'ASC');

        if(validateIsNumeric($item_type)){
            $qry->where('t.item_type_id',$item_type);
        }
        if(validateIsNumeric($module_id)){
            $qry->where('t.module_id',$module_id);
        }
       

         $filters = (array)json_decode($filters);
         $whereClauses = array();
         $filter_string = '';
                if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'file_no' :
                                    $whereClauses[] = "t.file_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'item_reference_no' :
                                    $whereClauses[] = "t.item_reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'batch_no' :
                                    $whereClauses[] = "t.batch_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'brand_name' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

        $limit = $req->input('limit');
        $start = $req->input('start');

        if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
         }
        else{
              $results=$qry->get();
             }

         $res = array(
                      'success' => true,
                      'results' => $results,
                      'message' => 'All is well'
                  );

        return $res;
    }

    
    public function doSubmitRequestedInventoryIssueFormDetails(Request $req){
    try{
            $user_id = \Auth::user()->id;
            $post_data = $req->all();

            $inventory_id = $post_data['inventory_id'];
            $insert_table = $post_data['table_name'];
            $id = $post_data['id'];
            $issued_to = $post_data['issued_to'];
            $post_data['quantity_issued'] = $post_data['quantity'];

//confirm stock last
            $availale_stock = ($this->getTotalInventoryItems($inventory_id)) - ($this->getTotalIssuedItems($inventory_id));

        if($availale_stock > $post_data['quantity']){
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['quantity']);
            unset($post_data['table_name']);
            unset($post_data['id']);
            
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;

//insert to outflow
            $res = insertRecord($insert_table, $table_data, $user_id);

//update request
            DB::table('tra_inventory_requests')->where('id',$id)->update(array('request_issue_status_id'=>3,'issued_by'=>$user_id,'issued_to'=>$issued_to));

        }else{
             $res = array(
                'success' => false,
                'message' => "Sorry only ".$availale_stock." items remain in stock"
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

public function getInventoryStockReport(Request $req){

//filters 
    $inventory_type_id = $req->inventory_type_id;
    $reference_no = $req->reference;
    $date_opt = $req->date_opt;
    $from_date = $req->from_date;
    $to_date = $req->to_date;

    $where_date = '';
    $where_disposal_date = '';
    if(validateIsNumeric($date_opt)){
      switch ($date_opt) {
        case '17':
          $where_date = "date_format(t1.created_on, '%Y%-%m-%d') BETWEEN '".formatDate($from_date)."' AND '".formatDate($to_date)."'";
          break;
        case '19':
          $where_date = "date_format(t1.created_on, '%Y%-%m-%d') BETWEEN '".formatDate($from_date)."' AND '".formatDate($to_date)."'";
          break;
        case '18':
          $where_disposal_date = "date_format(t1.approval_date, '%Y%-%m-%d') BETWEEN '".formatDate($from_date)."' AND '".formatDate($to_date)."'";
          break;
      }
    }


//type
    if(validateIsNumeric($inventory_type_id)){
      $types = DB::table('par_sampleitem_types')->where('id',$inventory_type_id)->get();
    }else{
      $types = DB::table('par_sampleitem_types')->get();
    }
    
      $data = array();
      foreach ($types as $type) {
        $type_id = $type->id;
        $type_name = $type->name;
        //get records
        $received = $this->getTotalStockByType($type_id, $where_date, $reference_no);
        $issued = $this->getIssuedStockByType($type_id, $where_date, $reference_no);
        $disposed = $this->getDisposedStockByType($type_id, $where_disposal_date, $reference_no);
        $remainder = $received - ($issued + $disposed);
        $data[] = array(
            'type' => $type_name,
            'received' => $received,
            'issued' => $issued,
            'disposed' => $disposed,
            'remainder' => $remainder
        );

      }
      $res = array(
          'success'=>true,
          'results'=> $data,
          'message' => "All is well"
      );

      return $res;
}
public function getInventoryStockReportgrid(Request $req){
  
}
public function getTotalStockByType($type, $dateFilters, $reference_no){
  $items = DB::table('tra_inventory_inflows as t1')
          ->leftJoin('tra_sample_inventory as t2','t1.inventory_id','t2.id')
          ->where('t2.item_type_id',$type)
          ->select(DB::raw('SUM(quantity) as received'));

//reference
  if($reference_no != ''){
    $items->where('t2.item_reference_no', $reference_no);
  }
//dates
  if($dateFilters != ''){
    $items->whereRAW($dateFilters);
  }

  $results = $items->get();

  $total = 0;
  foreach ($results as $item) {

    $total += $item->received;
  }
  return $total;
}

public function getIssuedStockByType($type, $dateFilters, $reference_no){
  $items = DB::table('tra_inventory_outflows as t1')
          ->leftJoin('tra_sample_inventory as t2','t1.inventory_id','t2.id')
          ->where('t2.item_type_id',$type)
          ->select(DB::raw('SUM(quantity_issued) as quantity_issued'));
  //reference
  if($reference_no != ''){
    $items->where('t2.item_reference_no', $reference_no);
  }
//dates
  if($dateFilters != ''){
    $items->whereRAW($dateFilters);
  }
  $results = $items->get();

  $total = 0;
  foreach ($results as $item) {
    $total += $item->quantity_issued;
  }
  return $total;
}

public function getDisposedStockByType($type, $dateFilters, $reference_no){
  $items = DB::table('tra_inventorydisposal_items as t1')
          ->leftJoin('tra_sample_inventory as t2','t1.inventory_id','t2.id')
          ->where('t2.item_type_id',$type)
          ->where('t1.recommendation_id',2)
          ->select(DB::raw('SUM(t1.disposal_quantity) as disposed'));
  //reference
  if($reference_no != ''){
    $items->where('t1.item_reference_no', $reference_no);
  }
//dates
  if($dateFilters != ''){
    $items->whereRAW($dateFilters);
  }
 
  $results = $items->get();

  $total = 0;
  foreach ($results as $item) {

    $total += $item->disposed;
  }
  return $total;
}

public function getDisposalApprovalRequests(Request $request){
        $workflow_stage_id = $request->input('workflow_stage_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
  

            $qry = DB::table('tra_inventorydisposal_applications as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('users as t10', 't1.applicant_id', '=', 't10.id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status,t4.name as process_name, t5.name as workflow_stage, t5.is_general,t1.reference_no,t7.process_id,t7.current_stage as workflow_stage_id"))
                ->orderBy('t1.id', 'Desc');
          
           
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }


            if (validateIsNumeric($workflow_stage_id)) {

                $qry->where('t7.current_stage', $workflow_stage_id);
            }

            $qry->where('t7.isDone', 0);
            $qry->where('t7.current_stage','!=', 837);
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

public function getDisposalApprovedRequests(Request $request){
 
        $user_id = $this->user_id;
        $requested_by = $request->requested_by;
        $start = $request->start;
        $limit = $request->limit;

        try {
  

            $qry = DB::table('tra_inventorydisposal_applications as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('users as t10', 't1.applicant_id', '=', 't10.id')
                ->select(DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as approved_by, t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status,t4.name as process_name, t5.name as workflow_stage, t5.is_general,t1.reference_no,t7.process_id,t7.current_stage as workflow_stage_id,t7.date_received as approval_date"))
                ->orderBy('t1.id', 'Desc');
          
         

                $qry->whereRAW("(t7.current_stage = 837)");
            

         $filter = $request->input('filter');
         $whereClauses = array();
         $filter_string = '';

          if (isset($filter)) {
              $filters = json_decode($filter);
              if ($filters != NULL) {
                  foreach ($filters as $filter) {
                      switch ($filter->property) {
                          case 'reference_no' :
                              $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                              break;
                          case 'approval_date' :
                              $whereClauses[] = "date_format(t7.date_received, '%Y%-%m-%d') = '" . formatDate($filter->value) . "'";
                              break;
                        }
                    }
                 }
              $whereClauses = array_filter($whereClauses);
            }
          if (!empty($whereClauses)) {
              $filter_string = implode(' AND ', $whereClauses);
           }
            
          if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }

          if(validateIsNumeric($requested_by)){
              $qry->where('t1.applicant_id',$requested_by);
          }

            $qry->where('t7.isDone', 0);
            $total=$qry->get()->count();

            if(isset($start)&&isset($limit)){
                  $results = $qry->skip($start)->take($limit)->get();
               }
               else{
                  $results=$qry->get();
               }

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'total' => $total
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

public function getDisposalApprovalRequestsItems(Request $req){
  $application_code =$req->application_code;

if(isset($application_code)){
    $request_items = DB::table('tra_inventorydisposal_items as t1')
            ->leftJoin('tra_sample_inventory as t2','t1.item_reference_no','t2.item_reference_no')
            ->leftJoin('tra_inventorydisposal_applications as t6','t1.application_code','t6.application_code')
            ->leftJoin('modules as t3','t2.module_id','t3.id')
            ->leftJoin('par_si_units as t4','t2.unit_id','t4.id')
            ->leftJoin('par_sampleitem_types as t5','t2.item_type_id','t5.id')
            ->leftJoin('par_sampledisposal_reasons as t7','t6.disposal_reason_id','t7.id')
            ->leftJoin('par_inventorydisposal_decisions as t8','t1.recommendation_id','t8.id')
            ->where('t1.application_code', $application_code)

            ->select('t1.item_reference_no','t1.application_code','t2.id as inventory_id','t1.id as item_id','t4.name as quantity_units','t5.name as item_type','t3.name as application_type','t1.disposal_quantity','t7.name as disposal_reason','t1.recommendation_id','t8.name as recommendation')
            ->orderBy('t1.id', 'Desc')
            ->get();
$res = array(
    'success'=> true,
    'results' => $request_items,
    'message'=>"All is well"
  );

}else{
  $res = array(
    'success'=> false,
    'message'=>"no application_code sent"
  );
}

  return $res;
}
public function saveDisposalRequest(Request $req){

  $user_id = $this->user_id;
  $post_data = $req->all(); 
  $process_id = $req->process_id;
  $workflow_stage_id = $req->workflow_stage_id;
  $active_application_id = $req->active_application_id;
  $active_application_code = $req->active_application_code;
  $application_status_id = $req->application_status_id;
  $module_id = $req->module_id;
  $sub_module_id = $req->sub_module_id;
  $applicant_id = $req->applicant_id;
  $items = json_decode($req->items);

//unsetting variablkes
   unset($post_data['active_application_id']);
   unset($post_data['active_application_code']);
   unset($post_data['items']);

  //inserttion
  if(validateIsNumeric($active_application_code)){
    
      //update
    $items_refs = array();
    foreach ($items as $item) {
      $items_ref = $item->item_reference_no;
      $disposal_quantity = $item->disposal_quantity;
      $inventory_id = $item->inventory_id;
      $check = DB::table('tra_inventorydisposal_items')->where(array('item_reference_no'=>$items_ref,'application_code'=>$active_application_code))->count();

      if($check>0){
          DB::table('tra_inventorydisposal_items')
          ->where('item_reference_no',$items_ref)
          ->update(array(
            'disposal_quantity' => $disposal_quantity
          ));
        }else{
          DB::table('tra_inventorydisposal_items')->insert(array(
            'item_reference_no' => $items_ref,
            'disposal_quantity' => $disposal_quantity,
            'inventory_id' => $inventory_id,
            'application_code' => $active_application_code
          ));
        }
      }

      //update disposal details
      DB::table('tra_inventorydisposal_applications')
      ->where('application_code',$active_application_code)
      ->update(array(
        'disposal_method_id' => $req->disposal_method_id,
        'disposal_reason_id' => $req->disposal_reason_id,
        'applicant_id' => $req->requested_by,
        'disposal_date' => $req->disposal_date,
        'description' => $req->description
      ));

      $res = array(
                    'success' => true,
                    'active_application_id' => $active_application_id,
                    'active_application_code' => $active_application_code,
                    'application_status_id' => $application_status_id,
                    'message' => 'Saved Successfully');

  }else{
    $post_data['application_code'] = $this->getApplicationCode();
    $post_data['reference_no'] = "TID".$post_data['application_code'];
    //$post_data['disposal_quantity'] = $disposal_quantity;
    $post_data['application_status_id'] = 1;
    $post_data['created_by'] = $user_id;
    $post_data['created_on'] = Carbon::now();
    $post_data['applicant_id'] = $post_data['requested_by'];
unset($post_data['requested_by']);
     $resp = insertRecord('tra_inventorydisposal_applications', $post_data, $user_id);

    $items_refs = array();
    foreach ($items as $item) {
      $items_ref = $item->item_reference_no;
      $disposal_quantity = $item->disposal_quantity;

      DB::table('tra_inventorydisposal_items')->insert(array(
        'item_reference_no' => $items_ref,
        'disposal_quantity' => $disposal_quantity,
        'application_code' => $post_data['application_code']
      ));

    }

    if ($resp['success']) {

      $active_application_id = $resp['record_id'];
      $active_application_code = $post_data['application_code'];
      $application_status_id = 1;
                $res = array(
                    'success' => true,
                    'active_application_id' => $active_application_id,
                    'active_application_code' => $active_application_code,
                    'application_status_id' => $application_status_id,
                    'message' => 'Saved Successfully');

            } else {
                $res = array('success' => false,
                    'message' => $resp['message']);

            }

  }
  return $res;
}
public function getDisposalItems(Request $req){
  $active_application_code = $req->active_application_code;
  $records = DB::table('tra_inventorydisposal_items as t1')
            ->leftJoin('tra_sample_inventory as t2','t1.item_reference_no','t2.item_reference_no')
            ->leftJoin('modules as t3','t2.module_id','t3.id')
            ->leftJoin('par_si_units as t4','t2.unit_id','t4.id')
            ->leftJoin('par_sampleitem_types as t5','t2.item_type_id','t5.id')
            ->where('t1.application_code', $active_application_code)

            ->select('t1.item_reference_no','t2.id','t1.id as entry_id','t4.name as quantity_units','t5.name as item_type','t3.name as application_type','t1.disposal_quantity')
            ->orderBy('t1.id', 'Desc')
            ->get();
  foreach ($records as $rec) {
    $total = $this->getTotalInventoryItems($rec->id);
    $issued = $this->getTotalIssuedItems($rec->id);
    $rem = $total - $issued;
    $rec->remaining_quantity = $rem;
  }
 return $records;
}
function getApplicationCode(){
  $last = DB::table('tra_inventorydisposal_applications')->select('id')->orderBy('id','desc')->first();
  $year = substr(date('y'),2);
  if($last){
     $id = $last->id;
  }else{
    $id = 1;
  }
  return "46".$year.$id+1;
}

public function getNewDisposalRequests(Request $req){
  $results = DB::table('tra_inventorydisposal_applications as t1')
          ->leftJoin('wf_tfdaprocesses as t2','t1.process_id','t2.id')
          ->leftJoin('users as t3','t1.applicant_id','t3.id')
          ->leftJoin('wf_workflow_statuses as t4','t1.application_status_id','t4.id')
          ->where('application_status_id',1)
          ->select('t1.*','t1.id as application_id','t1.application_code as active_application_code','t1.id as active_application_id','t2.name as process_name','t4.name as application_status',DB::raw("CONCAT_WS(' ',decrypt(t3.first_name),decrypt(t3.last_name)) as requested_by"))
          ->orderBy('t1.id', 'Desc');

    return $results->get();
}

public function ApproveItemDisposalRequest(Request $req){
   
  try {
    $getItemData = DB::table('tra_inventorydisposal_items as t1')
                    ->join('tra_inventorydisposal_applications as t2','t1.application_code','t2.application_code')
                    ->select('t2.applicant_id','t1.disposal_quantity')
                    ->where('t1.id', $req->item_id)->first();
    $check = DB::table('tra_inventorydisposal_items')->where('id',$req->item_id)->first();

if($req->decision_id == 1){
  if( $check->recommendation_id != 1 ){
  $disposal_quantity = $getItemData->disposal_quantity;
  $total = $this->getTotalInventoryItems($req->inventory_id);
  $issued = $this->getTotalIssuedItems($req->inventory_id);
  $remaining_quantity = $total - $issued;

  //insert entry to outflow
  $ree = DB::table('tra_inventory_outflows')->insert(array(
    'inventory_id' =>$req->inventory_id,
    'issue_reason_id' =>2,
    'issued_to' =>$getItemData->applicant_id,
    'quantity_issued' =>$getItemData->disposal_quantity
  ));
}else{
    $remaining_quantity = 2;
    $disposal_quantity = 1;
}

}else{
  //check if item had been recommended
  
  if( $check->recommendation_id == 1 ){

    $entry_id = DB::table('tra_inventory_outflows')
                ->where('inventory_id',$req->inventory_id)
                ->where('quantity_issued',$getItemData->disposal_quantity)
                ->first();

   DB::table('tra_inventory_outflows')
        ->where('id',$entry_id->id)
        ->delete();

  }

    $remaining_quantity = 2;
    $disposal_quantity = 1;
}

if($remaining_quantity >= $disposal_quantity){
     //update item status
    DB::table('tra_inventorydisposal_items')
        ->where('id', $req->item_id)
        ->update(array('recommendation_id'=>$req->decision_id,'approval_date'=>$req->approval_date,'comment'=>$req->comment,'reason_for_rejection'=>$req->reason_for_rejection));

        $res = array(
              'success' => true,
              'message' => 'all is well'
          );

      }else{
         $res = array(
              'success' => false,
              'message' => 'Quantity Exceeds Stock'
          );
      }
  }
    catch (\Exception $exception) {
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

public function getDisposalRequestDetails(Request $req){
  $application_code = $req->application_code;

  if(isset($application_code)){
     $results = DB::table('tra_inventorydisposal_applications as t1')
                ->leftJoin('par_sampledisposal_reasons as t2','t1.disposal_reason_id','t2.id')
                ->leftJoin('par_destruction_methods as t3','t1.disposal_method_id','t3.id')
                ->leftJoin('users as t4','t1.applicant_id','t4.id')
                ->where('t1.application_code',$application_code)

                ->select(DB::raw("CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as requested_by,t1.*,t2.name as disposal_reason, t3.name as disposal_method"))
                ->first();

    $res = array(
        'success' => true,
        'disposal_method' => $results->disposal_method,
        'disposal_reason' => $results->disposal_reason,
        'requested_by' => $results->requested_by,
        'comment' => $results->description,
        'disposal_date' => $results->disposal_date
    );
    
  }else{
    $res = array(
        'success' => false,
        'message' => "no application_code set"
    );
  }

return $res;
}

public function removeDisposalItemEntry(Request $req){
  $entry_id = $req->entry_id;
try {
  if(validateIsNumeric($entry_id)){
    $del = DB::table('tra_inventorydisposal_items')->where('id',$entry_id)->delete();
    
    $res = array(
        'success' => true,
        'message' => "Deleted Successfully"
    );

  }else{
    $res = array(
        'success' => false,
        'message' => "No item passed for deletion"
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
}
