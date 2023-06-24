/**

 * Created by Softclans on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PrevImportExportPermitReleaseGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    xtype: 'previmportexportpermitreleasegrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                groupField:'applicant_name',
                storeId: 'previmportexportpermitreleasegridstr',
                proxy: {
                    url: 'importexportpermits/getPreviousImportExportApprovedPermit'
                }
            },
            isLoad: true,
            autoLoad: true
        }
    }, bbar: [{
      xtype:'hiddenfield',
      name:'active_application_code'  
    },{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('previmportexportpermitreleasegrid').fireEvent('refresh', this);//
        }
    }],
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('release_recommendation_id');
            if (recommendation_id ==1) {
                return 'valid-row';
            } else {
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false
    }],
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print/Preview Permit/License',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            handler: 'generateColumnImportExportPermit'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
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
        dataIndex: 'approved_by',
        text: 'Approved by',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'review_recommendation',
        text: 'Approval Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'release_recommendation',
        text: 'Permit Release Recommendation',
        flex: 1
    },  {
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
                        text: 'Print/Preview Permit',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        handler: 'generateImportExportPermit'
                    },
                    {
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'editpreviewPermitinformation'
                    }
                ]
            }
        }
    }]
});