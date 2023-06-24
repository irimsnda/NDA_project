/**
 * Created by Kip on 12/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.CommunicationsRenewalGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'communicationsrenewalgrid',
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
                    table_name: 'tra_premises_applications',
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
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
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
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'premiseregistration/getManagerApplicationsRenewalGeneric'
                }
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
        }
    },
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print Certificate',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseRegistrationCertificate',
            handler: 'printColumnPremiseCertificate'
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print Permit',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseBusinessPermit',
            handler: 'printColumnPremisePermit'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region/Province Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'DG Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
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
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        is_temporal: 1,
                        handler: 'showPremApplicationMoreDetails'
                    },
                    {
                        text: 'Print',
                        iconCls: 'x-fa fa-print',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Premise Certificate',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseRegistrationCertificate',
                                    handler: 'printPremisePermit'
                                }, {
                                    text: 'Premise Permit',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseBusinessPermit',
                                    handler: 'printPremisePermit'
                                }
                            ]
                        }
                    },
                   
                    {
                        text: 'Update Signatory',
                        iconCls: 'x-fa fa-pencil',
                        stores: '["approvaldecisionsstr"]',
                        table_name: 'tra_premises_applications',
                        is_update: 1,
                        handler: 'getApplicationApprovalDetails'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});
