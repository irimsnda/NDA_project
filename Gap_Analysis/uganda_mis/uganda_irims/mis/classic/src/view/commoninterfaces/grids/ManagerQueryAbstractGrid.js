/**
 * Created by Softclans on 1/7/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ManagerQueryAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'managerqueryabstractgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    is_manager_query: 1,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'tracking_no',
                text: 'Tracking Number',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_name',
                text: 'Premise Name',
                hidden: true,
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'site_name',
                text: 'Manufacturing Site',
                flex: 1,
                hidden: true
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'applicant_name',
                text: 'Applicant',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'date_received',
                hidden: true,
                text: 'Date Received',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
