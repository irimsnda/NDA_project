/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.NonComplianceObservationsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'noncomplianceobservationsabstractgrid',

    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'category',
                text: 'Category(Severity)',
                flex: 1,
                hidden: true
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'observation',
                text: 'Observation',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'reference',
                text: 'EAC GMP Guidelines reference',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'application_section',
                text: 'Application Section',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'status_name',
                text: 'Status',
                width: 150
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});