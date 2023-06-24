/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.InspectionImportExportsPermitGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'inspectionimportexportspermitgrid',
    controller:'importexportpermitsvctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 2000,
                remoteFilter:true,
                storeId: 'inspectionimportexportspermitgridstr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermitDetails'
                }
            },
            isLoad: false,
            autoLoad: false
        }
    },
    tbar: [{
      text:'Doubleclick to select!!'  
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbfill'
    },{
        fieldLabel:'Permit No/Reference No',
        name:'permit_no',
        xtype:'textfield',
        labelWidth: 108,
        emptytext:'Enter Full Permit No',
        width: 300
    },{
        text:'Search Permit',
        handler: 'funcSearchImpExpPermit',
        iconCls:'fa fa-search',
        ui:'soft-green'
    }], plugins: [{
        ptype: 'gridexporter'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1, filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approval_date',
        text: 'Approval Date',
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
       
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
       
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'premises_name',
        text: 'Premises Name',
        flex: 0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'verification_status',
        text: 'Permit Verification Status',
        flex: 0.75
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'verification_remarks',
        text: 'Permit Verification Remarks',
        flex: 0.75
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_verified_on',
        text: 'Verified On',
        flex: 0.75
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_permitexpired',
        text: 'Is Permit Expired',
        flex: 1,
        renderer: function (value, metaData) {
            if (value == 0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Valid Permit";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Expired";
        }
    },],
    bbar:[{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
           
            //this.up('inspectionimportexportspermitgrid').fireEvent('refresh', this);//
        }
    }]
});