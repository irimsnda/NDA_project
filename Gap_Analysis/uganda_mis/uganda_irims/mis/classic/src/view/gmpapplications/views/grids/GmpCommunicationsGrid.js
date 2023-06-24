/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpCommunicationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpcommunicationsgrid',
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GMP Type',
        valueField: 'id',
        name: 'gmp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 300,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setGmpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GmpType'
                        }
                    }
                },
                isLoad: true
            },
            change: 'reloadParentGridOnChange'
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }],
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
                    table_name: 'tra_gmp_applications',
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
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gmpapplications/getManagerApplicationsGeneric'
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
            text: 'GMP Certificate',
            iconCls: 'x-fa fa-certificate',
            name: 'gmp_cert',
            handler: 'printColumnGmpCertificate'
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'GMP Approval Letter',
            iconCls: 'x-fa fa-certificate',
            name: 'approval_letter',
            handler: 'printColumnGmpApprovalLetter'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Manufacturing Site',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'cost',
        text: 'Date Received',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'Approval Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_type_txt',
        text: 'GMP Type',
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
                        text: 'Print',
                        iconCls: 'x-fa fa-print',
                        name: 'print',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'GMP Certificate',
                                    iconCls: 'x-fa fa-certificate',
                                    name: 'gmp_cert',
                                    handler: 'printGmpCertificate'
                                },
                                {
                                    text: 'GMP Approval Letter',
                                    iconCls: 'x-fa fa-certificate',
                                    name: 'approval_letter',
                                    handler: 'printGmpApprovalLetter'
                                },
                                {
                                    text: 'Premise Certificate',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseRegistrationCertificate',
                                    name: 'premise_cert',
                                    handler: 'printPremiseCertificate'
                                },
                                {
                                    text: 'Premise Permit',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseBusinessPermit',
                                    name: 'permit',
                                    handler: 'printPremisePermit'
                                }
                            ]
                        }
                    },
                   
                    {
                        text: 'Update Signatory',
                        iconCls: 'x-fa fa-pencil',
                        stores: '["gmpapprovaldecisionsstr"]',
                        table_name: 'tra_gmp_applications',
                        is_update: 1,
                        handler: 'getApplicationApprovalDetails'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'showGmpApplicationMoreDetails'
                    },  {
                        text: 'Inspection Documents',
                        iconCls: 'x-fa fa-upload',
                        childXtype: 'gmpappprevdocuploadsgenericgrid',
                        winTitle: 'Evaluation uploaded Documents',
                        winWidth: '80%',
                        handler: 'showPreviousUploadedDocs',
                        target_stage: 'evaluation'
                    },{
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    }, 
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var gmp_type = rec.get('gmp_type_id');
            if (gmp_type === 1 || gmp_type == 1) {//Oversea
                widget.down('menu menuitem[name=print] menu menuitem[name=premise_cert]').setVisible(false);
                widget.down('menu menuitem[name=print] menu menuitem[name=permit]').setVisible(false);

            }
        }
    }]
});
