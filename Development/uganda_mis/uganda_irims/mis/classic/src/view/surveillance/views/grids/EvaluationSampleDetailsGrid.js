/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.EvaluationSampleDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'evaluationsampledetailsgrid',itemId:'evaluationsampledetailsgrid',
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
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: false
    },
    winTitle: 'Product Information Review',
    winWidth: '90%', 
    isReadOnly:0,
    childXtype: 'pircontainerpanel',
    tabIndex: 1,
    storeID: 'evaluationsampledetailsstr',
    listeners:{
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'evaluationsampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesLabStages'
                }
            },
            isLoad: true
        },
      itemdblclick: 'showPmsSampleProductInfoReview'
    },
    tbar:[
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'displayfield',
            value: 'Double click for Product Information Review',
            fieldStyle:{
                'font-weight':'bold',
                'color':'green'
            }
        },
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Recommendation',
            labelWidth: 120,
            width: 400,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            name: 'decision_id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_pmsevaluation_decisions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function () {
                    var grid=this.up('grid'),
                        store = grid.getStore();
                    grid.getSelectionModel().deselectAll();
                    store.load();
                }
            },
            labelStyle: 'font-weight:bold',
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
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
                    analysis_type_id: 1,
                    stage_id: 1,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                }
            ]
        }
    ],
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'PIR Recommendation',
            dataIndex: 'recommendation',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});