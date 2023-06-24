/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.dashboard.grids.DashboardGuidelinesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'dashboardguidelinesgrid',
    controller: 'dashboardvctr',
    requires: [
        'Ext.grid.Panel'
    ],
    width: '100%',
    height: Ext.Element.getViewportHeight() - 510,
    cls: 'todo-list shadow-panel',
    autoScroll: true,
    title: 'System Guideline',
    viewConfig: {
        emptyText: 'Check for the system Manual'
    },
    tools: [
        {
            iconCls: 'x-fa fa-plus',
            tooltip: 'Add Guideline',
            itemId: 'newGuideline'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setDashGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'dashboard/getSystemGuidelines'
                }
            },
            isLoad: true
        }
    },
    tbar: [
        {
            xtype: 'hiddenfield',
            name: 'menu_id'
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            beforeLoad: function () {
                var store = this.store,
                    grid = this.up('grid'),
                    content_panel = grid.up('#contentPanel'),
                    active_tab = content_panel.getActiveTab(),
                    menu_id = active_tab.menu_id;
                store.getProxy().extraParams = {
                    menu_id: menu_id
                };
            }
        }
    ],
    columns: [{
        dataIndex: 'guideline',
        text: 'Guidelines',
        xtype: 'gridcolumn',
        tdCls: 'wrap-text',
        flex: 1
    }, {
        dataIndex: 'description',
        text: 'Description',
        xtype: 'gridcolumn',
        tdCls: 'wrap-text',
        flex: 1
    }]
});
