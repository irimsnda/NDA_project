/**
 * Created by Softclans on 1/17/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.StudySitesAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'studysitesabstractgrid',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Site Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'country_name',
                text: 'Country',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'region_name',
                text: 'Region',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'physical_address',
                text: 'Physical Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'postal_address',
                text: 'Postal Address',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
