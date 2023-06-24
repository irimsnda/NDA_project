/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.LabAnalysisResultsGrid', {
    extend: 'Admin.view.surveillance.views.grids.LabResultsAbstractGrid',
    xtype: 'labanalysisresultsgrid',

    tbar: [
        {
            xtype: 'button',
            text: 'Add Sample Analysis Results',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            winTitle: 'Sample Sample Analysis Results',
            winWidth: '35%',
            childXtype: 'labanalysisresultsfrm',
            handler: 'showAddSampleLabResultsWinFrm',
            stores: '[]'
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    win = grid.up('window'),
                    sample_id = win.down('hiddenfield[name=sample_id]').getValue();
                store.getProxy().extraParams = {
                    sample_id: sample_id,
                    analysis_type_id: 3
                }
            }
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'labanalysisresultsstr',
                proxy: {
                    url: 'surveillance/getSampleLabAnalysisResults'
                }
            },
            isLoad: true
        },
    },
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
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        handler: 'showEditSurveillanceWinFrm',
                        winTitle: 'Sample Sample Analysis Results',
                        winWidth: '35%',
                        childXtype: 'labanalysisresultsfrm',
                        stores: '[]'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_survsample_analysis_results',
                        storeID: 'labanalysisresultsstr',
                        action_url: 'surveillance/deleteSurveillanceRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteSurveillanceWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                    ]
                }
            }
        }
    ]

});