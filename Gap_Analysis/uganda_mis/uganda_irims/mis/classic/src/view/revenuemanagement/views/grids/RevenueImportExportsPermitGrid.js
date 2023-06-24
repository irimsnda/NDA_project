/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.common_grids.RevenueImportExportsPermitGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'revenueimportexportspermitgrid',
    controller:'revenuemanagementvctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 2000,
                remoteFilter:true,
                storeId: 'revenueimportexportspermitgridstr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermitDetails'
                }
            },
            isLoad: true,
            autoLoad: true
        }
    },
    tbar: [{
      text:'Doubleclick to select!!'  
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }], plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'premises_name',
        text: 'Premises Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }],
    bbar:[{
        xtype: 'pagingtoolbar',
        width: '100%'
    }]
});