/**
 * Created by Kip on 7/10/2018.
 */
Ext.define('Admin.view.administration.views.grids.SystemRolesTreeGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'systemrolestreegrid',
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    singleExpand: true,
    margin: '0 5 0 0',
    selType: 'cellmodel',
    requires: [
        'Ext.grid.*',
        'Ext.tree.*'
    ],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],

    autoScroll: true,
    store: 'systemrolestreestr',
    listeners: {
        itemdblclick: 'onMenuItemTreeItemDblClick',
        beforerender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        },
        afterrender: function () {
            var accessLevelsStr = Ext.getStore('systemaccesslevelsstr');
            accessLevelsStr.removeAll();
            accessLevelsStr.load();
        }
    },
    bbar: [
        {
            xtype: 'button',
            text: 'Back',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-backward',
            handler: 'backFromGroupAllDetails'
        },
        {
            xtype: 'pagingtoolbar',
            store: 'systemrolestreestr',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            doRefresh: function(){
                var store = this.store;
                store.removeAll();
                store.load();
            },
            beforeLoad: function () {
                var store = this.store,
                    grid = this.up('treepanel'),
                    tabPnl = grid.up('tabpanel'),
                    group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue();
                store.getProxy().extraParams = {
                    user_group: group_id
                };
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Sync/Save Select User Groups Changes',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            handler: 'updateSystemNavigationAccessRoles'
        }],
    features:[
        {
            ftype: 'searching',
            mode: 'local',
            minChars: 2
        }
    ],
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Menu',
        flex: 1,
        sortable: true,
        dataIndex: 'menu_name'
    }, {
        xtype: 'gridcolumn',
        width: 200,
        text: 'Accessibility',
        dataIndex: 'level_id',
        editor: {
            xtype: 'combo',
            store: 'systemaccesslevelsstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            allowBlank: false
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'None';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                //textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).get('name');//data.name;
            }
            if (val === 1 || val === '1') {
                meta.tdCls = 'none-cell';
            } else if (val === 2 || val === '2') {
                textVal='Read Only';
                meta.tdCls = 'read-only-cell';
            } else if(val === 3 || val === '3'){
                textVal='Write & Update';
                meta.tdCls = 'delete-cell';
            }else if(val === 4 || val === '4'){
                textVal='Full Access';
                meta.tdCls = 'full-access-cell';
            }else {
                meta.tdCls = 'none-cell';
            }
            return textVal;
        }
    }]
});
