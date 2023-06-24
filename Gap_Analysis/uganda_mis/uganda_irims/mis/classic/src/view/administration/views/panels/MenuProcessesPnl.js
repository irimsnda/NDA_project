/**
 * Created by Kip on 8/26/2018.
 */
/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.administration.views.panels.MenuProcessesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'menuprocessespnl',
    title: 'System Permissions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'menuprocessesgrid'
        }
    ]
});


/*Ext.define('Admin.view.administration.views.panels.MenuProcessesPnl', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuprocessespnl',
    cls: 'dashboard-todo-list',
    controller: 'administrationvctr',
    scroll: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 64,
    layout: 'border',
    items: [{
        xtype: 'treepanel',
        region: 'west',
        width: 450,
        margin: '0 3 0 0',
        useArrows: true,
        rootVisible: false,
        multiSelect: true,
        singleExpand: true,
        store: 'systemmenusstr2',
        exportrpt_title: 'System Navigation',
        features: [{
            ftype: 'searching'
        }],
        listeners: {
            beforerender: function () {
                /!* var store = Ext.create('Admin.store.administration.SystemMenusStr'),
                     toolbar=this.down('pagingtoolbar');
                 this.setStore(store);
                 toolbar.setStore(store);*!/
                var store = this.store;
                store.removeAll();
                store.load();
            },
            selectionchange: 'onNavigationSelectionChange'
        },
        bbar: [
            {
                xtype: 'pagingtoolbar',
                store: 'systemmenusstr2',
                displayInfo: false
            }
        ],
        columns: [{
            xtype: 'treecolumn',
            text: 'Menu',
            flex: 2,
            sortable: true,
            dataIndex: 'name'
        }]
    }, {
        region: 'center',
        margin: '0 0 0 3',
        xtype: 'menuprocessesgrid'
    }]
});*/
