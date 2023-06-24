/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.SummaryIntrayGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'summaryintraygrid',
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
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'summaryintraygridstr',
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                    workflow_stage_id = grid.down('combo[name=workflow_stage_id]').getValue();
                store.getProxy().extraParams = {
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    workflow_stage_id: workflow_stage_id
                };
            }
        }
    ],
    listeners: {
        afterrender:function(grid){
            var gridStr = grid.getStore();
            gridStr.load();
        },
        select: function(sel, record){
            var grid = this,
                panel = grid.up('panel'),
                intraygrid = panel.down('intraygrid'),
                intraygridstr = intraygrid.getStore(),
                process_id = record.get('process_id'),
                workflow_stage_id = record.get('workflow_stage_id');
                intraygridstr.load({params:{workflow_stage_id:workflow_stage_id, process_id: process_id}})

        },
       // itemdblclick: 'onIntrayItemDblClick'
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
    store: 'summaryintraygridstr',
    columns: [
       {
            xtype: 'gridcolumn',
            text: 'Process',
            flex: 1,
            dataIndex: 'process_name',
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Current Stage',  flex: 1,
            dataIndex: 'workflow_stage',
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Number of Application',  flex: 0.5,
            dataIndex: 'number_of_applications',
           
            tdCls: 'wrap',
            renderer: function (val, meta, record) {
                if (val < 100) {
                    meta.tdStyle = 'color:white;background-color:green';
                    return val;
                } else {
                    meta.tdStyle = 'color:white;background-color:red';
                    return val+ "(over 100 app.)";
                }
            }
          
        }
        
    ]
});