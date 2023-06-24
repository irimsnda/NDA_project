/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.ApprovalsSampleDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'approvalssampledetailsgrid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var decision_id = record.get('decision_id');
            if (decision_id == 1 || decision_id === 1) {
                return 'valid-row';
            } else if (decision_id == 2 || decision_id === 2) {
                return 'invalid-row';
            } else {

            }
        }
    },
    selModel:{
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    winTitle: 'Laboratory Analysis',
    winWidth: '90%',
    childXtype: 'analysiscontainerpanel',
    tabIndex: 3,
    listeners:{
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'approvalssampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesApprovalStages'
                }
            },
            isLoad: true
        },
        itemdblclick: 'showPmsSampleLabRecommendation'
    },
    tbar:[
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'displayfield',
            hidden: true,
            value: 'Double click for Approval/Recommendation Details',
            fieldStyle:{
                'font-weight':'bold',
                'color':'green'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    width: '50%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    analysis_type_id: '',
                    stage_id: 5,
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
                    disabled: true,
                    hidden: true,
                    name: 'submit_selected',
                    table_name: 'tra_clinical_trial_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        }
    ],
    columns: [
        {
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
                            text: 'Approval Recommendation',
                            iconCls: 'x-fa fa-chevron-circle-up',
                            handler: 'showPmsSampleRecommendationWin',
                            winTitle: 'Approval Recommendation',
                            winWidth: '35%',
                            analysis_type_id: 5,
                            decision_table: 'par_pmsapproval_decisions',
                            storeID: 'approvalssampledetailsstr',
                            childXtype: 'screeningoverallrecommfrm'
                        },
                        {
                            text: 'Analysis Details',
                            iconCls: 'x-fa fa-arrows',
                            tooltip: 'Analysis Details',
                            action: 'screening',
                            handler: 'showPmsSampleLabRecommendation',
                            winTitle: 'Sample Laboratory Screening',
                            winWidth: '90%',
                            analysis_type_id: 2,
                            childXtype: 'sampleanalysistestrequestspnl'
                        },
                        {
                            text: 'Sample/Product Info',
                            iconCls: 'x-fa fa-bars',
                            tooltip: 'Sample/Product Info',
                            action: 'edit',
                            handler: 'showEditSampleWindow',
                            childXtype: 'pirsampledetailstabpanel',
                            winTitle: 'Sample/Product Details',
                            isReadOnly: 1,
                            winWidth: '90%',
                            stores: '[]'
                        }
                    ]
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Approval Recommendation',
            dataIndex: 'approval_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'TC Recommendation',
            dataIndex: 'tcm_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Analysis Recommendation',
            dataIndex: 'analysis_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Screening Recommendation',
            dataIndex: 'screening_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'PIR Recommendation',
            dataIndex: 'pir_recomm',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});