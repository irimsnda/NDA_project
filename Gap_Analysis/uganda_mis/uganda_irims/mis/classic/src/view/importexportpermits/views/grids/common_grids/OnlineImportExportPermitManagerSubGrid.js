/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineImportExportPermitManagerSubGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineimportexportpermitmanagersubgrid',
    
    itemId: 'onlineapplicationpermitmanagersubgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'onlineimportexportpermitmanagersubgridstr',
                proxy: {
                    url: 'dashboard/getOnlineImportExportManagerReviewApplications'
                }
            },
            isLoad: true
        },
        
        deselect: function (sel, record, index, eOpts) {
            
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
                grid.down('button[name=submit_selected]').setDisabled(false);
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid;
            
            grid.down('button[name=submit_selected]').setDisabled(false);

        },
        itemdblclick: 'onOlineIntrayItemDblClick'
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'combo',
        fieldLabel: 'Has Registered Premises',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'has_registered_outlets',
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
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_confirmations'
                    }
                   }
                },
                isLoad: true
            },
           change:function(cbo){
                var grid = cbo.up('grid'),
                store = grid.getStore();

                store.load();

           }
        }
    }, {
        xtype: 'tbspacer'
    },'->',{xtype: 'displayfield', value: 'Double click to preview the application details.'}],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
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
    },{
        xtype: 'gridcolumn',
        text: 'Has Licensed Premises', 
        dataIndex: 'certificate_no',
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Registered/Licensed";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Registered";
        }

    },{
        xtype: 'gridcolumn',
        text: 'Premises Name',
        dataIndex: 'premises_name',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Premises Physical Address',
        dataIndex: 'prem_physical_address',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Premises Registration No',
        dataIndex: 'premise_reg_no',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'onpreviewonlineimpApplicationdetails'
                    }
                ]
            }
        }
    }]
});