/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.SpecialCaseImpExpApprovalPnlGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'specialcaseimpexpapprovalpnlgrid',
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getISpecialmportExportApprovalApplications'
                }
            },
            isLoad: true
        }, 
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        flex: 1
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Review Recommendation',
        flex: 1
    }, {
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
                items: [
                    {
                        text: 'Review Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        approval_frm: 'importexportapprovalrecommfrm',
                        handler: 'getApplicationApprovalDetails',
                        vwcontroller: 'importexportpermitsvctr',
                        stores: '["productApprovalDecisionsStr"]',
                        table_name: 'tra_importexport_applications'
                    },
                    {
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewPermitinformation'
                    }
                ]
            }
        }
    }]
});