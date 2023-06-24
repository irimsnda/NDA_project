Ext.define('Admin.view.frontoffice.enquiries.grid.TaskReassignmentGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'taskreassignmentgrid',
    layout: 'fit',
    controller: 'usermanagementvctr',
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                storeId: 'taskreassignmentStr',
                proxy: {
                    url: 'usermanagement/getTaskReassignmentApplications'
                }
            },
            isLoad: false
        }
    },
   
    tbar:[{
          xtype: 'toolbar',
          layout: 'hbox',
          items: [{
                xtype: 'combo',
                fieldLabel: 'Select User',
                forceSelection: true,
                columnWidth: 0.35,
                allowBlank: false,
                queryMode: 'local',
                margin: '0 20 0 0',
                name: 'user_id',
                displayField: 'name',
                valueField: 'id',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                },
                listeners: {
                   beforerender: {
                            fn: 'setOrgConfigCombosStore',
                           config: {
                                proxy: {
                                url: 'usermanagement/getUserList'
                               }
                            },
                            isLoad: true
                        },
                        change: function(combo,newValue,oldvalue,eops) {
                            var store = combo.up('grid').getStore();
                            store.removeAll();
                            store.load();
                        },
                     }
                }],
    },{
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
            'color': 'green',
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
            'color': 'green',
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
            'color': 'green',
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
    }],
    features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        },{
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: 'Current Stage: {[values.rows[0].data.current_stage]}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
       
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        name: 'id',
        text: 'id',
        hidden: true,
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_code',
        name: 'application_code',
        text: 'application_code',
        flex: 1,
        hidden: true,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage_id',
        name: 'workflow_stage_id',
        text: 'workflow_stage_id',
        hidden: true,
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'full_name',
        name: 'full_name',
        text: 'Full Name',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'username',
        name: 'username',
        text: 'User Name',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        name: 'process_name',
        text: 'Process',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'prev_stage',
        name: 'prev_stage',
        text: 'From',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_stage',
        name: 'current_stage',
        text: 'Stage',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant',
        name: 'applicant',
        text: 'Applicant',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'widgetcolumn',
        text: 'Action',
        flex: 1,
        widget: {
           // width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        xtype: 'button',
                        childXtype: 'taskreassingmentfrm',
                        winTitle: 'Task Reassignment',
                        winWidth: '40%',
                        stores: [],
                        text: 'Re-Assign',
                        handler: 'showEditConfigParamWinFrm'
                    }]
                  },
        }
       
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad:function() {
                var grid = this.up('grid'),
                    user_id = grid.down('combo[name=user_id]').getValue(),
                    section_id = grid.down('combo[name=section_id]').getValue();
                    module_id = grid.down('combo[name=module_id]').getValue();
                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
                 var store=this.getStore();
                 store.getProxy().extraParams = {
                    'user_id':user_id,
                    'section_id':section_id,
                    'module_id':module_id,
                    'sub_module_id':sub_module_id

                 }
        
            
        },
    }]

    });
