Ext.define('Admin.view.audit_trail.view.grid.PortalAudit_TrailGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'portal_audit_trailGrid',
    controller: 'audit_trialViewCtr',
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                remoteFilter: true,
                pageSize: 100,
                enablePaging:true,
                reader: {
                    type: 'json',
                    idProperty: 'id',
                    rootProperty: 'results',
                    messageProperty: 'msg'
                },
                storeId: 'portalAuditTrailStr',
                proxy: {
                    url: 'audittrail/getPortalAuditTrail'
                }
            },
            isLoad: true
        },
           
    },
    tbar: ['->',{
        xtype: 'textfield',
        fieldLabel: 'Table Content',
        labelWidth: 150,
        name: 'table_data',
        listeners: {
          change: function(me,value,old,opt) {
            var grid=me.up('grid');
             if(value!=''){
              var button=grid.down('button[name=search2]').enable();
              }else{
                var button=grid.down('button[name=search2]').disable();
              }
          }
      },
    },{
        xtype: 'button',
        iconCls: 'fa fa-search',
        text: 'Search',
        ui: 'soft-green',
        name: 'search2',
        disabled: true,
        handler: function(){
          var grid = this.up('grid'),
                    store = grid.getStore();
                store.reload();  
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function (btn) {
             var filters=this.up('grid'),
                 table_name=filters.down('combo[name=table_name]').getValue(),
                 created_by=filters.down('combo[name=created_by]').getValue(),
                 table_data=filters.down('textfield[name=table_data]').getValue(),
                 Store=filters.getStore();

            Store.getProxy().extraParams = {
                        table_name:table_name,
                        created_by:created_by,
                        table_data:table_data
                }
            }
    },'->',{
        xtype: 'button',
        name: 'export',
        text: 'Export Trail',
        ui: 'soft-green',
        type: 'portal',
        handler: 'export'
    }],
    plugins: [{
                ptype: 'gridexporter'
             },{
                ptype: 'filterfield'
           }],
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'ID',
        hidden: true
    },
   {
        xtype: 'gridcolumn',
        dataIndex: 'table_name',
        text: 'Table Name',
        flex: 1,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'table_name',
                    valueField: 'table_name',
                    name: 'table_name',
                    listeners:
                     {
                         beforerender: {
                            fn: 'setReportGlobalStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'audittrail/getTableslist',
                                    extraParams:{
                                        in_db:'portal'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function(combo) {
                            var str=combo.up('grid').getStore();
                            str.reload();
                            
                        },
                     
                 }
                
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'table_action',
        text: 'Table Action',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'record_id',
        text: 'Record Id',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'ip_address',
        text: 'IP Address',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_by',
        text: 'Action By',
        flex: 1,
        filter: {
               xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'created_by',
                listeners:
                 {
                     beforerender: {
                        fn: 'setReportGlobalStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'audittrail/getAllUsers/wb_trader_account'
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo) {
                        var str=combo.up('grid').getStore();
                        str.reload();
                        
                    },
                     
                 }
                
           }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_at',
        text: 'Action On',
        flex: 1,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'View this Transaction',
                    iconCls: 'x-fa fa-eye',
                    winTitle: 'Table Data Preview',
                    winWidth: '70%',
                    name: 'single',
                    childXtype: 'tableDataPortalAudit_TrailPnl',
                    handler: 'func_viewRecords'
                },
                {
                    text: 'View All Record Transactions',
                    iconCls: 'x-fa fa-eye',
                    winTitle: 'Transactions View',
                    winWidth: '70%',
                    childXtype: 'allTransRecPortalAudit_TrailPnl',
                    name: 'all',
                    handler: 'func_AllRecordsTrans'
                }]
            }
        }
    }]
    
});