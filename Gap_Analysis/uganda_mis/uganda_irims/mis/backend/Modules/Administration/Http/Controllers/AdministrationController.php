<?php

namespace Modules\Administration\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;
use Modules\Administration\Entities\Menu;
use Modules\Administration\Entities\Permission;
use Modules\Administration\Entities\ProcessesPermission;
use League\OAuth2\Server\Exception\OAuthServerException;
use Illuminate\Support\Arr;

class AdministrationController extends Controller
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
        return view('administration::index');
    }

    // public function getSystemNavigationMenuItems(Request $request)
    // {
    //     $row = $this->getSystemMenuItem(0, 0);
    //     $menus = '[';
    //     if (count($row)) {
    //         $menu_count = count($row);
    //         $menu_counter = 0;

    //         foreach ($row as $item) {
    //             $menu_counter++;
    //             $id = $item['id'];
    //             $name = $item['name'];
    //             $tab_title = $item['tab_title'];
    //             $parent_module_name=$tab_title;
    //             $text = $name;
    //             $level = $item['level'];
    //             $parent_id = $item['parent_id'];
    //             $child_id = $item['parent_id'];
    //             $viewType = $item['viewType'];
    //             $iconCls = $item['iconCls'];
    //             $routeId = $item['routeId'];
    //             $order_no = $item['order_no'];
    //             $is_menu = $item['is_menu'];
    //             $is_disabled = $item['is_disabled'];
    //             $workflow_id = $item['workflow_id'];
    //             $access_level = $this->getMenuAccessLevel($id);

    //             $menus .= '{';
    //             $menus .= '"text": "' . $text . '",';
    //             $menus .= '"name": "' . $name . '",';
    //             $menus .= '"tab_title": "' . $tab_title . '",';
    //             $menus .= '"module_name": "' . $parent_module_name . '",';
    //             $menus .= '"iconCls": "' . $iconCls . '",';
    //             $menus .= '"menu_id": "' . $id . '",';
    //             $menus .= '"id": "' . $id . '",';
    //             $menus .= '"access_level": "' . $access_level . '",';
    //             $menus .= '"viewType": "' . $viewType . '",';
    //             $menus .= '"routeId": "' . $routeId . '",';
    //             $menus .= '"level": "' . $level . '",';
    //             $menus .= '"order_no": "' . $order_no . '",';
    //             $menus .= '"is_menu": "' . $is_menu . '",';
    //             $menus .= '"workflow_id": "' . $workflow_id . '",';
    //             $menus .= '"is_disabled": "' . $is_disabled . '",';
    //             $children = $this->getSystemMenuItem(1, $id);
    //             if (count($children) > 0) {
    //                 $menus .= '"selectable": false,';
    //                 $children_count = count($children);
    //                 $children_counter = 0;
    //                 $menus .= '"children": [';
    //                 foreach ($children as $child) {
    //                     $children_counter++;
    //                     $child_id = $child['id'];
    //                     $child_name = $child['name'];
    //                     $child_title = $child['tab_title'];
    //                     $module_name=$parent_module_name.' >> '.$child_title;
    //                     $child_text = $child_name;
    //                     $child_level = $child['level'];
    //                     $child_viewType = $child['viewType'];
    //                     $child_iconCls = 'x-fa fa-angle-double-right';//$child['iconCls'];
    //                     $child_route = $child['routeId'];
    //                     $child_order_no = $child['order_no'];
    //                     $child_is_menu = $child['is_menu'];
    //                     $child_is_disabled = $child['is_disabled'];
    //                     $child_parent_id = $child['parent_id'];
    //                     $child_workflow_id = $child['workflow_id'];
    //                     $child_access_level = $this->getMenuAccessLevel($child_id);

    //                     if ($id == 254) {//online applications
    //                         //$child_title = $child_name . ' Online Applications-' . $child_name;
    //                     }

    //                     $menus .= '{';
    //                     $menus .= '"text": "' . $child_text . '",';
    //                     $menus .= '"name": "' . $child_name . '",';
    //                     $menus .= '"tab_title": "' . $child_title . '",';
    //                     $menus .= '"module_name": "' . $module_name . '",';
    //                     $menus .= '"iconCls": "' . $child_iconCls . '",';
    //                     $menus .= '"menu_id": "' . $child_id . '",';
    //                     $menus .= '"id": "' . $child_id . '",';
    //                     $menus .= '"access_level": "' . $child_access_level . '",';
    //                     $menus .= '"viewType": "' . $child_viewType . '",';
    //                     $menus .= '"routeId": "' . $child_route . '",';
    //                     $menus .= '"level": "' . $child_level . '",';
    //                     $menus .= '"order_no": "' . $child_order_no . '",';
    //                     $menus .= '"is_menu": "' . $child_is_menu . '",';
    //                     $menus .= '"is_disabled": "' . $child_is_disabled . '",';
    //                     $menus .= '"workflow_id": "' . $child_workflow_id . '",';
    //                     $menus .= '"parent_id": ' . $child_parent_id . ',';
    //                     //level 2 menu items
    //                     $grandchildren = $this->getSystemMenuItem(2, $child_id);
    //                     if (count($grandchildren) > 0) {
    //                         $menus .= '"selectable": false,';
    //                         $grandchildren_count = count($grandchildren);
    //                         $grandchildren_counter = 0;
    //                         $menus .= '"children": [';
    //                         foreach ($grandchildren as $grandchild) {
    //                             $grandchildren_counter++;
    //                             $grandchild_id = $grandchild['id'];
    //                             $grandchild_name = $grandchild['name'];
    //                             $grandchild_tab_title = $grandchild['tab_title'];
    //                             $grandchild_text = $grandchild_name;
    //                             $grandchild_level = $grandchild['level'];
    //                             $grandchild_viewType = $grandchild['viewType'];
    //                             $grandchild_iconCls = 'x-fa fa-arrow-circle-right';//$grandchild['iconCls'];
    //                             $grandchild_route = $grandchild['routeId'];
    //                             $grandchild_order_no = $grandchild['order_no'];
    //                             $grandchild_is_menu = $grandchild['is_menu'];
    //                             $grandchild_is_disabled = $grandchild['is_disabled'];
    //                             $grandchild_parent_id = $child['parent_id'];
    //                             $grandchild_child_id = $grandchild['parent_id'];
    //                             $grandchild_workflow_id = $grandchild['workflow_id'];
    //                             $grandchild_access_level = $this->getMenuAccessLevel($grandchild_id);

    //                             if ($id == 254) {//online applications
    //                                 //$grandchild_tab_title = $child_name . ' Online Applications-' . $grandchild_name;
    //                             }
    //                             if ($id == 182) {//Registration module
    //                                 //$grandchild_tab_title = $child_name . ' Registration-' . $grandchild_name;
    //                             }
    //                             if ($child_id == 277) {//GMP module
    //                                 //$grandchild_tab_title = 'GMP-' . $grandchild_name;
    //                             }
    //                             if ($child_id == 327) {//PMS module
    //                                 //$grandchild_tab_title = 'PMS-' . $grandchild_name;
    //                             }

    //                             $menus .= '{';
    //                             $menus .= '"text": "' . $grandchild_text . '",';
    //                             $menus .= '"name": "' . $grandchild_name . '",';
    //                             $menus .= '"tab_title": "' . $grandchild_tab_title . '",';
    //                             $menus .= '"module_name": "' . $module_name . '",';
    //                             $menus .= '"iconCls": "' . $grandchild_iconCls . '",';
    //                             $menus .= '"menu_id": "' . $grandchild_id . '",';
    //                             $menus .= '"id": "' . $grandchild_id . '",';
    //                             $menus .= '"access_level": "' . $grandchild_access_level . '",';
    //                             $menus .= '"viewType": "' . $grandchild_viewType . '",';
    //                             $menus .= '"routeId": "' . $grandchild_route . '",';
    //                             $menus .= '"level": "' . $grandchild_level . '",';
    //                             $menus .= '"order_no": "' . $grandchild_order_no . '",';
    //                             $menus .= '"is_menu": "' . $grandchild_is_menu . '",';
    //                             $menus .= '"is_disabled": "' . $grandchild_is_disabled . '",';
    //                             $menus .= '"parent_id": ' . $grandchild_parent_id . ',';
    //                             $menus .= '"child_id": ' . $grandchild_child_id . ',';
    //                             $menus .= '"workflow_id": "' . $grandchild_workflow_id . '",';
    //                             $menus .= '"leaf": true';

    //                             if ($grandchildren_counter == $grandchildren_count) {
    //                                 //Last Child in this level. Level=2
    //                                 $menus .= '}';
    //                             } else {
    //                                 $menus .= '},';
    //                             }
    //                         }
    //                         $menus .= ']';
    //                     } else {
    //                         $menus .= '"leaf": true';
    //                     }
    //                     if ($children_counter == $children_count) {
    //                         //Last Child in this level. Level=1
    //                         $menus .= '}';
    //                     } else {
    //                         $menus .= '},';
    //                     }
    //                 }
    //                 $menus .= ']';
    //             } else {
    //                 $menus .= '"leaf": true';
    //             }
    //             if ($menu_counter == $menu_count) {
    //                 $menus .= '}';
    //             } else {
    //                 $menus .= '},';
    //             }
    //         }
    //     }
    //     $menus .= ']';
    //     echo $menus;
    // }
    public function masterLoop(Request $req){
        $menus = '[';
        $row = $this->getSystemMenuItem(0, 0);
        if (count($row)) {
            $menu_count = count($row);
            $menu_counter = 0;

            foreach ($row as $item) {
                $id = $item['id'];
                $name = $item['name'];
                $tab_title = $item['tab_title'];
                $parent_module_name=$tab_title;
                $text = $name;
                $level = $item['level'];
                $parent_id = $item['parent_id'];
                $child_id = $item['parent_id'];
                $viewType = $item['viewType'];
                $iconCls = $item['iconCls'];
                $routeId = $item['routeId'];
                $order_no = $item['order_no'];
                $is_menu = $item['is_menu'];
                $is_disabled = $item['is_disabled'];
                $workflow_id = $item['workflow_id'];
                $parameter_id = $item['parameter_id'];
                $access_level = $this->getMenuAccessLevel($id);

                $menus .= '{';
                $menus .= '"text": "' . $text . '",';
                $menus .= '"name": "' . $name . '",';
                $menus .= '"tab_title": "' . $tab_title . '",';
                $menus .= '"module_name": "' . $parent_module_name . '",';
                $menus .= '"iconCls": "' . $iconCls . '",';
                $menus .= '"menu_id": "' . $id . '",';
                $menus .= '"id": "' . $id . '",';
                $menus .= '"access_level": "' . $access_level . '",';
                $menus .= '"viewType": "' . $viewType . '",';
                $menus .= '"routeId": "' . $routeId . '",';
                $menus .= '"level": "' . $level . '",';
                $menus .= '"order_no": "' . $order_no . '",';
                $menus .= '"is_menu": "' . $is_menu . '",';
                $menus .= '"workflow_id": "' . $workflow_id . '",';
                $menus .= '"is_disabled": "' . $is_disabled . '",';
                $menus .= '"parameter_id": "' . $parameter_id . '",';
                //check children
                $res = $this->getMastersChildren($id);
                $menus .= $res;
                if($menu_counter == $menu_count){
                     $menus .= ']';
                }
            }
        }
        return $menus;
    }
    public function getMastersChildren($id)
    {
        $row = $this->getSystemMenuItem(0, $id);
        $menus='';

        if (count($row)) {
            $menu_count = count($row);
            $menu_counter = 0;

            foreach ($row as $child) {
                $menu_counter++;
                $menus .= '"selectable": false,';
                $menus .= '"children": [';
                $child_id = $child['id'];
                $child_name = $child['name'];
                $child_title = $child['tab_title'];
                $module_name= $child_title;
                $child_text = $child_name;
                $child_level = $child['level'];
                $child_viewType = $child['viewType'];
                $child_iconCls = 'x-fa fa-angle-double-right';//$child['iconCls'];
                $child_route = $child['routeId'];
                $child_order_no = $child['order_no'];
                $child_is_menu = $child['is_menu'];
                $child_is_disabled = $child['is_disabled'];
                $child_parent_id = $child['parent_id'];
                $child_workflow_id = $child['workflow_id'];
                $child_parameter_id = $child['parameter_id'];
                $child_access_level = $this->getMenuAccessLevel($child_id);

                if ($id == 254) {//online applications
                    //$child_title = $child_name . ' Online Applications-' . $child_name;
                }

                $menus .= '{';
                $menus .= '"text": "' . $child_text . '",';
                $menus .= '"name": "' . $child_name . '",';
                $menus .= '"tab_title": "' . $child_title . '",';
                $menus .= '"module_name": "' . $module_name . '",';
                $menus .= '"iconCls": "' . $child_iconCls . '",';
                $menus .= '"menu_id": "' . $child_id . '",';
                $menus .= '"id": "' . $child_id . '",';
                $menus .= '"access_level": "' . $child_access_level . '",';
                $menus .= '"viewType": "' . $child_viewType . '",';
                $menus .= '"routeId": "' . $child_route . '",';
                $menus .= '"level": "' . $child_level . '",';
                $menus .= '"order_no": "' . $child_order_no . '",';
                $menus .= '"is_menu": "' . $child_is_menu . '",';
                $menus .= '"is_disabled": "' . $child_is_disabled . '",';
                $menus .= '"workflow_id": "' . $child_workflow_id . '",';
                $menus .= '"parameter_id": "' . $child_parameter_id . '",';
                $menus .= '"parent_id": ' . $child_parent_id . ',';

                if($this->hasGrandies($child_id)){
                    $this->getMastersChildren($child_id);
                }else{
                    if($menu_counter == $menu_count){
                        $menus .= '}';
                    }
                    else if($menu_counter == 0){
                        $menus .= '},';
                    }else{
                        $menus .= '},';
                    }
               }
            }
            $menus .= '},';
            return $menus;
        }else{
            return  '},';
        }
    }
    public function hasGrandies($id)
    {
        $count = DB::table('par_menus')->where('parent_id', $id)->count();
        
        if($count > 0){
            return true;
        }else{ 
            return false;
        }
    }
