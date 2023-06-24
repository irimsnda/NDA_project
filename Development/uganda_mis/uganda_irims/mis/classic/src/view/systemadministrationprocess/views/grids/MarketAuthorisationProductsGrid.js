/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.grids.MarketAuthorisationProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'systemadministrationprocessvctr',
    xtype: 'marketauthorisationproductsgrid',
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
                storeId: 'changemarketauthorisationdashgridstr',
                pageSize: 200, remoteFilter: false,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'systemadminprocess/getMarketauthorisationProducts',
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
       },select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                
                mainTabPnl = grid.up('#contentPanel'),
                activeTab = mainTabPnl.getActiveTab(),
                activeTab.down('button[name=selected_btn]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                mainTabPnl = grid.up('#contentPanel'),
                activeTab = mainTabPnl.getActiveTab(),
                activeTab.down('button[name=selected_btn]').setDisabled(true);
            }
        },
    }, 
    viewConfig:{
        emptyText:'No Record Found'
    },selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
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
        dataIndex: 'trader_name',
        text: 'Applicant Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'local_agentname',
        text: 'Local Agent Name',
        flex: 1
    },{
        header: 'Certificate No',
        dataIndex: 'certificate_no',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Application Status',
        dataIndex: 'application_status',
        flex: 1
    }, {
        header: 'Registration Status',
        dataIndex: 'registration_status',
        flex: 1
    },{
        header: 'Validity Status',
        dataIndex: 'validity_status',
        flex: 1
    },{
        header: 'Is Current Active Product',
        dataIndex: 'regproduct_id',
        flex: 1,
        renderer: function (value, metaData,record) {
            var regproduct_id = record.get('regproduct_id')
            if (regproduct_id > 0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return 'Is Active Product Application';
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return 'Previous Application/Pending Registration';
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
        },'->']
});
