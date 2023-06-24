/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.DropRoleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.droprolegrid',
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
    // multiSelect: true,
    stripeRows: true,
    //height: Ext.Element.getViewportHeight() - 460,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        //enableTextSelection: true
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'droprolegridDDGroup',
            dropGroup: 'dragrolegridDDGroup'
        },
        listeners: {
            drop: 'onDropDropRoleGrid'
            /* drop: function (node, data, dropRec, dropPosition) {
                 var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
             }*/
        },
        dropZone: {
            overClass: 'dd-over-gridview'
        }
    },
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'droprolestr',
                proxy: {
                    url: 'usermanagement/getAssignedUserRoles'
                }
            },
            isLoad: true
        }
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: false,
            itemId: 'droprolegrid_paging',
            beforeLoad: function () {
                this.fireEvent('refresh',this);
            }
        },
        {
            xtype: 'displayfield',
            value: 'Assigned Roles',
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
