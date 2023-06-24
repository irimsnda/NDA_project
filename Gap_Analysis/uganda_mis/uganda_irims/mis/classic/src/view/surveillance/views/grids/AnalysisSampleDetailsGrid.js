/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.AnalysisSampleDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'analysissampledetailsgrid',
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
                storeId: 'analysissampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesLabStages'
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
            value: 'Double click for Laboratory Analysis',
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
                    width: '100%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    analysis_type_id: 4,
                    stage_id: 4,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
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
                            text: 'Conformatory Test',
                            iconCls: 'x-fa fa-arrows',
                            tooltip: 'Laboratory Screening',
                            action: 'screening',
                            handler: 'showPmsSampleLabRecommendation',
                            winTitle: 'Sample Laboratory Screening',
                            winWidth: '90%',
                            analysis_type_id: 4,
                            childXtype: 'sampleanalysistestrequestspnl'
                        },
                        {
                            text: 'Overall Recommendation',
                            iconCls: 'x-fa fa-chevron-circle-up',
                            handler: 'showPmsSampleRecommendationWin',
                            winTitle: 'Analysis Recommendation',
                            winWidth: '35%',
                            analysis_type_id: 4,
                            decision_table: 'par_pmsanalysis_decisions',
                            storeID: 'analysissampledetailsstr',
                            childXtype: 'screeningoverallrecommfrm'
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
            text: 'Overall Recommendation',
            dataIndex: 'recommendation',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Analysis Recommendation',
            dataIndex: 'lims_recommendation',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});