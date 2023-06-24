/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.TMeetingSampleDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'tmeetingsampledetailsgrid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recomm_id = record.get('screening_decision_id');
            if (recomm_id) {
                return 'valid-row';
            } else {
                return 'invalid-row';
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: false
    },
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'tmeetingsampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesApprovalStages'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                var decision_id = grid.down('combo[name=decision_id]').getValue();
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.tcm_decision_id == decision_id) {
                        // sm.select(rowIndex, true);
                    }
                });
            });
        },
        beforeselect: function (rowMdl, record, index, eOpts) {
            var grid = rowMdl.view.grid,
                recomm_id = record.get('tcm_recomm_id'),
                decision_id = grid.down('combo[name=decision_id]').getValue();
            if (!decision_id || !recomm_id) {
                return false;
            } else {
                return true;
            }
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                // grid.down('button[action=process_submission_btn]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                // grid.down('button[action=process_submission_btn]').setDisabled(true);
            }
        }
    },
    tbar: [
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Recommendation',
            labelWidth: 120,
            width: 400,
            valueField: 'id',
            hidden: true,
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
                                table_name: 'par_pmstcmeeting_decisions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function () {
                    var grid = this.up('grid'),
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
                    width: '50%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    analysis_type_id: 3,
                    stage_id: 3,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Preview Details',
                    iconCls: 'x-fa fa-bars',
                    name: 'more_app_details',
                    ui: 'soft-purple',
                    isReadOnly: 1
                },
                {
                    xtype: 'button',
                    text: 'Submit Application',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    //disabled: true,
                    name: 'submit_selected',
                    table_name: 'tra_surveillance_applications',
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
                    items: [{
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
                    }, {
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        storeID: 'tmeetingsampledetailsstr',
                        table_name: 'tra_surveillance_applications',
                        //action: 'process_returnsubmission_btn',
                        handler: 'submit_sample_back',
                        winWidth: '50%',
                        stage_id: 2,
                        toaster: 0
                    }
                    ]
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'PIR Recommendation',
            dataIndex: 'pir_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Screening Recommendation',
            dataIndex: 'screening_recomm',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});