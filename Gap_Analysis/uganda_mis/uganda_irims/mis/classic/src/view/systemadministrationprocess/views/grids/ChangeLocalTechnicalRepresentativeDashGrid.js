/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.grids.ChangeLocalTechnicalRepresentativeDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'systemadministrationprocessvctr',
    xtype: 'changelocaltechnicalrepresentativedashgrid',
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
    export_title: 'Changed Market Authorisation',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'changelocaltechnicalrepresentativestr',
                pageSize: 200, remoteFilter: true,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'systemadminprocess/getChangeLocalTechnicalRepresentative',
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
       }
    }, 
    tbar:['->',{
            xtype: 'datefield',
            format: 'Y-m-d', labelAlign:'top',
            fieldLabel: 'Changed From Date',
            name:'changed_fromdate'
    },{
        xtype: 'datefield',
        format: 'Y-m-d',
        fieldLabel: 'Changed To Date',
        labelAlign:'top',
        name:'changed_todate'
    },{
        text:'Search Records',
        name: 'btn_searchrecords',
        ui:'soft-green',
        iconCls:'x-fa fa-search',
        handler: 'funcbtnSearchRecords'
    },{
        text:'Search Records',
        name: 'btn_searchrecords',
        iconCls:'x-fa fa-cancel',  ui:'soft-red',
        handler: 'funcClearFilters'
    }],
    viewConfig:{
        emptyText:'No Record Found'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Generic Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'previous_local_agent',
        text: 'Previous L.T.R',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_local_agent',
        text: 'Current L.T.R',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'changed_on',
        text: 'Changed On',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'changed_by',
        text: 'Changed By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reason',
        text: 'Reason for Change',
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
