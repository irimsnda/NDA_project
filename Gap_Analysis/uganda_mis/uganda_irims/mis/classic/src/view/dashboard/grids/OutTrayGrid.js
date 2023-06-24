/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.OutTrayGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'outtraygrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    tbar: [{
        xtype: 'tbspacer',
        width: 5
    }, {
        xtype: 'combo',
        emptyText: 'SECTION',
        // labelWidth: 80,
        width: 150,
        flex: 1,
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
                //grid.getStore().load();
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
         // labelWidth: 80,
        width: 150,
        flex: 1,
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
                //grid.getStore().load();
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
         // labelWidth: 80,
        width: 150,
        flex: 1,
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
                //grid.getStore().load();
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
        forceSelection: true,
        width: 150,
        flex: 1,
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
                //grid.getStore().load();
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
            gridStr.load();
        },
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'outtraystr',
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
        },
        {
            xtype: 'button',
            text: 'Export Outray',
            type: 2,
            is_internaluser: 1,
            ui:'soft-green',
            iconCls: 'x-fa fa-print',
            handler: 'exportDashboard'
        }
    ],
    listeners: {
        beforerender: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        }
    },
    features: [
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    store: 'outtraystr',
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'Urgency',
            dataIndex: 'urgency_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Tracking No',
            dataIndex: 'tracking_no',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Reference',
            dataIndex: 'reference_no',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'process_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Stage',
            dataIndex: 'workflow_stage',
            flex: 1,
            tdCls: 'wrap',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Applicant',
            dataIndex: 'applicant_name',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Remarks/Comment',
            dataIndex: 'remarks',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            flex: 1,
            tdCls: 'wrap',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Released',
            dataIndex: 'date_released',
            flex: 1,
            tdCls: 'wrap',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        },
        {
            xtype: 'gridcolumn',
            text: 'App Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap'
        }
    ]
});