/**
 * Created by Kip on 2/6/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductIngredientsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'impproductingredientsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'ingredient',
                text: 'Ingredient',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'specification',
                text: 'Specification',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'strength_txt',
                text: 'Strength',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'inclusion_reason',
                text: 'Reason for Inclusion',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});