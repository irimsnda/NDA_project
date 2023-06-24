/**
 * Created by Kip on 1/27/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialCommunicationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialcommunicationsgrid',
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
                    table_name: 'tra_clinical_trial_applications',
                    strict_mode: 1,
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
                    table_name: 'tra_clinical_trial_applications',
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
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialManagerApplicationsGeneric'
                }
            },
            isLoad: false
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
            name: 'gmp_cert',
            handler: 'printColumnClinicalTrialCertificate'
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
        dataIndex: 'study_title',
        text: 'Study Title',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sponsor',
        text: 'Sponsor',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'investigator',
        text: 'Investigator',
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
                        text: 'Clinical Trial Certificate',
                        iconCls: 'x-fa fa-certificate',
                        handler: 'printClinicalTrialCertificate',
                        name: 'certificate'
                    },
                    {
                        text: 'Rejection Letter',
                        iconCls: 'x-fa fa-file-text-o',
                        handler: '',
                        name: 'rejection'
                    },
                   
                    {
                        text: 'Update Signatory',
                        iconCls: 'x-fa fa-pencil',
                        stores: '["clinicalapprovaldecisionsstr"]',
                        table_name: 'tra_clinical_trial_applications',
                        is_update: 1,
                        handler: 'getApplicationApprovalDetails'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var status_id = rec.get('application_status_id');
            if (status_id === 6 || status_id == 6) {//Approved
                widget.down('menu menuitem[name=rejection]').setVisible(false);
                widget.down('menu menuitem[name=certificate]').setVisible(true);
            } else {//Rejected
                widget.down('menu menuitem[name=rejection]').setVisible(true);
                widget.down('menu menuitem[name=certificate]').setVisible(false);
            }
        }
    }]
});
