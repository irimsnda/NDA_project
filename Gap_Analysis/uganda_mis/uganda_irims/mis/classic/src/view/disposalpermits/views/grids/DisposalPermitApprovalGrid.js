/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.disposalpermits.views.grids.DisposalPermitApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'disposalpermitapprovalgrid',
   
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'disposalpermitapprovalgridstr',
                proxy: {
                    url: 'importexportpermits/getDisposalPermitApprovalApplications'//getImportExportManagerReviewApplications
                }
            },
            isLoad: true
        }, 
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id'),
                grid = sel.view.grid;
            if (recommendation_id > 0 ) {
              
                    return true;
                
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
    columns: [ {
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premises_name',
        text: 'Premises Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_disposal',
        text: 'Resaon for Disposal',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_weight',
        text: 'Total Weight',
        tdCls: 'wrap',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'market_value',
        text: 'Premises Name',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'disposal_verificationrecommendation',
        text: 'Verification Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
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
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Permit Approval Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        approval_frm: 'disposalapprovalrecommFrm',
                        handler: 'getApplicationApprovalDetails',
                        vwcontroller: 'disposalpermitsvctr',
                        stores: '["disposalpermitapprovalgridstr"]',
                        table_name: 'tra_disposal_applications'
                    },{
                        text: 'Preview Disposal Verification Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewPermitVerificationinformation'
                    },
                    {
                        text: 'Preview Disposal Application Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        action: 'edit',
                        childXtype: 'disposalapplicationspreviewpnl',
                        winTitle: 'Disposal Applications',
                        winWidth: '40%',
                        isReadOnly:1,
                        handler: 'editpreviewPermitinformation'
                    },{
                        text: 'Preview Application Queries',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Preview Record',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Preview Application Queries',
                        winWidth: '40%',
                        isReadOnly: 1,
                        handler: 'previewproductApplicationQueries'
                    }
                ]
            }
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print/Preview Permit',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            handler: 'generateDisposalpermit'
        }
    }]
});