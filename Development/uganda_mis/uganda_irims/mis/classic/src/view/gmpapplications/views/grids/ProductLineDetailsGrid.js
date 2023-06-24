/**
 * Created by Kip on 12/18/2018.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'productlinedetailsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [ {
        xtype: 'button',
        text: 'Update Product Line Details',
        iconCls: 'x-fa fa-plus',
        name:'update_line',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },'->'],
    plugins: [
        {
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid')
                if(grid.up('window')){
                    var win = grid.up('window');
                    site_id = win.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue(),
                    section_id = win.down('hiddenfield[name=section_id]').getValue();

                }
                else{

                    mainTabPanel = grid.up('#contentPanel'),
                    activeTab = mainTabPanel.getActiveTab(),
                    site_id = activeTab.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue(),
                    section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

                }
               
            store.getProxy().extraParams = {
                site_id: site_id,
                section_id:section_id
            };
        }
    }],
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    },{
        ptype: 'filterfield'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        hideGroupedHeader: true,
        enableGroupingMenu: false
    },{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                groupField:'product_line_category',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=update_line]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [z];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
               
            }
        }
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
                    items: []
                }
            }
        }]
});
