/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.ServiceDeliveryTimelineOverdueGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'servicedeliverytimelineoverduegrid',
    controller: 'dashboardvctr',
   
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_receipting_stage =  record.get('is_receipting_stage'),
                application_status_id =  record.get('application_status_id');
          // if (is_receipting_stage == 1) {
                if(application_status_id == 10) {
                    return 'invalid-row';
                } else if(application_status_id == 11) {
                    return 'valid-row';
                }

          // }
        }
    },
    margin: 3,
    tbar: [{
        xtype: 'tbspacer',
        width: 5
     }, {
        xtype: 'combo',
        emptyText: 'SECTION',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'MODULE',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    sub_module = grid.down('combo[name=sub_module_id]'),
                    sub_module_str = sub_module.getStore();
                sub_module_str.removeAll();
                sub_module_str.load({params: {module_id: newVal}});
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'SUB MODULE',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule'
                        }
                    }
                },
                isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    workflow_stage = grid.down('combo[name=workflow_stage_id]'),
                    workflow_stage_str = workflow_stage.getStore();
                workflow_stage_str.removeAll();
                workflow_stage_str.load({
                    params: {
                        module_id: module_id,
                        sub_module_id: newVal,
                        section_id: section_id
                    }
                });
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'WORKFLOW STAGE',
        valueField: 'id',
        name: 'workflow_stage_id',
        displayField: 'name',
        queryMode: 'local',
        flex: 1,
        forceSelection: true,
        width: 150,
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'workflow/getProcessWorkflowStages'
                    }
                },
                isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                flex: 1,
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },{
        xtype: 'combo',
        emptyText: 'Fast Track Option',
        valueField: 'id',
        name: 'fasttrack_option_id',
        displayField: 'name',
        queryMode: 'local',
        flex: 1,
        forceSelection: true,
        width: 150,
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_fasttrack_options',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                 grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                flex: 1,
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },{
        xtype: 'button',
        text: 'Filter',
        ui: 'soft-green',
        iconCls: 'x-fa fa-search',
        handler: function(btn) {
          var grid = btn.up('grid');
              grid.getStore().load();
        },
    },{
        xtype: 'button',
        text: 'Clear',
        ui: 'soft-red',
        iconCls: 'x-fa fa-close',
        handler: function(btn) {
          var grid = btn.up('grid'),
                gridStr = grid.getStore();
                grid.down('combo[name=section_id]').clearValue();
                grid.down('combo[name=module_id]').clearValue();
                grid.down('combo[name=sub_module_id]').clearValue();
                grid.down('combo[name=workflow_stage_id]').clearValue();
                grid.down('combo[name=fasttrack_option_id]').clearValue();
                gridStr.load();
        },
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'overduetraystr',
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                    workflow_stage_id = grid.down('combo[name=workflow_stage_id]').getValue(),
                    application_status_id=grid.down('combo[name=application_status_id]').getValue();
                    fasttrack_option_id = grid.down('combo[name=fasttrack_option_id]').clearValue();
                store.getProxy().extraParams = {
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    workflow_stage_id: workflow_stage_id,
                    application_status_id:application_status_id,
                    fasttrack_option_id:fasttrack_option_id
                };
            }
        },
        '->','->',{
          xtype: 'checkbox',
          name:'enable_grouping',
          boxLabel:'Enable Grouping',
          listeners:{
                change:function(chk,value){
                        var grid = chk.up('grid');
                            grouping = grid.getView().findFeature('grouping');
                            if(value == 1){
                                grouping.enable();
                            }
                            else{
                                grouping.disable();
                            }
                }
          }
        },{
            xtype: 'button',
            text: 'View Fast Track Applications',
            type: 1,
            is_internaluser: 1,
            ui:'soft-red',
            iconCls: 'x-fa fa-print',
            handler: 'funcPreviewFasttrackApplications'
        },
        {
            xtype: 'button',
            text: 'Export Intray',
            type: 1,
            is_internaluser: 1,
            ui:'soft-green',
            iconCls: 'x-fa fa-print',
            handler: 'exportDashboard'
        }
    ],
    listeners: {
        afterrender:function(grid){
            var gridStr = grid.getStore();
                gridStr.load();
        },
        itemdblclick: 'onIntrayItemDblClick'
    },
    features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '{[values.rows[0].data.workflow_stage]}, Sub-Process: {[values.rows[0].data.sub_module]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'Intray',
    store: 'overduetraystr',
    
    columns: [
        {
            xtype: 'gridcolumn',
            width: 80,
            renderer: function (val, meta, record) {
                var isRead = record.get('isRead');
                if (isRead == 1 || isRead === 1) {
                    meta.tdStyle = 'color:white;background-color:green';
                    return 'Reviewed';
                } else {
                    meta.tdStyle = 'color:white;background-color:red';
                    return 'New Submission';
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Urgency',
            dataIndex: 'urgency_name',
            width:80,
            tdCls: 'wrap',
            renderer: function (val, meta, record) {
                if(val == 'Normal'){
                    meta.tdStyle = 'color:white;background-color:green';
                    return val;
                }
                else{
                    meta.tdStyle = 'color:white;background-color:red';
return val;
                }


            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Delivery Timeline (Status)',
            dataIndex: 'deliverytimeline_reminder',
            width:100,
            tdCls: 'wrap',
            renderer: function (val, meta, record) {
                var servicedelivery_timeline = record.get('servicedelivery_timeline');
                var time_span = record.get('time_span');
                if(servicedelivery_timeline >0){
                    if(val < 1){
                        meta.tdStyle = 'color:white;background-color:red';
                        return ' Application OverDue for ' +val +'(days)';
                    }else if (val < 3) {
                        meta.tdStyle = 'color:white;background-color:blue';
                        
                        return ' Application Due in ' +val +'(days)';
                    } else {
                        meta.tdStyle = 'color:white;background-color:green';
                        return 'Within Delivery Timeline';
                    }

                }
                else{
                    meta.tdStyle = 'color:white;background-color:green';
                    return 'Within Delivery Timeline Span ('+time_span+')';

                }
               
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Tracking No',
            dataIndex: 'tracking_no',
            width: 180,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Reference',
            dataIndex: 'reference_no',
            width: 180,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        }, {
            xtype: 'gridcolumn',
            text: 'Applicant',
            dataIndex: 'applicant_name',
            width: 200,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        }, {
            xtype: 'gridcolumn',
            text: 'Premises Name',
            dataIndex: 'premises_name',
            width: 200,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },{
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'process_name',
            width:100,
            tdCls: 'wrap-text',
            hidden: true
        }, {
            xtype: 'gridcolumn',
            text: 'Previous Stage',
            dataIndex: 'prev_stage',
            width: 100,
            hidden: true,
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Current Stage',
            dataIndex: 'workflow_stage',
            width: 100,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            filter: {
                xtype: 'textfield'
            },
            width: 150,
            tdCls: 'wrap'            
        },
        {
            xtype: 'gridcolumn',
            text: 'Admin Owner',
            dataIndex: 'to_user',
            width: 150,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },{
            xtype: 'gridcolumn',
            text: 'Remarks/Comment',
            dataIndex: 'remarks',
            with: 150,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            width: 100,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },{
            xtype: 'gridcolumn',
            text: 'Expected Start Date',
            dataIndex: 'expected_start_date',
            width: 100,
            hidden: true,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },{
            xtype: 'gridcolumn',
            text: 'Expected End Date',
            dataIndex: 'expected_end_date',
            width: 100,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            xtype: 'gridcolumn',
            text: 'App Status',
            dataIndex: 'application_status',
            width: 100,
            tdCls: 'wrap',
            filter: {
                xtype: 'combo',
                name:'application_status_id',
                displayField: 'name',
                valueField:'id',queryMode:'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_system_statuses'
                                }
                            }
                        },
                        isLoad: true
                    },change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                   
                }

            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },{
            xtype: 'gridcolumn',
            text: 'Sample Analysis Status',
            dataIndex: 'sample_analysis_status',
            tdCls: 'wrap-text',
            flex: 1,  
            hidden: true,  
            renderer: function (value, metaData) {
                if (value != '' && value != null) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "Has Analysis";
                }
                return "N/A";
            }
        },{
            xtype: 'gridcolumn',
            text: 'Time Span',
            dataIndex: 'time_span',
            flex: 0.5,
            tdCls: 'wrap',
            renderer: function (val, meta, record) {
                var time_spanexpected = record.get('time_spanexpected'),
                time_span = record.get('time_span');
               
                    return time_span;
              
            }
        }
    ]
});