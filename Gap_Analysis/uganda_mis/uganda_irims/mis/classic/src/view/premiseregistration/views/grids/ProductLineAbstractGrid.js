/**
 * Created by Softclans on 1/5/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesProductLineAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premisesproductlineabstractgrid',
    plugins: [{
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    initComponent: function () {
        // These are the default columns that will show for every extended grid
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_name',
                text: 'Product Line',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_category',tdCls:'wrap-text',
                text: 'Product Line Category',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_description',
                tdCls:'wrap-text',
                text: 'Product Line Description',
                flex: 1
            }
            ];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});