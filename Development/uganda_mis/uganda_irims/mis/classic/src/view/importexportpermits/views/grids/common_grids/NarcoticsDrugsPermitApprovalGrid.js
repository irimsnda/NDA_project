/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.NarcoticsDrugsPermitApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'narcoticsdrugspermitapprovalgrid',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'narcoticsdrugspermitapprovalgridstr',
                proxy: {
                    url: 'importexportpermits/getNarcoticsPermitsManagerReviewApplications'
                }
            },
            isLoad: true
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount(),
                decision_id = grid.down('combo[name=decision_id]').getValue();
            if (selCount > 0) {
                if(decision_id > 0){
                    grid.down('button[name=submit_selected]').setDisabled(false);

                }
               
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id'),
                grid = sel.view.grid,
                decision_id = grid.down('combo[name=decision_id]').getValue();
            if (recommendation_id > 0 ) {
                if(decision_id > 0){
                    return true;
                }else{
                    toastr.warning('Please save application decision to submit!!', 'Warning Response');
                    return false;
                }
            } else {
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
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
        dataIndex: 'drugtype_category',
        text: 'Controlled Drug Type',
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
                        approval_frm: 'importexportreviewrecommfrm',
                        handler: 'getApplicationApprovalDetails',
                        vwcontroller: 'importexportpermitsvctr',
                        stores: '["productApprovalDecisionsStr"]',
                        table_name: 'tra_importexport_applications'
                    },
                    {
                        text: 'Preview Narcotics Drugs Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'editpreviewNarcoticsPermitinformation'
                    }
                ]
            }
        }
    }]
});