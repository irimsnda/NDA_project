/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/16/2018.
 */
Ext.define('Admin.view.disposalpermits.views.grids.DisposalPermitMangeReviewGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'disposalpermitsvctr',
    xtype: 'disposalpermitmangereviewgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_disposal_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'importexportpermitsproductsstr',
                    table_name: 'tra_disposal_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
	tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    },{
        text:'Double Click to review the Raised Queries'
    }],
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 10000,
                table_name: 'tra_disposal_applications',
                proxy: {
                    url: 'importexportpermits/getManagerEvaluationApplications'
                },
            },
            isLoad: true
        },
        
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
		itemdblclick:'editpreviewPermitQueryinformation'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_added',
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submitted_by',
        text: 'Submitted By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submitted_on',
        text: 'Submitted On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
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
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: 'disposalapplicationspreviewpnl',
                    winTitle: 'Disposal Applications',
                    winWidth: '40%',
                    isReadOnly:1,
                    handler: 'editpreviewPermitinformation'
                },{
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    document_previewpnl: 'previewpermitdocuploadsgrid',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly:1,
                    handler: 'funcPrevGridApplicationDocuments'
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
                },  {
                    text: 'Print Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Print Record',
                    action: 'edit',
                    childXtype: '',
                    hidden: true,
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    handler: 'printpreviewProductInformation'
                },{
                    text: 'Preview Disposal Verification Details',
                    iconCls: 'x-fa fa-bars',
                    appDetailsReadOnly: 1,
                    handler: 'editpreviewPermitVerificationinformation'
                }]
            }
        }
    }]
    
});
