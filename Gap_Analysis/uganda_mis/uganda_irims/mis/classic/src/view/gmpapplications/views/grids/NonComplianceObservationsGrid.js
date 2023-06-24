/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.NonComplianceObservationsGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.NonComplianceObservationsAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'noncomplianceobservationsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [
        {
            text: 'Add Observation',
            ui: 'soft-green',
            name: 'add_observation',
            iconCls: 'x-fa fa-plus',
            childXtype: 'applicationunstructuredqueriesfrm',//'noncomplianceobservationsfrm',
            winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
            winWidth: '60%',
            stores: '[]'
        }
    ],
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
                    width: '100%',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            mainTabPanel = grid.up('#contentPanel'),
                            activeTab = mainTabPanel.getActiveTab(),
                            site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue();
                        store.getProxy().extraParams = {
                            site_id: site_id
                        };
                    }
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    },{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '{[values.rows[0].data.category]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'noncomplianceobservationsstr',
                groupField: 'category_id',
                proxy: {
                    url: 'gmpapplications/getNonComplianceObservations'
                }
            },
            isLoad: false
        }
    },
    columns: [{
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
                    handler: 'showEditNonComplianceWinFrm',//'showEditGmpApplicationWinFrm',
                    childXtype: 'noncomplianceobservationsfrm',
                    winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
                    winWidth: '60%',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_gmp_noncompliance_observations',
                    storeID: 'noncomplianceobservationsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
