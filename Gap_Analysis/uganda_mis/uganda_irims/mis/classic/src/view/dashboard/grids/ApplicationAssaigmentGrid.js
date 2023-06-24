Ext.define('Admin.view.dashboard.grids.ApplicationAssaigmentGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationassaigmentgrid',
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
        labelWidth: 80,
        width: 300,
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
        labelWidth: 80,
        width: 300,
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
        labelWidth: 80,
        width: 300,
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
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('combo[name=section_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue(),
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
                    store.getProxy().extraParams = {
                        section_id: section_id,
                        module_id: module_id,
                        sub_module_id: sub_module_id
                    };
            }
        },
        '->',,'->',{
          xtype: 'checkbox',
          name:'enable_grouping',
          boxLabel:'Disable Grouping',
          listeners:{
                change:function(chk,value){
                        var grid = chk.up('grid');
                        console.log(grid.getView())
                            grouping = grid.getView().findFeature('grouping');
                            if(value == 1){
                                grouping.disable();
                            }
                            else{
                                grouping.enable();
                            }
                }
          }
        },
        {
            xtype: 'exportbtn'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 500,
                enablePagination: true,
                remoteFilter: true,
                grouper: {
                    groupFn: function (item) {
                        return item.get('process_id') + item.get('workflow_stage_id');
                    }
                },
                storeId: 'applicationassaigmentgridstr',
                proxy: {
                    url: 'dashboard/getApplicationAssaignmentRecords'
                }
            },
            isLoad: true
        },
        afterrender:function(){
            // var view = this.getView();
            // var groupingFeature = view.findFeature("grouping");
            // groupingFeature.enable();
        },
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            startCollapsed: true
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'applicationassaigment',
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
            tdCls: 'wrap-text',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'Prev Stage',
            dataIndex: 'prev_stage',
            flex: 1,
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Current Stage',
            dataIndex: 'workflow_stage',
            flex: 1,
            tdCls: 'wrap'
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
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },{
            xtype: 'gridcolumn',
            text: 'Expected Start Date',
            dataIndex: 'expected_start_date',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },{
            xtype: 'gridcolumn',
            text: 'Expected End Date',
            dataIndex: 'expected_end_date',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            xtype: 'gridcolumn',
            text: 'App Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap'
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
        },
        {
            xtype: 'gridcolumn',
            width: 50,
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