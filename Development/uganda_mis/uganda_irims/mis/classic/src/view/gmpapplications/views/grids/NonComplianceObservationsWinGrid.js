/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.NonComplianceObservationsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.NonComplianceObservationsAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'noncomplianceobservationswingrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 500,
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
            hidden: true,
            iconCls: 'x-fa fa-plus',
            handler: 'showAddGmpApplicationsForInspections',
            childXtype: 'noncomplianceobservationsfrm',
            winTitle: 'DETAILS OF NON-COMPLIANCE OBSERVATIONS',
            winWidth: '60%',
            stores: '[]'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
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
                            site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue();
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
            isLoad: true
        }
    },
    columns: [{
        text: 'Options',
        xtype: 'widgetcolumn',
        hidden: true,
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
                    handler: 'showEditGmpApplicationWinFrm',
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