public function getSystemNavigationMenuItems(Request $request)
    {
        $row = $this->getSystemMenuItem(0, 0);
        $menus = '[';
        if (count($row)) {
            $menu_count = count($row);
            $menu_counter = 0;

            foreach ($row as $item) {
                $menu_counter++;
                $id = $item['id'];
                $name = $item['name'];
                $tab_title = $item['tab_title'];
                $parent_module_name=$tab_title;
                $text = $name;
                $level = $item['level'];
                $parent_id = $item['parent_id'];
                $child_id = $item['parent_id'];
                $viewType = $item['viewType'];
                $iconCls = $item['iconCls'];
                $routeId = $item['routeId'];
                $order_no = $item['order_no'];
                $is_menu = $item['is_menu'];
                $is_disabled = $item['is_disabled'];
                $workflow_id = $item['workflow_id'];
                $parameter_id =  $item['parameter_id'];
                $access_level = $this->getMenuAccessLevel($id);

                $menus .= '{';
                $menus .= '"text": "' . $text . '",';
                $menus .= '"name": "' . $name . '",';
                $menus .= '"tab_title": "' . $tab_title . '",';
                $menus .= '"module_name": "' . $parent_module_name . '",';
                $menus .= '"iconCls": "' . $iconCls . '",';
                $menus .= '"menu_id": "' . $id . '",';
                $menus .= '"id": "' . $id . '",';
                $menus .= '"access_level": "' . $access_level . '",';
                $menus .= '"viewType": "' . $viewType . '",';
                $menus .= '"routeId": "' . $routeId . '",';
                $menus .= '"level": "' . $level . '",';
                $menus .= '"order_no": "' . $order_no . '",';
                $menus .= '"is_menu": "' . $is_menu . '",';
                $menus .= '"workflow_id": "' . $workflow_id . '",';
                $menus .= '"is_disabled": "' . $is_disabled . '",';
                $menus .= '"parameter_id": "' . $parameter_id . '",';
                $children = $this->getSystemMenuItem(1, $id);
                if (count($children) > 0) {
                    $menus .= '"selectable": false,';
                    $children_count = count($children);
                    $children_counter = 0;
                    $menus .= '"children": [';
                    foreach ($children as $child) {
                        $children_counter++;
                        $child_id = $child['id'];
                        $child_name = $child['name'];
                        $child_title = $child['tab_title'];
                        $module_name=$parent_module_name.' >> '.$child_title;
                        $child_text = $child_name;
                        $child_level = $child['level'];
                        $child_viewType = $child['viewType'];
                        $child_iconCls = 'x-fa fa-angle-double-right';//$child['iconCls'];
                        $child_route = $child['routeId'];
                        $child_order_no = $child['order_no'];
                        $child_is_menu = $child['is_menu'];
                        $child_is_disabled = $child['is_disabled'];
                        $child_parent_id = $child['parent_id'];
                        $child_workflow_id = $child['workflow_id'];
                        $child_parameter_id = $child['parameter_id'];
                        $child_access_level = $this->getMenuAccessLevel($child_id);

                        if ($id == 254) {//online applications
                            //$child_title = $child_name . ' Online Applications-' . $child_name;
                        }

                        $menus .= '{';
                        $menus .= '"text": "' . $child_text . '",';
                        $menus .= '"name": "' . $child_name . '",';
                        $menus .= '"tab_title": "' . $child_title . '",';
                        $menus .= '"module_name": "' . $module_name . '",';
                        $menus .= '"iconCls": "' . $child_iconCls . '",';
                        $menus .= '"menu_id": "' . $child_id . '",';
                        $menus .= '"id": "' . $child_id . '",';
                        $menus .= '"access_level": "' . $child_access_level . '",';
                        $menus .= '"viewType": "' . $child_viewType . '",';
                        $menus .= '"routeId": "' . $child_route . '",';
                        $menus .= '"level": "' . $child_level . '",';
                        $menus .= '"order_no": "' . $child_order_no . '",';
                        $menus .= '"is_menu": "' . $child_is_menu . '",';
                        $menus .= '"is_disabled": "' . $child_is_disabled . '",';
                        $menus .= '"workflow_id": "' . $child_workflow_id . '",';
                        $menus .= '"parameter_id": "' . $child_parameter_id . '",';
                        $menus .= '"parent_id": ' . $child_parent_id . ',';
                        //level 2 menu items
                        $grandchildren = $this->getSystemMenuItem(2, $child_id);
                        if (count($grandchildren) > 0) {
                            $menus .= '"selectable": false,';
                            $grandchildren_count = count($grandchildren);
                            $grandchildren_counter = 0;
                            $menus .= '"children": [';
                            foreach ($grandchildren as $grandchild) {
                                $grandchildren_counter++;
                                $grandchild_id = $grandchild['id'];
                                $grandchild_name = $grandchild['name'];
                                $grandchild_tab_title = $grandchild['tab_title'];
                                $grandchild_text = $grandchild_name;
                                $grandchild_level = $grandchild['level'];
                                $grandchild_viewType = $grandchild['viewType'];
                                $grandchild_iconCls = 'x-fa fa-arrow-circle-right';//$grandchild['iconCls'];
                                $grandchild_route = $grandchild['routeId'];
                                $grandchild_order_no = $grandchild['order_no'];
                                $grandchild_is_menu = $grandchild['is_menu'];
                                $grandchild_is_disabled = $grandchild['is_disabled'];
                                $grandchild_parent_id = $child['parent_id'];
                                $grandchild_child_id = $grandchild['parent_id'];
                                $grandchild_workflow_id = $grandchild['workflow_id'];
                                $grandchild_parameter_id = $grandchild['parameter_id'];
                                $grandchild_access_level = $this->getMenuAccessLevel($grandchild_id);

                                if ($id == 254) {//online applications
                                    //$grandchild_tab_title = $child_name . ' Online Applications-' . $grandchild_name;
                                }
                                if ($id == 182) {//Registration module
                                    //$grandchild_tab_title = $child_name . ' Registration-' . $grandchild_name;
                                }
                                if ($child_id == 277) {//GMP module
                                    //$grandchild_tab_title = 'GMP-' . $grandchild_name;
                                }
                                if ($child_id == 327) {//PMS module
                                    //$grandchild_tab_title = 'PMS-' . $grandchild_name;
                                }

                                $menus .= '{';
                                $menus .= '"text": "' . $grandchild_text . '",';
                                $menus .= '"name": "' . $grandchild_name . '",';
                                $menus .= '"tab_title": "' . $grandchild_tab_title . '",';
                                $menus .= '"module_name": "' . $module_name . '",';
                                $menus .= '"iconCls": "' . $grandchild_iconCls . '",';
                                $menus .= '"menu_id": "' . $grandchild_id . '",';
                                $menus .= '"id": "' . $grandchild_id . '",';
                                $menus .= '"access_level": "' . $grandchild_access_level . '",';
                                $menus .= '"viewType": "' . $grandchild_viewType . '",';
                                $menus .= '"routeId": "' . $grandchild_route . '",';
                                $menus .= '"level": "' . $grandchild_level . '",';
                                $menus .= '"order_no": "' . $grandchild_order_no . '",';
                                $menus .= '"is_menu": "' . $grandchild_is_menu . '",';
                                $menus .= '"is_disabled": "' . $grandchild_is_disabled . '",';
                                $menus .= '"parent_id": ' . $grandchild_parent_id . ',';
                                $menus .= '"child_id": ' . $grandchild_child_id . ',';
                                $menus .= '"workflow_id": "' . $grandchild_workflow_id . '",';
                                $menus .= '"parameter_id": "' . $grandchild_parameter_id . '",';
                                $menus .= '"leaf": true';

                                if ($grandchildren_counter == $grandchildren_count) {
                                    //Last Child in this level. Level=2
                                    $menus .= '}';
                                } else {
                                    $menus .= '},';
                                }
                            }
                            $menus .= ']';
                        } else {
                            $menus .= '"leaf": true';
                        }
                        if ($children_counter == $children_count) {
                            //Last Child in this level. Level=1
                            $menus .= '}';
                        } else {
                            $menus .= '},';
                        }
                    }
                    $menus .= ']';
                } else {
                    $menus .= '"leaf": true';
                }
                if ($menu_counter == $menu_count) {
                    $menus .= '}';
                } else {
                    $menus .= '},';
                }
            }
        }
        $menus .= ']';
        echo $menus;
    }
    function getSystemMenuItem($level = 0, $parent_id = 0)
    {
        $where = array(
            'par_menus.level' => $level,
            'par_menus.is_menu' => 1
        );
        $user_id = \Auth::user()->id;
        $groups = getUserGroups($user_id);

        $belongsToSuperGroup = belongsToSuperGroup($groups);
        $qry = DB::table('par_menus')
            ->distinct()
            ->select('par_menus.*')
            ->where($where)
            ->where('par_menus.is_disabled', 0);//can be removed for a super user
        $qry = $parent_id == 0 ? $qry->orderBy('par_menus.order_no') : $qry->where('par_menus.parent_id', $parent_id)->orderBy('par_menus.order_no');
        $qry = $belongsToSuperGroup == true ? $qry->whereRaw("1=1") : $qry->join('tra_permissions', 'par_menus.id', '=', 'tra_permissions.menu_id')
            ->where('tra_permissions.status', 1)
            ->where('tra_permissions.accesslevel_id', '<>', 1)
            //->where('par_menus.is_disabled', 0)
            ->whereIn('tra_permissions.group_id', $groups);
        $menus = $qry->get();
        $menus = convertStdClassObjToArray($menus);
        return $menus;
    }

    public function getMenuAccessLevel($menu_id)
    {
        //first get his/her groups
        $user_id = \Auth::user()->id;
        $groups = getUserGroups($user_id);
        //check if this user belongs to the super user group...if so then should have system full access
        $belongsToSuperGroup = belongsToSuperGroup($groups);
        if ($belongsToSuperGroup == true) {
            $access_level = 4;
        } else {
            $results = DB::table('tra_permissions')
                ->select(DB::raw('max(accesslevel_id) as highestAccessLevel'))
                ->where('menu_id', $menu_id)
                ->whereIn('tra_permissions.group_id', $groups)
                ->value('highestAccessLevel');
            if (is_null($results)) {
                $access_level = 1;
            } else {
                $access_level = $results;
            }
        }
        return $access_level;
    }

    public function getParentMenus()
    {
        try {
            $parents = Menu::where('level', 0)->get()->toArray();
            $res = array(
                'success' => true,
                'results' => $parents,
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

    public function getChildMenus(Request $request)
    {
        $parent_id = $request->input('parent_id');
        try {
            $where = array(
                'level' => 1,
                'parent_id' => $parent_id
            );
            $parents = Menu::where($where)->get()->toArray();
            $res = array(
                'success' => true,
                'results' => $parents,
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

    public function saveMenuItem(Request $request)
    {
        $res = array();
        try {
            $user_id = \Auth::user()->id;
            $post_data = $request->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $level = $post_data['level'];
            $parent_id = $post_data['parent_id'];
            $child_id = $post_data['child_id'];

            if ($level > 1) {
                $parent_id = $child_id;
            }
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['skip']);
            unset($post_data['child_id']);
            unset($post_data['parent_id']);
            $table_data = $post_data;
            //add extra params
            $table_data['tab_title'] = $post_data['name'];
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $table_data['parent_id'] = $parent_id;
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

    public function deleteAdminRecord(Request $req)
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

    public function softDeleteAdminRecord(Request $req)
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

    public function undoAdminSoftDeletes(Request $req)
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

    public function getAdminParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\Administration\\Entities\\' . $model_name;
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

    public function getSystemUserGroups(Request $request)
    {
        $directorate_id = $request->input('directorate_id');
        $department_id = $request->input('department_id');
        $zone_id = $request->input('zone_id');
        try {
            $qry = DB::table('par_groups as t1')
                // ->join('par_directorates as t2', 't1.directorate_id', '=', 't2.id')
                // ->join('par_departments as t3', 't1.department_id', '=', 't3.id')
                // ->join('par_zones as t4', 't1.zone_id', '=', 't4.id')
                ->leftJoin('par_user_categories as t5', 't1.user_category_id', '=', 't5.id')
                ->leftJoin('par_externaluser_categories as t6', 't1.externaluser_category_id', '=', 't6.id')
                
                ->leftJoin('par_system_dashboards as t7', 't1.system_dashboard_id', '=', 't7.id')
                ->select('t1.*','t5.name as user_category','t6.name as externaluser_category','t7.name as system_dashboard');
            // if (isset($directorate_id) && $directorate_id != '') {
            //     $qry->where('t1.directorate_id', $directorate_id);
            // }
            // if (isset($department_id) && $department_id != '') {
            //     $qry->where('t1.department_id', $department_id);
            // }
            // if (isset($zone_id) && $zone_id != '') {
            //     $qry->where('t1.zone_id', $zone_id);
            // }
            $results = $qry->get();
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

    public function saveAdminCommonData(Request $req)
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

    public function getSystemRoles(Request $request)
    {
        $user_group = $request->input('user_group');
        $row = $this->getSystemRole(0, 0, $user_group);
        $roles = '{"roles": "."';
        $roles .= ',';
        $roles .= '"children": [';
        if (count($row)) {
            $menu_count = count($row);
            $menu_counter = 0;

            foreach ($row as $item) {
                $menu_counter++;
                $id = $item['menu_id'];
                $permission_id = $item['permission_id'];
                $name = aes_decrypt($item['menu_name']);
                $level = aes_decrypt($item['level_name']);
                $level_id = $item['level_id'];
                $iconCls = $item['iconCls'];

                $roles .= '{';
                $roles .= '"menu_id": ' . $id . ',';
                $roles .= '"permission_id": "' . $permission_id . '",';
                $roles .= '"menu_name": "' . $name . '",';
                $roles .= '"iconCls": "' . $iconCls . '",';
                $roles .= '"level_name": "' . $level . '",';
                $roles .= '"level_id": "' . $level_id . '",';

                $children = $this->getSystemRole(1, $id, $user_group);
                if (count($children) > 0) {
                    $children_count = count($children);
                    $children_counter = 0;
                    $roles .= '"expanded": false,';
                    //$roles.='"iconCls": "tree-parent",';
                    $roles .= '"children": [';
                    foreach ($children as $child) {
                        $children_counter++;
                        $child_id = $child['menu_id'];
                        $child_permission_id = $child['permission_id'];
                        $child_name = aes_decrypt($child['menu_name']);
                        $child_level = aes_decrypt($child['level_name']);
                        $child_level_id = $child['level_id'];
                        $child_iconCls = $item['iconCls'];

                        $roles .= '{';
                        $roles .= '"menu_id": ' . $child_id . ',';
                        $roles .= '"permission_id": "' . $child_permission_id . '",';
                        $roles .= '"menu_name": "' . $child_name . '",';
                        $roles .= '"level_name": "' . $child_level . '",';
                        $roles .= '"level_id": "' . $child_level_id . '",';
                        $roles .= '"iconCls": "' . $child_iconCls . '",';
                        //$menus.="leaf: true";
                        //level 2 menu items
                        $grandchildren = $this->getSystemRole(2, $child_id, $user_group);
                        if (count($grandchildren) > 0) {
                            $grandchildren_count = count($grandchildren);
                            $grandchildren_counter = 0;
                            $roles .= '"expanded": false,';
                            $roles .= '"iconCls": "tree-parent",';
                            $roles .= '"children": [';
                            foreach ($grandchildren as $grandchild) {
                                $grandchildren_counter++;
                                $grandchild_id = $grandchild['menu_id'];
                                $grand_permission_id = $grandchild['permission_id'];
                                $grandchild_name = aes_decrypt($grandchild['menu_name']);
                                $grandchild_level = aes_decrypt($grandchild['level_name']);
                                $grandchild_level_id = $grandchild['level_id'];
                                $grandchild_iconCls = $item['iconCls'];

                                $roles .= '{';
                                $roles .= '"menu_id": ' . $grandchild_id . ',';
                                $roles .= '"permission_id": "' . $grand_permission_id . '",';
                                $roles .= '"menu_name": "' . $grandchild_name . '",';
                                $roles .= '"level_name": "' . $grandchild_level . '",';
                                $roles .= '"level_id": "' . $grandchild_level_id . '",';
                                $roles .= '"iconCls": "' . $grandchild_iconCls . '",';
                                $roles .= '"leaf": true';

                                if ($grandchildren_counter == $grandchildren_count) {
                                    //Last Child in this level. Level=2
                                    $roles .= '}';
                                } else {
                                    $roles .= '},';
                                }
                            }
                            $roles .= '],';
                        } else {
                            $roles .= '"leaf": true';
                        }
                        if ($children_counter == $children_count) {
                            //Last Child in this level. Level=1
                            $roles .= '}';
                        } else {
                            $roles .= '},';
                        }
                    }
                    $roles .= '],';

                } else {
                    //$menus.="viewType: '".$viewType."',";
                    $roles .= '"leaf": true';
                }

                if ($menu_counter == $menu_count) {
                    $roles .= '}';
                } else {
                    $roles .= '},';
                }
            }
        }
        $roles .= ']}';
        return $roles;
    }

    function getSystemRole($level = 0, $parent_id = 0, $user_group)
    {
        $where = array(
            'par_menus.is_menu' => 1,
            'par_menus.is_disabled' => 0,
            'par_menus.level' => $level
        );
        $qry = DB::table('par_menus')
            ->select('par_menus.id as menu_id', 'par_menus.name as menu_name', 'par_accesslevels.name as level_name', 'par_accesslevels.id as level_id', 'tra_permissions.id as permission_id', 'par_menus.iconCls')
            ->leftJoin('tra_permissions', function ($join) use ($user_group) {
                $join->on('par_menus.id', '=', 'tra_permissions.menu_id')
                    ->on('tra_permissions.group_id', '=', DB::raw($user_group));
            })
            ->leftJoin('par_accesslevels', 'tra_permissions.accesslevel_id', '=', 'par_accesslevels.id')
            ->where($where);
        $qry = $parent_id == 0 ? $qry->orderBy('par_menus.order_no') : $qry->where('par_menus.parent_id', $parent_id)->orderBy('par_menus.order_no');
        $menus = $qry->get();
        $menus = json_decode(json_encode($menus), true);
        return $menus;
    }

    public function updateSystemNavigationAccessRoles(Request $req)
    {
        $group_id = $req->input('group_id');
        $menuPermission_id = $req->input('menuPermission_id');
        $menuLevel_id = $req->input('menuLevel_id');
        $menu_id = $req->input('menu_id');

        $res = array();
        $menuPermissions = array_filter(explode(',', $menuPermission_id));
        $menuLevels = array_filter(explode(',', $menuLevel_id));
        $menus = array_filter(explode(',', $menu_id));

        $count = count($menus);

        if ($count < 1) {
            $res = array(
                'success' => false,
                'message' => "Operation failed-->No record was changed for saving!!"
            );
        } else {
            DB::transaction(function () use ($count, $menuPermissions, $menuLevels, $menus, $group_id, &$res) {
                try {
                    //for menus
                    if ($count > 0) {
                        for ($i = 0; $i < $count; $i++) {
                            $params = array(
                                'group_id' => $group_id,
                                'menu_id' => $menus[$i],
                                'accesslevel_id' => $menuLevels[$i],
                                'status' => 1,
                                'created_by' => \Auth::user()->id,
                                'altered_by' => \Auth::user()->id
                            );
                            $parentmenus_id = $menus[$i];
                            $accesslevel_id = $menuLevels[$i];
                            
                            if (isset($menuPermissions[$i])) {
                                $menuPermission_id = $menuPermissions[$i];
                                $menuPermission = Permission::find($menuPermission_id);
                                if ($menuPermission) {
                                    $menuPermission->group_id = $group_id;
                                    $menuPermission->menu_id = $menus[$i];
                                    $menuPermission->accesslevel_id = $menuLevels[$i];
                                    $menuPermission->status = 1;
                                    $menuPermission->created_by = \Auth::user()->id;
                                    $menuPermission->save();
                                }
                            } else {
                                Permission::create($params);
                                
                            }
                            $this->saveChildMenuItem($group_id,$accesslevel_id,$parentmenus_id);
                        }
                    }
                    $res = array(
                        'success' => true,
                        'message' => "Access Roles updated successfully!"
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
            }, 5);
        }
        return response()->json($res);
    }
    function saveChildMenuItem($group_id,$accesslevel_id,$grandparentmenus_id){
        
            $records = DB::table('par_menus')->where('parent_id', $grandparentmenus_id)->get();
                                if(count($records) >0){
                                        foreach($records as $rec){
                                            $parentmenus_id = $rec->id;
                                                $permissions = array(
                                                    'group_id' => $group_id,
                                                    'menu_id' => $rec->id,
                                                    'accesslevel_id' => $accesslevel_id,
                                                    'status' => 1,
                                                    'created_by' => \Auth::user()->id,
                                                    'altered_by' => \Auth::user()->id
                                                );
                                                $check = DB::table('tra_permissions')
                                                                ->where(array('group_id' => $group_id,'menu_id' => $rec->id))
                                                    ->first();
                                                if(!$check){
                                                    DB::table('tra_permissions')->insert($permissions);
                                                }
                                                $this->saveGrandChildMenuItem($group_id,$accesslevel_id,$parentmenus_id);
                                        }
                                    
                                }
            
    }
    function saveGrandChildMenuItem($group_id,$accesslevel_id,$grandparentmenus_id){
        
            $records = DB::table('par_menus')->where('parent_id', $grandparentmenus_id)->get();
                                if(count($records) >0){
                                        foreach($records as $rec){
                                            $parentmenus_id = $rec->id;
                                                $permissions = array(
                                                    'group_id' => $group_id,
                                                    'menu_id' => $rec->id,
                                                    'accesslevel_id' => $accesslevel_id,
                                                    'status' => 1,
                                                    'created_by' => \Auth::user()->id,
                                                    'altered_by' => \Auth::user()->id
                                                );
                                                $check = DB::table('tra_permissions')
                                                                ->where(array('group_id' => $group_id,'menu_id' => $rec->id))
                                                    ->first();
                                                if(!$check){
                                                    DB::table('tra_permissions')->insert($permissions);
                                                }
                                                
                                        }
                                    
                                }
        
        
    }
    public function updateSystemPermissionAccessRoles(Request $req)
    {
        $group_id = $req->input('group_id');
        $processPermission_id = $req->input('processPermission_id');
        $processLevel_id = $req->input('processLevel_id');
        $process_id = $req->input('process_id');

        $res = array();
        $processPermissions = array_filter(explode(',', $processPermission_id));
        $processLevels = array_filter(explode(',', $processLevel_id));
        $processes = array_filter(explode(',', $process_id));

        $count2 = count($processes);

        if ($count2 < 1) {
            $res = array(
                'success' => false,
                'message' => "Operation failed-->No record was changed for saving!!"
            );
        } else {
            DB::transaction(function () use ($count2, $processPermissions, $processLevels, $processes, $group_id, &$res) {
                try {
                    //for menus processes
                    if ($count2 > 0) {
                        for ($j = 0; $j < $count2; $j++) {
                            $params = array(
                                'group_id' => $group_id,
                                'process_id' => $processes[$j],
                                'accesslevel_id' => $processLevels[$j],
                                'status' => 1,
                                'created_by' => \Auth::user()->id,
                                'altered_by' => \Auth::user()->id
                            );
                            if (isset($processPermissions[$j])) {
                                $processPermission_id = $processPermissions[$j];
                                $processPermission = ProcessesPermission::find($processPermission_id);
                                if ($processPermission) {
                                    $processPermission->group_id = $group_id;
                                    $processPermission->process_id = $processes[$j];
                                    $processPermission->accesslevel_id = $processLevels[$j];
                                    $processPermission->status = 1;
                                    $processPermission->created_by = \Auth::user()->id;
                                    $processPermission->save();
                                }
                            } else {
                                ProcessesPermission::create($params);
                            }
                        }
                    }
                    $res = array(
                        'success' => true,
                        'message' => "Access Roles updated successfully!"
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
            }, 5);
        }
        return response()->json($res);
    }

    function getMenuProcessesRoles(Request $request)
    {
        $user_group = $request->input('user_group');
        $qry = DB::table('par_menuitems_processes as t1')
            ->leftJoin('tra_processes_permissions as t2', function ($join) use ($user_group) {
                $join->on('t1.id', '=', 't2.process_id')
                    ->on('t2.group_id', '=', DB::raw($user_group));
            })
            ->leftJoin('par_processes_accesslevels as t3', 't2.accesslevel_id', '=', 't3.id')
            ->select('t1.id', 't1.name', 't1.description', 't1.id as process_id', 't1.identifier', 't3.name as level_name', 't3.id as level_id', 't2.id as permission_id')
            ->orderBy('t1.id');
        $menus = $qry->get();
        $menus = json_decode(json_encode($menus), true);
        return $menus;
    }

    public function removeSelectedUsersFromGroup(Request $request)
    {
        $selected = $request->input('selected');
        $group_id = $request->input('group_id');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = DB::table('tra_user_group as t1')
                ->select(DB::raw("t1.*,$user_id as deletion_by"))
                ->where('group_id', $group_id)
                ->whereIn('user_id', $selected_ids)
                ->get();
            $params = convertStdClassObjToArray($params);
            DB::table('tra_user_group_log')
                ->insert($params);
            DB::table('tra_user_group')
                ->where('group_id', $group_id)
                ->whereIn('user_id', $selected_ids)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Users removed successfully!!'
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

     public function addSelectedUsersFromGroup(Request $request)
    {
        $selected = $request->input('selected');
        $group_id = $request->input('group_id');
        $selected_ids = json_decode($selected);
        $user = $this->user_id;
        try {
            $set_users = DB::table('tra_user_group as t1')
                    ->where('group_id', $group_id)
                    ->whereIn('user_id', $selected_ids)
                    ->select('user_id')
                    ->get();

            $mapped_users[] = Arr::pluck($set_users, 'user_id');
            $userArray = call_user_func_array('array_merge',$mapped_users);

            foreach ($selected_ids as $id) {


                 if(!in_array( $id, $userArray )){
                    $res = insertRecord('tra_user_group', ['user_id'=>$id, 'group_id'=>$group_id], $user);
                 }
            }

            $res = array(
                'success' => true,
                'message' => 'Users added successfully!!'
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

    public function getFormFields(Request $request)
    {
        $form_id = $request->input('form_id');
        try {
            $qry = DB::table('par_key_form_fields as t1')
                ->join('par_form_field_types as t2', 't1.field_type_id', '=', 't2.id')
                ->where('t1.form_id', $form_id)
                ->select('t1.*', 't2.name as field_type');
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

    public function mapGroupToStage(Request $req){
        $selected = $req->input('selected');
        $group_id = $req->input('group_id');
        $workflow_id = $req->input('workflow_id');
        $stage_idArray = json_decode($selected);
        $user = $this->user_id;

        DB::beginTransaction();
        try{
            // $mapped_groups = DB::table('wf_stages_groups as t1')
            //         ->where('group_id', $group_id)
            //         ->whereIn('stage_id', $stage_idArray)
            //         ->select('stage_id')
            //         ->get();
          
           //clear current setup
            DB::table('wf_stages_groups as t1')
                ->join('wf_workflow_stages as t2','t1.stage_id','t2.id')
                ->where(array('group_id'=>$group_id,'workflow_id'=>$workflow_id))
                ->delete();
            
            //$mapped_stage[] = Arr::pluck($mapped_groups, 'stage_id');
            //$mappedstageIds = call_user_func_array('array_merge',$mapped_stage);

            foreach ($stage_idArray as $stage_id) {

                  //  if(!in_array( $stage_id, $mappedstageIds)){
                       
                         $res = insertRecord('wf_stages_groups', ['stage_id'=>$stage_id, 'group_id'=>$group_id], $user);
                  //  }
                }

            $res = array(
                    'success' => true,
                    'message' => 'Group Mapped to stage(s) successfully!!'
                );
        DB::commit();
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
    return json_encode($res);
    }
    public function getApplicationAssignmentProcessList(Request $req){

        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $group_id = $req->input('group_id');

        try {
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('modules as t2', 't1.module_id', '=', 't2.id')
                ->leftJoin('sub_modules as t3', 't1.sub_module_id', '=', 't3.id')
                ->leftJoin('par_sections as t4', 't1.section_id', '=', 't4.id')
                ->leftJoin('par_application_assignment_setup as t5', function ($join) use ($group_id) {
                        $join->on('t1.id', '=', 't5.process_id')
                            ->on('t5.group_id', '=', DB::raw($group_id));
                    })
                ->select('t1.name as process_name','t1.id as process_id', 't2.name as module', 't3.name as submodule', 't4.name as section','t5.id as has_access');
           
                
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
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
   public function mapApplicationAssignmentSetup(Request $req){
        $selected = $req->input('selected');
        $group_id = $req->input('group_id');
        $process_idArray = json_decode($selected);
        $user = $this->user_id;

        DB::beginTransaction();
        try{
           //clear current setup
            DB::table('par_application_assignment_setup')
                ->where('group_id',$group_id)
                ->delete();

            foreach ($process_idArray as $process_id) {
                       
                $res = insertRecord('par_application_assignment_setup', ['process_id'=>$process_id, 'group_id'=>$group_id], $user);
                  
                }

            $res = array(
                    'success' => true,
                    'message' => 'Group assaigned successfully!!'
                );
        DB::commit();
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
    return json_encode($res);
   }
   public function getTablescolumns(Request $req)
   {
    $table_name = $req->table_name;
    $col = array();
    if($table_name != ''){
        $columns = DB::getSchemaBuilder()->getColumnListing($table_name);
        foreach ($columns as $column) {
           $col[]=['column_name'=>$column];
        }
        return $col;
    }else{
        return [];
       
   }
    }
    public function saveParameterConfig(Request $req)
    {
    try{
        $id = $req->id;
        //$menu_id = $req->menu_id;
        $param_title = $req->param_title;
        $param_name= $req->param_name;
        $table_name= $req->table_name;
        $no_joins= $req->no_joins;
       
        DB::beginTransaction();
        //insert the defination
          $user_id = \Auth::user()->id;
          $table_data['created_on'] = Carbon::now();
          $table_data['created_by'] = $user_id;
          //$table_data['menu_id'] = $menu_id;
          $table_data['param_title'] = $param_title;
          $table_data['param_name'] = $param_name;
          $table_data['table_name'] = $table_name;
          $table_data['no_joins'] = $no_joins;
          $param_def_table_name = 'par_parameter_definations';
          $where = array(
                            'id' => $id
                        );

            if (isset($id) && $id != "") {
                if (recordExists($param_def_table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($param_def_table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($param_def_table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $res = insertRecord($param_def_table_name, $table_data, $user_id);
            }

        if($res['success']){
            $param_id = $res['record_id'];
            $next_is_child = false;
             //delete existing trace of the param
            DB::table('par_parameter_join_tables')->where('param_id',$param_id)->delete();
            for ($i = $no_joins-1; $i >= 0; $i--) { 

                $join_type_id = $req->input('join_type_id'.$i);
                $join_table_name = $req->input('join_table_name'.$i);
                $join_column_name = $req->input('join_column_name'.$i);
                $param_column_name = $req->input('param_column_name'.$i);
                $table_label = $req->input('table_label'.$i);
                $join_disp_column_name = $req->input('join_disp_column_name'.$i);
                $is_parent = $req->input('is_parent'.$i);
                $link_column_name = $req->input('link_column_name'.$i);
                if($next_is_child){
                    $is_child = 1;
                }else{
                    $is_child = 0;
                }
                if($is_parent == 1){
                    $next_is_child = true;
                }else{
                    $next_is_child = false;
                }

                //insert tables to depedent
                DB::table('par_parameter_join_tables')->insert(array(
                    'param_id'=>$param_id,
                    'join_type_id'=>$join_type_id,
                    'join_table_name'=>$join_table_name,
                    'join_column_name'=>$join_column_name,
                    'join_disp_column_name'=>$join_disp_column_name,
                    'param_column_name'=>$param_column_name,
                    'table_label'=>$table_label,
                    'created_on'=>Carbon::now(),
                    'created_by'=>$user_id,
                    'is_parent'=>$is_parent,
                    'is_child'=>$is_child,
                    'link_column_name'=>$link_column_name
                ));
          }
        }
         $res = array(
                'success' => true,
                'message' => 'Saved successfully'
            );
       
     DB::commit();
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
    return json_encode($res);
   }
   public function getParameterConfig(Request $req)
   {
       $def_id = $req->input('def_id');
        try {
            $param = DB::table('par_parameter_definations')->where('id',$def_id)->first();
            $param_joins = DB::table('par_parameter_join_tables')->where('param_id',$param->id)->get();
            $no_joins = $param->no_joins;
            $results = array();
            $i = 0;
            foreach ($param_joins as $param_join) {
                $results['join_type_id'.$i] = $param_join->join_type_id;
                $results['join_table_name'.$i] = $param_join->join_table_name;
                $results['join_column_name'.$i] = $param_join->join_column_name;
                $results['param_column_name'.$i] = $param_join->param_column_name;
                $results['join_disp_column_name'.$i] = $param_join->join_disp_column_name;
                $results['table_label'.$i] = $param_join->table_label;
                $i++;
            }
           $results['id'] = $param->id;
          // $results['def_id'] = $param->id;
           $results['param_title'] = $param->param_title;
           $results['param_name'] = $param->param_name;
           $results['table_name'] = $param->table_name;
           $results['no_joins'] = $param->no_joins;

            $res = array(
                'success' => true,
                'results' => $results,
                'no_joins' => $no_joins,
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
   public function checkParamMenuDefination(Request $req)
   {
       $menu_id = $req->menu_id;

       try{
        $param_def = DB::table('par_parameter_definations')->where('menu_id',$menu_id)->count();
        if($param_def > 0){
            $is_defined = 1;
        }else{
            $is_defined = 0;
        }
        $res = array(
                'success' => true,
                'is_defined' => $is_defined,
                'message' => 'All is well'
            );
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
        return response()->json($res);
   }
   
   
   
}
