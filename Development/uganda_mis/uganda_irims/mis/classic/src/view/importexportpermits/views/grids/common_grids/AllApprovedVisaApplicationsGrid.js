
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.AllApprovedVisaApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allapprovedvisaapplicationsgrid',
    controller: 'importexportpermitsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'allImportExportAppstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'importexportpermits/getApprovedVisaApplicationDetails'//getProductApprovalApplications
                }
            },
            isLoad: true
        }
    },
    plugins: [{
            ptype: 'filterfield'
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                store.getProxy().extraParams = {
                    section_id: section_id
                };

        }
    }],
    tbar: [{
        text: 'Double Click to select application'
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Permit/Reference No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proform Invoice No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_category',
        text: 'Permit Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sender_receiver_name',
        text: 'Sender Receiver',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1,
         filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1 
    }]
});