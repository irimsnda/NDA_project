/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.grids.ApplicationOwnershipAmmendmentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'systemadministrationprocessvctr',
    xtype: 'applicationownershipammendmentsgrid',
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
                storeId: 'applicationownershipammendmentsgridstr',
                pageSize: 200, remoteFilter: false,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'systemadminprocess/getApplicationOwnershipAmmendmentsdata',
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
        text:'Application Ownership Ammendment',
        iconCls:'fa fa-plus',
        margin:5,
        childXtype: 'applicationownershipammendmentsfrm',
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
        dataIndex: 'previous_applicant',
        text: 'Previous Applicant',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_applicant',
        text: 'Current Applicant',
        flex: 1
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reason',
        text: 'Reason',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'changed_byname',
        text: 'Changed By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'changed_on',
        text: 'Changed On',
        flex: 1
    },{
        header: 'Ammendment Option',
        dataIndex: 'ammendment_option_id',
        flex: 2,
        renderer: function (value, metaData,record) {
            var ammendment_option_id = record.get('ammendment_option_id')
            if (ammendment_option_id == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return 'Full Change of Applicant Details';
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return 'Single Application Ammendment';
        }
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
