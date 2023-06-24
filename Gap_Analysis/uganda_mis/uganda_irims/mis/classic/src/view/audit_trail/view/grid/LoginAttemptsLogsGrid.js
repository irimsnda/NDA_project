Ext.define('Admin.view.audit_trail.view.grid.LoginAttemptsLogsGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'loginattemptslogsGrid',
    layout: 'fit',
    controller: 'audit_trialViewCtr',
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'loginAttemptsLogsStr',
                groupField: 'email',
                remoteFilter: true,
                proxy: {
                    url: 'audittrail/getloginAttemptsLogs'
                }
            },
            isLoad: true
        }
    },

    tbar: [{
         xtype: 'toolbar',
            ui: 'footer',
            defaults: {
                labelAlign: 'left'
            },
            width: '100%',
            layout: 'hbox',
                items:[{
                xtype: 'combo',
                fieldLabel: 'Directorate',
                margin: '0 20 20 0',
                flex:1,
                name: 'directorate_id',
                valueField: 'id',
                value: 0,
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setReportGlobalStore',
                        config: {
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_directorates'
                                }
                            }
                           },
                        isLoad: true
                    },
                    change: function(combo, newValue, oldValue, eopts) {
                        var grid = combo.up('grid'),
                            depStr = grid.down('combo[name=department_id]').getStore();
                            
                            depStr.removeAll();
                            depStr.load({params:{filters: JSON.stringify({'directorate_id':newValue})}});  
                    },
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Department',
                margin: '0 20 20 0',
                name: 'department_id',
                flex:1,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setReportGlobalStore',
                        config: {
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_departments'
                                }
                            }
                           },
                        isLoad: false
                    }
                }
            },{
                xtype: 'datefield',
                name: 'date',
                fieldLabel: 'Date',
                format: 'Y-m-d',
                allowBlank:false
            },{
                text: 'Search',
                formBind: true,
                handler: 'func_reloadGridStore'
            }]
    }],


   plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: true
    }],
    export_title: 'loginattemptsgLogs',

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        text: 'Name',
        width: 200,
        tbCls: 'wrap',
        filter: {
            xtype: 'combo',
            name: 'user_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setReportGlobalStore',
                    config: {
                        proxy: {
                            url: 'usermanagement/getUserList'
                        }
                       },
                    isLoad: true
                },
                change: 'func_reloadGridStore'
            }
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        name: 'email',
        text: 'User Email',
        width: 200,
        tbCls: 'wrap',
        filter: {
            xtype: 'textfield',
            vtype: 'email'
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'username',
        name: 'username',
        text: 'Username',
        width: 200,
        tbCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'phone_no',
        name: 'phone_no',
        text: 'Phone No',
        width: 200,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'mobile_no',
        name: 'mobile_no',
        text: 'Mobile No',
        width: 200,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ip_address',
        name: 'ip_address',
        text: 'Loging IP Address',
        width: 200,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'user_agent',
        name: 'user_agent',
        text: 'Loging Device',
        width: 250,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'last_Attempt_time',
        name: 'last_Attempt_time',
        text: 'Last Loging Attempt Time',
        width: 200,
        filter: {
            xtype: 'textfield',
            vtype: 'timerange'
        }
       
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                department_id = grid.down('combo[name=department_id]').getValue(),
                directorate_id = grid.down('combo[name=directorate_id]').getValue(),
                user_id = grid.down('combo[name=user_id]').getValue(),
                day = grid.down('datefield[name=date]').getValue(),
                store = grid.getStore();
            store.getProxy().extraParams = {
                'directorate_id':directorate_id,
                'department_id':department_id,
                'user_id':user_id,
                'day':day

            }
        },  
    }]

    });
