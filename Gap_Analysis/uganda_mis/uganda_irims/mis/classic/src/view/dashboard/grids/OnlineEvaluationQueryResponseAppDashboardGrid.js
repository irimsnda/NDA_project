/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.OnlineEvaluationQueryResponseAppDashboardGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineevaluationqueryresponseappdashboardgrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
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
        //labelWidth: 80,
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
        //labelWidth: 80,
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
        xtype: 'combo',
        emptyText: 'ZONE',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'zone_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_zones'
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
          grid.down('combo[name=zone_id]').clearValue();
          gridStr.load();
        },
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'onlineevalqueryresponseappdashboardgridstr',
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up("#contentPanel").getActiveTab().down('tabpanel').getActiveTab(),
                    is_management_dashboard = grid.is_management_dashboard,
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    online_status_id = grid.down('combo[name=online_status_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    
                    zone_id = grid.down('combo[name=zone_id]').getValue(),
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
                    store.getProxy().extraParams = {
                        section_id: section_id,
                        module_id: module_id,
                        online_status_id: online_status_id,
                        zone_id:zone_id,
                        sub_module_id: sub_module_id,
                        is_management_dashboard:is_management_dashboard,
                        application_status_id : 15
                    };
            }
        },
        '->',,'->',{
          xtype: 'checkbox',
          name:'enable_grouping',
          boxLabel:'Enable Grouping',
          listeners:{
                change:function(chk,value){
                        var grid = chk.up('grid');
                        console.log(grid.getView())
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
            xtype: 'exportbtn'
        }
    ],
    listeners: {
        beforerender: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
            
        },
        afterrender:function(){
            var view = this.getView();
          //  var groupingFeature = view.findFeature("grouping");
          //  groupingFeature.disable();
        },
        itemdblclick: 'onOlineIntrayItemDblClick'
    },
    features: [{
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
    export_title: 'Intray',
    store: 'onlineevalqueryresponseappdashboardgridstr',
    columns: [
        {
            xtype: 'gridcolumn',
            width: 50,
            renderer: function (val, meta, record) {
                var isRead = record.get('isRead');
                if (isRead == 1 || isRead === 1) {
                    //return '<img src="' + base_url + '/resources/images/new3.jpg">';
                } else {
                    return '<img src="' + base_url + '/resources/images/new3.jpg">';
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Application Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'combo',
                emptyText: 'status',
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                name: 'online_status_id',
                queryMode: 'local',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                    beforerender: {
                        fn: 'setOrgConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getOnlineApplicationStatus'
                            }
                        },
                        isLoad: true
                    },
                    change: function (cmbo, newVal) {
                        var grid = cmbo.up('grid'),
                            store = grid.getStore();
                        store.removeAll();
                        store.load({params:{'is_assessment': 1}});
                    }
                },
            }
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
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            text: 'Stage',
            dataIndex: 'workflow_stage',
            flex: 1,
            tdCls: 'wrap-text'
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
        },{
            xtype: 'gridcolumn',
            text: 'Remarks/Comment',
            dataIndex: 'remarks',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_submitted',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        },
        {
            xtype: 'gridcolumn',
            text: 'Time Span',
            dataIndex: 'time_span',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield',
                emptyText: 'span over'
            }
        },{
            xtype: 'gridcolumn',
            text: 'Zone',
            dataIndex: 'zone_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Tansad Number',
            dataIndex: 'tansadNumber',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield',
                emptyText: 'span over'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 50,
            hidden: true,
            renderer: function (val, meta, record) {
                var is_fast_track = record.get('is_fast_track');
                if (is_fast_track == 1 || is_fast_track === 1) {
                    return '<img src="' + base_url + '/resources/images/fasttrack.jpg">';
                } else {
                    //return '<img src="' + base_url + '/resources/images/fasttrack.jpg">';
                }
            }
        }
    ]
});