/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.DragRoleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dragrolegrid',
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
        selType: 'checkboxmodel'
    },
    stripeRows: true,
    //height: Ext.Element.getViewportHeight() - 460,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        //enableTextSelection: true
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'dragrolegridDDGroup',
            dropGroup: 'droprolegridDDGroup'
        },
        listeners: {
            drop: 'onDropDragRoleGrid'
            /*  drop: function (node, data, dropRec, dropPosition) {
                  var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
              }*/
        }
    },
    plugins:[
        {
            ptype:'gridfilters'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'dragrolestr',
                proxy: {
                    url: 'usermanagement/getOpenUserRoles'
                }
            },
            isLoad: true
        }
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: false,
            itemId: 'dragrolegrid_paging',
            beforeLoad: function () {
                this.fireEvent('refresh',this);
            }
        },
        {
            xtype: 'displayfield',
            value: 'Available Roles',
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
