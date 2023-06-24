/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.grids.AppCertificateReupdateRequestsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'systemadministrationprocessvctr',
    xtype: 'appcertificatereupdaterequestsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    
    plugins: [{
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'appcertificatereupdaterequestsgridstr',
                pageSize: 200, remoteFilter: false,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'systemadminprocess/getappCertificateReupdateRequests',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){

            var store = grid.getStore();
                store.removeAll();
                store.load();
       },
    }, 
    viewConfig:{
        emptyText:'No Record Found'
    },
    tbar:[{
        text:'Application Certificate/Permit Update Requests',
        iconCls:'fa fa-plus',
        margin:5,
        childXtype: 'appcertificatereupdaterequestsfrm',
        ui:'soft-green',
        handler: 'funcApplicationOwnershipAmmendREq'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_byname',
        text: 'Requested By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reason',
        text: 'Reason',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_on',
        text: 'Requested On',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'effected_on',
        text: 'Effected On',
        flex: 1
    }],
    bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad:function(){
                this.up('grid').fireEvent('refresh', this);
            }
        }]
});
