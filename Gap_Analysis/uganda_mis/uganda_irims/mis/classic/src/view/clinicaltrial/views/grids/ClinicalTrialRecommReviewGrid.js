/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialRecommReviewGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ClinicalTrialManagersAbstractGrid',
    xtype: 'clinicaltrialrecommreviewgrid',

    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'clinicaltrialrecommreviewstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialRecommReviewApplications'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.meeting_id) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recomm_id');
            if (recommendation_id > 0) {
                return true;
            } else {
                return false;
            }
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
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
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
                   // displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_clinical_trial_applications',
                    strict_mode: 1,
                    width: '60%',
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Upload Meeting Documents',
                    iconCls: 'x-fa fa-upload',
                    ui: 'soft-purple',
                    name: 'save_btn',
                    reference_table_name: 'tc_meeting_details',
                    table_name: 'tc_meeting_uploaddocuments',
                    handler: 'funcUploadTCMeetingtechnicalDocuments',
                    document_type_id: 4,
                    childXtype:'unstructureddocumentuploadsgrid',
                    winTitle: 'Technical Meeting Documents Upload',
                    winWidth: '80%',
                    toaster: 0
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    disabled: true,
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    gridXtype:'clinicaltrialrecommreviewgrid',
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'assessment_recomm',
        text: 'Assessment Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'audit_recomm',
        text: 'Audit Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'TC Recommendation',
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
                        text: 'Committee Recommendation',
                        iconCls: 'x-fa fa-retweet',
                        handler: 'showTcRecommendation',
                        childXtype: 'clinicaltrialtcrecommendationpnl',
                        winTitle: 'Committee Recommendation',
                        winWidth: '70%',
                        stores: '["tcrecommendationdecisionsstr"]'
                    },
                    {
                        text: 'Assessment Report',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationQueries'
                    },
                    {
                        text: 'Audit Report',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationChecklists'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showClinicalTrialApplicationMoreDetails'
                    }
                ]
            }
        }
    }]
});