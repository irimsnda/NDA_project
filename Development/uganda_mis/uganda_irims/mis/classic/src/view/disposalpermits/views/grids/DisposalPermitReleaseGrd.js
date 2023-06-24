/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.disposalpermits.views.grids.common_grids.DisposalPermitReleaseGrd', {
    extend: 'Ext.grid.Panel',
    xtype: 'disposalpermitreleasegrd',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'disposalpermitreleasegrdstr',
                proxy: {
                    url: 'importexportpermits/getDisposalPermitApprovalApplications'
                }
            },
            isLoad: true,
            autoLoad: true
        },
        
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
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
                items: [
                  
                    {
                        text: 'Preview Disposal Verification Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'editpreviewPermitVerificationinformation'
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
                    }, 
                    {
                        text: 'Preview Disposal Application Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        action: 'edit',
                        childXtype: 'disposalapplicationspreviewpnl',
                        winTitle: 'Disposal Applications',
                        winWidth: '40%',
                        isReadOnly:1,
                        handler: 'editpreviewPermitinformation'
                    }
                ]
            }
        }
    }]
});