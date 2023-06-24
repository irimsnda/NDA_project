/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpmanagersabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
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
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'tracking_no',
                text: 'Tracking No',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_name',
                text: 'Manufacturing Site',
                flex: 1
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
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'gmp_type_txt',
                text: 'GMP Type',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'application_status',
                text: 'Status',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }

});
