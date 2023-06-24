/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.grids.SafetyAlertReportsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'safetyalertreportsabstractgrid',
    autoScroll: true,
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
        selType: 'checkboxmodel',
        allowDeselect: true
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
                text: 'Tracking No',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            },  {
                xtype: 'gridcolumn',
                text: 'From',
                dataIndex: 'from_user',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                text: 'To',
                dataIndex: 'to_user',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'reporting_reference',
                text: 'Report Referencing',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'date_reported',
                text: 'Date Reported',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'report_received_date',
                text: 'Report Received On',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'workflow_stage',
                text: 'Workflow Stage',
                flex: 1,
                tdCls: 'wrap',
                hidden: true
            },{
                xtype: 'gridcolumn',
                dataIndex: 'date_received',
                text: 'Date Received',
                hidden: true,
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
