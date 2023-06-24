/**
 * Created by Kip on 3/14/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.ScreeningSampleDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'screeningsampledetailsgrid',
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
    /* selModel:{
         selType: 'checkboxmodel',
         mode: 'SINGLE'
     },*/
    winTitle: 'Laboratory Screening',
    winWidth: '90%',
    childXtype: 'screeningcontainerpanel',
    tabIndex: 2,
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'screeningsampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesLabStages'
                }
            },
            isLoad: true
        }
        //  itemdblclick: 'showPmsSampleLabRecommendation'
    },
    tbar: [
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'displayfield',
            value: 'Double click for Laboratory Screening',
            hidden: true,
            fieldStyle: {
                'font-weight': 'bold',
                'color': 'green'
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
                    analysis_type_id: 2,
                    stage_id: 2,
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
                    items: [ {
                            text: 'Overall Screening Recommendation(Report on Minilab testing)',
                            iconCls: 'x-fa fa-chevron-circle-up',
                            handler: 'showPmsSampleRecommendationWin',
                            winTitle: 'Screening Recommendation',
                            winWidth: '80%',
                            analysis_type_id: 2,
                            decision_table: 'par_pmsscreening_decisions',
                            storeID: 'screeningsampledetailsstr',
                            childXtype: 'screeningoverallrecommpnl'
                        },
                        {
                            text: 'Laboratory Screening Request',
                            iconCls: 'x-fa fa-arrows',
                            tooltip: 'Laboratory Screening',
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
                        },{
                            text: 'Generate PIR Report',
                            iconCls: 'x-fa fa-print',
                            tooltip: 'Generate PIR Report',
                            handler: 'generateProductInformationReport',
                            
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
            //hidden: true,
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'LIMS Screening Recommendation',
            dataIndex: 'lims_recommendation',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Sample Analysis Status',
            dataIndex: 'sample_analysis_status',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});