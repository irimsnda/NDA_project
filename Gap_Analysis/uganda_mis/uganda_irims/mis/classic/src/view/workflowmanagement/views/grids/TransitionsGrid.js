/**
 * Created by Kip on 11/6/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.TransitionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'transitionsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar:[
        {
            xtype: 'exportbtn'
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'transitionsstr',
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_premises_applications',
            beforeLoad: function () {
                this.up('grid').fireEvent('refresh', this);
            }
        }

    ],
    plugins:[
        {
            ptype: 'gridexporter'
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    },
    store: 'transitionsstr',
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_stage_name',
            flex: 1,
            renderer: function (val, meta) {
                meta.tdCls = 'forward-cell';
                return val;
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_stage_name',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            text: 'Author',
            dataIndex: 'author',
            flex: 1
        },
        {
            xtype: 'datecolumn',
            text: 'Date',
            dataIndex: 'changes_date',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {
            xtype: 'gridcolumn',
            text: 'Directive',
            dataIndex: 'directive',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Remark/Comment',
            dataIndex: 'remarks',
            flex: 1,
            tdCls: 'wrap'
        }
    ]
});
