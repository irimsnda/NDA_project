/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.DragGroupGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.draggroupgrid',
    cls: 'dashboard-todo-list',
    collapseMode: 'header',
    hideHeaders: false,
    scroll: true,
    autoHeight: true,
    width: '100%',
    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Admin.view.plugins.Searching',
        'Ext.grid.*'
    ],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    plugins: [
        {
            ptype: 'gridfilters'
        }
    ],
    features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        }],
    //multiSelect: true,
    stripeRows: true,
    //height: Ext.Element.getViewportHeight() - 550,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        //enableTextSelection: true
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'draggroupgridDDGroup',
            dropGroup: 'dropgroupgridDDGroup'
        },
        listeners: {
            drop: 'onDropDragGroupGrid'
            /*  drop: function (node, data, dropRec, dropPosition) {
                  var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
              }*/
        }
    },
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'draggroupstr',
                proxy: {
                    url: 'usermanagement/getOpenUserGroups'
                }
            },
            isLoad: false
        }
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: false,
            itemId: 'draggroupgrid_paging',
            doRefresh: function(){
                this.fireEvent('checkParams',this);
            },
            beforeLoad: function () {
                this.fireEvent('refresh',this);
            }
        },
        {
            xtype: 'displayfield',
            value: 'Available Groups',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            }
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1,
        filter: {
            type: 'string'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]

});
