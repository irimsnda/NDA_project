/**
 * Created by Kip on 8/23/2018.
 */
Ext.define('Admin.view.administration.views.panels.GroupAccessRolesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'groupaccessrolespnl',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    layout: 'border',
    padding: '2 0 0 0',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        //split: true,
        titleCollapse: true
    },
    items: [{
        xtype: 'panel',
        frame: true,
        title: 'Menu Items',
        itemId: 'menuItemsID',
        region: 'west',
        margin: '0 2 0 0',
        width: 520,
        layout: 'fit',
        items: [{
            xtype: 'systemrolestreegrid'
        }]
    }, /*{
        xtype: 'panel',
        frame: true,
        margin: '0 0 0 2',
        title: 'Non Menu Items',
        region: 'center',
        itemId: 'nonMenuItemsId',
        layout: 'fit',
        items: [{
            xtype: 'nonmenuitemsrolestreegrid'
        }]
    }*/{
        xtype: 'panel',
        frame: true,
        margin: '0 0 0 2',
        title: 'Menu Processes',
        region: 'center',
        itemId: 'nonMenuItemsId',
        layout: 'fit',
        items: [{
            xtype: 'menuprocessesrolesgrid'
        }]
    }, {
        xtype: 'toolbar',
        region: 'south',
        ui: 'footer',
        height: 40,
        items: [
            {
                xtype: 'button',
                text: 'Back',
                iconCls: 'x-fa fa-backward',
                ui: 'soft-purple',
                containerType: 'panel',
                containerPnlID: 'SystemUserGroupsDashboard',
                containerPnlXtype: 'systemusergroupspnl',
                hiddenCompXtype: 'systemusergroupsgrid',
                handler: 'adminBackToDashboardFromAccessRoles'
            },
            {
                xtype: 'tbspacer',
                width: 30
            },
            {
                xtype: 'displayfield',
                value: 'Double click on the menu item to view processes!!',
                fieldStyle: {
                    'color': 'green',
                    'font-style': 'italic'
                }
            },
            '->',
            {
                xtype: 'button',
                text: 'Reset/Refresh All',
                iconCls: 'x-fa fa-refresh',
                ui: 'soft-purple',
                handler: 'refreshSystemAccessRoles'
            },
            {
                xtype: 'button',
                text: 'Save/Update All',
                iconCls: 'x-fa fa-save',
                handler: 'updateSystemAccessRoles',
                ui: 'soft-purple'
            }
        ]
    }
    ]
});